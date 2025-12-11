import React from "react";
import Hero from "../components/Hero";
import TopScholarships from "../components/TopScholarships";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

export default function Home() {
    return (
        <main className="min-h-screen text-gray-900">
            <Hero />
            <section className="mt-10">
                <TopScholarships />
            </section>

            <section className="mt-16">
                <Testimonials />
            </section>

            <section className="mt-16 mb-24">
                <Contact />
            </section>
        </main>
    );
}