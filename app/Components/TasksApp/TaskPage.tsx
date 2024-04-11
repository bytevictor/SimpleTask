"use client";

import { Task } from "@/app/_lib/_Tasks/TaskTypes";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

export default function TaskPage({
  tabtasks,
  updateTasks,
}: {
  tabtasks: Array<Task>;
  updateTasks: (tasks: Task[]) => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleAddTask("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleAddTask(text: any) {
    updateTasks(
      [
      {
        id: uuid(),
        text: text,
        done: false,
        date: new Date(),
      },
      ...tabtasks
    ]
    );
  }

  function handleChangeTask(task: any) {
    updateTasks(
      tabtasks.map((t: any) => {
        if (t.id === task.id) {
          return { ...task, isNew: false };
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId: any) {
    updateTasks(tabtasks.filter((t: any) => t.id !== taskId));
  }

  console.log(tabtasks)

  return (
    <>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tabtasks}
        setTasks={updateTasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
