import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";

const stats = [
    { value: "2,000+", label: "Scholarships Listed" },
    { value: "50+", label: "Countries Covered" },
    { value: "1,200+", label: "Successful Applicants" },
    { value: "300+", label: "Partner Universities" },
];

export default function Statistics() {
    const { theme } = use(AuthContext);

    return (
        <section
            className={`rounded-2xl p-10 my-16 text-center
      ${theme === "dark"
                    ? "bg-gray-900/80 text-gray-200"
                    : "bg-gray-50 text-gray-800"}
    `}
        >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((s) => (
                    <div key={s.label}>
                        <p className="text-3xl font-bold">{s.value}</p>
                        <p className="text-sm mt-1 opacity-80">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
