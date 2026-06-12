import { useEffect, useState } from "react";

export function useImportProgress(file: File | null, isApiDone: boolean = false) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<
    "Analyzing pages" | "Recognizing text" | "Formatting content"
  >("Analyzing pages");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isApiDone) {
      setProgress(100);
      setStep("Formatting content");
      setIsCompleted(true);
      return;
    }
  }, [isApiDone]);

  useEffect(() => {
    if (!file) return;

    setProgress(0);
    setIsCompleted(false);
    setStep("Analyzing pages");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          return 100;
        }

        if (prev > 60) setStep("Formatting content");
        else if (prev > 30) setStep("Recognizing text");

        return prev + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [file]);

  return { progress, step, isCompleted };
}