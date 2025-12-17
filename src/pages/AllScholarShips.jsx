import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";


export default function AllScholarships() {
  const axiosIn = useAxios()
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await axiosIn.get('/scholarships');
        setScholarships(res.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // 🔹 dropdown values
  const categories = useMemo(
    () =>
      [...new Set(scholarships.map((s) => s.scholarshipCategory).filter(Boolean))],
    [scholarships]
  );

  const subjectCategories = useMemo(
    () =>
      [...new Set(scholarships.map((s) => s.subjectCategory).filter(Boolean))],
    [scholarships]
  );

  const locations = useMemo(
    () =>
      [...new Set(scholarships.map((s) => s.universityCountry).filter(Boolean))],
    [scholarships]
  );

  // 🔹 frontend filter (backend data)
  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return scholarships.filter((s) => {
      if (categoryFilter && s.scholarshipCategory !== categoryFilter) return false;
      if (subjectFilter && s.subjectCategory !== subjectFilter) return false;
      if (locationFilter && s.universityCountry !== locationFilter) return false;

      if (!q) return true;

      return (
        s.scholarshipName?.toLowerCase().includes(q) ||
        s.universityName?.toLowerCase().includes(q) ||
        s.degree?.toLowerCase().includes(q)
      );
    });
  }, [scholarships, search, categoryFilter, subjectFilter, locationFilter]);

  if (loading) return <p>Loading scholarships…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="py-8 min-h-dvh">
      <h1 className="text-2xl font-semibold mb-6">All Scholarships</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="search"
          placeholder="Search by name, university, degree"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-blue-100 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 ring-blue-300"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 ring-blue-300"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-3 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 ring-blue-300"
        >
          <option value="">All Subjects</option>
          {subjectCategories.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-3 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 ring-blue-300"
        >
          <option value="">All Countries</option>
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearch("");
            setCategoryFilter("");
            setSubjectFilter("");
            setLocationFilter("");
          }}
          className={`btn text-xl text-red-500 rounded-full 
          ${(locationFilter || subjectFilter || categoryFilter || search) ?
              "block" : "hidden"}`
          }
        >
          X
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((s) => (
          <div
            key={s._id}
            className="border border-blue-100  rounded-lg overflow-hidden shadow-sm focus:outline-none focus:ring-2 ring-blue-300"
          >
            <div className="h-36 flex items-center justify-center bg-gray-50">
              <img
                src={s.universityImage}
                alt={s.universityName}
                className="h-full object-contain"
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg">{s.scholarshipName}</h3>
              <p className="text-lg text-gray-500">{s.universityName}</p>

              <div className="flex flex-col max-sm:flex-row xl:flex-row  justify-between items-center py-3">
                <p className="text-sm">
                  <b>Category:</b> {s.scholarshipCategory}
                </p>
                <p className="text-sm">
                  <b>Country:</b> {s.universityCountry}
                </p>
              </div>


              <button
                onClick={() => navigate(`/scholarship/${s._id}`)}
                className="mt-3 w-full bg-[#0303b8] hover:bg-[#000064] text-white py-2 rounded-3xl"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

