import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard" },
    { name: "Profile", path: "/student/profile" },
    { name: "Available Jobs", path: "/student/jobs" },
    { name: "Applied Jobs", path: "/student/applied" },
    { name: "Resume", path: "/student/resume" },
    { name: "Application Status", path: "/student/status" },
    { name: "Interviews", path: "/student/interviews" },
    { name: "Manage Interviews", path: "/student/manage-interviews" }, // change if needed
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white shadow-xl p-6 overflow-y-auto">

      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="mb-8">
        <DarkModeToggle />
      </div>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block rounded-lg px-4 py-3 transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 hover:text-blue-400"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  );
}

export default Sidebar;