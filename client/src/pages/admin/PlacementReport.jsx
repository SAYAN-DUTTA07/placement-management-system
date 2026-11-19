import { useEffect, useState } from "react";
import API from "../../services/api";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function PlacementReport() {

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {

    try {

      const res = await API.get("/admin/placement-report");

      setReports(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const filteredReports = reports.filter((item) => {

    const student =
      item.student?.user?.name?.toLowerCase() || "";

    const company =
      item.job?.company?.companyName?.toLowerCase() || "";

    return (
      student.includes(search.toLowerCase()) ||
      company.includes(search.toLowerCase())
    );

  });

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Placement Report", 14, 20);

    autoTable(doc, {

      startY: 30,

      head: [[
        "Student",
        "Email",
        "Department",
        "Company",
        "Job Role",
        "Status"
      ]],

      body: filteredReports.map((item) => [

        item.student?.user?.name,

        item.student?.user?.email,

        item.student?.department,

        item.job?.company?.companyName,

        item.job?.role,

        item.status

      ])

    });

    doc.save("Placement_Report.pdf");

  };

  const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(

      filteredReports.map((item) => ({

        Student: item.student?.user?.name,

        Email: item.student?.user?.email,

        Department: item.student?.department,

        Company: item.job?.company?.companyName,

        Role: item.job?.role,

        Status: item.status

      }))

    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Placement Report"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });

    const data = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    );

    saveAs(data, "Placement_Report.xlsx");

  };

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Placement Report
        </h1>

        <div className="space-x-3">

          <button
            onClick={exportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Export PDF
          </button>

          <button
            onClick={exportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export Excel
          </button>

        </div>

      </div>

      <input
        type="text"
        placeholder="Search Student or Company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded w-full mb-6"
      />

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-3">Student</th>

              <th>Email</th>

              <th>Department</th>

              <th>Company</th>

              <th>Role</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredReports.map((item) => (

                <tr
                  key={item._id}
                  className="border-b text-center"
                >

                  <td className="p-3">
                    {item.student?.user?.name}
                  </td>

                  <td>
                    {item.student?.user?.email}
                  </td>

                  <td>
                    {item.student?.department}
                  </td>

                  <td>
                    {item.job?.company?.companyName}
                  </td>

                  <td>
                    {item.job?.role}
                  </td>

                  <td className="font-bold text-green-600">
                    {item.status}
                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default PlacementReport;