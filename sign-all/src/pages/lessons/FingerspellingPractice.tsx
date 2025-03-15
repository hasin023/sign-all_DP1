import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react"

const FingerspellingPractice = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("common-words")
    const [currentWord, setCurrentWord] = useState("")
    const [currentLetterIndex, setCurrentLetterIndex] = useState(-1)
    const [showWord, setShowWord] = useState(true)
    const [userInput, setUserInput] = useState("")
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [score, setScore] = useState(0)
    const [timer, setTimer] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [difficulty, setDifficulty] = useState("easy")
    const [completedWords, setCompletedWords] = useState<string[]>([])
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [showingLetters, setShowingLetters] = useState(false)

    // Word lists by category
    const wordLists = {
        "common-words": {
            easy: ["NAME", "HELLO", "THANK", "PLEASE", "GOOD", "NICE", "MEET", "FRIEND"],
            medium: ["LANGUAGE", "PRACTICE", "LEARNING", "SIGNING", "ALPHABET", "FINGER", "SPELLING"],
            hard: ["COMMUNICATION", "UNDERSTANDING", "CONVERSATION", "EXPRESSION", "VOCABULARY"],
        },
        names: {
            easy: ["JOHN", "MARY", "ALEX", "LISA", "MIKE", "SARA", "DAVE", "ANNA"],
            medium: ["MICHAEL", "JESSICA", "ROBERT", "AMANDA", "DANIEL", "SOPHIA", "WILLIAM"],
            hard: ["ELIZABETH", "CHRISTOPHER", "STEPHANIE", "ALEXANDER", "KATHERINE", "BENJAMIN"],
        },
        places: {
            easy: ["HOME", "WORK", "PARK", "STORE", "CAFE", "BANK", "MALL", "SCHOOL"],
            medium: ["LIBRARY", "HOSPITAL", "AIRPORT", "STATION", "COLLEGE", "THEATER", "MUSEUM"],
            hard: ["UNIVERSITY", "RESTAURANT", "COMMUNITY", "APARTMENT", "DOWNTOWN", "BUILDING"],
        },
    }

    // Get a random word based on category and difficulty
    const getRandomWord = () => {
        const category = activeTab as keyof typeof wordLists
        const words = wordLists[category][difficulty as keyof (typeof wordLists)[typeof category]]

        // Filter out completed words, or reset if all are completed
        const availableWords = words.filter((word) => !completedWords.includes(word))
        const wordPool = availableWords.length > 0 ? availableWords : words

        const randomIndex = Math.floor(Math.random() * wordPool.length)
        const newWord = wordPool[randomIndex]

        setCurrentWord(newWord)
        setCurrentLetterIndex(0)
        setUserInput("")
        setIsCorrect(null)
        setShowWord(true)

        return newWord
    }

    // Start the practice session
    const startPractice = () => {
        getRandomWord()
        setTimer(0)
        setScore(0)
        setCompletedWords([])
    }

    // Check the user's input
    const checkAnswer = () => {
        setIsTimerRunning(false)
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }

        const isAnswerCorrect = userInput.toUpperCase() === currentWord
        setIsCorrect(isAnswerCorrect)

        if (isAnswerCorrect) {
            setScore((prev) => prev + 1)
            setCompletedWords((prev) => [...prev, currentWord])
        }
    }

    // Move to the next word
    const nextWord = () => {
        getRandomWord()
        setTimer(0)
    }

    // Timer effect
    useEffect(() => {
        if (isTimerRunning) {
            timerRef.current = setInterval(() => {
                setTimer((prev) => prev + 1)
            }, 1000)
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [isTimerRunning])

    // Handle tab change
    useEffect(() => {
        if (activeTab) {
            startPractice()
        }
    }, [activeTab, difficulty])

    const showLettersSequentially = () => {
        setShowingLetters(true)
        setCurrentLetterIndex(-1)

        // Show each letter one by one with a delay
        currentWord.split("").forEach((letter, index) => {
            setTimeout(() => {
                setCurrentLetterIndex(index)
            }, index * 1000) // 1 second delay between letters
        })

        // After showing all letters, show the whole word for a moment before hiding
        setTimeout(
            () => {
                setShowingLetters(false)
                // Schedule hiding the word
                setTimeout(() => {
                    setShowWord(false)
                    setIsTimerRunning(true)
                    if (inputRef.current) {
                        inputRef.current.focus()
                    }
                }, 2000) // Show the full word for 2 seconds
            },
            currentWord.length * 1000 + 500,
        )
    }

    // Call this function when a new word is selected
    useEffect(() => {
        if (showWord && currentWord) {
            showLettersSequentially()
        }
    }, [currentWord, showWord])

    return (
        <LessonLayout title="Practicing Fingerspelling Common Words">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Fingerspelling Practice</h2>
                <p className="text-gray-700">
                    Fingerspelling is an essential skill in ASL. In this exercise, you'll practice spelling common words, names,
                    and places. First, memorize the word shown, then try to spell it correctly.
                </p>
            </div>

            {/* Difficulty Selection */}
            <div className="flex justify-center mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md inline-flex">
                    <Button
                        variant={difficulty === "easy" ? "default" : "outline"}
                        onClick={() => setDifficulty("easy")}
                        className="mr-2"
                    >
                        Easy
                    </Button>
                    <Button
                        variant={difficulty === "medium" ? "default" : "outline"}
                        onClick={() => setDifficulty("medium")}
                        className="mr-2"
                    >
                        Medium
                    </Button>
                    <Button variant={difficulty === "hard" ? "default" : "outline"} onClick={() => setDifficulty("hard")}>
                        Hard
                    </Button>
                </div>
            </div>

            {/* Category Tabs */}
            <Tabs defaultValue="common-words" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="common-words">Common Words</TabsTrigger>
                    <TabsTrigger value="names">Names</TabsTrigger>
                    <TabsTrigger value="places">Places</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Practice Area */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 mr-2">
                            Score: {score}
                        </Badge>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            <Clock className="h-4 w-4 mr-1" /> {timer}s
                        </Badge>
                    </div>
                    <Button size="sm" onClick={startPractice} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-1" /> Restart
                    </Button>
                </div>

                <AnimatePresence mode="wait">
                    {showWord ? (
                        <motion.div
                            key="word-display"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center mb-8"
                        >
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Memorize this word:</h3>
                            <div className="text-4xl font-bold text-blue-600 tracking-widest mb-4">{currentWord}</div>
                            <div className="flex space-x-2 justify-center min-h-[100px]">
                                {showingLetters
                                    ? currentWord.split("").map((letter, index) => (
                                        <div key={index} className="w-16 h-16 flex justify-center">
                                            {index <= currentLetterIndex && (
                                                <img
                                                    src={`https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/${letter.toLowerCase()}.gif`}
                                                    alt={`ASL letter ${letter}`}
                                                    className="w-16 h-16 object-contain"
                                                />
                                            )}
                                        </div>
                                    ))
                                    : currentWord
                                        .split("")
                                        .map((letter, index) => (
                                            <img
                                                key={index}
                                                src={`https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/${letter.toLowerCase()}.gif`}
                                                alt={`ASL letter ${letter}`}
                                                className="w-16 h-16 object-contain"
                                            />
                                        ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                {showingLetters
                                    ? `Watch the letters appear one by one (${currentLetterIndex + 1}/${currentWord.length})`
                                    : "Try to remember the whole word"}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="input-area"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center"
                        >
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Type the word you memorized:</h3>
                            <div className="w-full max-w-md mb-4">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full text-center text-xl"
                                    placeholder="Type the word"
                                    ref={inputRef}
                                    disabled={isCorrect !== null}
                                />
                            </div>

                            {isCorrect === null ? (
                                <Button onClick={checkAnswer} size="lg">
                                    Check Answer
                                </Button>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`p-4 rounded-md mb-4 text-center ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} w-full max-w-md`}
                                    >
                                        {isCorrect ? (
                                            <div className="flex items-center justify-center">
                                                <CheckCircle className="h-5 w-5 mr-2" />
                                                <span>Correct! Well done!</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center mb-2">
                                                    <XCircle className="h-5 w-5 mr-2" />
                                                    <span>Incorrect!</span>
                                                </div>
                                                <div>
                                                    The correct word was: <span className="font-bold">{currentWord}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <Button onClick={nextWord} size="lg">
                                        Next Word
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold text-green-800 mb-2">Real-World Practice</h3>
                <p className="text-gray-700 mb-4">
                    Watch real ASL signers fingerspell at different speeds to improve your receptive skills.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-2">Beginner Speed</h4>
                        <div className="aspect-video rounded-lg overflow-hidden">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/25XUwHErhnk"
                                title="Slow Fingerspelling Practice"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Intermediate Speed</h4>
                        <div className="aspect-video rounded-lg overflow-hidden">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/6ZWvfLQJ4Iw"
                                title="Medium Speed Fingerspelling Practice"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips Section */}
            <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Tips for Fingerspelling Practice</h3>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>Focus on the shape of the whole word rather than individual letters</li>
                    <li>Practice both receptive (reading) and expressive (producing) fingerspelling</li>
                    <li>Start with shorter words and gradually increase difficulty</li>
                    <li>Pay attention to hand positioning and transitions between letters</li>
                    <li>Use context clues when reading fingerspelling in conversation</li>
                </ul>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/Fingerspelling")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/lessons/NumbersRecognition")}>
                    Next Lesson →
                </Button>
            </div>
        </LessonLayout>
    )
}

export default FingerspellingPractice

