import { useConfig } from "@/app/_lib/contexts/ConfigContext";
import clsx from "clsx";
import { useRef, useState } from "react";
import Task from "./Task";

export default function TaskList({
  tasks,
  setTasks,
  onChangeTask,
  onDeleteTask,
}: {
  tasks: any;
  setTasks: any;
  onChangeTask: any;
  onDeleteTask: any;
}) {
  const { config } = useConfig();

  const listRef = useRef(null);

  const [draggedOverTask, setDraggedOverTask] = useState<number | null>(null);

  const dragTask = useRef<number>(0);
  const draggedOverTaskIndex = useRef<number>(0);

  const touchedTask = useRef<number>(-1);

  function handleDragEnter(index: number) {
    draggedOverTaskIndex.current = index;
    setDraggedOverTask(index);
  }

  function handleSort() {
    setDraggedOverTask(null);
    const methodsClone = [...tasks];
    const temp = methodsClone[dragTask.current];
    methodsClone[dragTask.current] = methodsClone[draggedOverTaskIndex.current];
    methodsClone[draggedOverTaskIndex.current] = temp;
    setTasks(methodsClone);
  }

  function handleTouchSwap() {
    setDraggedOverTask(null);
    const methodsClone = [...tasks];
    const temp = methodsClone[touchedTask.current];
    methodsClone[touchedTask.current] =
      methodsClone[draggedOverTaskIndex.current];
    methodsClone[draggedOverTaskIndex.current] = temp;
    setTasks(methodsClone);
  }

  console.log(tasks);

  return (
    <ul
      ref={listRef}
      className="lg:w-5/6 w-full mt-24 flex justify-center flex-col"
    >
      {tasks.map((task: any, index: number) => (
        <li
          onDragStart={() => (dragTask.current = index)}
          onTouchStart={() => {
            touchedTask.current = index;
            handleTouchSwap();
            dragTask.current = index;
          }}
          onDragEnter={() => handleDragEnter(index)}
          //onTouchMove={() => handleDragEnter(index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          className={clsx(
            "flex flex-row w-full p-2 hover:bg-base-200 rounded-md border ",
            {
              "border-dashed border-primary": index == draggedOverTask,
              "border-base-100": index != draggedOverTask,
              //dont display if it's done on config
              hidden: !config.showCompletedTasks && task.done,
            }
          )}
          key={task.id}
          draggable
        >
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}
