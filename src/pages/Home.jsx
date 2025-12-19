import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import TopScholarships from "../components/TopScholarships";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

// reusable animation
const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export default function Home() {
    return (
        <main className="min-h-screen text-gray-900">
            {/* Hero (loads instantly, no scroll delay) */}
            <Hero />

            {/* Top Scholarships */}
            <motion.section
                className="mt-10"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <TopScholarships />
            </motion.section>

            {/* Testimonials */}
            <motion.section
                className="mt-16"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Testimonials />
            </motion.section>

            {/* Contact */}
            <motion.section
                className="mt-16 mb-24"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Contact />
            </motion.section>
        </main>
    );
}
