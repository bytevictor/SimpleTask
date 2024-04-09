"use client";

import useLocalStorage from "@/app/_lib/customHooks/useLocalStorageV2";
import { PlusIcon } from "@/app/_lib/icons/PlusIcon";
import TaskPage from "./TaskPage";
import { useEffect, useState } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";

interface TabInfo {
  id: number;
  name: string;
  taskList: any;
}

const initialTabs: Array<TabInfo> = [{ id: 0, name: "To-Do", taskList: [] }];

export default function TasksTab() {
  const [tabs, setTabs] = useLocalStorage("tabs", initialTabs);

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  function addNewTab() {
    const newTab = {
      id: tabs.length,
      name: `Tab ${tabs.length + 1}`,
      taskList: [],
    };
    setTabs([...tabs, newTab]);
  }

  return (
    <>
      <main className="flex min-h-full flex-col items-center lg:pt-4 lg:m-16 lg:mt-0 md:p-0 pt-0">
        <TabsSelector
          tabsState={tabs}
          activeTab={activeTab}
          addNewTab={addNewTab}
          setActiveTab={setActiveTab}
          updateTabs={setTabs}
        />
        <div className="py-4 flex flex-col items-center w-full border border-t-0 border-base-300 rounded-br-box rounded-bl-box">
          <TaskPage />
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
  tabsState: Array<TabInfo>;
  activeTab: string;
  addNewTab: () => void;
  setActiveTab: (tabName: string) => void;
  updateTabs: (tabs: Array<TabInfo>) => void;
}) {
  const [parent, tabs, setTabs] = useDragAndDrop<HTMLUListElement, TabInfo>(
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
