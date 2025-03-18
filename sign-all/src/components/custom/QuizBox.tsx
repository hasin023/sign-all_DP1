import { MouseEvent, useEffect, useState } from "react"
import { CheckCircleIcon, XCircleIcon } from "lucide-react"
import ShowQuizOverModal from "./ShowQuizOverModal"

const totalQuestions = 10

export default function QuizBox(props: { stopQuiz: () => void }) {
  const [words, setWords] = useState([] as { word: string; videos: string[] }[])
  const [questionCount, setQuestionCount] = useState(0)
  const [counter, setCounter] = useState(0)
  const [correctIdx, setCorrectIdx] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [givenAnswer, setGivenAnswer] = useState<number | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    fetch("/api/signs/quiz")
      .then((res) => res.json())
      .then((data) => {
        setWords(data)
        if (data.length === 0) {
          setCounter(counter + 1)
          return
        }
        setCorrectIdx(Math.floor(Math.random() * 4))
        console.log(data)
      })
      .catch((err) => console.log(err))
  }, [questionCount, counter])

  function checkAnswer(e: MouseEvent, index: number) {
    if (givenAnswer != null) return
    setGivenAnswer(index)
    if (correctIdx === index) {
      setScore(score + 1)
    }
    setTimeout(() => {
      if (questionCount + 1 >= totalQuestions) {
        setShowAlert(true)
        return
      }
      setQuestionCount(questionCount + 1)
      setGivenAnswer(null)
    }, 1000)
  }

  function handleAlertAction() {
    setQuestionCount(0)
    setScore(0)
    props.stopQuiz()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ShowQuizOverModal
        open={showAlert}
        score={score}
        totalQuestions={totalQuestions}
        onAction={handleAlertAction}
      />
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 border border-gray-100">
        <h1 className="text-2xl md:text-2xl font-bold text-center text-gray-800 pb-4 mb-4 border-b border-gray-100">
          Final Assessment
        </h1>
        <div className="flex justify-between items-center gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-3 flex-1 text-center">
            <h2 className="text-lg font-medium text-gray-600">Score</h2>
            <p className="text-2xl font-bold text-blue-600">{score}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 flex-1 text-center">
            <h3 className="text-lg font-medium text-gray-600">Question</h3>
            <p className="text-2xl font-bold text-blue-600">{questionCount + 1}/{totalQuestions}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 justify-center items-start">
          <div className="w-full flex justify-center">
            {correctIdx != null && words[correctIdx].videos.length && (
              <div className="bg-gray-50 p-2 rounded-lg shadow-inner w-full">
                <video
                  onError={() => setCounter(counter + 1)}
                  className="rounded-md w-full h-auto max-w-md mx-auto"
                  src={`/api/proxy-video?url=${words[correctIdx].videos.length
                    ? words[correctIdx].videos[0]
                    : ""
                    }`}
                  controls
                  controlsList="nodownload"
                  onContextMenu={() => false}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-stretch">
            {words.map((word, index) => (
              <button
                key={index + word.word}
                className={`w-full rounded-lg shadow hover:shadow-md border p-4 transition-all duration-200 text-lg font-medium flex items-center justify-center
              ${givenAnswer === index
                    ? givenAnswer === correctIdx
                      ? "bg-green-100 border-green-400 hover:bg-green-200"
                      : "bg-red-100 border-red-400 hover:bg-red-200"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                  }`}
                onClick={(e) => checkAnswer(e, index)}
              >
                <div className="flex items-center">
                  {givenAnswer === index ? (
                    givenAnswer === correctIdx ? (
                      <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                    ) : (
                      <XCircleIcon className="w-6 h-6 text-red-500 mr-2" />
                    )
                  ) : null}
                  <span>{word.word}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
