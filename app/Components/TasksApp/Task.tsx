import { useConfig } from "@/app/_lib/contexts/ConfigContext";
import DragIcon from "@/app/_lib/icons/DragIcon";
import TrashIcon from "@/app/_lib/icons/TrashIcon";
import clsx from "clsx";
import { useState } from "react";

export default function Task({
  task,
  onChange,
  onDelete,
}: {
  task: any;
  onChange: any;
  onDelete: any;
}) {
  const { config } = useConfig();

  const playSoundCheck = () => {
    const audio = new Audio(config.checkAudio);
    audio.play();
  };

  const playSoundUncheck = () => {
    console.log("Playing sound");

    const audio = new Audio(config.uncheckAudio);
    audio.play();
  };

  const playSoundDelete = () => {
    console.log("Playing sound");

    const audio = new Audio(config.deleteAudio);
    audio.play();
  };

  //A bit messy, but we avoid having a useless isNew value on the task
  // when Date is restored from localStorage we have to rebuild the Date object
  const [isEditing, setIsEditing] = useState(isCurrentSecond(new Date(task.date)));
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

function isCurrentSecond(date: Date): boolean {
  const currentDate = new Date();
  return (
    date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getDate() === currentDate.getDate() &&
    date.getHours() === currentDate.getHours() &&
    date.getMinutes() === currentDate.getMinutes() &&
    date.getSeconds() === currentDate.getSeconds()
  );
}
