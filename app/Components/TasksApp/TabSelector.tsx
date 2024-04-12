import { Tab } from "@/app/_lib/_Tasks/TaskTypes";
import { PlusIcon } from "@/app/_lib/icons/PlusIcon";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useEffect, useState } from "react";

export default function TabsSelector({
  tabsState,
  activeTab,
  addNewTab,
  setActiveTab,
  updateTabs,
  deleteTab,
  changeTabName,
}: {
  tabsState: Array<Tab>;
  activeTab: string;
  addNewTab: () => void;
  setActiveTab: (tabName: string) => void;
  updateTabs: (tabs: Array<Tab>) => void;
  deleteTab: (tabId: number) => void;
  changeTabName: (tabId: number, newName: string) => void;
}) {
  const [parent, tabs, setTabs] = useDragAndDrop<HTMLUListElement, Tab>(
    tabsState,
    {
      //There is a bug with the animation because when the useEffect
      // reAsigns the tabs the animation re-renders
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
      className="w-full tabs tabs-lg tabs-lifted tabs-base-300 self-start "
    >
      {tabs.map((tab) => (
        <EditableTab
          key={tab.id}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tab={tab}
          deleteTab={deleteTab}
          changeTabName={changeTabName}
        />
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

function EditableTab({
  activeTab,
  setActiveTab,
  tab,
  deleteTab,
  changeTabName,
}: {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
  tab: Tab;
  deleteTab: (tabId: number) => void;
  changeTabName: (tabId: number, newName: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li
      className={`tab ${activeTab == tab.name ? "tab-active" : ""}`}
      onClick={() => setActiveTab(tab.name)}
      onDoubleClick={() => setIsEditing(true)}
    >
      {!isEditing ? (
        <span className="text-lg text-nowrap truncate">{tab.name}</span>
      ) : (
        <>
          <input
            className="input text-lg focus:border-base-300 grow-0"
            value={tab.name}
            size={tab.name.length || 1}
            onChange={(e) => {
              changeTabName(tab.id, e.target.value);
              setActiveTab(e.target.value);
            }}
            onBlur={(e) => {
              setIsEditing(false);

              console.log(e.target.value);

              //If empty onLeave, drop the task
              if (e.target.value === "") {
                console.log("borrando " + tab.id);
                deleteTab(tab.id);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                (e.target as HTMLInputElement).blur();
              }
            }}
            autoFocus
          />
        </>
      )}
    </li>
  );
}
