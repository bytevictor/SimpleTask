"use client";

import { Tab, Task } from "@/app/_lib/_Tasks/TaskTypes";
import { useConfig } from "@/app/_lib/contexts/ConfigContext";
import clsx from "clsx";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useState } from "react";
import TabsSelector from "./TabSelector";
import TaskPage from "./TaskPage";

const initialTasks: Task[] = [
  { id: "2", text: "Drink matcha", done: false, date: new Date(99, 0) },
  { id: "1", text: "Call grandma", done: false, date: new Date(99, 0) },
  {
    id: "0",
    text: "Contemplate the inevitable increase of entropy in the universe",
    done: true,
    date: new Date(99, 0),
  },
];

const initialTabs: Array<Tab> = [{ id: 0, name: "To-Do", tasks: initialTasks }];

const tabAtom = atomWithStorage("tabs", initialTabs);

export default function TaskApp() {
  const { config } = useConfig();

  const [tabs, setTabs] = useAtom(tabAtom);

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  function addNewTab(name: string) {
    // Guarda el nombre original
    let originalName = name;

    // Verifica si la pestaña con el nombre ya existe
    let doesTabExist = tabs.some((tab) => tab.name === name);
    let counter = 2;

    while (doesTabExist) {
      // Usa el nombre original y añade el contador
      name = originalName + " (" + counter + ")";
      doesTabExist = tabs.some((tab) => tab.name === name);
      counter++;
    }

    //Add new tab with unique name
    const maxId = tabs.reduce((max, tab) => Math.max(max, tab.id), 0);
    const newTab = {
      id: maxId + 1,
      name: name,
      tasks: [],
    };
    setTabs([...tabs, newTab]);
  }

  function changeTabName(tabId: number, newName: string) {
    setTabs(
      tabs.map((tab) => (tab.id === tabId ? { ...tab, name: newName } : tab))
    );
  }

  function deleteTab(tabId: number) {
    setTabs(tabs.filter((tab) => tab.id !== tabId));
  }

  function updateTasks(tabName: string, tasks: Task[]) {
    const newTabs = tabs.map((tab) => {
      if (tab.name === tabName) {
        return { ...tab, tasks: tasks };
      }
      return tab;
    });

    setTabs(newTabs);
  }

  const activeTabTasks =
    tabs.find((tab) => tab.name === activeTab)?.tasks || [];

  return (
    <>
      <main className="flex min-h-full flex-col items-center lg:pt-4 lg:m-16 lg:mt-0 md:p-0 pt-0">
        {!config.disableTabs && (
          <TabsSelector
            tabsState={tabs}
            activeTab={activeTab}
            addNewTab={() => addNewTab("Tab")}
            setActiveTab={setActiveTab}
            updateTabs={setTabs}
            changeTabName={changeTabName}
            deleteTab={deleteTab}
          />
        )}
        <div
          className={clsx(
            "py-8 flex flex-col items-center w-full border border-t border-b-0 lg:border-b border-base-300 rounded-br-box rounded-bl-box",
            {
              "border-t-0": !config.disableTabs,
              "rounded-tl-box rounded-tr-box": config.disableTabs,
            }
          )}
        >
          <TaskPage
            tabtasks={activeTabTasks}
            updateTasks={(tasks: Task[]) => updateTasks(activeTab, tasks)}
          />
        </div>
      </main>
    </>
  );
}

