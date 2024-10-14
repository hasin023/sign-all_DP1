import React from "react";

import Image from "next/image";
const Hero = () => {
  return (
    <section className=" py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-50">
        <div className="flex flex-col items-center justify-center  text-center md:w-full space-y-4">
          <div className="mt-8 md:mt-0">
            <Image
              src= "/sign-language-speakers.jpg"
              alt="Hero Image"
              width={1000}
              height={1000}
              className="max-w-full h-auto"
            />
          </div>
          <h1 className="text-black text-5xl font-bold">
            Welcome to Our Sign Language App
          </h1>
          <p className="text-lg text-red-500">
            Explore the world of sign language with our tools like detection,
            dictionary, quizzes, and more.
          </p>
          <a
            href="#learn-more"
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Start Detection
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;