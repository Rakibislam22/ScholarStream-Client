import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScholarCard from "./ScholarCard";
import useAxios from "../hooks/useAxios";

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
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTopScholarships = async () => {
            try {
                // change sort=recent if needed
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
        return <p className="py-10 text-center">Loading top scholarships...</p>;
    }

    return (
        <section id="top-scholarships" className="bg-transparent">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Top Scholarships</h2>
                <a href="/scholarships" className="text-indigo-600">
                    See all
                </a>
            </div>

            <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {scholarships.map((s) => (
                    <motion.div key={s._id} variants={itemVariants}>
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
