import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white p-6 overflow-y-auto shadow-lg">

      <h2 className="text-3xl font-bold text-black dark:text-white">
        Dashboard
      </h2>

      <div className="mb-8">
        <DarkModeToggle />
      </div>

      <nav>
        <ul className="space-y-4 text-xl">

          <li>
            <Link to="/student/dashboard" className="block hover:text-blue-400">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/student/profile" className="block hover:text-blue-400">
              Profile
            </Link>
          </li>

          <li>
            <Link to="/student/jobs" className="block hover:text-blue-400">
              Available Jobs
            </Link>
          </li>

          <li>
            <Link to="/student/applied" className="block hover:text-blue-400">
              Applied Jobs
            </Link>
          </li>

          <li>
            <Link to="/student/resume" className="block hover:text-blue-400">
              Resume
            </Link>
          </li>

          <li>
            <Link to="/student/status" className="block hover:text-blue-400">
              Application Status
            </Link>
          </li>

          <li>
            <Link to="/student/interviews" className="block hover:text-blue-400">
              Interviews
            </Link>
          </li>

          <li>
            <Link to="/recruiter/interviews" className="block hover:text-blue-400">
              Manage Interviews
            </Link>
          </li>

        </ul>
      </nav>

    </aside>
  );
}

export default Sidebar;