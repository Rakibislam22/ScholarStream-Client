import React from "react";
import { motion } from "framer-motion";
import ScholarCard from "./ScholarCard";

const sampleScholarships = [
    {
        id: 1,
        title: "Global Merit Scholarship",
        short: "For international students with outstanding academic performance.",
        amount: "$5,000",
        deadline: "2026-02-15",
        url: "#"
    },
    {
        id: 2,
        title: "Women in STEM Fellowship",
        short: "Supporting women pursuing degrees in STEM fields.",
        amount: "$8,000",
        deadline: "2026-03-01",
        url: "#"
    },
    {
        id: 3,
        title: "Undergraduate Excellence Award",
        short: "For high achieving undergraduates from underrepresented regions.",
        amount: "$3,000",
        deadline: "2026-04-12",
        url: "#"
    },
    {
        id: 4,
        title: "Postgraduate Research Grant",
        short: "Funding for postgraduate research projects worldwide.",
        amount: "$12,000",
        deadline: "2026-01-30",
        url: "#"
    },
    {
        id: 5,
        title: "Creative Arts Scholarship",
        short: "For talented artists pursuing higher education in fine arts.",
        amount: "$4,500",
        deadline: "2026-05-07",
        url: "#"
    },
    {
        id: 6,
        title: "Tech Innovators Award",
        short: "For innovators building tech projects during their studies.",
        amount: "$6,000",
        deadline: "2026-06-20",
        url: "#"
    }
];

const listVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

export default function TopScholarships() {
    return (
        <section id="top-scholarships" className="bg-transparent">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Top Scholarships</h2>
                <a href="/scholarships" className="text-indigo-600">See all</a>
            </div>

            <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {sampleScholarships.map((s) => (
                    <motion.div key={s.id} variants={itemVariants}>
                        <ScholarCard scholarship={s} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}