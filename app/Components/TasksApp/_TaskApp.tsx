"use client";

import { Tab, Task } from "@/app/_lib/_Tasks/TaskTypes";
import { PlusIcon } from "@/app/_lib/icons/PlusIcon";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";
import TaskPage from "./TaskPage";
import { config } from "process";
import { useConfig } from "@/app/_lib/contexts/ConfigContext";
import clsx from "clsx";

const initialTasks: Task[] = [
  { id: "2", text: "Drink matcha", done: false, date: new Date() },
  { id: "1", text: "Call grandma", done: false, date: new Date() },
  {
    id: "0",
    text: "Contemplate the inevitable increase of entropy in the universe",
    done: true,
    date: new Date(),
  },
];

const initialTabs: Array<Tab> = [{ id: 0, name: "To-Do", tasks: initialTasks }];

const tabAtom = atomWithStorage("tabs", initialTabs);

export default function TaskApp() {
  const { config } = useConfig();

  const [tabs, setTabs] = useAtom(tabAtom);

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  function addNewTab() {
    const newTab = {
      id: tabs.length,
      name: `Tab ${tabs.length + 1}`,
      tasks: [],
    };
    setTabs([...tabs, newTab]);
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
            addNewTab={addNewTab}
            setActiveTab={setActiveTab}
            updateTabs={setTabs}
          />
        )}
        <div
          className={clsx(
            "py-4 flex flex-col items-center w-full border border-t-0 border-base-300 rounded-br-box rounded-bl-box",
            { "border-t": config.disableTabs }
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

function TabsSelector({
  tabsState,
  activeTab,
  addNewTab,
  setActiveTab,
  updateTabs,
}: {
  tabsState: Array<Tab>;
  activeTab: string;
  addNewTab: () => void;
  setActiveTab: (tabName: string) => void;
  updateTabs: (tabs: Array<Tab>) => void;
}) {
  const [parent, tabs, setTabs] = useDragAndDrop<HTMLUListElement, Tab>(
    tabsState,
    {
      //There is a bug with the animation because when the useEffect reAsigns the tabs the animation re-renders
      //
      //plugins: [animations()],
      handleEnd(data) {
        console.log("handleEnd", data);
        updateTabs([...tabs]);
        setTabs([...tabs]);
      },
      draggable: (el) => {
        return el.id !== "no-drag";
      },
    }
  );

  useEffect(() => {
    setTabs([...tabsState]);
  }, [tabsState, setTabs]);

  console.log(tabs);

  return (
    <ul
      ref={parent}
      role="tablist"
      className="w-full tabs tabs-lg tabs-lifted tabs-base-300 self-start"
    >
      {tabs.map((tab) => (
        <li
          className={`tab ${activeTab == tab.name ? "tab-active" : ""}`}
          key={tab.id}
          onClick={() => setActiveTab(tab.name)}
        >
          <span className="text-lg">{tab.name}</span>
        </li>
      ))}

      <li className="tab tab-active" id="no-drag">
        <button
          onClick={addNewTab}
          className="btn btn-sm btn-circle btn-outline btn-success"
        >
          <PlusIcon />
        </button>
      </li>
    </ul>
  );
}
