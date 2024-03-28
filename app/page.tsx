import Image from "next/image";
import { SoundButton } from "./Components/TasksApp/SoundButtonTest";
import TaskApp from "./Components/TasksApp/TaskApp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <SoundButton />
      <TaskApp />
    </main>
  );
}
