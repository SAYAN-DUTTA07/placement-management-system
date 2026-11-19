import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/Dashboard";
import Profile from "./pages/student/Profile";
import Jobs from "./pages/student/Jobs";
import AppliedJobs from "./pages/student/AppliedJobs";
import Resume from "./pages/student/Resume";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Company from "./pages/recruiter/Company";
import CreateJob from "./pages/recruiter/CreateJob";
import MyJobs from "./pages/recruiter/MyJobs";
import Applications from "./pages/recruiter/Applications";
import EditJob from "./pages/recruiter/EditJob";
import Applicants from "./pages/recruiter/Applicants";
import ApplicationStatus from "./pages/student/ApplicationStatus";
import Notifications from "./pages/student/Notifications";
import MyInterviews from "./pages/student/MyInterviews";
import PlacementReport from "./pages/admin/PlacementReport";
import ManageInterviews from "./pages/recruiter/ManageInterviews";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/jobs"
          element={
            <ProtectedRoute role="student">
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/applied"
          element={
            <ProtectedRoute role="student">
              <AppliedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/resume"
          element={
            <ProtectedRoute role="student">
              <Resume />
            </ProtectedRoute>
          }
        />


        {/* Recruiter Routes */}
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />


        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/company"
          element={
            <ProtectedRoute role="recruiter">
              <Company />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/create-job"
          element={
            <ProtectedRoute role="recruiter">
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/my-jobs"
          element={
            <ProtectedRoute role="recruiter">
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/applications"
          element={
            <ProtectedRoute role="recruiter">
              <Applications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/edit-job/:id"
          element={
            <ProtectedRoute role="recruiter">
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/applicants/:jobId"
          element={
            <ProtectedRoute role="recruiter">
              <Applicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/status"
          element={
            <ProtectedRoute role="student">
              <ApplicationStatus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/notifications"
          element={
            <ProtectedRoute role="student">
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/interviews"
          element={
            <ProtectedRoute role="student">
              <MyInterviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/report"
          element={
            <ProtectedRoute role="admin">
              <PlacementReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/interviews"
          element={
            <ProtectedRoute role="recruiter">
              <ManageInterviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;