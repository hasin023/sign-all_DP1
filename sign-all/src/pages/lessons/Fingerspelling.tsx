import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import SignDetector from "@/components/common/sign-detector"

const FingerspellingWithDetection = () => {
    const router = useRouter()
    const [currentLetter, setCurrentLetter] = useState("A")
    const [showHint, setShowHint] = useState(false)
    const [progress, setProgress] = useState(0)
    const [practiceMode, setPracticeMode] = useState(false)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [lastDetectedSign, setLastDetectedSign] = useState("")
    const [showLetterSelector, setShowLetterSelector] = useState(false)

    // Use a ref to track the current letter to avoid closure issues
    const currentLetterRef = useRef("A")

    // Update the ref whenever currentLetter changes
    useEffect(() => {
        currentLetterRef.current = currentLetter
    }, [currentLetter])

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
            console.log(`Moving from ${currentLetter} to ${alphabet[currentIndex + 1]}`)
            setCurrentLetter(alphabet[currentIndex + 1])
            setShowHint(false)
            setIsCorrect(null)
            setLastDetectedSign("")
        } else {
            // If we've reached the end, go to practice mode
            console.log("Reached end of alphabet, switching to practice mode")
            setPracticeMode(true)
        }
    }

    // Function to go to the previous letter
    const prevLetter = () => {
        if (currentIndex > 0) {
            setCurrentLetter(alphabet[currentIndex - 1])
            setShowHint(false)
            setIsCorrect(null)
            setLastDetectedSign("")
        }
    }

    // Function to jump to a specific letter
    const jumpToLetter = (letter: string) => {
        setCurrentLetter(letter)
        setShowHint(false)
        setIsCorrect(null)
        setLastDetectedSign("")
        setShowLetterSelector(false)
    }

    // Create a ref for the timeout
    const timeoutRef = useRef<number | undefined>(undefined)

    // Function to handle detected signs
    const handleDetectedSign = (word: string) => {
        if (!word) return // Skip empty detections

        console.log("Detection received:", word)
        setLastDetectedSign(word)

        // Convert both to uppercase for case-insensitive comparison
        const detectedUpper = word.toUpperCase().trim()

        // Use the ref value to get the current letter state
        const currentUpper = currentLetterRef.current.toUpperCase().trim()

        console.log(`Comparing: "${detectedUpper}" with "${currentUpper}"`)
        console.log("Are they equal?", detectedUpper === currentUpper)

        // If the detected sign matches the current letter we're practicing
        if (detectedUpper === currentUpper) {
            console.log("MATCH FOUND! Setting isCorrect to true")
            setIsCorrect(true)

            // Clear any previous timeouts to prevent race conditions
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            // Store the function to execute in the timeout
            const moveToNextLetter = () => {
                console.log("Moving to next letter")
                const currentIdx = alphabet.indexOf(currentLetterRef.current)
                if (currentIdx < alphabet.length - 1) {
                    const nextLet = alphabet[currentIdx + 1]
                    console.log(`Setting current letter from ${currentLetterRef.current} to ${nextLet}`)
                    setCurrentLetter(nextLet)
                    setShowHint(false)
                    setIsCorrect(null)
                    setLastDetectedSign("")
                } else {
                    // If we've reached the end, go to practice mode
                    console.log("Reached end of alphabet, switching to practice mode")
                    setPracticeMode(true)
                }
            }

            // Set a new timeout to move to the next letter
            timeoutRef.current = window.setTimeout(moveToNextLetter, 1500)
        } else {
            console.log("No match. Setting isCorrect to false")
            setIsCorrect(false)
        }
    }

    // Clean up the timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    // Function to get a random letter for practice
    const getRandomLetter = () => {
        const randomIndex = Math.floor(Math.random() * alphabet.length)
        setCurrentLetter(alphabet[randomIndex])
        setIsCorrect(null)
        setLastDetectedSign("")
    }

    // Replace the image URL generation with real URLs from lifeprint.com
    const getLetterImageUrl = (letter: string) => {
        return `https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/${letter.toLowerCase()}.gif`
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
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-blue-600">
                                {currentIndex + 1} / {alphabet.length}
                            </span>
                            <Button onClick={() => setShowLetterSelector(!showLetterSelector)} variant="ghost" className="text-sm">
                                {showLetterSelector ? "Hide Letter Selector" : "Jump to Letter"}
                            </Button>
                        </div>
                        <Button onClick={nextLetter} variant="outline">
                            Next Letter
                        </Button>
                    </div>

                    {showLetterSelector && (
                        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {alphabet.map((letter) => (
                                    <Button
                                        key={letter}
                                        onClick={() => jumpToLetter(letter)}
                                        variant={letter === currentLetter ? "default" : "outline"}
                                        className="w-10 h-10 p-0"
                                    >
                                        {letter}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    <Progress value={progress} className="mb-8" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={currentLetter}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-6xl font-bold text-blue-600 mb-4">{currentLetter}</h3>
                            <img
                                src={getLetterImageUrl(currentLetter) || "/placeholder.svg"}
                                alt={`ASL letter ${currentLetter}`}
                                className="w-48 h-48 object-contain mb-4"
                            />
                            <div className="mt-4 w-full max-w-xs">
                                <Button
                                    onClick={() =>
                                        window.open(`https://fingerspelling.xyz/letter/${currentLetter.toLowerCase()}`, "_blank")
                                    }
                                    variant="outline"
                                    className="w-full"
                                >
                                    View 3D Model
                                </Button>
                                <p className="text-xs text-gray-500 mt-1 text-center">Opens fingerspelling.xyz in a new tab</p>
                            </div>
                            <Button onClick={() => setShowHint(!showHint)} variant="ghost" className="mt-4">
                                {showHint ? "Hide Hint" : "Show Hint"}
                            </Button>
                            {showHint && (
                                <>
                                    <p className="text-gray-600 mt-2 text-center">
                                        {currentLetter === "A" && "Make a fist with your thumb resting on the side."}
                                        {currentLetter === "B" && "Hold your hand flat with fingers together and thumb tucked."}
                                        {currentLetter === "C" && "Curve your hand into a C shape."}
                                        {/* ... other letter hints ... */}
                                    </p>
                                    <div className="mt-4 bg-blue-50 p-3 rounded-lg w-full max-w-md">
                                        <h4 className="font-semibold text-blue-800">Memory Aid:</h4>
                                        <p className="text-sm text-gray-700">
                                            {currentLetter === "A" && "Think of a closed fist like an 'A' with a thumb on the side."}
                                            {currentLetter === "B" && "Like holding up a 'B'ook with your palm facing forward."}
                                            {currentLetter === "C" && "Shaped exactly like the letter C."}
                                            {/* ... other memory aids ... */}
                                        </p>
                                    </div>
                                </>
                            )}
                        </motion.div>

                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                            <p className="text-gray-700 mb-4 font-semibold">
                                Make the sign for letter "{currentLetter}" and our AI will detect it.
                            </p>

                            <div className="mb-6">
                                <SignDetector currentLetter={currentLetter} onDetection={handleDetectedSign} />
                            </div>

                            {lastDetectedSign && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="font-medium">
                                        Last detected: <span className="text-blue-700 font-bold">{lastDetectedSign}</span>
                                    </p>
                                </div>
                            )}

                            {isCorrect !== null && (
                                <div
                                    className={`mt-4 p-3 rounded-md ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                >
                                    {isCorrect ? "✓ Correct!" : `✗ Try again. Make the sign for ${currentLetter}.`}
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
                            Now let's practice random letters. Make the sign for the letter shown and our AI will detect it.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={currentLetter}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-4xl font-bold text-blue-600 mb-4">Sign the letter: {currentLetter}</h3>
                            <img
                                src={`https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/${currentLetter.toLowerCase()}.gif`}
                                alt={`ASL letter ${currentLetter}`}
                                className="w-64 h-64 object-contain mb-4"
                            />
                            <Button onClick={getRandomLetter} className="mt-4 w-full max-w-xs">
                                Next Random Letter
                            </Button>
                        </motion.div>

                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Camera Detection</h3>

                            <div className="mb-6">
                                <SignDetector currentLetter={currentLetter} onDetection={handleDetectedSign} />
                            </div>

                            {lastDetectedSign && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="font-medium">
                                        Last detected: <span className="text-blue-700 font-bold">{lastDetectedSign}</span>
                                    </p>
                                </div>
                            )}

                            {isCorrect !== null && (
                                <div
                                    className={`mt-4 p-3 rounded-md ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                >
                                    {isCorrect ? "✓ Correct!" : `✗ Try again. Make the sign for ${currentLetter}.`}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 bg-purple-50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-purple-800 mb-4">Speed Challenge</h3>
                        <p className="text-gray-700 mb-4">
                            How fast can you sign the alphabet? Try to sign all 26 letters as quickly as possible!
                        </p>
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

export default FingerspellingWithDetection