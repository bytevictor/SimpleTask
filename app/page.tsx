import Image from "next/image";
import { SoundButton } from "./Components/SoundButtonTest";
import { TaskList } from "./Components/TaskList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SoundButton />
      <TaskList/>
    </main>
  );
}
