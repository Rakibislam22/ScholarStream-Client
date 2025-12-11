import React from "react";
import { motion } from "framer-motion";

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
    return (
        <section aria-labelledby="testimonials-title" className="bg-white rounded-xl p-6 shadow">
            <h3 id="testimonials-title" className="text-xl font-bold mb-4">Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {testimonials.map((t, i) => (
                    <motion.blockquote
                        key={t.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-gray-50 p-4 rounded-md"
                    >
                        <p className="text-sm text-gray-700">"{t.text}"</p>
                        <footer className="mt-3 text-sm font-medium text-gray-900">— {t.name}</footer>
                    </motion.blockquote>
                ))}
            </div>
        </section>
    );
}