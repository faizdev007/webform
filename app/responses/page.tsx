"use client";

import { useState } from "react";
import ExcelJS from "exceljs";
import { Loader2, ArrowLeft, ArrowRight, FileDown } from "lucide-react";
import { saveAs } from "file-saver"; // ✅ correct import for TS

// Sample MongoDB-style data
const sampleData = [
  {
    _id: "64f1a1",
    name: "Amit Sharma",
    relation: "Friend",
    otherRelation: "",
    title: "College Memories",
    message: "We had the best time during our college trips!",
    file: "photo1.jpg",
    wishes: "Stay happy always!",
  },
  {
    _id: "64f1a2",
    name: "Neha Verma",
    relation: "Colleague",
    otherRelation: "",
    title: "Office Fun",
    message: "Loved our project days together!",
    file: "photo2.png",
    wishes: "Best wishes!",
  },
  // ... rest of sampleData
];

export default function AdminResponses() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentResponse = sampleData[currentIndex];

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % sampleData.length);
      setLoading(false);
    }, 600);
  };

  const handlePrev = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + sampleData.length) % sampleData.length);
      setLoading(false);
    }, 600);
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Responses");

    // Add header row
    worksheet.columns = [
      { header: "ID", key: "_id", width: 15 },
      { header: "Name", key: "name", width: 20 },
      { header: "Relation", key: "relation", width: 15 },
      { header: "Other Relation", key: "otherRelation", width: 20 },
      { header: "Title", key: "title", width: 25 },
      { header: "Message", key: "message", width: 40 },
      { header: "File", key: "file", width: 20 },
      { header: "Wishes", key: "wishes", width: 30 },
    ];

    // Add data rows
    sampleData.forEach((item) => {
      worksheet.addRow(item);
    });

    // Export to Blob
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "responses.xlsx"); // ✅ correct usage
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-800 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative">
            {loading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            </div>
            ) : (
            <div>
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                🎉 Response Viewer
                </h2>

                {/* Info Section */}
                <div className="grid grid-cols-1 gap-4 text-base">
                <div className="p-4 rounded-lg bg-gray-100">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold">{currentResponse.name}</p>
                </div>

                <div className="p-4 rounded-lg bg-gray-100">
                    <p className="text-sm text-gray-500">Relation</p>
                    <p className="font-semibold">
                    {currentResponse.relation}
                    {currentResponse.otherRelation && (
                        <span className="ml-2 text-sm text-gray-600">
                        ({currentResponse.otherRelation})
                        </span>
                    )}
                    </p>
                </div>

                <div className="p-4 rounded-lg bg-gray-100">
                    <p className="text-sm text-gray-500">Title</p>
                    <p className="font-semibold">{currentResponse.title}</p>
                </div>

                <div className="p-4 rounded-lg bg-gray-100">
                    <p className="text-sm text-gray-500">Message</p>
                    <p className="font-medium leading-relaxed">
                    {currentResponse.message}
                    </p>
                </div>

                <div className="p-4 rounded-lg bg-gray-100">
                    <p className="text-sm text-gray-500">File</p>
                    {currentResponse.file ? (
                    <a
                        href={`/${currentResponse.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        {currentResponse.file}
                    </a>
                    ) : (
                    <p className="italic text-gray-400">No file uploaded</p>
                    )}
                </div>

                <div className="p-4 rounded-lg bg-gray-100">
                    <p className="text-sm text-gray-500">Wishes</p>
                    <p className="font-semibold text-green-700">
                    {currentResponse.wishes}
                    </p>
                </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between items-center mt-8">
                <button
                    onClick={handlePrev}
                    className="flex items-center gap-2 px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition"
                >
                    <ArrowLeft size={18} /> Prev
                </button>

                <span className="text-gray-500 text-sm">
                    {currentIndex + 1} / {sampleData.length}
                </span>

                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition"
                >
                    Next <ArrowRight size={18} />
                </button>
                </div>

                {/* Export button */}
                <div className="flex justify-center mt-6">
                <button
                    onClick={exportToExcel}
                    className="flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold shadow-md transition"
                >
                    <FileDown size={20} /> Export All to Excel
                </button>
                </div>
            </div>
            )}
        </div>
        </div>
  );
}
