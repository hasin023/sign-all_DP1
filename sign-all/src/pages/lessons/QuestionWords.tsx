import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, Play, Pause, RefreshCw } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useRouter } from "next/navigation"

const QuestionWords = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("learn")
    const [currentQuestionWord, setCurrentQuestionWord] = useState("who")
    const [showExample, setShowExample] = useState(false)
    const [draggedWord, setDraggedWord] = useState<string | null>(null)
    const [droppedWords, setDroppedWords] = useState<{ [key: string]: string }>({})
    const [isCorrect, setIsCorrect] = useState<{ [key: string]: boolean | null }>({})
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [score, setScore] = useState(0)
    const [videoPlaying, setVideoPlaying] = useState<string | null>(null)
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)

    // Question words data
    const questionWords = {
        who: {
            sign: "Touch your chin with the index finger of your dominant hand, then move it outward in a small arc.",
            examples: ["Who is your teacher?", "Who went to the store?", "Who signed that letter?"],
            imageUrl: "/placeholder.svg?height=200&width=200&text=Who",
            videoUrl: "https://www.youtube.com/embed/Hm4GtxOOIPY",
        },
        what: {
            sign: "Shake both hands with index fingers extended, palms facing up.",
            examples: ["What is your name?", "What happened yesterday?", "What do you want?"],
            imageUrl: "/placeholder.svg?height=200&width=200&text=What",
            videoUrl: "https://www.youtube.com/embed/Hm4GtxOOIPY",
        },
        when: {
            sign: "Point the index finger of your dominant hand toward your wrist (where a watch would be).",
            examples: ["When is the meeting?", "When did you arrive?", "When will you graduate?"],
            imageUrl: "/placeholder.svg?height=200&width=200&text=When",
            videoUrl: "https://www.youtube.com/embed/Hm4GtxOOIPY",
        },
        where: {
            sign: "Shake your dominant hand with index finger extended, moving it side to side.",
            examples: ["Where is the bathroom?", "Where do you live?", "Where did you put my keys?"],
            imageUrl: "/placeholder.svg?height=200&width=200&text=Where",
            videoUrl: "https://www.youtube.com/embed/Hm4GtxOOIPY",
        },
        why: {
            sign: "Touch your temple with the index finger of your dominant hand, then move it forward while changing to a Y handshape.",
            examples: ["Why are you late?", "Why did that happen?", "Why do you study ASL?"],
            imageUrl: "/placeholder.svg?height=200&width=200&text=Why",
            videoUrl: "https://www.youtube.com/embed/Hm4GtxOOIPY",
        },
    }

    // Conversation scenarios for practice
    const conversationScenarios = [
        {
            title: "At a Deaf Event",
            description: "Practice asking questions at a Deaf community gathering",
            questions: [
                { question: "What is your name?", answer: "My name is [your name]." },
                { question: "Where are you from?", answer: "I'm from [your location]." },
                {
                    question: "Why are you learning ASL?",
                    answer: "I'm learning ASL because I want to communicate with Deaf people.",
                },
            ],
        },
        {
            title: "At School/Work",
            description: "Practice asking questions in an educational or professional setting",
            questions: [
                { question: "When is the meeting?", answer: "The meeting is at 3 PM." },
                { question: "Who is the teacher?", answer: "The teacher is Ms. Johnson." },
                { question: "Where is the classroom?", answer: "The classroom is on the second floor." },
            ],
        },
        {
            title: "Making Plans",
            description: "Practice asking questions when making plans with friends",
            questions: [
                { question: "What movie do you want to watch?", answer: "I want to watch an action movie." },
                { question: "When should we meet?", answer: "Let's meet at 7 PM." },
                { question: "Where should we go for dinner?", answer: "Let's go to the Italian restaurant." },
            ],
        },
    ]

    // Drag and drop quiz data
    const dragDropQuizData = [
        { id: "sentence1", sentence: "_____ is your favorite color?", correctWord: "what" },
        { id: "sentence2", sentence: "_____ are you going to the store?", correctWord: "when" },
        { id: "sentence3", sentence: "_____ did you put my book?", correctWord: "where" },
        { id: "sentence4", sentence: "_____ is that person?", correctWord: "who" },
        { id: "sentence5", sentence: "_____ are you crying?", correctWord: "why" },
    ]

    // Handle drag start
    const handleDragStart = (word: string) => {
        setDraggedWord(word)
    }

    // Handle drop
    const handleDrop = (sentenceId: string) => {
        if (draggedWord) {
            const newDroppedWords = { ...droppedWords, [sentenceId]: draggedWord }
            setDroppedWords(newDroppedWords)
            setDraggedWord(null)

            // Check if this answer is correct
            const sentence = dragDropQuizData.find((item) => item.id === sentenceId)
            if (sentence) {
                const isAnswerCorrect = sentence.correctWord === draggedWord
                setIsCorrect((prev) => ({ ...prev, [sentenceId]: isAnswerCorrect }))
            }

            // Check if all questions are answered
            const allAnswered = dragDropQuizData.every((item) => newDroppedWords[item.id])
            if (allAnswered) {
                setQuizCompleted(true)
                // Calculate score
                const correctAnswers = Object.entries(newDroppedWords).filter(([id, word]) => {
                    const sentence = dragDropQuizData.find((item) => item.id === id)
                    return sentence && sentence.correctWord === word
                }).length
                setScore(correctAnswers)
            }
        }
    }

    // Reset the drag and drop quiz
    const resetQuiz = () => {
        setDroppedWords({})
        setIsCorrect({})
        setQuizCompleted(false)
        setScore(0)
    }

    // Toggle video playback
    const toggleVideo = (word: string) => {
        if (videoPlaying === word) {
            setVideoPlaying(null)
        } else {
            setVideoPlaying(word)
        }
    }

    return (
        <LessonLayout title="Basic Question Words (Who, What, When, Where, Why)">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Question Words in ASL</h2>
                <p className="text-gray-700">
                    Question words are essential for having conversations and gathering information. In ASL, questions are
                    typically accompanied by specific facial expressions, such as raised eyebrows for yes/no questions and
                    furrowed brows for "wh" questions.
                </p>
            </div>

            {/* Mode Tabs */}
            <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                    <TabsTrigger value="quiz">Quiz</TabsTrigger>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>

                {/* Learn Mode */}
                <TabsContent value="learn">
                    {/* Question Word Selection */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {Object.keys(questionWords).map((word) => (
                            <Button
                                key={word}
                                variant={currentQuestionWord === word ? "default" : "outline"}
                                onClick={() => {
                                    setCurrentQuestionWord(word)
                                    setShowExample(false)
                                    setVideoPlaying(null)
                                }}
                                className="capitalize"
                            >
                                {word}
                            </Button>
                        ))}
                    </div>

                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-lg mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`learn-${currentQuestionWord}`}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col items-center">
                                <h3 className="text-3xl font-bold text-blue-600 mb-4 capitalize">{currentQuestionWord}</h3>
                                <div className="relative w-full aspect-square mb-6">
                                    {videoPlaying === currentQuestionWord ? (
                                        <iframe
                                            src={questionWords[currentQuestionWord as keyof typeof questionWords].videoUrl}
                                            title={`ASL sign for ${currentQuestionWord}`}
                                            className="absolute inset-0 w-full h-full rounded-lg"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <img
                                            src={
                                                questionWords[currentQuestionWord as keyof typeof questionWords].imageUrl || "/placeholder.svg"
                                            }
                                            alt={`ASL sign for ${currentQuestionWord}`}
                                            className="w-full h-full object-contain rounded-lg"
                                        />
                                    )}
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        onClick={() => toggleVideo(currentQuestionWord)}
                                        variant="outline"
                                        className="flex items-center"
                                    >
                                        {videoPlaying === currentQuestionWord ? (
                                            <>
                                                <Pause className="h-4 w-4 mr-2" /> Pause Video
                                            </>
                                        ) : (
                                            <>
                                                <Play className="h-4 w-4 mr-2" /> Play Video
                                            </>
                                        )}
                                    </Button>
                                    <Button onClick={() => setShowExample(!showExample)} variant="outline">
                                        {showExample ? "Hide Examples" : "Show Examples"}
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">How to Sign</h4>
                                <p className="text-gray-700 mb-6">
                                    {questionWords[currentQuestionWord as keyof typeof questionWords].sign}
                                </p>

                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Facial Expression</h4>
                                <p className="text-gray-700 mb-6">
                                    When signing a question with "{currentQuestionWord}", furrow your eyebrows and tilt your head slightly
                                    forward. This non-manual marker is essential for indicating that you're asking a question.
                                </p>

                                {showExample && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 p-6 rounded-lg">
                                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Example Sentences</h4>
                                        <ul className="list-disc pl-6 text-gray-700">
                                            {questionWords[currentQuestionWord as keyof typeof questionWords].examples.map(
                                                (example, index) => (
                                                    <li key={index} className="mb-2">
                                                        {example}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">Important Note</h3>
                        <p className="text-gray-700">
                            In ASL, the question word often appears at the end of the sentence, unlike in English where it typically
                            comes at the beginning. For example, "What is your name?" in ASL would be signed as "YOUR NAME WHAT?"
                        </p>
                    </div>
                </TabsContent>

                {/* Quiz Mode - Drag and Drop */}
                <TabsContent value="quiz">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Fill in the blanks with the correct question word</h3>
                            <Button size="sm" onClick={resetQuiz} variant="outline" className="flex items-center">
                                <RefreshCw className="h-4 w-4 mr-1" /> Reset Quiz
                            </Button>
                        </div>

                        {/* Draggable Words */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                            {Object.keys(questionWords).map((word) => (
                                <div
                                    key={word}
                                    draggable
                                    onDragStart={() => handleDragStart(word)}
                                    className={`px-4 py-2 bg-blue-100 text-blue-800 rounded-md cursor-move capitalize ${Object.values(droppedWords).includes(word) ? "opacity-50" : "opacity-100"
                                        }`}
                                >
                                    {word}
                                </div>
                            ))}
                        </div>

                        {/* Sentences to Fill */}
                        <div className="space-y-6">
                            {dragDropQuizData.map((item) => (
                                <div
                                    key={item.id}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => handleDrop(item.id)}
                                    className={`p-4 rounded-lg border-2 ${droppedWords[item.id]
                                        ? isCorrect[item.id]
                                            ? "border-green-500 bg-green-50"
                                            : "border-red-500 bg-red-50"
                                        : "border-dashed border-gray-400 bg-gray-50"
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <div className="flex-grow text-lg">
                                            {item.sentence.replace(
                                                "_____",
                                                droppedWords[item.id] ? (
                                                    <span
                                                        className={`font-bold capitalize ${isCorrect[item.id] ? "text-green-600" : "text-red-600"}`}
                                                    >
                                                        {droppedWords[item.id]}
                                                    </span>
                                                ) : (
                                                    <span className="px-8 py-1 bg-gray-200 rounded">____</span>
                                                ),
                                            )}
                                        </div>
                                        {droppedWords[item.id] &&
                                            (isCorrect[item.id] ? (
                                                <CheckCircle className="h-6 w-6 text-green-600 ml-2" />
                                            ) : (
                                                <XCircle className="h-6 w-6 text-red-600 ml-2" />
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {quizCompleted && (
                            <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center">
                                <h3 className="text-2xl font-bold text-blue-800 mb-2">Quiz Completed!</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    You got {score} out of {dragDropQuizData.length} correct!
                                </p>
                                {score === dragDropQuizData.length ? (
                                    <p className="text-green-600 font-semibold">Perfect score! Great job!</p>
                                ) : (
                                    <Button onClick={resetQuiz}>Try Again</Button>
                                )}
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* Practice Mode - Conversation Scenarios */}
                <TabsContent value="practice">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Practice Conversation Scenarios</h3>

                        <Carousel className="w-full">
                            <CarouselContent>
                                {conversationScenarios.map((scenario, index) => (
                                    <CarouselItem key={index}>
                                        <Card>
                                            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                                                <CardTitle>{scenario.title}</CardTitle>
                                                <CardDescription>{scenario.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="pt-6">
                                                <div className="space-y-4">
                                                    {scenario.questions.map((item, qIndex) => (
                                                        <div key={qIndex} className="bg-gray-50 p-4 rounded-lg">
                                                            <p className="font-semibold mb-2">{item.question}</p>
                                                            <p className="text-gray-700">{item.answer}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex justify-center">
                                                <p className="text-sm text-gray-500">Practice signing both the questions and answers</p>
                                            </CardFooter>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="flex justify-center mt-4">
                                <CarouselPrevious className="mr-2" />
                                <CarouselNext />
                            </div>
                        </Carousel>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-green-800 mb-2">Practice Tips</h3>
                        <ul className="list-disc pl-6 text-gray-700">
                            <li>Record yourself signing these questions and answers</li>
                            <li>Practice with a partner, taking turns asking and answering questions</li>
                            <li>Remember to use appropriate facial expressions - they're crucial for questions in ASL</li>
                            <li>Try creating your own questions using these question words</li>
                        </ul>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/EverydayWords")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/lessons/ShortSentences")}>
                    Next Lesson →
                </Button>
            </div>
        </LessonLayout>
    )
}

export default QuestionWords

