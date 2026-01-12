import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";
import { useNavigate } from "react-router";

export default function CallToAction() {
    const { theme } = use(AuthContext);
    const navigate = useNavigate();

    return (
        <section
            className={`rounded-3xl p-12 my-20 text-center
      ${theme === "dark"
                    ? "bg-gradient-to-r from-indigo-900 to-gray-900 text-gray-100"
                    : "bg-gradient-to-r from-indigo-600 to-sky-500 text-white"}
    `}
        >
            <h2 className="text-3xl font-extrabold">
                Start Your Scholarship Journey Today
            </h2>

            <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                Discover opportunities that match your goals and apply with confidence.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button
                    onClick={() => navigate("/scholarships")}
                    className="px-8 py-3 rounded-full font-semibold bg-white text-indigo-700 hover:bg-gray-100 transition"
                >
                    Browse Scholarships
                </button>

                <button
                    onClick={() => navigate("/auth/signup")}
                    className="px-8 py-3 rounded-full font-semibold bg-white/20 hover:bg-white/30 transition"
                >
                    Create Free Account
                </button>
            </div>
        </section>
    );
}
