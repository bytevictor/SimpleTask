import TrashIcon from "@/app/_lib/icons/TrashIcon";
import { useState } from "react";

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask,
}: {
  tasks: any;
  onChangeTask: any;
  onDeleteTask: any;
}) {
  return (
    <ul className="w-1/2 mt-24 flex justify-center flex-col">
      {[...tasks].reverse().map((task: any) => (
        <li className="flex flex-row w-full my-2" key={task.id}>
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

    const audio = new Audio("/sounds/[Original] completedTaskSound.mp3");
    audio.play();
  };

  const playSoundUncheck = () => {
    console.log("Playing sound");

    const audio = new Audio("/sounds/CompletedTaskInverted.mpeg");
    audio.play();
  };

  console.log("Task", task);

  const [isEditing, setIsEditing] = useState(task.isNew);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          className="input input-bordered col-span-3"
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      </>
    );
  } else {
    taskContent = (
      <>
        <span
          className="col-span-3 self-center align-middle text-start w-full min-h-6"
          onDoubleClick={() => setIsEditing(true)}
        >
          {task.text}
        </span>
      </>
    );
  }
  return (
    <label className="w-full grid grid-cols-5 grid-rows-1">
      <input
        className="checkbox self-center checkbox-lg"
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
        onClick={() => onDelete(task.id)}
        className="btn btn-md btn-circle btn-outline btn-error self-end justify-self-end"
      >
        <TrashIcon />
      </button>
    </label>
  );
}
