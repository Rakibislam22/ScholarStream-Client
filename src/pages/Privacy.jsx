import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";

export default function Privacy() {
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
                    Privacy Policy
                </h1>

                <p className="text-sm opacity-80 mb-8">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <section className="space-y-6 text-lg leading-relaxed">
                    <p>
                        ScholarStream respects your privacy and is committed to protecting
                        your personal information. This Privacy Policy explains how we
                        collect, use, and safeguard your data.
                    </p>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Information We Collect</h2>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>Basic account information (name, email)</li>
                            <li>Usage data to improve our platform</li>
                            <li>Optional information you choose to provide</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">How We Use Information</h2>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>To provide and improve our services</li>
                            <li>To personalize scholarship recommendations</li>
                            <li>To communicate important updates</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Data Protection</h2>
                        <p>
                            We implement reasonable security measures to protect your data.
                            However, no method of transmission over the internet is 100% secure.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Third-Party Links</h2>
                        <p>
                            Our platform may contain links to external websites. We are not
                            responsible for the privacy practices of those sites.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, contact us at{" "}
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
