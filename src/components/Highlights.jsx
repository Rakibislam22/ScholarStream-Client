import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";

const highlights = [
    {
        title: "Verified Scholarships",
        desc: "Carefully curated and verified opportunities.",
    },
    {
        title: "Accurate Deadlines",
        desc: "We keep deadlines updated and reliable.",
    },
    {
        title: "Global Coverage",
        desc: "Scholarships from 50+ countries.",
    },
    {
        title: "Easy Search & Filter",
        desc: "Find what matches you in seconds.",
    },
];

export default function Highlights() {
    const { theme } = use(AuthContext);

    return (
        <section className="my-16">
            <h2
                className={`text-2xl font-bold mb-8 ${theme === "dark" ? "text-gray-100" : "text-gray-900"
                    }`}
            >
                Why Choose ScholarStream
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {highlights.map((h) => (
                    <div
                        key={h.title}
                        className={`
              rounded-xl p-6 transition
              ${theme === "dark"
                                ? "bg-gray-900/70 text-gray-300 border border-gray-700"
                                : "bg-white text-gray-700 shadow-sm"}
            `}
                    >
                        <h3 className="font-semibold text-lg mb-2">{h.title}</h3>
                        <p className="text-sm">{h.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
