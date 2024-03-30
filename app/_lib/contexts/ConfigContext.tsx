"use client";

// ConfigContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

const ConfigContext = createContext<any | null>(null);

export interface TasksConfig {
  checkAudio: string;
  uncheckAudio: string;
  deleteAudio: string;
  showCompletedTasks: boolean;
}

const initialConfig: TasksConfig = {
  checkAudio: "./sounds/[Original] completedTaskSound.mp3",
  uncheckAudio: "./sounds/CompletedTaskBassInverted.mpeg",
  deleteAudio: "./sounds/delete.mp3",
  showCompletedTasks: true,
};

export const ConfigContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [config, setConfig] = useState<TasksConfig>(initialConfig);

  const updateConfig = (newConfig: TasksConfig) => {
    setConfig({ ...newConfig });
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  return useContext(ConfigContext);
};
