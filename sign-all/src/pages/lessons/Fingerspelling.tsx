import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const Fingerspelling = () => {
    const router = useRouter()
    const [currentLetter, setCurrentLetter] = useState("A")
    const [showHint, setShowHint] = useState(false)
    const [progress, setProgress] = useState(0)
    const [practiceMode, setPracticeMode] = useState(false)
    const [userGuess, setUserGuess] = useState("")
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

    // Get the index of the current letter
    const currentIndex = alphabet.indexOf(currentLetter)

    // Calculate progress percentage
    useEffect(() => {
        setProgress(((currentIndex + 1) / alphabet.length) * 100)
    }, [currentIndex])

    // Function to go to the next letter
    const nextLetter = () => {
        if (currentIndex < alphabet.length - 1) {
            setCurrentLetter(alphabet[currentIndex + 1])
            setShowHint(false)
            setUserGuess("")
            setIsCorrect(null)
        } else {
            // If we've reached the end, go to practice mode
            setPracticeMode(true)
        }
    }

    // Function to go to the previous letter
    const prevLetter = () => {
        if (currentIndex > 0) {
            setCurrentLetter(alphabet[currentIndex - 1])
            setShowHint(false)
            setUserGuess("")
            setIsCorrect(null)
        }
    }

    // Function to check user's guess
    const checkGuess = () => {
        if (userGuess.toUpperCase() === currentLetter) {
            setIsCorrect(true)
            setTimeout(() => {
                nextLetter()
            }, 1000)
        } else {
            setIsCorrect(false)
        }
    }

    // Function to get a random letter for practice
    const getRandomLetter = () => {
        const randomIndex = Math.floor(Math.random() * alphabet.length)
        setCurrentLetter(alphabet[randomIndex])
        setUserGuess("")
        setIsCorrect(null)
    }

    return (
        <LessonLayout title="Learning the ASL Alphabet (A-Z)">
            {!practiceMode ? (
                <>
                    {/* Learning Mode */}
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">Explore the ASL Alphabet</h2>
                        <p className="text-gray-700">
                            The ASL alphabet uses handshapes to represent each letter. This is called fingerspelling and is used for
                            spelling names, places, or words that don't have a specific sign.
                        </p>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <Button onClick={prevLetter} disabled={currentIndex === 0} variant="outline">
                            Previous Letter
                        </Button>
                        <span className="text-2xl font-bold text-blue-600">
                            {currentIndex + 1} / {alphabet.length}
                        </span>
                        <Button onClick={nextLetter} variant="outline">
                            Next Letter
                        </Button>
                    </div>

                    <Progress value={progress} className="mb-8" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={currentLetter}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-6xl font-bold text-blue-600 mb-4">{currentLetter}</h3>
                            <img
                                src={`https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/${currentLetter.toLowerCase()}.gif`}
                                alt={`ASL letter ${currentLetter}`}
                                className="w-48 h-48 object-contain mb-4"
                            />
                            <Button onClick={() => setShowHint(!showHint)} variant="ghost">
                                {showHint ? "Hide Hint" : "Show Hint"}
                            </Button>
                            {showHint && (
                                <p className="text-gray-600 mt-2 text-center">
                                    {currentLetter === "A" && "Make a fist with your thumb resting on the side."}
                                    {currentLetter === "B" && "Hold your hand flat with fingers together and thumb tucked."}
                                    {currentLetter === "C" && "Curve your hand into a C shape."}
                                    {currentLetter === "D" && "Make a circle with thumb and index finger, other fingers up."}
                                    {currentLetter === "E" && "Curl your fingers in, thumb tucked under."}
                                    {currentLetter === "F" && "Connect thumb and index finger, other fingers up."}
                                    {currentLetter === "G" && "Point index finger, thumb extended, other fingers closed."}
                                    {currentLetter === "H" && "Extend index and middle fingers together, other fingers closed."}
                                    {currentLetter === "I" && "Make a fist with pinky finger extended."}
                                    {currentLetter === "J" && "Extend pinky finger and trace a J shape."}
                                    {currentLetter === "K" && "Index finger up, middle finger and thumb connected, other fingers up."}
                                    {currentLetter === "L" && "Extend thumb and index finger to form an L shape."}
                                    {currentLetter === "M" && "Place thumb between ring and pinky fingers of a closed fist."}
                                    {currentLetter === "N" && "Place thumb between middle and ring fingers of a closed fist."}
                                    {currentLetter === "O" && "Form a circle with all fingers and thumb."}
                                    {currentLetter === "P" && "Point middle finger down, index finger and thumb extended."}
                                    {currentLetter === "Q" && "Point down with index finger, thumb and index form a circle."}
                                    {currentLetter === "R" && "Cross index and middle fingers."}
                                    {currentLetter === "S" && "Make a fist with thumb wrapped over fingers."}
                                    {currentLetter === "T" && "Make a fist with thumb between index and middle fingers."}
                                    {currentLetter === "U" && "Extend index and middle fingers together."}
                                    {currentLetter === "V" && "Extend index and middle fingers in a V shape."}
                                    {currentLetter === "W" && "Extend index, middle, and ring fingers."}
                                    {currentLetter === "X" && "Make a hook with index finger, other fingers closed."}
                                    {currentLetter === "Y" && "Extend thumb and pinky, other fingers closed."}
                                    {currentLetter === "Z" && "Trace a Z shape with index finger."}
                                </p>
                            )}
                        </motion.div>

                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Practice Recognition</h3>
                            <p className="text-gray-700 mb-4">
                                Look at the handshape and try to identify the letter. Type your answer below.
                            </p>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={userGuess}
                                    onChange={(e) => setUserGuess(e.target.value)}
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                    maxLength={1}
                                    placeholder="Enter letter"
                                />
                                <Button onClick={checkGuess}>Check</Button>
                            </div>
                            {isCorrect !== null && (
                                <div
                                    className={`p-3 rounded-md ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                >
                                    {isCorrect ? "✓ Correct!" : `✗ Incorrect. The correct answer is ${currentLetter}.`}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">Tips for Learning Fingerspelling</h3>
                        <ul className="list-disc pl-6 text-gray-700">
                            <li>Practice regularly, even just for a few minutes each day</li>
                            <li>Focus on the overall handshape rather than individual finger positions</li>
                            <li>Practice both receptive (reading) and expressive (producing) fingerspelling</li>
                            <li>Start slow and gradually increase your speed</li>
                            <li>Use real words to practice rather than random letters</li>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    {/* Practice Mode */}
                    <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Practice Mode</h2>
                        <p className="text-gray-700">
                            Now let's practice recognizing random letters. Look at the handshape and type the corresponding letter.
                        </p>
                    </div>

                    <div className="flex flex-col items-center mb-8">
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={currentLetter}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={`https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/${currentLetter.toLowerCase()}.gif`}
                                alt={`ASL letter ${currentLetter}`}
                                className="w-64 h-64 object-contain mb-4"
                            />
                        </motion.div>

                        <div className="flex gap-2 mb-4 w-full max-w-md">
                            <input
                                type="text"
                                value={userGuess}
                                onChange={(e) => setUserGuess(e.target.value)}
                                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                maxLength={1}
                                placeholder="Enter letter"
                            />
                            <Button onClick={checkGuess}>Check</Button>
                        </div>

                        {isCorrect !== null && (
                            <div
                                className={`p-3 rounded-md w-full max-w-md ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                                {isCorrect ? "✓ Correct!" : `✗ Incorrect. The correct answer is ${currentLetter}.`}
                            </div>
                        )}

                        <Button onClick={getRandomLetter} className="mt-4">
                            Next Random Letter
                        </Button>
                    </div>
                </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/HandShapes")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/lessons/FingerspellingPractice")}>
                    Next Lesson →
                </Button>
            </div>
        </LessonLayout>
    )
}

export default Fingerspelling

