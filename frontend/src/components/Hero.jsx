import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="min-h-screen relative bg-hero-pattern bg-cover bg-center flex justify-center items-center"
      // style={{ height: "calc(100vh - 72px)" }}
    >
      <div className="container mx-auto p-4 flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Learn Phrasal Verbs With Us
          </h1>
          <p className="mb-6">
            Mastering phrasal verbs has never been easier or more enjoyable than
            with our app, "Learn Phrasal Verbs With Us"!
          </p>
          <Link to="/register">
            <button className="bg-blue-500 hover:bg-blue-600 rounded px-6 py-2 text-white">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
