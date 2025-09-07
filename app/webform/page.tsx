"use client";

import Image from "next/image";
import { useState } from "react";

export default function AnniversaryForm() {

  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    otherRelation: "",
    title: "",
    message: "",
    file: null as File | null,
    wishes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.relation.trim()) newErrors.relation = "Please select relation.";
    if (formData.relation === "Other" && !formData.otherRelation.trim()) {
      newErrors.otherRelation = "Please specify your relation.";
    }
    if (!formData.title.trim()) newErrors.title = "Please enter a memory title.";
    if (!formData.message.trim()) newErrors.message = "Please enter your memory/message.";
    if (!formData.file) newErrors.file = "Please upload a photo or video.";
    if (!formData.wishes.trim()) newErrors.wishes = "Please enter your wishes.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // ✅ Prepare relation field
    const finalRelation =
      formData.relation === "Other" ? formData.otherRelation : formData.relation;

    // ✅ Here you can handle sending data (API, DB, Email, etc.)
    console.log("Form submitted:", { ...formData, relation: finalRelation });

    alert("🎉 Thank you for your submission!");

    
    setFormData({
      name: "",
      relation: "",
      otherRelation: "",
      title: "",
      message: "",
      file: null,
      wishes: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/60 shadow-lg rounded-2xl max-w-2xl w-full p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            🎉 Celebrating 25 Years of Tolerating Each Other! 🎉
          </h2>
          <div className="aspect-video w-full mx-auto my-4">
            <Image src="/couplePic.webp" alt="Anniversary" width={400} height={400} className="mx-auto object-fill my-4" />
          </div>
          <p className="text-gray-700 mt-2">
            A quarter-century of love, laughter, and pretending to listen — help us
            make it memorable. Kindly fill out this form faster than they decided what
            to wear on their first date 😉
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-700">
              Your Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Relation */}
          <div>
            <label htmlFor="relation" className="block font-semibold text-gray-700">
              Relation with Couple *
            </label>
            <select
              id="relation"
              value={formData.relation}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select...</option>
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Colleague">Colleague</option>
              <option value="Other">Other</option>
            </select>
            {errors.relation && <p className="text-red-500 text-sm">{errors.relation}</p>}
          </div>

          {/* Other Relation (conditional) */}
          {formData.relation === "Other" && (
            <div>
              <label htmlFor="otherRelation" className="block font-semibold text-gray-700">
                Please Specify *
              </label>
              <input
                id="otherRelation"
                type="text"
                value={formData.otherRelation}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.otherRelation && (
                <p className="text-red-500 text-sm">{errors.otherRelation}</p>
              )}
            </div>
          )}

          {/* Memory Title */}
          <div>
            <label htmlFor="title" className="block font-semibold text-gray-700">
              Memory Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block font-semibold text-gray-700">
              Your Memory / Message *
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          {/* Upload */}
          <div>
            <label htmlFor="file" className="block font-semibold text-gray-700">
              Upload a Photo or Video *
            </label>
            <input
              id="file"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
            {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
          </div>

          {/* Wishes */}
          <div>
            <label htmlFor="wishes" className="block font-semibold text-gray-700">
              Best Wishes for the Future *
            </label>
            <textarea
              id="wishes"
              rows={2}
              value={formData.wishes}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.wishes && <p className="text-red-500 text-sm">{errors.wishes}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold w-full hover:bg-pink-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
