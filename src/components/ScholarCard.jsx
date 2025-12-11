import React from "react";
import { motion } from "framer-motion";

export default function ScholarCard({ scholarship }) {
    return (
        <motion.article
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-lg shadow p-5 flex flex-col justify-between"
        >
            <div>
                <h3 className="text-lg font-semibold">{scholarship.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{scholarship.short}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    <div>Amount: <span className="font-medium">{scholarship.amount}</span></div>
                    <div className="text-sm text-gray-500">Deadline: {scholarship.deadline}</div>
                </div>

                <a
                    href={scholarship.url || "#"}
                    className="ml-4 inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md text-sm"
                >
                    View Details
                </a>
            </div>
        </motion.article>
    );
}