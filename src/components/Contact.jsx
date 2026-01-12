import React, { useState, use } from "react";
import { AuthContext } from "../provider/AuthContext";

const faqs = [
    {
        q: "How do I apply to a scholarship?",
        a: "Click 'View Details' on a scholarship card to see application instructions and required documents."
    },
    {
        q: "Are deadlines verified?",
        a: "We curate and verify deadlines, but always double-check the provider's official page before submitting."
    },
    {
        q: "Can I save scholarships to apply later?",
        a: "This version shows listings; saving/bookmarking can be added via user accounts in a later iteration."
    }
];

export default function Contact() {
    const [open, setOpen] = useState(null);
    const { theme } = use(AuthContext);

    return (
        <section
            className={`
                rounded-2xl p-6 sm:p-8 shadow-sm
                ${theme === "dark"
                    ? "bg-gray-900/70 text-gray-200"
                    : "bg-white text-gray-900"}
            `}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact */}
                <div>
                    <h3 className="text-xl font-bold">
                        Contact Us
                    </h3>

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

                    <p
                        className={`mt-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}
                    >
                        For partnerships or data corrections, please reach out via email.
                    </p>
                </div>

                {/* FAQ */}
                <div>
                    <h3 className="text-xl font-bold mb-4">
                        F.A.Q
                    </h3>

                    <div className="space-y-3">
                        {faqs.map((f, idx) => (
                            <div
                                key={idx}
                                className={`
                                    rounded-lg p-4 border transition
                                    ${theme === "dark"
                                        ? "bg-gray-800/70 border-gray-700"
                                        : "bg-gray-50 border-gray-100"}
                                `}
                            >
                                <button
                                    onClick={() => setOpen(open === idx ? null : idx)}
                                    className="w-full text-left flex justify-between items-center"
                                >
                                    <span className="font-medium">
                                        {f.q}
                                    </span>

                                    <span
                                        className={`text-lg font-semibold ${theme === "dark"
                                                ? "text-indigo-400"
                                                : "text-indigo-600"
                                            }`}
                                    >
                                        {open === idx ? "−" : "+"}
                                    </span>
                                </button>

                                {open === idx && (
                                    <p
                                        className={`mt-3 text-sm ${theme === "dark"
                                                ? "text-gray-300"
                                                : "text-gray-600"
                                            }`}
                                    >
                                        {f.a}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
