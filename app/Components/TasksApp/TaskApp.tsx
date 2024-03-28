"use client";

import { useEffect, useReducer } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import useLocalStorageReducer from "@/app/_lib/customHooks/useLocalStorageWithReducer";
import { v4 as uuid } from "uuid";

export default function TaskApp() {
  //const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [tasks, dispatch] = useLocalStorageReducer(
    tasksReducer,
    "tasks",
    initialTasks
  );

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
    dispatch({
      type: "added",
      id: uuid(),
      text: text,
      isNew: true,
    });
  }

  function handleChangeTask(task: any) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId: any) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks: Array<any>, action: any) {
  switch (action.type) {
    case "added": {
      const newTasks = [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
          isNew: action.isNew,
        },
      ];
      //setSavedTasks(newTasks);
      return newTasks;
    }
    case "changed": {
      return tasks.map((t: any) => {
        if (t.id === action.task.id) {
          return { ...action.task, isNew: false };
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t: any) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: "Contemplate the entropy of the universe", done: true, isNew: false },
  { id: 1, text: "Visit the temple", done: false, isNew: false },
  { id: 2, text: "Drink matcha", done: false, isNew: false },
];
