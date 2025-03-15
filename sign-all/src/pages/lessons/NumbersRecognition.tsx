import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ArrowRight, ArrowLeft } from "lucide-react"

const NumbersRecognition = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("basic")
    const [currentNumber, setCurrentNumber] = useState(1)
    const [mode, setMode] = useState<"learn" | "practice">("learn")
    const [userGuess, setUserGuess] = useState("")
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [score, setScore] = useState(0)
    const [attempts, setAttempts] = useState(0)
    const [showHint, setShowHint] = useState(false)

    // Define number ranges for each tab
    const numberRanges = {
        basic: Array.from({ length: 10 }, (_, i) => i), // 0-9
        teens: Array.from({ length: 10 }, (_, i) => i + 10), // 10-19
        tens: [20, 30, 40, 50, 60, 70, 80, 90, 100], // Multiples of 10
        advanced: [21, 32, 45, 67, 78, 89, 99], // Random two-digit numbers
    }

    // Get current range based on active tab
    const getCurrentRange = () => {
        return numberRanges[activeTab as keyof typeof numberRanges]
    }

    // Get a random number from the current range
    const getRandomNumber = () => {
        const range = getCurrentRange()
        const randomIndex = Math.floor(Math.random() * range.length)
        return range[randomIndex]
    }

    // Initialize or reset the practice session
    const startPractice = () => {
        setMode("practice")
        setCurrentNumber(getRandomNumber())
        setUserGuess("")
        setIsCorrect(null)
        setScore(0)
        setAttempts(0)
    }

    // Check the user's guess
    const checkGuess = () => {
        const isAnswerCorrect = Number.parseInt(userGuess) === currentNumber
        setIsCorrect(isAnswerCorrect)
        setAttempts((prev) => prev + 1)

        if (isAnswerCorrect) {
            setScore((prev) => prev + 1)
        }
    }

    // Move to the next number in practice mode
    const nextPracticeNumber = () => {
        setCurrentNumber(getRandomNumber())
        setUserGuess("")
        setIsCorrect(null)
    }

    // Move to the next number in learn mode
    const nextNumber = () => {
        const range = getCurrentRange()
        const currentIndex = range.indexOf(currentNumber)

        if (currentIndex < range.length - 1) {
            setCurrentNumber(range[currentIndex + 1])
        } else {
            // If we've reached the end of the range, loop back to the beginning
            setCurrentNumber(range[0])
        }

        setShowHint(false)
    }

    // Move to the previous number in learn mode
    const prevNumber = () => {
        const range = getCurrentRange()
        const currentIndex = range.indexOf(currentNumber)

        if (currentIndex > 0) {
            setCurrentNumber(range[currentIndex - 1])
        } else {
            // If we're at the beginning of the range, loop to the end
            setCurrentNumber(range[range.length - 1])
        }

        setShowHint(false)
    }

    // Reset to learn mode
    const backToLearn = () => {
        setMode("learn")
        setCurrentNumber(getCurrentRange()[0])
        setShowHint(false)
    }

    // Update current number when tab changes
    useEffect(() => {
        setCurrentNumber(getCurrentRange()[0])
        setMode("learn")
        setShowHint(false)
    }, [activeTab])

    // Replace placeholder image URLs with real URLs
    // Add this function to get number sign images
    const getNumberImageUrl = (num: number) => {
        // URLs for each number
        const numberUrls = {
            0: "https://www.handspeak.com/word/n/number/0.jpg",
            1: "https://www.handspeak.com/word/n/number/1.jpg",
            2: "https://www.handspeak.com/word/n/number/2.jpg",
            3: "https://www.handspeak.com/word/n/number/3.jpg",
            4: "https://www.handspeak.com/word/n/number/4.jpg",
            5: "https://www.handspeak.com/word/n/number/5.jpg",
            6: "https://www.handspeak.com/word/n/number/6.jpg",
            7: "https://www.handspeak.com/word/n/number/7.jpg",
            8: "https://www.handspeak.com/word/n/number/8.jpg",
            9: "https://www.handspeak.com/word/n/number/9.jpg",
            10: "https://www.handspeak.com/word/n/number/10.jpg",
            11: "https://www.handspeak.com/word/n/number/11.jpg",
            12: "https://www.handspeak.com/word/n/number/12.jpg",
            13: "https://www.handspeak.com/word/n/number/13.jpg",
            14: "https://www.handspeak.com/word/n/number/14.jpg",
            15: "https://www.handspeak.com/word/n/number/15.jpg",
            16: "https://www.handspeak.com/word/n/number/16.jpg",
            17: "https://www.handspeak.com/word/n/number/17.jpg",
            18: "https://www.handspeak.com/word/n/number/18.jpg",
            19: "https://www.handspeak.com/word/n/number/19.jpg",
            20: "https://www.handspeak.com/word/n/number/20.jpg",
            30: "https://www.handspeak.com/word/n/number/30.jpg",
            40: "https://www.handspeak.com/word/n/number/40.jpg",
            50: "https://www.handspeak.com/word/n/number/50.jpg",
            60: "https://www.handspeak.com/word/n/number/60.jpg",
            70: "https://www.handspeak.com/word/n/number/70.jpg",
            80: "https://www.handspeak.com/word/n/number/80.jpg",
            90: "https://www.handspeak.com/word/n/number/90.jpg",
            100: "https://www.handspeak.com/word/n/number/100.jpg",
        }

        // For two-digit numbers not listed above
        if (num > 20 && num < 100 && num % 10 !== 0) {
            return `/placeholder.svg?height=200&width=200&text=${num}`
        }

        return numberUrls[num as keyof typeof numberUrls] || `/placeholder.svg?height=200&width=200&text=${num}`
    }

    // Calculate progress percentage in learn mode
    const calculateProgress = () => {
        const range = getCurrentRange()
        const currentIndex = range.indexOf(currentNumber)
        return ((currentIndex + 1) / range.length) * 100
    }

    return (
        <LessonLayout title="Recognizing and Understanding Numbers (0-9, then up to 100)">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">ASL Numbers</h2>
                <p className="text-gray-700">
                    Numbers in ASL have unique handshapes and patterns. In this lesson, you'll learn to recognize and understand
                    numbers from 0-9 and then up to 100.
                </p>
            </div>

            {/* Number Category Tabs */}
            <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="basic">Basic (0-9)</TabsTrigger>
                    <TabsTrigger value="teens">Teens (10-19)</TabsTrigger>
                    <TabsTrigger value="tens">Tens (20-100)</TabsTrigger>
                    <TabsTrigger value="advanced">Mixed Numbers</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Mode Selection */}
            <div className="flex justify-center mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md inline-flex">
                    <Button variant={mode === "learn" ? "default" : "outline"} onClick={backToLearn} className="mr-2">
                        Learn Mode
                    </Button>
                    <Button variant={mode === "practice" ? "default" : "outline"} onClick={startPractice}>
                        Practice Mode
                    </Button>
                </div>
            </div>

            {/* Learn Mode */}
            {mode === "learn" && (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <Button onClick={prevNumber} variant="outline" className="flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        <span className="text-2xl font-bold text-blue-600">{currentNumber}</span>
                        <Button onClick={nextNumber} variant="outline" className="flex items-center">
                            Next <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>

                    <Progress value={calculateProgress()} className="mb-8" />

                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={currentNumber}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-6xl font-bold text-blue-600 mb-6">{currentNumber}</h3>
                        <img
                            src={getNumberImageUrl(currentNumber) || "/placeholder.svg"}
                            alt={`ASL number ${currentNumber}`}
                            className="w-64 h-64 object-contain mb-6"
                        />
                        <Button onClick={() => setShowHint(!showHint)} variant="ghost">
                            {showHint ? "Hide Hint" : "Show Hint"}
                        </Button>
                        {showHint && (
                            <div className="text-gray-600 mt-4 text-center max-w-md">
                                {currentNumber === 0 && "Make a closed fist, like the letter 'O'."}
                                {currentNumber === 1 && "Point your index finger up, other fingers closed."}
                                {currentNumber === 2 && "Extend your index and middle fingers, other fingers closed."}
                                {currentNumber === 3 && "Extend your thumb, index, and middle fingers."}
                                {currentNumber === 4 && "Extend four fingers with thumb tucked."}
                                {currentNumber === 5 && "Extend all five fingers with palm facing forward."}
                                {currentNumber === 6 && "Extend thumb and pinky, other fingers closed, like 'Y' handshape."}
                                {currentNumber === 7 &&
                                    "Extend thumb, index, and middle fingers, with ring finger crossed over middle."}
                                {currentNumber === 8 && "Extend thumb, index, and middle fingers, with both ring and pinky crossed."}
                                {currentNumber === 9 && "Make a closed 'F' handshape."}
                                {currentNumber === 10 && "Shake a '10' handshape (closed fist with thumb extended)."}
                                {currentNumber >= 11 &&
                                    currentNumber <= 15 &&
                                    "Start with a '10' handshape, then add 1-5 with your other hand."}
                                {currentNumber >= 16 &&
                                    currentNumber <= 19 &&
                                    "Start with a '10' handshape, then add 6-9 with your other hand."}
                                {currentNumber === 20 && "Sign '2' then '0'."}
                                {currentNumber === 30 && "Sign '3' then '0'."}
                                {currentNumber === 40 && "Sign '4' then '0'."}
                                {currentNumber === 50 && "Sign '5' then '0'."}
                                {currentNumber === 60 && "Sign '6' then '0'."}
                                {currentNumber === 70 && "Sign '7' then '0'."}
                                {currentNumber === 80 && "Sign '8' then '0'."}
                                {currentNumber === 90 && "Sign '9' then '0'."}
                                {currentNumber === 100 && "Sign '1' then '0' then '0'."}
                                {currentNumber > 20 &&
                                    currentNumber < 100 &&
                                    currentNumber !== 30 &&
                                    currentNumber !== 40 &&
                                    currentNumber !== 50 &&
                                    currentNumber !== 60 &&
                                    currentNumber !== 70 &&
                                    currentNumber !== 80 &&
                                    currentNumber !== 90 &&
                                    "Sign the tens digit, then the ones digit."}
                            </div>
                        )}
                    </motion.div>

                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">Number Patterns in ASL</h3>
                        <ul className="list-disc pl-6 text-gray-700">
                            <li>Numbers 1-5 use the corresponding number of fingers</li>
                            <li>Numbers 6-9 have unique handshapes</li>
                            <li>For numbers 11-15, sign 10 with one hand and 1-5 with the other</li>
                            <li>For numbers 16-19, sign 10 with one hand and 6-9 with the other</li>
                            <li>For multiples of 10 (20, 30, etc.), sign the first digit, then zero</li>
                            <li>For other two-digit numbers, sign the tens digit, then the ones digit</li>
                        </ul>
                    </div>
                </>
            )}

            {/* Practice Mode */}
            {mode === "practice" && (
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            Score: {score}/{attempts}
                        </Badge>
                        <Button size="sm" onClick={startPractice} variant="outline">
                            Restart
                        </Button>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`practice-${currentNumber}-${isCorrect}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center"
                        >
                            {isCorrect === null ? (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-6">What number is this?</h3>
                                    <img
                                        src={getNumberImageUrl(currentNumber) || "/placeholder.svg"}
                                        alt="ASL number"
                                        className="w-64 h-64 object-contain mb-6"
                                    />
                                    <div className="w-full max-w-md mb-4">
                                        <input
                                            type="number"
                                            value={userGuess}
                                            onChange={(e) => setUserGuess(e.target.value)}
                                            className="border border-gray-300 rounded-md px-4 py-2 w-full text-center text-xl"
                                            placeholder="Enter number"
                                        />
                                    </div>
                                    <Button onClick={checkGuess} size="lg">
                                        Check Answer
                                    </Button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`p-6 rounded-md mb-6 text-center ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} w-full max-w-md`}
                                    >
                                        {isCorrect ? (
                                            <div className="flex items-center justify-center">
                                                <CheckCircle className="h-6 w-6 mr-2" />
                                                <span className="text-lg">Correct! The number is {currentNumber}.</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center mb-2">
                                                    <XCircle className="h-6 w-6 mr-2" />
                                                    <span className="text-lg">Incorrect!</span>
                                                </div>
                                                <div className="text-lg">
                                                    The correct number is <span className="font-bold">{currentNumber}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <Button onClick={nextPracticeNumber} size="lg">
                                        Next Number
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            {/* Add a new interactive game section */}
            <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8 mt-8">
                <h3 className="text-xl font-bold text-green-800 mb-4">Interactive Number Game</h3>
                <p className="text-gray-700 mb-4">
                    Practice your number recognition skills with these interactive videos and games.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold mb-2">ASL Numbers 1-20 Video</h4>
                        <div className="aspect-video rounded-lg overflow-hidden">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/koOvrKENdH8"
                                title="ASL Numbers 1-20"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Number Memory Challenge</h4>
                        <div className="bg-white p-4 rounded-lg shadow-inner text-center">
                            <p className="mb-4">Test your memory by watching sequences of ASL numbers.</p>
                            <Button
                                onClick={() =>
                                    window.open("https://www.signlanguageforum.com/asl/fingerspelling/fingerspelling-game/", "_blank")
                                }
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Play Number Games
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add a math practice section for advanced learners */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8 mt-8">
                <h3 className="text-xl font-bold text-blue-800 mb-4">ASL Math Practice</h3>
                <p className="text-gray-700 mb-4">
                    Once you're comfortable with numbers, try solving simple math problems in ASL!
                </p>

                <div className="bg-white p-4 rounded-lg shadow-inner">
                    <h4 className="font-semibold mb-2 text-center">Try to solve these math problems in ASL:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                            <p className="font-bold">5 + 3 = ?</p>
                            <p className="text-sm text-gray-600 mt-2">Sign "5", "plus", "3", "equals", then "8"</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                            <p className="font-bold">10 - 4 = ?</p>
                            <p className="text-sm text-gray-600 mt-2">Sign "10", "minus", "4", "equals", then "6"</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                            <p className="font-bold">3 × 7 = ?</p>
                            <p className="text-sm text-gray-600 mt-2">Sign "3", "times", "7", "equals", then "21"</p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Button
                            onClick={() => window.open("https://www.youtube.com/watch?v=t_APCbpUy6o", "_blank")}
                            variant="outline"
                        >
                            Learn ASL Math Signs
                        </Button>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/FingerspellingPractice")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/lessons/BasicGreetings")}>
                    Next Lesson →
                </Button>
            </div>
        </LessonLayout>
    )
}

export default NumbersRecognition

