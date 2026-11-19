import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div>

        <Navbar />

        <div className="flex flex-col justify-center items-center min-h-[85vh] gap-6">

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white text-center max-w-6xl">
            College Placement Management System
          </h1>

          <p className="mt-8 mb-10 text-2xl text-gray-600 dark:text-gray-300">
            Connecting Students with Recruiters
          </p>

          <div className="mt-12 flex gap-10">

            <button className="bg-blue-600 hover:bg-blue-700 text-white w-40 h-8 px-8 py-4 rounded-full font-semibold shadow-lg">
              Student
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white w-40 h-8 px-8 py-4 rounded-full font-semibold shadow-lg">
              Recruiter
            </button>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default Home;