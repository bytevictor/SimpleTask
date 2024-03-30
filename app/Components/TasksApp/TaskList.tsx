import DragIcon from "@/app/_lib/icons/DragIcon";
import TrashIcon from "@/app/_lib/icons/TrashIcon";
import { animations } from "@formkit/drag-and-drop";
import { dragAndDrop, useDragAndDrop } from "@formkit/drag-and-drop/react";
import clsx from "clsx";
import { useRef, useState } from "react";

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
  const listRef = useRef(null);

  const [draggedOverTask, setDraggedOverTask] = useState<number | null>(null);

  const dragTask = useRef<number>(0);
  const draggedOverTaskIndex = useRef<number>(0);

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

  return (
    <ul
      ref={listRef}
      className="lg:w-3/4 w-full mt-24 flex justify-center flex-col"
    >
      {tasks.map((task: any, index: number) => (
        <li
          onDragStart={() => (dragTask.current = index)}
          onTouchStart={() => (dragTask.current = index)}
          onDragEnter={() => handleDragEnter(index)}
          //onTouchMove={() => handleDragEnter(index)}
          onDragEnd={handleSort}
          //onTouchEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          className={clsx(
            "flex flex-row w-full p-2 hover:bg-base-200 rounded-md border ",
            {
              "border-dashed border-primary": index == draggedOverTask,
              "border-base-100": index != draggedOverTask,
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

function Task({
  task,
  onChange,
  onDelete,
}: {
  task: any;
  onChange: any;
  onDelete: any;
}) {
  const playSoundCheck = () => {
    console.log("Playing sound");

    const audio = new Audio("./sounds/[Original] completedTaskSound.mp3");
    audio.play();
  };

  const playSoundUncheck = () => {
    console.log("Playing sound");

    const audio = new Audio("./sounds/CompletedTaskBassInverted.mpeg");
    audio.play();
  };

  const playSoundDelete = () => {
    console.log("Playing sound");

    const audio = new Audio("./sounds/delete.mp3");
    audio.play();
  };

  const [isEditing, setIsEditing] = useState(task.isNew);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          className="input input-bordered col-span-4 lg:col-span-3 font-semibold text-xl"
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
          onBlur={(e) => {
            setIsEditing(false);

            //If empty onLeave, drop the task
            if (e.target.value === "") {
              onDelete(task.id);
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
    );
  } else {
    taskContent = (
      <>
        <span
          className={clsx(
            "break-all col-span-4 lg:col-span-3 self-center align-middle text-start w-full min-h-12 font-semibold text-xl items-center inline-flex",
            { "line-through": task.done }
          )}
          onDoubleClick={() => setIsEditing(true)}
        >
          {task.text}
        </span>
      </>
    );
  }
  return (
    <div className="w-full grid grid-cols-6 grid-rows-1">
      <div className="hidden drag-handle lg:flex cursor-grab">
        <DragIcon />
      </div>

      <input
        className="checkbox self-center checkbox-lg ml-4 lg:ml-0"
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
          if (e.target.checked) {
            playSoundCheck();
          } else {
            playSoundUncheck();
          }
        }}
      />
      {taskContent}

      <button
        onClick={() => {
          onDelete(task.id);
          playSoundDelete();
        }}
        className="btn btn-md btn-circle btn-outline btn-error self-center justify-self-end mr-4 lg:mr-0"
      >
        <TrashIcon />
      </button>
    </div>
  );
}
