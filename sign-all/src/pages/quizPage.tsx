import React, { useState, useEffect } from "react"
import Navbar from "@/components/common/Navbar"
import axios from "axios"

const QuizPage = () => {
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [questionData, setQuestionData] = useState(null) // Stores question and options
  const [selectedOption, setSelectedOption] = useState(null) // To handle selected answer

  // Fetch question data from API
  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(`/api/quiz/${questionNumber}`) // Replace with your API endpoint
        setQuestionData(response.data)
      } catch (error) {
        console.error("Error fetching question data:", error)
      }
    }

    fetchQuestionData()
  }, [questionNumber])

  //   const handleAnswer = (isCorrect) => {
  //     if (isCorrect) setScore(score + 1);
  //     setSelectedOption(null); // Reset selected option for the next question
  //     setQuestionNumber(questionNumber + 1); // Move to the next question
  //   };

  return (
    <div className='bg-gray-100 min-h-screen text-black'>
      <Navbar />

      <main className='container mx-auto px-4 py-6'>
        <h1 className='text-center text-3xl font-bold mb-8'>Quiz</h1>

        <div className='flex flex-col items-center md:flex-row md:justify-between'>
          <div className='w-full md:w-1/2 flex flex-col items-center'>
            <div className='text-xl font-bold mb-4'>Score: {score}</div>

            {/* Video player */}
            {questionData && questionData.videoUrl ? (
              <div className='mb-4'>
                <video
                  src={questionData.videoUrl} // Video URL from API data
                  controls
                  width='100%'
                  className='rounded-lg shadow-lg'
                />
              </div>
            ) : (
              <p>Loading question...</p>
            )}
          </div>

          <div className='w-full md:w-1/2 flex flex-col items-center md:items-start'>
            <div className='text-xl font-bold mb-4'>
              Question: {questionNumber}/10
            </div>

            {questionData && (
              <div className='space-y-4 w-full'>
                {questionData.options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full p-4 rounded-lg shadow transition ${
                      selectedOption === option
                        ? option.isCorrect
                          ? "bg-green-200"
                          : "bg-red-200"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedOption(option)
                      handleAnswer(option.isCorrect)
                    }}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default QuizPage
