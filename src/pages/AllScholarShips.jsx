import React, { use, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthContext";
import ServerError from "./ServerError";

export default function AllScholarships() {
  const axiosIn = useAxios();
  const navigate = useNavigate();
  const { theme } = use(AuthContext);

  const [scholarships, setScholarships] = useState([]);
  const [allScholarships, setAllScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await axiosIn.get("/scholarships", {
          params: {
            search,
            subject: subjectFilter,
            category: categoryFilter,
            country: locationFilter,
            sortBy,
            order,
            page,
            limit,
          },
        });

        setScholarships(res.data.data || []);
        setAllScholarships(prev => (prev.length ? prev : res.data.data));
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, subjectFilter, categoryFilter, locationFilter, sortBy, order, page]);

  const categories = useMemo(
    () =>
      [...new Set(
        allScholarships.map(s => s.scholarshipCategory).filter(Boolean)
      )],
    [allScholarships]
  );

  const subjectCategories = useMemo(
    () =>
      [...new Set(
        allScholarships.map(s => s.subjectCategory).filter(Boolean)
      )],
    [allScholarships]
  );

  const locations = useMemo(
    () =>
      [...new Set(
        allScholarships.map(s => s.universityCountry).filter(Boolean)
      )],
    [allScholarships]
  );

  if (error) return <ServerError></ServerError>;

  const inputBase =
    "px-4 py-2 rounded-lg focus:outline-none focus:ring-2";
  const borderColor =
    theme === "dark" ? "border-gray-700" : "border-blue-100";
  const bgColor =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white";
  const ringColor =
    theme === "dark" ? "ring-indigo-300" : "ring-blue-300";

  return (
    <div className="py-8 min-h-dvh">
      <h1 className="text-2xl font-semibold mb-6">
        All Scholarships
      </h1>

      {/* Filters & Sort */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="search"
          placeholder="Search by name, university, degree"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className={`${inputBase} w-full md:w-1/3 border ${borderColor} ${bgColor} ${ringColor}`}
        />

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(1);
          }}
          className={`${inputBase} border ${borderColor} ${bgColor} ${ringColor}`}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className={`${inputBase} border ${borderColor} ${bgColor} ${ringColor}`}
        >
          <option value="">All Subjects</option>
          {subjectCategories.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          value={locationFilter}
          onChange={(e) => {
            setLocationFilter(e.target.value);
            setPage(1);
          }}
          className={`${inputBase} border ${borderColor} ${bgColor} ${ringColor}`}
        >
          <option value="">All Countries</option>
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>

        <select
          value={`${sortBy}-${order}`}
          onChange={(e) => {
            const [s, o] = e.target.value.split("-");
            setSortBy(s);
            setOrder(o);
          }}
          className={`${inputBase} border ${borderColor} ${bgColor} ${ringColor}`}
        >
          <option value="date-desc">Newest</option>
          <option value="date-asc">Oldest</option>
          <option value="fee-asc">Fee: Low → High</option>
          <option value="fee-desc">Fee: High → Low</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setCategoryFilter("");
            setSubjectFilter("");
            setLocationFilter("");
            setPage(1);
          }}
          className={`btn text-xl text-red-500 rounded-full
            ${(locationFilter || subjectFilter || categoryFilter || search)
              ? "block"
              : "hidden"}`}
        >
          X
        </button>
      </div>

      {/* Cards */}
      {loading ? (
        <Loading />
      ) : scholarships.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-semibold">
            No scholarships found
          </p>
          <p className="text-sm mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {scholarships.map((s, i) => (
            <motion.div
              key={s._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`border rounded-lg overflow-hidden shadow-sm 
                ${borderColor}
                focus:outline-none focus:ring-2 ring-blue-300
                ${theme === "dark" ? " bg-gray-900" : " bg-white"}`}
            >
              <div className={`h-36 flex items-center justify-center ${theme==='dark'? "bg-gray-800":"bg-gray-40"}`}>
                <img
                  src={s.universityImage}
                  alt={s.universityName}
                  className="h-full object-contain"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">
                  {s.scholarshipName}
                </h3>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  {s.universityName}
                </p>

                <div className="flex flex-col max-sm:flex-row xl:flex-row justify-between items-center py-3">
                  <p className="text-sm">
                    <b>Category:</b> {s.scholarshipCategory}
                  </p>
                  <p className="text-sm">
                    <b>Country:</b> {s.universityCountry}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/scholarship/${s._id}`)}
                  className={`mt-3 w-full ${theme === "dark"
                            ? "bg-indigo-500 hover:bg-indigo-600"
                            : ""} bg-[#0303b8] hover:bg-[#000064] text-white py-2 rounded-3xl`}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8 my-10">
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => setPage(n + 1)}
            className={`btn btn-sm ${page === n + 1 ? "btn-primary" : "btn-outline"}`}
          >
            {n + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
