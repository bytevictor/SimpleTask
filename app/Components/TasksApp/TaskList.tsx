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
    <ul className="w-1/2 flex justify-center flex-col">
      {tasks.map((task: any) => (
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

  const [isEditing, setIsEditing] = useState(false);
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
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        <span className="col-span-3">{task.text}</span>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label className="w-full grid grid-cols-6 grid-rows-1">
      <input
        className="checkbox self-center"
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
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
