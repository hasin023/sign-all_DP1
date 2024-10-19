import Navbar from "@/components/common/Navbar";
import React from "react";

const QuizPage = () => {
  return (
    <div>
      
      <Navbar />

      
      <div className="relative min-h-screen bg-gray-100">
        
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/sign-language-862x570.jpg')",
            filter: "brightness(0.7)", 
          }}
        ></div>

      
        <div className="relative z-10 flex flex-col items-center py-40 bg-white/70 backdrop-blur-sm w-full">
      
          <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">Take a Quiz</h1>
            <p className="text-lg text-center mb-6">
              Test Your Knowledge of American Sign Language
            </p>
            <p className="text-center mb-8">
              Ready to put your sign language skills to the test? Take our quiz to
              see how well you know the American Sign Language (ASL) alphabet.
            </p>
            <div className="flex justify-center">
              <button className="bg-sky-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-sky-600 transition">
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
