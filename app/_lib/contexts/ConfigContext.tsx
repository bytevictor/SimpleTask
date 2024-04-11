"use client";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
// ConfigContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

const ConfigContext = createContext<any | null>(null);

export interface TasksConfig {
  checkAudio: string;
  uncheckAudio: string;
  deleteAudio: string;
  showCompletedTasks: boolean;
  disableTabs: boolean;
}

const initialConfig: TasksConfig = {
  checkAudio: "./sounds/defaultCheck.mp3",
  uncheckAudio: "./sounds/defaultCheck.mp3",
  deleteAudio: "./sounds/defaultDelete.mpeg",
  showCompletedTasks: true,
  disableTabs: false,
};

const configAtom = atomWithStorage("config", initialConfig);

export const ConfigContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [config, setConfig] = useAtom(configAtom);

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
