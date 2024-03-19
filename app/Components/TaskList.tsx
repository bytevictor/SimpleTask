"use client";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useState } from "react";
import { ListElement } from "./ListElement";
import { animations } from "@formkit/drag-and-drop";
import { v4 as uuid } from "uuid";

export function TaskList() {
  const taskList: Task[] = [];

  const [tasksState, setTasks] = useState(taskList);
  const [parent, tasks] = useDragAndDrop<HTMLUListElement, Task>(taskList, {
    plugins: [animations()],
  });

  function addTask() {
    const id = uuid()

    tasks.push({
      id: id,
      name: "Task " + id,
      completed: false,
      date: new Date(),
    });
    setTasks([...tasks]);
  }

  console.log(tasks)

return (
    <>
        <button className="btn btn-primary" onClick={addTask}></button>
        <ul ref={parent}>
            {tasks.map((task, index) => (
                <ListElement key={index} task={task} />
            ))}
        </ul>
    </>
);
}
