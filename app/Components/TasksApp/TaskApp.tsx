"use client";

import { useReducer } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text: any) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
      isNew: true
    });
  }

  function handleChangeTask(task: any) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId: any ) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks: any, action: any) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false,
        isNew: action.isNew
      }];
    }
    case 'changed': {
      return tasks.map( (t: any) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter( (t: any) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true, isNew: false },
  { id: 1, text: 'Visit the temple', done: false, isNew: false},
  { id: 2, text: 'Drink matcha', done: false, isNew: false }
];
