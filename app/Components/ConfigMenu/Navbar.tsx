import { CompletedTasksSwap } from "./CompletedTasksSwap";
import ConfigMenu from "./ConfigMenu";

export default function MainNavbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <CompletedTasksSwap />
      </div>
      <div className="navbar-end">
        <ConfigMenu />
      </div>
    </div>
  );
}
