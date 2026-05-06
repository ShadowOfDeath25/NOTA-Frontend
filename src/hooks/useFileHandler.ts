import { useRef, useState } from "react";

export function useFileHandler() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      console.error("Only PDF allowed");
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      console.error("File size exceeds 100MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
    event.target.value = "";
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return {
    file,
    fileInputRef,
    handleDrop,
    handleFileSelect,
    openFileDialog,
  };
}