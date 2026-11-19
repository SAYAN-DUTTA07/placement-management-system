import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Navbar() {

  return (

    <nav className="bg-blue-600 dark:bg-gray-900 p-4">

      <div className="flex justify-between items-center">

        <h1 className="text-white text-2xl font-bold">
          Placement Portal
        </h1>

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-white hover:text-gray-200"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-white hover:text-gray-200"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="text-white hover:text-gray-200"
          >
            Register
          </Link>

          <DarkModeToggle />

        </div>

      </div>

    </nav>

  );

}

export default Navbar;