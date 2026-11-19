import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">
        Admin
      </h1>

      <ul className="space-y-4">

        <li>
          <Link to="/admin/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/students">
            Students
          </Link>
        </li>

        <li>
          <Link to="/admin/recruiters">
            Recruiters
          </Link>
        </li>

        <li>
          <Link to="/admin/companies">
            Companies
          </Link>
        </li>

        <li>
          <Link to="/admin/jobs">
            Jobs
          </Link>
        </li>
        <li>
          <Link to="/admin/report">
            Placement Report
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default AdminSidebar;