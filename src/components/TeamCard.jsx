import React from "react";
import { motion } from "framer-motion";

/**
 * Simple team card.
 * member: { name, role, bio, avatar }
 */
export default function TeamCard({ member }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-white p-5 rounded-lg shadow flex flex-col items-start gap-4"
        >
            <div className="flex items-center gap-4 w-full">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium text-gray-700">
                    {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full object-cover" />
                    ) : (
                        member.name.split(" ").map(n => n[0]).slice(0, 2).join("")
                    )}
                </div>

                <div className="flex-1">
                    <h4 className="text-lg font-semibold">{member.name}</h4>
                    <p className="text-sm text-indigo-600">{member.role}</p>
                </div>
            </div>

            <p className="text-sm text-gray-600">{member.bio}</p>

            <div className="mt-auto w-full flex justify-end">
                <a href="#" className="text-sm text-indigo-600">View profile</a>
            </div>
        </motion.article>
    );
}