"use client"

import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const EverydayWords = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("learn")
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [userAnswer, setUserAnswer] = useState("")
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [score, setScore] = useState(0)
    const [attempts, setAttempts] = useState(0)
    const [matchPairs, setMatchPairs] = useState<string[][]>([])
    const [selectedPair, setSelectedPair] = useState<string | null>(null)
    const [matchedPairs, setMatchedPairs] = useState<string[]>([])
    const [gameCompleted, setGameCompleted] = useState(false)
    const [gameStartTime, setGameStartTime] = useState<number | null>(null)
    const [gameEndTime, setGameEndTime] = useState<number | null>(null)

    // Everyday words data
    const everydayWords = [
        {
            word: "Yes",
            description: "To express agreement or affirmation",
            imageUrl: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/yes.svg",
        },
        {
            word: "No",
            description: "To express disagreement or negation",
            imageUrl: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/no.svg",
        },
        {
            word: "Sorry",
            description: "To express regret or apologize",
            imageUrl: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/sorry.svg",
        },
        {
            word: "Help",
            description: "To request or offer assistance",
            imageUrl: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/help.svg",
        },
        {
            word: "Want",
            description: "To express desire for something",
            imageUrl: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/want.svg",
        },
        { word: "Need", description: "To express necessity", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsFQujyNHZMDQKKCXU1gPNJx-0bSznWSoY2Q&s" },
        {
            word: "Like",
            description: "To express preference or enjoyment",
            imageUrl: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/like.svg",
        },
        {
            word: "Don't like",
            description: "To express dislike or aversion",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlWyBNdu_-dD0rUXlyh1DejWtC0T4LGXAaIQ&s",
        },
    ]

    // Initialize matching game
    useEffect(() => {
        if (activeTab === "match") {
            initializeMatchGame()
        }
    }, [activeTab])

    // Initialize the matching game
    const initializeMatchGame = () => {
        // Create pairs of words and their meanings
        const pairs: string[][] = []
        const usedWords = new Set()

        // Select 4 random words for the game
        while (pairs.length < 4 && pairs.length < everydayWords.length) {
            const randomIndex = Math.floor(Math.random() * everydayWords.length)
            const word = everydayWords[randomIndex].word

            if (!usedWords.has(word)) {
                usedWords.add(word)
                pairs.push([word, everydayWords[randomIndex].description])
            }
        }

        setMatchPairs(pairs)
        setSelectedPair(null)
        setMatchedPairs([])
        setGameCompleted(false)
        setGameStartTime(Date.now())
        setGameEndTime(null)
    }

    // Handle pair selection in matching game
    const handlePairSelection = (item: string) => {
        // If this item is already matched, do nothing
        if (matchedPairs.includes(item)) {
            return
        }

        // If no item is selected yet, select this one
        if (selectedPair === null) {
            setSelectedPair(item)
            return
        }

        // If an item is already selected, check if they match
        const selectedPairIndex = matchPairs.findIndex((pair) => pair.includes(selectedPair))
        const currentItemIndex = matchPairs.findIndex((pair) => pair.includes(item))

        // If they're from the same pair and not the same item
        if (selectedPairIndex === currentItemIndex && selectedPair !== item) {
            // They match!
            setMatchedPairs((prev) => [...prev, selectedPair, item])

            // Check if game is completed
            if (matchedPairs.length + 2 === matchPairs.length * 2) {
                setGameCompleted(true)
                setGameEndTime(Date.now())
            }
        }

        // Reset selection
        setSelectedPair(null)
    }

    // Move to the next word in learn mode
    const nextWord = () => {
        if (currentWordIndex < everydayWords.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1)
        } else {
            setCurrentWordIndex(0)
        }
    }

    // Move to the previous word in learn mode
    const prevWord = () => {
        if (currentWordIndex > 0) {
            setCurrentWordIndex(currentWordIndex - 1)
        } else {
            setCurrentWordIndex(everydayWords.length - 1)
        }
    }

    // Check the user's answer in quiz mode
    const checkAnswer = () => {
        const correct = userAnswer.toLowerCase() === everydayWords[currentWordIndex].word.toLowerCase()
        setIsCorrect(correct)
        setAttempts((prev) => prev + 1)

        if (correct) {
            setScore((prev) => prev + 1)
        }
    }

    // Reset the quiz
    const resetQuiz = () => {
        setCurrentWordIndex(0)
        setUserAnswer("")
        setIsCorrect(null)
        setScore(0)
        setAttempts(0)
    }

    // Calculate progress percentage in learn mode
    const calculateProgress = () => {
        return ((currentWordIndex + 1) / everydayWords.length) * 100
    }

    return (
        <LessonLayout title="Everyday Words (Yes, No, Sorry, Help)">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Essential Everyday Words in ASL</h2>
                <p className="text-gray-700">
                    These common words are essential for basic communication in ASL. Learning these signs will help you express
                    basic needs, preferences, and responses in everyday conversations.
                </p>
            </div>

            {/* Mode Tabs */}
            <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                    <TabsTrigger value="quiz">Quiz</TabsTrigger>
                    <TabsTrigger value="match">Matching Game</TabsTrigger>
                </TabsList>

                {/* Learn Mode */}
                <TabsContent value="learn">
                    <div className="flex justify-between items-center mb-4">
                        <Button onClick={prevWord} variant="outline" className="flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        <span className="text-2xl font-bold text-blue-600">
                            {currentWordIndex + 1} / {everydayWords.length}
                        </span>
                        <Button onClick={nextWord} variant="outline" className="flex items-center">
                            Next <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>

                    <Progress value={calculateProgress()} className="mb-8" />

                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-lg mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`learn-${currentWordIndex}`}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col items-center text-center">
                                <h3 className="text-3xl font-bold text-blue-600 mb-4">
                                    {everydayWords[currentWordIndex].word}
                                </h3>
                                <div className="w-64 h-64 flex justify-center items-center mb-4">
                                    <img
                                        src={everydayWords[currentWordIndex].imageUrl || "/placeholder.svg"}
                                        alt={`ASL sign for ${everydayWords[currentWordIndex].word}`}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            </div>


                            <div className="flex flex-col justify-center">

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Description</h4>
                                    <p className="text-gray-700 mb-4">{everydayWords[currentWordIndex].description}</p>

                                    <h4 className="text-xl font-semibold text-gray-800 mb-2">How to Sign</h4>
                                    <p className="text-gray-700">
                                        {currentWordIndex === 0 &&
                                            "Make a fist with your dominant hand, then bob your hand up and down as if nodding your head."}
                                        {currentWordIndex === 1 && "Extend your index and middle fingers, then tap them together."}
                                        {currentWordIndex === 2 &&
                                            "Make a fist with your dominant hand, then rub it in a circular motion on your chest."}
                                        {currentWordIndex === 3 &&
                                            "Make a thumbs up with your non-dominant hand, then place your dominant hand under it and lift both hands up."}
                                        {currentWordIndex === 4 &&
                                            "Hold your hands in front of you with fingers spread, then pull them toward your body."}
                                        {currentWordIndex === 5 && "Both hands in claw shape, pull down toward your body."}
                                        {currentWordIndex === 6 &&
                                            "Extend your thumb and index finger from a fist on both hands, then bring your dominant hand down onto your non-dominant hand."}
                                        {currentWordIndex === 7 &&
                                            "Sign 'like' then shake your head and change your facial expression to negative."}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">Practice Tips</h3>
                        <ul className="list-disc pl-6 text-gray-700">
                            <li>Practice these signs in front of a mirror to see your own movements</li>
                            <li>Use appropriate facial expressions - they're an essential part of ASL grammar</li>
                            <li>Try using these words in simple sentences</li>
                            <li>Practice with a friend or family member for immediate feedback</li>
                        </ul>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-8 mt-8">
                        <h3 className="text-xl font-bold text-purple-800 mb-4">Learn in Context</h3>
                        <p className="text-gray-700 mb-4">Watch how these everyday words are used in real conversations.</p>

                        <div className="aspect-video rounded-lg overflow-hidden mb-4">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/v1desDduz5M"
                                title="ASL Common Phrases"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Observation Exercise:</h4>
                            <p className="text-gray-700 mb-2">
                                As you watch the video, try to identify these everyday words being used. Note how facial expressions and
                                body language add meaning to the signs.
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                <li>How does the signer's expression change with "yes" versus "no"?</li>
                                <li>Notice how "want" and "need" are signed differently despite having similar meanings</li>
                                <li>Pay attention to how negation is expressed in "don't like"</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-green-800 mb-4">Sentence Building Practice</h3>
                        <p className="text-gray-700 mb-4">Practice combining everyday words to create simple sentences in ASL.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold mb-3">Basic Sentence Patterns:</h4>
                                <ul className="space-y-3">
                                    <li className="p-2 bg-gray-50 rounded">
                                        <p className="font-medium">I like coffee.</p>
                                        <p className="text-sm text-gray-600 mt-1">Sign: ME - LIKE - COFFEE</p>
                                    </li>
                                    <li className="p-2 bg-gray-50 rounded">
                                        <p className="font-medium">I need help.</p>
                                        <p className="text-sm text-gray-600 mt-1">Sign: ME - NEED - HELP</p>
                                    </li>
                                    <li className="p-2 bg-gray-50 rounded">
                                        <p className="font-medium">I don't like vegetables.</p>
                                        <p className="text-sm text-gray-600 mt-1">Sign: ME - DON'T-LIKE - VEGETABLE</p>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold mb-3">Try creating these sentences:</h4>
                                <ul className="space-y-3">
                                    <li className="p-2 bg-gray-50 rounded">
                                        <p className="font-medium">Yes, I want water.</p>
                                        <p className="text-sm text-gray-600 mt-1 opacity-0 hover:opacity-100 transition-opacity">
                                            YES - ME - WANT - WATER
                                        </p>
                                        <p className="text-xs text-gray-500 italic">Hover to see the answer</p>
                                    </li>
                                    <li className="p-2 bg-gray-50 rounded">
                                        <p className="font-medium">No, I don't need help.</p>
                                        <p className="text-sm text-gray-600 mt-1 opacity-0 hover:opacity-100 transition-opacity">
                                            NO - ME - DON'T-NEED - HELP
                                        </p>
                                        <p className="text-xs text-gray-500 italic">Hover to see the answer</p>
                                    </li>
                                    <li className="p-2 bg-gray-50 rounded">
                                        <p className="font-medium">I'm sorry, I don't like pizza.</p>
                                        <p className="text-sm text-gray-600 mt-1 opacity-0 hover:opacity-100 transition-opacity">
                                            ME - SORRY - ME - DON'T-LIKE - PIZZA
                                        </p>
                                        <p className="text-xs text-gray-500 italic">Hover to see the answer</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Quiz Mode */}
                <TabsContent value="quiz">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                Score: {score}/{attempts}
                            </Badge>
                            <Button size="sm" onClick={resetQuiz} variant="outline" className="flex items-center">
                                <RefreshCw className="h-4 w-4 mr-1" /> Reset Quiz
                            </Button>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`quiz-${currentWordIndex}-${isCorrect}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col items-center"
                            >
                                {isCorrect === null ? (
                                    <>
                                        <h3 className="text-xl font-semibold text-gray-700 mb-6">What word is being signed?</h3>
                                        <img
                                            src={everydayWords[currentWordIndex].imageUrl || "/placeholder.svg"}
                                            alt="ASL sign"
                                            className="w-64 h-64 object-contain mb-6"
                                        />
                                        <div className="w-full max-w-md mb-4">
                                            <input
                                                type="text"
                                                value={userAnswer}
                                                onChange={(e) => setUserAnswer(e.target.value)}
                                                className="border border-gray-300 rounded-md px-4 py-2 w-full text-center text-xl"
                                                placeholder="Enter word"
                                            />
                                        </div>
                                        <Button onClick={checkAnswer} size="lg">
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
                                                    <span className="text-lg">
                                                        Correct! The word is "{everydayWords[currentWordIndex].word}".
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center mb-2">
                                                        <XCircle className="h-6 w-6 mr-2" />
                                                        <span className="text-lg">Incorrect!</span>
                                                    </div>
                                                    <div className="text-lg">
                                                        The correct word is{" "}
                                                        <span className="font-bold">"{everydayWords[currentWordIndex].word}"</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            onClick={() => {
                                                setUserAnswer("")
                                                setIsCorrect(null)
                                                setCurrentWordIndex((currentWordIndex + 1) % everydayWords.length)
                                            }}
                                            size="lg"
                                        >
                                            Next Word
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </TabsContent>

                {/* Matching Game */}
                <TabsContent value="match">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Match the words with their meanings</h3>
                            <Button size="sm" onClick={initializeMatchGame} variant="outline" className="flex items-center">
                                <RefreshCw className="h-4 w-4 mr-1" /> New Game
                            </Button>
                        </div>

                        {gameCompleted && gameStartTime && gameEndTime ? (
                            <div className="text-center p-6 bg-green-50 rounded-lg mb-6">
                                <h3 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    You completed the matching game in {Math.floor((gameEndTime - gameStartTime) / 1000)} seconds!
                                </p>
                                <Button onClick={initializeMatchGame}>Play Again</Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {/* Words */}
                                <div className="space-y-4">
                                    {matchPairs.map((pair, index) => (
                                        <div
                                            key={`word-${index}`}
                                            className={`p-4 rounded-lg cursor-pointer transition-all ${matchedPairs.includes(pair[0])
                                                ? "bg-green-100 border border-green-500"
                                                : selectedPair === pair[0]
                                                    ? "bg-blue-100 border border-blue-500"
                                                    : "bg-white border border-gray-300 hover:bg-gray-100"
                                                }`}
                                            onClick={() => handlePairSelection(pair[0])}
                                        >
                                            {pair[0]}
                                        </div>
                                    ))}
                                </div>

                                {/* Descriptions - shuffled */}
                                <div className="space-y-4">
                                    {matchPairs
                                        .map((pair) => pair[1])
                                        .sort(() => Math.random() - 0.5)
                                        .map((description, index) => (
                                            <div
                                                key={`desc-${index}`}
                                                className={`p-4 rounded-lg cursor-pointer transition-all ${matchedPairs.includes(description)
                                                    ? "bg-green-100 border border-green-500"
                                                    : selectedPair === description
                                                        ? "bg-blue-100 border border-blue-500"
                                                        : "bg-white border border-gray-300 hover:bg-gray-100"
                                                    }`}
                                                onClick={() => handlePairSelection(description)}
                                            >
                                                {description}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/BasicGreetings")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/lessons/QuestionWords")}>
                    Next Lesson →
                </Button>
            </div>
        </LessonLayout>
    )
}

export default EverydayWords

