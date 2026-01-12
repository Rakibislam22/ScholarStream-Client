import React from "react";
import { motion } from "framer-motion";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import TopScholarships from "../components/TopScholarships";
import Highlights from "../components/Highlights";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import CallToAction from "../components/CallToAction";

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
            {/* 1. Hero (no animation delay) */}
            <Hero />

            {/* 2. Categories */}
            <motion.section
                className="mt-16"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Categories />
            </motion.section>

            {/* 3. Top Scholarships */}
            <motion.section
                className="mt-20"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <TopScholarships />
            </motion.section>

            {/* 4. Highlights */}
            <motion.section
                className="mt-20"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Highlights />
            </motion.section>

            {/* 5. Statistics */}
            <motion.section
                className="mt-20"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Statistics />
            </motion.section>

            {/* 6. Testimonials */}
            <motion.section
                className="mt-20"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Testimonials />
            </motion.section>

            {/* 7. Contact / FAQ */}
            <motion.section
                className="mt-20"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Contact />
            </motion.section>

            {/* 8. Call To Action */}
            <motion.section
                className="mt-24 mb-28"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <CallToAction />
            </motion.section>
        </main>
    );
}
