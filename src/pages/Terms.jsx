import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";

export default function Terms() {
    const { theme } = use(AuthContext);

    return (
        <main className="min-h-screen py-16">
            <div
                className={`
                    max-w-7xl mx-auto px-4 sm:px-6
                    ${theme === "dark" ? "text-gray-300" : "text-gray-800"}
                `}
            >
                <h1
                    className={`text-3xl font-extrabold mb-6
                    ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
                >
                    Terms & Conditions
                </h1>

                <p className="text-sm opacity-80 mb-8">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <section className="space-y-6 text-lg leading-relaxed">
                    <p>
                        By accessing or using ScholarStream, you agree to comply with
                        these Terms & Conditions. If you do not agree, please do not use
                        our platform.
                    </p>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Use of the Platform</h2>
                        <p>
                            ScholarStream provides scholarship information for educational
                            purposes only. We do not guarantee funding or acceptance.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">User Responsibilities</h2>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>Provide accurate information</li>
                            <li>Use the platform lawfully</li>
                            <li>Do not misuse or scrape data</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Intellectual Property</h2>
                        <p>
                            All content on ScholarStream, including text and design,
                            is owned by ScholarStream unless stated otherwise.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Limitation of Liability</h2>
                        <p>
                            ScholarStream is not liable for losses arising from reliance
                            on scholarship information or external links.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Changes to Terms</h2>
                        <p>
                            We may update these Terms at any time. Continued use of the
                            platform constitutes acceptance of the revised terms.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Contact</h2>
                        <p>
                            Questions regarding these Terms can be sent to{" "}
                            <a
                                href="mailto:support@scholarstream.example"
                                className="text-indigo-500 hover:underline"
                            >
                                support@scholarstream.example
                            </a>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
