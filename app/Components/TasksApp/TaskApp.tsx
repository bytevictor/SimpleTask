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

  //Mimics setState
  function handleStateTask(tasks: any) {
    dispatch({
      type: "state",
      tasks: tasks,
    });
  }

  return (
    <>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        setTasks={handleStateTask}
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
        {
          id: action.id,
          text: action.text,
          done: false,
          isNew: action.isNew,
        },
        ...tasks,
      ];
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
    case "state": {
      return [...action.tasks];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTasks = [
  { id: 2, text: "Drink matcha", done: false, isNew: false },
  { id: 1, text: "Call grandma", done: false, isNew: false },
  {
    id: 0,
    text: "Contemplate the inevitable increase of entropy in the universe",
    done: true,
    isNew: false,
  },
];
