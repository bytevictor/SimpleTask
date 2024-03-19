"use client";

export function ListElement({ task }: { task: Task }) {
  const playSound = () => {
    console.log("Playing sound");

    const audio = new Audio("/completedTaskSound.mp3");
    audio.play();
  };

  function checkTask(){
    task.completed = !task.completed
  }

  return (
    <li
      className="cursor-pointer"
      data-label={task.name}
      onClick={playSound}
      key={task.name}
    >
        
      <input type="checkbox"  onChange={checkTask} className="checkbox checkbox-primary" />
      {task.name}
    </li>
  );
}
