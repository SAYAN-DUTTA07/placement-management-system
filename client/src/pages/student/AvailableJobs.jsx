import { useEffect, useState } from "react";
import API from "../../services/api";

function AvailableJobs() {

    const [jobs, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {

        fetchJobs();
        fetchApplications();

    }, []);

    const fetchJobs = async () => {

        try {

            const res = await API.get("/jobs");

            console.log(res.data.jobs);

            setJobs(res.data.jobs);

        }

        catch (err) {

            console.log(err);

        }

    };

    const fetchApplications = async () => {

        try {

            console.log("Calling API...");

            const res = await API.get("/application/myapplications");

            console.log("API Success");
            console.log(res);

            console.log(res.data);

            console.log("Response =", res.data);

            if (Array.isArray(res.data)) {
                setAppliedJobs(
                    res.data
                        .filter(app => app.job)
                        .map(app => app.job._id)
                );
            } else {
                console.log("Not an array");
            }

        } catch (err) {

            console.log("API Failed");

            console.log(err);
            //console.log(err.response?.data);

        }

    };

    const applyJob = async (jobId) => {

        try {

            await API.post("/application", {

                job: jobId

            });

            alert("Applied Successfully");

            fetchApplications();

        } catch (err) {

            alert(err.response?.data?.message || "Failed to Apply");

        }

    };

    return (

        <div className="p-8">

            <h1 className="text-4xl font-bold mb-8">

                Available Jobs

            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {

                    jobs.map((job) => (

                        <div
                            key={job._id}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                        >

                            <h2 className="text-2xl font-bold">

                                {job.role}

                            </h2>

                            <p className="text-blue-600 mt-2">

                                {job.company?.companyName}

                            </p>

                            <p className="mt-3">

                                {job.description}

                            </p>

                            <div className="mt-4 space-y-2">

                                <p>
                                    <strong>Package:</strong>{" "}
                                    ₹{job.company?.packageOffered?.toLocaleString()}
                                </p>

                                <p>
                                    <strong>Minimum CGPA:</strong>{" "}
                                    {job.minCGPA}
                                </p>

                                <p>
                                    <strong>Branches:</strong>{" "}
                                    {job.branches?.length ? job.branches.join(", ") : "N/A"}
                                </p>

                                <p>
                                    <strong>Deadline:</strong>{" "}
                                    {job.deadline
                                        ? new Date(job.deadline).toLocaleDateString()
                                        : "N/A"}
                                </p>

                            </div>

                            <button
                                onClick={() => applyJob(job._id)}
                                disabled={appliedJobs.includes(job._id)}
                                className={`mt-6 w-full py-3 rounded-lg text-white ${appliedJobs.includes(job._id)
                                    ? "bg-green-600 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {appliedJobs.includes(job._id)
                                    ? "Applied ✓"
                                    : "Apply Now"}
                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

    return (
        <div>
            <h1>Available Jobs</h1>
            <pre>{JSON.stringify(jobs, null, 2)}</pre>
        </div>
    );

}

export default AvailableJobs;