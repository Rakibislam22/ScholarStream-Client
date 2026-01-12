import React, { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import ScholarCard from "./ScholarCard";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../provider/AuthContext";

const listVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

export default function TopScholarships() {
    const axiosIn = useAxios();
    const { theme } = use(AuthContext);

    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTopScholarships = async () => {
            try {
                const res = await axiosIn.get("/top-scholarships?sort=fee");
                setScholarships(res.data || []);
            } catch (err) {
                console.error("Failed to load top scholarships", err);
            } finally {
                setLoading(false);
            }
        };

        loadTopScholarships();
    }, [axiosIn]);

    if (loading) {
        return (
            <p
                className={`py-14 text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
            >
                Loading top scholarships...
            </p>
        );
    }

    return (
        <section
            id="top-scholarships"
            className={`rounded-2xl p-6 sm:p-8 ${theme === "dark"
                    ? "bg-gray-900/60"
                    : "bg-gray-50"
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2
                    className={`text-2xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-900"
                        }`}
                >
                    Top Scholarships
                </h2>

                <a
                    href="/scholarships"
                    className={`text-sm font-medium transition ${theme === "dark"
                            ? "text-indigo-400 hover:text-indigo-300"
                            : "text-indigo-600 hover:text-indigo-700"
                        }`}
                >
                    See all →
                </a>
            </div>

            {/* Cards */}
            <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {scholarships.map((s) => (
                    <motion.div
                        key={s._id}
                        variants={itemVariants}
                        className="h-full"
                    >
                        <ScholarCard
                            scholarship={{
                                id: s._id,
                                title: s.scholarshipName,
                                short: s.subjectCategory,
                                amount: `$${s.applicationFees}`,
                                deadline: s.applicationDeadline,
                                url: `/scholarship/${s._id}`,
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
