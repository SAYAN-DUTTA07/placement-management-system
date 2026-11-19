import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function RecruiterSidebar() {

    return (

        <div className="w-64 h-screen bg-gray-900 text-white p-5 dark:bg-black">

            <h2 className="text-2xl font-bold mb-8">
                Recruiter Panel
            </h2>

            <DarkModeToggle />

            <ul className="space-y-4 mt-6">

                <li>
                    <Link
                        to="/recruiter/dashboard"
                        className="hover:text-blue-400"
                    >
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link
                        to="/recruiter/company"
                        className="hover:text-blue-400"
                    >
                        Company
                    </Link>
                </li>

                <li>
                    <Link
                        to="/recruiter/jobs"
                        className="hover:text-blue-400"
                    >
                        My Jobs
                    </Link>
                </li>

                <li>
                    <Link
                        to="/recruiter/applicants"
                        className="hover:text-blue-400"
                    >
                        Applicants
                    </Link>
                </li>

            </ul>

        </div>

    );

}

export default RecruiterSidebar;