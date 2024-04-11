"use client";

import { useConfig } from "@/app/_lib/contexts/ConfigContext";
import { useState } from "react";

export function DisableTabsOption() {
  const { config, updateConfig } = useConfig();

  const disableTabs = config.disableTabs

  function toogleTabsFunctionality() {
    updateConfig({ disableTabs: !disableTabs });
  }

  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">Disable Tabs Functionality</span>
        <input
          type="checkbox"
          checked={disableTabs}
          onChange={toogleTabsFunctionality}
          className="checkbox checkbox-error"
        />
      </label>
    </div>
  );
}
