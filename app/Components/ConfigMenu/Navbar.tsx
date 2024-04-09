import { LoginButton } from "../Auth/LoginButton";
import { CompletedTasksSwap } from "./CompletedTasksSwap";
import ConfigMenu from "./ConfigMenu";

export default function MainNavbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start pl-2 pt-2">
        <CompletedTasksSwap />
      </div>
      <div className="navbar-end pr-2 pt-2">
        <LoginButton />
        <ConfigMenu />
      </div>
    </div>
  );
}
