import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import SnackbarContainer from "./SnackbarContainer";

export type SnackbarVariant = "success" | "error" | "warning" | "info";

export interface SnackbarAction {
  label: string;
  onClick: () => void;
}

export interface SnackbarOptions {
  type: SnackbarVariant;
  title?: string;
  message: string;
  duration?: number;
  action?: SnackbarAction;
  onDismiss?: () => void;
}

export interface SnackbarItem extends SnackbarOptions {
  id: string;
  isExiting: boolean;
}

interface SnackbarContextType {
  showSnackbar: (options: SnackbarOptions) => string;
  dismissSnackbar: (id: string) => void;
  dismissAll: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

const DEFAULT_DURATION = 4000;
const MAX_VISIBLE = 3;

let counter = 0;
function generateId(): string {
  counter += 1;
  return `snackbar-${counter}`;
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SnackbarItem[]>([]);
  const queueRef = useRef<SnackbarOptions[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );
  const startTimesRef = useRef<Map<string, number>>(new Map());
  const remainingRef = useRef<Map<string, number>>(new Map());
  const exitingRef = useRef<Set<string>>(new Set());

  const closeById = useCallback((id: string) => {
    if (exitingRef.current.has(id)) return;
    exitingRef.current.add(id);

    const timeout = timersRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timersRef.current.delete(id);
    }
    startTimesRef.current.delete(id);
    remainingRef.current.delete(id);

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isExiting: true } : item
      )
    );
  }, []);

  const startTimer = useCallback(
    (id: string, duration: number) => {
      const timeout = setTimeout(() => closeById(id), duration);
      timersRef.current.set(id, timeout);
      startTimesRef.current.set(id, Date.now());
      remainingRef.current.set(id, duration);
    },
    [closeById]
  );

  const processQueue = useCallback(() => {
    setItems((prev) => {
      if (prev.length >= MAX_VISIBLE) return prev;
      const queue = queueRef.current;
      if (queue.length === 0) return prev;
      const next = queue.shift()!;
      const id = generateId();
      const duration = next.duration ?? DEFAULT_DURATION;
      startTimer(id, duration);
      return [
        ...prev,
        { ...next, id, isExiting: false } as SnackbarItem,
      ];
    });
  }, [startTimer]);

  const showSnackbar = useCallback(
    (options: SnackbarOptions): string => {
      const id = generateId();
      const duration = options.duration ?? DEFAULT_DURATION;

      setItems((prev) => {
        if (prev.length < MAX_VISIBLE) {
          startTimer(id, duration);
          return [
            ...prev,
            { ...options, id, isExiting: false } as SnackbarItem,
          ];
        }
        queueRef.current.push(options);
        return prev;
      });

      return id;
    },
    [startTimer]
  );

  const dismissSnackbar = useCallback(
    (id: string) => closeById(id),
    [closeById]
  );

  const dismissAll = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current.clear();
    startTimesRef.current.clear();
    remainingRef.current.clear();
    queueRef.current = [];
    exitingRef.current.clear();
    setItems((prev) =>
      prev.map((item) => ({ ...item, isExiting: true }))
    );
  }, []);

  const pauseSnackbar = useCallback((id: string) => {
    const timeout = timersRef.current.get(id);
    if (!timeout) return;

    const startTime = startTimesRef.current.get(id);
    if (startTime === undefined) return;

    const elapsed = Date.now() - startTime;
    const prevRemaining = remainingRef.current.get(id) ?? DEFAULT_DURATION;
    const newRemaining = Math.max(0, prevRemaining - elapsed);

    clearTimeout(timeout);
    timersRef.current.delete(id);
    remainingRef.current.set(id, newRemaining);
  }, []);

  const resumeSnackbar = useCallback(
    (id: string) => {
      const remaining = remainingRef.current.get(id);
      if (remaining === undefined || remaining <= 0) {
        closeById(id);
        return;
      }
      startTimer(id, remaining);
    },
    [closeById, startTimer]
  );

  const handleAnimationEnd = useCallback(
    (id: string) => {
      exitingRef.current.delete(id);
      setItems((prev) => {
        const filtered = prev.filter((item) => item.id !== id);
        return filtered;
      });
      processQueue();
    },
    [processQueue]
  );

  return (
    <SnackbarContext.Provider
      value={{ showSnackbar, dismissSnackbar, dismissAll }}
    >
      {children}
      <SnackbarContainer
        items={items}
        onDismiss={dismissSnackbar}
        onAnimationEnd={handleAnimationEnd}
        onPause={pauseSnackbar}
        onResume={resumeSnackbar}
      />
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
