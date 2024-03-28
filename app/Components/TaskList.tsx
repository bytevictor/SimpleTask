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
        <li className="flex flex-row w-full " key={task.id}>
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
  const playSound = () => {
    console.log("Playing sound");

    const audio = new Audio("/completedTaskSound.mp3");
    audio.play();
  };

  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          className="input input-bordered w-full max-w-xs"
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
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        className="checkbox"
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
          playSound();
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
