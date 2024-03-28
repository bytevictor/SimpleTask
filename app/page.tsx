import Image from "next/image";
import { SoundButton } from "./Components/TasksApp/SoundButtonTest";
import TaskApp from "./Components/TasksApp/TaskApp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:pt-0 lg:p-24 md:p-0 pt-0">
      <TaskApp />
    </main>
  );
}
