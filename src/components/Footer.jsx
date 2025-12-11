import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const socialLinks = [
    {
        name: "X",
        href: "https://x.com/",
        icon: <FaXTwitter />
    },
    {
        name: "Facebook",
        href: "https://facebook.com/",
        icon: <FaFacebook />
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/",
        icon: <FaLinkedin/>
    },
    {
        name: "GitHub",
        href: "https://github.com/",
        icon: <FaGithub/>
    }
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <motion.footer
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-gray-900 rounded-t-3xl text-gray-200"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <a href="/" className="flex items-center gap-3">
                            <span className="text-lg font-semibold text-white">ScholarStream</span>
                        </a>

                        <p className="text-sm text-gray-400 hidden md:block">
                            Your gateway to curated scholarship opportunities
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <nav aria-label="footer" className="flex gap-4">
                            <a href="/about" className="text-sm text-gray-300 hover:text-white">About</a>
                            <a href="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy</a>
                            <a href="/terms" className="text-sm text-gray-300 hover:text-white">Terms</a>
                        </nav>

                        <div className="flex items-center gap-2">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.name}
                                    className="p-1 rounded-md hover:bg-white/10 text-gray-200 transition-colors"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-800 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">&copy; {year} ScholarStream. All rights reserved.</p>

                    <p className="text-sm text-gray-400">
                        Built with care • <a href="mailto:support@scholarstream.example" className="text-indigo-400 hover:underline">support@scholarstream.example</a>
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}