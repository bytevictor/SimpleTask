import { useState } from "react";

export default function AddTask({ onAddTask }: { onAddTask: any }) {
  const [text, setText] = useState("");
  return (
    <button
      className="btn btn-primary btn-lg"
      onClick={() => {
        setText("");
        onAddTask(text);
      }}
    >
      Add Task
    </button>
  );
}
