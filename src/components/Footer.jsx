import React, { use } from "react";
import { motion } from "framer-motion";
import {
    FaFacebook,
    FaGithub,
    FaLinkedin,
    FaXTwitter,
    FaArrowUp
} from "react-icons/fa6";
import { AuthContext } from "../provider/AuthContext";
import { Link } from "react-router";

const socialLinks = [
    { name: "X", href: "https://x.com/rakibislam44", icon: <FaXTwitter /> },
    { name: "Facebook", href: "https://www.facebook.com/rakibislam.KCN", icon: <FaFacebook /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/mdrakibali/", icon: <FaLinkedin /> },
    { name: "GitHub", href: "https://github.com/Rakibislam22", icon: <FaGithub /> }
];

export default function Footer() {
    const year = new Date().getFullYear();
    const { theme } = use(AuthContext);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className={`
                    rounded-t-3xl
                    ${theme === "dark"
                        ? "bg-gray-950 text-gray-300"
                        : "bg-gray-900 text-gray-200"}
                `}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Top row */}
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                        {/* Brand */}
                        <div>
                            <a href="/" className="text-lg font-semibold text-white">
                                ScholarStream
                            </a>
                            <p className="mt-2 text-sm text-gray-400 max-w-sm">
                                Your gateway to curated scholarship opportunities
                            </p>
                        </div>

                        {/* Links + Social */}
                        <div className="flex flex-col items-center md:items-end gap-4">
                            <nav
                                aria-label="footer"
                                className="flex gap-5 text-sm"
                            >
                                {["About", "Privacy", "Terms"].map((l) => (
                                    <Link
                                        key={l}
                                        to={`/${l.toLowerCase()}`}
                                        className="hover:text-white transition underline-offset-4 hover:underline"
                                    >
                                        {l}
                                    </Link>
                                ))}
                            </nav>

                            <div className="flex items-center gap-2">
                                {socialLinks.map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.name}
                                        className={`
                                            p-2 rounded-full transition
                                            ${theme === "dark"
                                                ? "hover:bg-white/10 text-gray-300"
                                                : "hover:bg-white/15 text-gray-200"}
                                        `}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom row */}
                    <div className="mt-8 pt-4 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-400">
                            © {year} ScholarStream. All rights reserved.
                        </p>

                        <p className="text-sm text-gray-400">
                            Built with care •{" "}
                            <a
                                href="mailto:support@scholarstream.example"
                                className="text-indigo-400 hover:underline"
                            >
                                support@scholarstream.example
                            </a>
                        </p>
                    </div>
                </div>
            </motion.footer>

            {/* Go to Top Button */}
            <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`
                    fixed bottom-6 right-6 z-50
                    p-3 rounded-full shadow-lg
                    ${theme === "dark"
                        ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"}
                `}
                aria-label="Go to top"
            >
                <FaArrowUp />
            </motion.button>
        </>
    );
}
