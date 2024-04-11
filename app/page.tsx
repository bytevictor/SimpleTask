import dynamic from "next/dynamic";
import { ConfigContextProvider } from "./_lib/contexts/ConfigContext";
import MainNavbar from "./Components/ConfigMenu/Navbar";
import { NextAuthProvider } from "./_lib/auth/AuthProvider";

//Using this just to be able to use localStorage is probably against the Geneva convention
//but if I spend any more hours trying to figure out how to use localStorage
//in Next.js with a useReducer hook I will kill myself
const TaskAppNoSSR = dynamic(() => import("./Components/TasksApp/TasksTab"), {
  ssr: false,
});

export default function Home() {
  return (
    <ConfigContextProvider>
      <NextAuthProvider>
        <MainNavbar />
        <TaskAppNoSSR />
      </NextAuthProvider>
    </ConfigContextProvider>
  );
}
