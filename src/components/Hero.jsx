import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section className="relative my-10">
            {/* Glow background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400 to-sky-400 blur-2xl opacity-30"></div>

            <header className="relative rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 py-20 sm:py-28 lg:py-36">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                    >
                        {/* LEFT CONTENT */}
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                                Find scholarships that match your future
                            </h1>

                            <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto md:mx-0 text-white/90">
                                Discover verified scholarships from around the world — search by
                                eligibility, deadline, or field of study and apply with confidence
                                in minutes.
                            </p>

                            {/* CTA Buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/scholarships")}
                                    className="inline-flex items-center justify-center rounded-md bg-white text-indigo-700 px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition"
                                >
                                    Search Scholarships
                                </motion.button>

                                <a
                                    href="#top-scholarships"
                                    className="inline-flex items-center justify-center rounded-md bg-white/20 backdrop-blur px-6 py-3 font-medium text-white hover:bg-white/30 transition"
                                >
                                    Browse Top Scholarships
                                </a>
                            </div>

                            {/* Trust Signals */}
                            <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-white/90">
                                <span>🎓 2,000+ Scholarships</span>
                                <span>🌍 50+ Countries</span>
                                <span>🏛️ Verified Universities</span>
                            </div>
                        </div>

                        {/* RIGHT VISUAL */}
                        <motion.div
                            className="hidden md:block"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                        >
                            <div className="rounded-xl overflow-hidden shadow-lg bg-white/10 p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-28 rounded-lg bg-gradient-to-br from-pink-300 to-yellow-300" />
                                    <div className="h-28 rounded-lg bg-gradient-to-br from-green-300 to-blue-300" />
                                    <div className="h-28 rounded-lg bg-gradient-to-br from-purple-300 to-indigo-300" />
                                    <div className="h-28 rounded-lg bg-gradient-to-br from-sky-300 to-emerald-300" />
                                </div>

                                {/* Tags */}
                                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/90">
                                    <span className="px-3 py-1 rounded-full bg-white/20">Engineering</span>
                                    <span className="px-3 py-1 rounded-full bg-white/20">Business</span>
                                    <span className="px-3 py-1 rounded-full bg-white/20">Full Fund</span>
                                    <span className="px-3 py-1 rounded-full bg-white/20">Masters</span>
                                </div>

                                <p className="mt-4 text-sm text-white/90">
                                    Curated scholarships, verified deadlines, and personalized
                                    recommendations.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </header>
        </section>
    );
}