import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <section className="text-center">
        <img
          src="/src/images/unsplash_v4s-VeYNqHM.png"
          alt="Books on a shelf"
          className="h-[500px] w-full object-cover mb-12 rounded-md "
        />

        <h1 className="text-4xl font-bold mb-4">Find the best books today!</h1>
        <p className="text-lg text-gray-700 mb-9">
          All of your favorite books are already here
        </p>

        <Link to="/home">
          <img
            src="/src/images/Mask group.png"
            alt="Decorative graphic"
            className="w-9 mx-auto cursor-pointer "
          />
        </Link>
      </section>
    </main>
  );
};
