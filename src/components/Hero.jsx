import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function Hero() {
    const navigate = useNavigate ? useNavigate() : null;

    return (
        <header className="my-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white">
            <div className="max-w-6xl mx-auto px-4 py-20 sm:py-28 lg:py-36">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                            Find scholarships that power your future
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl max-w-2xl">
                            Discover curated scholarships from around the world — search by
                            eligibility, deadline, or field of study and apply with confidence.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate && navigate("/search")}
                                className="inline-flex items-center rounded-md bg-white text-indigo-700 px-5 py-3 font-medium shadow"
                            >
                                Search Scholarship
                            </motion.button>

                            <a
                                href="#top-scholarships"
                                className="inline-flex items-center rounded-md bg-white/20 backdrop-blur px-5 py-3 text-white"
                            >
                                Browse Top Scholarships
                            </a>
                        </div>
                    </div>

                    <motion.div
                        className="hidden md:block"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="rounded-xl overflow-hidden shadow-lg bg-white/10 p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-28 rounded-lg bg-gradient-to-br from-pink-300 to-yellow-300" />
                                <div className="h-28 rounded-lg bg-gradient-to-br from-green-300 to-blue-300" />
                                <div className="h-28 rounded-lg bg-gradient-to-br from-purple-300 to-indigo-300" />
                                <div className="h-28 rounded-lg bg-gradient-to-br from-sky-300 to-emerald-300" />
                            </div>
                            <p className="mt-4 text-sm text-white/90">
                                Curated scholarships, verified deadlines and personalized
                                recommendations.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </header>
    );
}