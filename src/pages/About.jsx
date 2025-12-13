import React from "react";
import { motion } from "framer-motion";
import TeamCard from "../components/TeamCard";

const team = [
    { id: 1, name: "Aisha Rahman", role: "Founder & CEO", bio: "Passionate about equal access to education.", avatar: "" },
    { id: 2, name: "David Kim", role: "Head of Product", bio: "Designs delightful scholarship discovery experiences.", avatar: "" },
    { id: 3, name: "María González", role: "Community Lead", bio: "Connects students with opportunities and resources.", avatar: "" }
];

export default function About() {
    return (
        <div className="min-h-screen text-gray-900 flex flex-col">
            <header>
                <div className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                    >
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                                About Scholar<span className='text-[#0303b8]'>Stream</span>
                            </h1>
                            <p className="mt-4 text-lg text-gray-700 max-w-2xl">
                                ScholarStream curates scholarships from around the world to help students
                                find funding that matches their profile. Our mission is to lower the barriers
                                to higher education by making opportunities discoverable, verifiable, and easy to act on.
                            </p>

                            <div className="mt-6 flex gap-3">
                                <a
                                    href="/"
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow"
                                >
                                    Go to Home
                                </a>
                                <a
                                    href="#our-mission"
                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-700"
                                >
                                    Learn more
                                </a>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15, duration: 0.6 }}
                            className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl shadow"
                        >
                            <dl className="grid grid-cols-1 gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold">
                                        01
                                    </div>
                                    <div>
                                        <dt className="font-semibold">Curated Opportunities</dt>
                                        <dd className="text-sm text-gray-600">We verify and categorize scholarships so you can trust the listings.</dd>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold">
                                        02
                                    </div>
                                    <div>
                                        <dt className="font-semibold">Personalized Matches</dt>
                                        <dd className="text-sm text-gray-600">Find scholarships that fit your background and goals.</dd>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold">
                                        03
                                    </div>
                                    <div>
                                        <dt className="font-semibold">Transparent Deadlines</dt>
                                        <dd className="text-sm text-gray-600">Clear deadlines and requirements so you never miss an application.</dd>
                                    </div>
                                </div>
                            </dl>
                        </motion.div>
                    </motion.div>
                </div>
            </header>

            <main className="py-12 flex-1 w-full">
                <section id="our-mission" className="bg-white rounded-xl p-6 shadow">
                    <h2 className="text-2xl font-bold">Our Mission</h2>
                    <p className="mt-3 text-gray-700">
                        We believe every student should have access to financial resources and information that make education attainable.
                        ScholarStream aggregates scholarships, highlights eligibility and deadlines, and surfaces opportunities that might otherwise go unnoticed.
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="bg-gray-50 p-4 rounded-md"
                        >
                            <h3 className="font-semibold">Trust & Safety</h3>
                            <p className="text-sm text-gray-600 mt-2">We verify sources and provide links to official pages.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12 }}
                            className="bg-gray-50 p-4 rounded-md"
                        >
                            <h3 className="font-semibold">Accessibility</h3>
                            <p className="text-sm text-gray-600 mt-2">Scholarship information presented clearly and inclusively.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18 }}
                            className="bg-gray-50 p-4 rounded-md"
                        >
                            <h3 className="font-semibold">Community</h3>
                            <p className="text-sm text-gray-600 mt-2">We amplify student voices and success stories to inspire others.</p>
                        </motion.div>
                    </div>
                </section>

                <section className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {team.map((member) => (
                            <TeamCard key={member.id} member={member} />
                        ))}
                    </div>
                </section>

                <section className="mt-12 bg-white rounded-xl p-6 shadow">
                    <h2 className="text-2xl font-bold">Join Us</h2>
                    <p className="mt-3 text-gray-700">Interested in contributing, partnering, or helping students find opportunities? We'd love to hear from you.</p>

                    <div className="mt-6 flex gap-3">
                        <a href="/contact" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md">Contact</a>
                        <a href="/careers" className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md text-gray-700">Careers</a>
                    </div>
                </section>
            </main>

        </div>
    );
}