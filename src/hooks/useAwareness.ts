import { useEffect, useState } from "react";
import type { HocuspocusProvider } from "@hocuspocus/provider";

interface AwarenessUser {
  id: string;
  name: string;
  color: string;
}

export function useAwareness(provider: HocuspocusProvider | null) {
  const [activeUsers, setActiveUsers] = useState<AwarenessUser[]>([]);

  useEffect(() => {
    if (!provider) return;

    const update = () => {
      const states = provider?.awareness?.getStates();
      const users: AwarenessUser[] = [];
      states?.forEach((state: unknown) => {
        const s = state as { user?: AwarenessUser };
        if (s?.user) users.push(s.user);
      });
      setActiveUsers(users);
    };

    provider?.awareness?.on("change", update);
    update();

    return () => {
      provider?.awareness?.off("change", update);
    };
  }, [provider]);

  return { activeUsers, onlineCount: activeUsers.length };
}
