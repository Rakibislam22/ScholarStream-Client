import React, { use } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthContext";

const testimonials = [
    {
        id: 1,
        name: "Aisha Rahman",
        text: "ScholarStream helped me find a scholarship that covered my full tuition. The process was straightforward and the resources were reliable."
    },
    {
        id: 2,
        name: "David Kim",
        text: "I discovered multiple opportunities I didn't know existed. The deadline reminders were lifesavers."
    },
    {
        id: 3,
        name: "María González",
        text: "Great curation and clear details — I felt confident applying to scholarships I found here."
    }
];

export default function Testimonials() {
    const { theme } = use(AuthContext);

    return (
        <section
            aria-labelledby="testimonials-title"
            className={`
                rounded-2xl
                ${theme === "dark"
                    ? " text-gray-200"
                    : "bg-white text-gray-900"}
            `}
        >
            <h3
                id="testimonials-title"
                className="text-2xl font-bold mb-6"
            >
                Success Stories
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                    <motion.blockquote
                        key={t.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -4 }}
                        className={`
                            rounded-xl p-5 h-full
                            border shadow-sm transition
                            ${theme === "dark"
                                ? "bg-gray-800/70 border-gray-700"
                                : "bg-gray-50 border-gray-100"}
                        `}
                    >
                        <p
                            className={`
                                text-sm leading-relaxed
                                ${theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-700"}
                            `}
                        >
                            “{t.text}”
                        </p>

                        <footer
                            className={`
                                mt-4 text-sm font-semibold
                                ${theme === "dark"
                                    ? "text-gray-100"
                                    : "text-gray-900"}
                            `}
                        >
                            — {t.name}
                        </footer>
                    </motion.blockquote>
                ))}
            </div>
        </section>
    );
}
