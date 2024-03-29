import dynamic from "next/dynamic";


//Using this just to be able to use localStorage is probably against the Geneva convention
//but if I spend any more hours trying to figure out how to use localStorage
//in Next.js with a useReducer hook I will kill myself
const TaskAppNoSSR = dynamic(() => import("./Components/TasksApp/TaskApp"), {
  ssr: false,
});


export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center lg:pt-0 lg:p-24 md:p-0 pt-0">
        <TaskAppNoSSR />
    </main>
  );
}
