import React, { use } from "react";
import { motion } from "framer-motion";
import TeamCard from "../components/TeamCard";
import { AuthContext } from "../provider/AuthContext";

const team = [
    { id: 1, name: "Aisha Rahman", role: "Founder & CEO", bio: "Passionate about equal access to education.", avatar: "" },
    { id: 2, name: "David Kim", role: "Head of Product", bio: "Designs delightful scholarship discovery experiences.", avatar: "" },
    { id: 3, name: "María González", role: "Community Lead", bio: "Connects students with opportunities and resources.", avatar: "" }
];

export default function About() {
    const { theme } = use(AuthContext);

    return (
        <div className="min-h-screen flex flex-col">
            {/* HEADER / HERO */}
            <header className="py-16">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div>
                        <h1
                            className={`text-3xl sm:text-4xl font-extrabold leading-tight
                            ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
                        >
                            About Scholar
                            <span className={theme === "dark" ? "text-indigo-400" : "text-[#0303b8]"}>
                                Stream
                            </span>
                        </h1>

                        <p
                            className={`mt-4 text-lg max-w-2xl
                            ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                        >
                            ScholarStream curates scholarships from around the world to help students
                            find funding that matches their profile. Our mission is to lower the barriers
                            to higher education by making opportunities discoverable, verifiable, and easy to act on.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <a
                                href="/"
                                className="inline-flex items-center px-5 py-2.5 rounded-md font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition"
                            >
                                Go to Home
                            </a>

                            <a
                                href="#our-mission"
                                className={`inline-flex items-center px-5 py-2.5 rounded-md font-medium border transition
                                ${theme === "dark"
                                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                                        : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                            >
                                Learn more
                            </a>
                        </div>
                    </div>

                    {/* FEATURE LIST */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className={`rounded-2xl p-6 shadow-sm
                        ${theme === "dark"
                                ? "bg-gray-900/70 border border-gray-700"
                                : "bg-white"}`}
                    >
                        <dl className="grid gap-5">
                            {[
                                {
                                    n: "01",
                                    t: "Curated Opportunities",
                                    d: "We verify and categorize scholarships so you can trust the listings."
                                },
                                {
                                    n: "02",
                                    t: "Personalized Matches",
                                    d: "Find scholarships that fit your background and goals."
                                },
                                {
                                    n: "03",
                                    t: "Transparent Deadlines",
                                    d: "Clear deadlines and requirements so you never miss an application."
                                }
                            ].map((item) => (
                                <div key={item.n} className="flex gap-4">
                                    <div className="flex-shrink-0 bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold">
                                        {item.n}
                                    </div>
                                    <div>
                                        <dt className="font-semibold">{item.t}</dt>
                                        <dd className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                            {item.d}
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </motion.div>
                </motion.div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 space-y-14 pb-15">
                {/* MISSION */}
                <section
                    id="our-mission"
                    className={`rounded-2xl p-6 sm:p-8 shadow-sm
                    ${theme === "dark"
                            ? "bg-gray-900/70 text-gray-300"
                            : "bg-white text-gray-700"}`}
                >
                    <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                    <p>
                        We believe every student should have access to financial resources and information that make education attainable.
                        ScholarStream aggregates scholarships, highlights eligibility and deadlines, and surfaces opportunities that might otherwise go unnoticed.
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { t: "Trust & Safety", d: "We verify sources and provide links to official pages." },
                            { t: "Accessibility", d: "Scholarship information presented clearly and inclusively." },
                            { t: "Community", d: "We amplify student voices and success stories to inspire others." }
                        ].map((m, i) => (
                            <motion.div
                                key={m.t}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className={`rounded-xl p-5
                                ${theme === "dark"
                                        ? "bg-gray-800/70"
                                        : "bg-gray-50"}`}
                            >
                                <h3 className="font-semibold">{m.t}</h3>
                                <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    {m.d}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* TEAM */}
                <section>
                    <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
                        Meet the Team
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {team.map((member) => (
                            <TeamCard key={member.id} member={member} />
                        ))}
                    </div>
                </section>

                {/* JOIN US */}
                <section
                    className={`rounded-2xl p-6 sm:p-8 shadow-sm
                    ${theme === "dark"
                            ? "bg-gray-900/70 text-gray-300"
                            : "bg-white text-gray-700"}`}
                >
                    <h2 className="text-2xl font-bold">Join Us</h2>
                    <p className="mt-3">
                        Interested in contributing, partnering, or helping students find opportunities? We'd love to hear from you.
                    </p>

                    <div className="mt-6 flex gap-3">
                        <p
                            className={`mt-3 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            Email:{" "}
                            <a
                                href="mailto:support@scholarstream.example"
                                className={`font-medium ${theme === "dark"
                                    ? "text-indigo-400 hover:text-indigo-300"
                                    : "text-indigo-600 hover:text-indigo-700"
                                    }`}
                            >
                                support@scholarstream.example
                            </a>
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
