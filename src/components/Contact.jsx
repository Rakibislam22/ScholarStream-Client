import React, { useState } from "react";

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

    return (
        <section className="bg-white rounded-xl p-6 shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-bold">Contact Us</h3>
                    <p className="mt-2 text-sm text-gray-700">
                        Email: <a href="mailto:support@scholarstream.example" className="text-indigo-600">support@scholarstream.example</a>
                    </p>
                    <p className="mt-2 text-sm text-gray-700">For partnerships or data corrections, please reach out via email.</p>
                </div>

                <div>
                    <h3 className="text-xl font-bold">F.A.Q</h3>
                    <div className="mt-3 divide-y">
                        {faqs.map((f, idx) => (
                            <div key={idx} className="py-3">
                                <button
                                    onClick={() => setOpen(open === idx ? null : idx)}
                                    className="w-full text-left flex justify-between items-center"
                                >
                                    <span className="font-medium">{f.q}</span>
                                    <span className="text-indigo-600">{open === idx ? "−" : "+"}</span>
                                </button>

                                {open === idx && <p className="mt-2 text-sm text-gray-600">{f.a}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}