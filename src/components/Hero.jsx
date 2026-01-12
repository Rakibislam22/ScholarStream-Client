import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";

const slides = [
    {
        title: "Find scholarships that match your future",
        desc:
            "Discover verified scholarships from around the world — search by eligibility, deadline, or field of study and apply.",
        tags: ["Engineering", "Business", "Full Fund", "Masters"],
    },
    {
        title: "Study abroad with confidence",
        desc:
            "Explore thousands of opportunities from top universities worldwide with transparent deadlines and requirements.",
        tags: ["USA", "UK", "Canada", "Australia"],
    },
    {
        title: "Your academic journey starts here",
        desc:
            "Personalized recommendations, trusted sources, and easy applications — all in one platform.",
        tags: ["PhD", "Undergraduate", "Scholarships", "Verified"],
    },
];

export default function Hero() {
    const navigate = useNavigate();
    const { theme } = useContext(AuthContext);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative my-10">
            {/* Glow */}
            <div
                className={`absolute inset-0 rounded-3xl blur-2xl opacity-30
        ${theme === "dark"
                        ? "bg-gradient-to-r from-indigo-700 to-sky-700"
                        : "bg-gradient-to-r from-indigo-400 to-sky-400"
                    }`}
            />

            <header
                className={`relative rounded-3xl overflow-hidden
        ${theme === "dark"
                        ? "bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 text-gray-100"
                        : "bg-gradient-to-r from-indigo-600 to-sky-500 text-white"
                    }`}
            >
                <div className="max-w-6xl mx-auto px-4 py-20 sm:py-28 lg:py-36">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* LEFT */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -25 }}
                                transition={{ duration: 0.6 }}
                                className="text-center md:text-left"
                            >
                                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                                    {slides[index].title}
                                </h1>

                                <p
                                    className={`mt-4 text-lg sm:text-xl max-w-2xl mx-auto md:mx-0
                  ${theme === "dark" ? "text-gray-300" : "text-white/90"}`}
                                >
                                    {slides[index].desc}
                                </p>

                                {/* CTA */}
                                <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate("/scholarships")}
                                        className={`rounded-3xl px-6 py-3 font-semibold shadow-lg transition
                    ${theme === "dark"
                                                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                                                : "bg-white text-indigo-700"
                                            }`}
                                    >
                                        Search Scholarships
                                    </motion.button>

                                    <a
                                        href="#top-scholarships"
                                        className={`rounded-3xl px-6 py-3 font-medium transition backdrop-blur
                    ${theme === "dark"
                                                ? "bg-white/10 hover:bg-white/20"
                                                : "bg-white/20 hover:bg-white/30"
                                            }`}
                                    >
                                        Browse Top Scholarships
                                    </a>
                                </div>

                                {/* Tags */}
                                <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-3 text-sm">
                                    {slides[index].tags.map((t) => (
                                        <span
                                            key={t}
                                            className={`px-3 py-1 rounded-full
                      ${theme === "dark"
                                                    ? "bg-white/10 text-gray-200"
                                                    : "bg-white/20 text-white"
                                                }`}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* RIGHT VISUAL */}
                        <motion.div
                            className="hidden md:block"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div
                                className={`rounded-xl p-6 shadow-lg backdrop-blur
                ${theme === "dark"
                                        ? "bg-white/5 border border-white/10"
                                        : "bg-white/10"
                                    }`}
                            >
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="animate-pulse h-28 rounded-xl bg-white/20 backdrop-blur p-4 flex flex-col justify-center gap-3">
                                        <p className="font-semibold">Full Fund</p>
                                        <span className="text-2xl opacity-70">120+ Available</span>
                                    </div>

                                    <div className="animate-[bounce_4s_ease-in-out_infinite] [@keyframes_float]:{
              0%,30%{transform:translateY(0)}
              20%{transform:translateY(-5%)}
            } h-28 rounded-xl bg-white/20 backdrop-blur p-4 flex flex-col justify-center gap-3">
                                        <p className="font-semibold">Masters</p>
                                        <span className="text-2xl opacity-70">80+ Programs</span>
                                    </div>

                                    <div className="h-28 rounded-xl bg-white/20 backdrop-blur p-4 flex flex-col justify-center gap-3">
                                        <p className="font-semibold">Engineering</p>
                                        <span className="text-2xl opacity-70">60+ Fields</span>
                                    </div>

                                    <div className="animate-pulse h-28 rounded-xl bg-white/20 backdrop-blur p-4 flex flex-col justify-center gap-3">
                                        <p className="font-semibold">Business</p>
                                        <span className="text-2xl opacity-70">45+ Fields</span>
                                    </div>
                                </div>

                                <p
                                    className={`mt-4 text-sm
                  ${theme === "dark" ? "text-gray-300" : "text-white/90"}`}
                                >
                                    Curated scholarships, verified deadlines, and personalized
                                    recommendations.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>
        </section>
    );
}
