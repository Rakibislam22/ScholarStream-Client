import React, { use } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthContext";

export default function ScholarCard({ scholarship }) {
    const { theme } = use(AuthContext);

    return (
        <motion.article
            whileHover={{ scale: 1.04, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`
                rounded-xl p-5 flex flex-col justify-between h-full
                border shadow-sm
                ${theme === "dark"
                    ? "bg-gray-900/70 border-gray-700 text-gray-200"
                    : "bg-white border-gray-100 text-gray-900"
                }
            `}
        >
            {/* Top */}
            <div>
                <h3 className="text-lg font-semibold leading-snug">
                    {scholarship.title}
                </h3>

                <p
                    className={`text-sm mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                >
                    {scholarship.short}
                </p>
            </div>

            {/* Bottom */}
            <div className="mt-5 flex items-center justify-between gap-4">
                <div className="text-sm">
                    <div>
                        Amount:{" "}
                        <span className="font-medium">
                            {scholarship.amount}
                        </span>
                    </div>
                    <div
                        className={`text-xs mt-1 ${theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                    >
                        Deadline: {scholarship.deadline}
                    </div>
                </div>

                <a
                    href={scholarship.url || "#"}
                    className={`
                        inline-flex items-center justify-center
                        px-4 py-2 rounded-full text-sm font-medium
                        transition-all
                        ${theme === "dark"
                            ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }
                    `}
                >
                    View Details
                </a>
            </div>
        </motion.article>
    );
}
