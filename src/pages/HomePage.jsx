import React from "react";
import { BookList } from "../components/BookList";

export const HomePage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-4 pl-8 pt-6  ">
          <img
            src="src/images/unsplash_KrRgZF4NSok.png"
            alt="Decorative graphic"
            className="w-9 cursor-pointer "
          />
          <p className="font-semibold text-[24px]">
            Hey there, <span className="text-[#6366F1]">book lover!</span>
          </p>
        </div>

        <div className="flex gap-4 pr-8 pt-6">
          <p>Favorites</p>
          <p>My Books</p>
        </div>
      </div>

      <div className="grid justify-items-center mt-10">
        <p className="text-center text-[#000000B3] text-[48px] font-medium">
          Start your reading journey — search any title or author and
          <br /> explore a world of stories.
        </p>

        <div className="relative w-[334px] mt-2 pl-4">
          <input
            type="text"
            placeholder="Search for books or authors..."
            style={{
              filter: "drop-shadow(5px 5px 16px rgba(99, 102, 241, 0.25))",
            }}
            className="bg-white rounded-[24px] p-3 w-full pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Search for books or authors"
          />
          <img
            src="src/images/Group 11.png"
            alt="Search icon"
            className="w-6 h-6 absolute top-1/2 left-8 -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>

      <div>
        <p className="pl-12 pt-20">Popular books</p>
        <BookList />
        <div className="flex gap-12 justify-center mt-24">
          <p>Contact Us</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>© 2025 Book Lover</p>
        </div>
      </div>
    </div>
  );
};
