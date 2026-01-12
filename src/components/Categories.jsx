import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";

const categories = [
    { title: "Engineering", icon: "🛠️" },
    { title: "Business", icon: "💼" },
    { title: "Computer Science", icon: "💻" },
    { title: "Medical & Health", icon: "🩺" },
    { title: "Arts & Humanities", icon: "🎨" },
    { title: "Social Science", icon: "🌍" },
];

export default function Categories() {
    const { theme } = use(AuthContext);

    return (
        <section className="my-14">
            <h2
                className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-gray-100" : "text-gray-900"
                    }`}
            >
                Browse by Category
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {categories.map((c) => (
                    <div
                        key={c.title}
                        className={`
              rounded-xl p-5 text-center cursor-pointer transition
              ${theme === "dark"
                                ? "bg-gray-800/70 text-gray-200 hover:bg-gray-700"
                                : "bg-gray-50 text-gray-800 hover:bg-white shadow-sm"}
            `}
                    >
                        <div className="text-3xl mb-2">{c.icon}</div>
                        <p className="text-sm font-semibold">{c.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
