import React, { use } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthContext";

/**
 * Team card
 * member: { name, role, bio, avatar }
 */
export default function TeamCard({ member }) {
    const { theme } = use(AuthContext);

    return (
        <motion.article
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.45 }}
            className={`
                rounded-xl p-5 flex flex-col gap-4 h-full
                border shadow-sm transition
                ${theme === "dark"
                    ? "bg-gray-900/70 border-gray-700 text-gray-200"
                    : "bg-white border-gray-100 text-gray-900"}
            `}
        >
            {/* Header */}
            <div className="flex items-center gap-4 w-full">
                <div
                    className={`
                        w-14 h-14 rounded-full flex items-center justify-center
                        font-semibold text-lg
                        ${theme === "dark"
                            ? "bg-gray-800 text-gray-200"
                            : "bg-gray-200 text-gray-700"}
                    `}
                >
                    {member.avatar ? (
                        <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-14 h-14 rounded-full object-cover"
                        />
                    ) : (
                        member.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                    )}
                </div>

                <div className="flex-1">
                    <h4 className="text-lg font-semibold leading-tight">
                        {member.name}
                    </h4>
                    <p
                        className={`text-sm font-medium ${theme === "dark"
                                ? "text-indigo-400"
                                : "text-indigo-600"
                            }`}
                    >
                        {member.role}
                    </p>
                </div>
            </div>

            {/* Bio */}
            <p
                className={`text-sm leading-relaxed ${theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
            >
                {member.bio}
            </p>

        </motion.article>
    );
}
