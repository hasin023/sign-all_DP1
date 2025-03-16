import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, ArrowRight, ArrowLeft } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

const TimeIndicators = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("learn")
    const [currentTimeFrame, setCurrentTimeFrame] = useState("past")
    const [showExplanation, setShowExplanation] = useState(false)
    const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
    const [quizResults, setQuizResults] = useState<Record<string, boolean>>({})
    const [quizSubmitted, setQuizSubmitted] = useState(false)
    const [practiceStep, setPracticeStep] = useState(0)

    // Time indicator data
    const timeFrames = {
        past: {
            title: "Past Tense",
            description: "Indicating events that have already happened",
            sign: "Move your dominant hand backward over your shoulder",
            examples: [
                "I WENT to the store yesterday",
                "I FINISHED my homework",
                "The movie STARTED an hour ago"
            ],
            videoUrl: "https://www.youtube.com/embed/eTCYpOGGQOw?start=155&end=292",
            imageUrl: "https://www.handspeak.com/word/f/finish.jpg",
            nonManualMarkers: "Slight backward tilt of the head, eyebrows raised"
        },
        present: {
            title: "Present Tense",
            description: "Indicating events happening now",
            sign: "Sign 'NOW' or use no specific time indicator (ASL often defaults to present tense)",
            examples: [
                "I STUDY ASL",
                "She WORKS at a school",
                "They LIVE in New York"
            ],
            videoUrl: "https://www.youtube.com/embed/eTCYpOGGQOw?start=395&end=445",
            imageUrl: "https://www.handspeak.com/word/n/now.jpg",
            nonManualMarkers: "Neutral facial expression, direct eye contact"
        },
        future: {
            title: "Future Tense",
            description: "Indicating events that will happen",
            sign: "Move your dominant hand forward from your body",
            examples: [
                "I WILL GO to the party tomorrow",
                "She WILL GRADUATE next year",
                "They WILL MOVE to a new house"
            ],
            videoUrl: "https://www.youtube.com/embed/eTCYpOGGQOw?start=480&end=690",
            imageUrl: "https://www.handspeak.com/word/w/will.jpg",
            nonManualMarkers: "Slight forward tilt of the head, eyebrows raised, eyes slightly widened"
        }
    }

    // Quiz questions
    const quizQuestions = [
        {
            id: "q1",
            question: "Which direction do you move your hand to indicate past tense?",
            options: ["Forward", "Backward", "Upward", "In circles"],
            answer: "Backward"
        },
        {
            id: "q2",
            question: "What non-manual marker is used with future tense?",
            options: ["Frowning", "Shaking head", "Forward head tilt", "Puffed cheeks"],
            answer: "Forward head tilt"
        },
        {
            id: "q3",
            question: "How is present tense typically indicated in ASL?",
            options: ["With a specific sign", "By default (no time indicator)", "With a head nod", "With raised eyebrows"],
            answer: "By default (no time indicator)"
        },
        {
            id: "q4",
            question: "Which sentence correctly uses a time indicator? 'YESTERDAY I STORE GO'",
            options: ["Yes, this is correct", "No, it should be 'I GO STORE YESTERDAY'", "No, it should be 'I YESTERDAY GO STORE'", "No, it should be 'STORE I GO YESTERDAY'"],
            answer: "Yes, this is correct"
        }
    ]

    // Practice scenarios
    const practiceScenarios = [
        {
            instruction: "Sign: 'I went to the store yesterday'",
            tips: "Use the past tense indicator by moving your hand backward over your shoulder before signing 'YESTERDAY'"
        },
        {
            instruction: "Sign: 'I will graduate next year'",
            tips: "Use the future tense indicator by moving your hand forward from your body before signing 'NEXT YEAR'"
        },
        {
            instruction: "Sign: 'I am studying ASL now'",
            tips: "Use the present tense by signing 'NOW' or simply signing without a time indicator"
        }
    ]

    // Handle quiz submission
    const handleQuizSubmit = () => {
        const results: Record<string, boolean> = {}

        quizQuestions.forEach(q => {
            results[q.id] = quizAnswers[q.id] === q.answer
        })

        setQuizResults(results)
        setQuizSubmitted(true)
    }

    // Calculate quiz score
    const calculateScore = () => {
        return Object.values(quizResults).filter(result => result).length
    }

    // Reset quiz
    const resetQuiz = () => {
        setQuizAnswers({})
        setQuizResults({})
        setQuizSubmitted(false)
    }

    // Next practice step
    const nextPracticeStep = () => {
        if (practiceStep < practiceScenarios.length - 1) {
            setPracticeStep(practiceStep + 1)
        } else {
            setPracticeStep(0)
        }
    }

    return (
        <LessonLayout title="Using Time Indicators (Past, Present, Future)">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Time Indicators in ASL</h2>
                <p className="text-gray-700">
                    In ASL, time is expressed through specific signs, spatial references, and non-manual markers.
                    Understanding how to indicate past, present, and future is essential for clear communication.
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
                    {/* Time Frame Selection */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {Object.keys(timeFrames).map((timeFrame) => (
                            <Button
                                key={timeFrame}
                                variant={currentTimeFrame === timeFrame ? "default" : "outline"}
                                onClick={() => {
                                    setCurrentTimeFrame(timeFrame)
                                    setShowExplanation(false)
                                }}
                                className="capitalize"
                            >
                                {timeFrame} Tense
                            </Button>
                        ))}
                    </div>

                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-lg mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`learn-${currentTimeFrame}`}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <h3 className="text-3xl font-bold text-blue-600 mb-4">
                                    {timeFrames[currentTimeFrame as keyof typeof timeFrames].title}
                                </h3>
                                <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden">
                                    <iframe
                                        src={timeFrames[currentTimeFrame as keyof typeof timeFrames].videoUrl}
                                        title={`ASL ${currentTimeFrame} tense`}
                                        className="absolute inset-0 w-full h-full"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="flex justify-center">
                                    <Button onClick={() => setShowExplanation(!showExplanation)} variant="outline">
                                        {showExplanation ? "Hide Details" : "Show Details"}
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">How to Sign</h4>
                                <p className="text-gray-700 mb-6">
                                    {timeFrames[currentTimeFrame as keyof typeof timeFrames].sign}
                                </p>

                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Non-Manual Markers</h4>
                                <p className="text-gray-700 mb-6">
                                    {timeFrames[currentTimeFrame as keyof typeof timeFrames].nonManualMarkers}
                                </p>

                                {showExplanation && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 p-6 rounded-lg">
                                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Example Sentences</h4>
                                        <ul className="list-disc pl-6 text-gray-700">
                                            {timeFrames[currentTimeFrame as keyof typeof timeFrames].examples.map((example, index) => (
                                                <li key={index} className="mb-2">
                                                    {example}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                                            <h5 className="font-semibold text-blue-800 mb-2">Time Line Concept</h5>
                                            <p className="text-gray-700">
                                                ASL uses a conceptual timeline that runs from behind the signer (past) to in front of the signer (future).
                                                The space directly in front of the signer represents the present.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-purple-800 mb-2">Time Establishment in ASL</h3>
                        <p className="text-gray-700 mb-4">
                            In ASL, time is typically established at the beginning of a sentence or conversation. Once established,
                            it doesn't need to be repeated for every verb unless the time frame changes.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <Card>
                                <CardHeader className="bg-red-50">
                                    <CardTitle className="text-lg">Past Time Markers</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <ul className="list-disc pl-4 space-y-1 text-sm">
                                        <li>YESTERDAY</li>
                                        <li>LAST-WEEK</li>
                                        <li>BEFORE</li>
                                        <li>LONG-AGO</li>
                                        <li>FINISH (to indicate completed action)</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="bg-green-50">
                                    <CardTitle className="text-lg">Present Time Markers</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <ul className="list-disc pl-4 space-y-1 text-sm">
                                        <li>NOW</li>
                                        <li>TODAY</li>
                                        <li>CURRENTLY</li>
                                        <li>(Often no explicit marker is used)</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="bg-blue-50">
                                    <CardTitle className="text-lg">Future Time Markers</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <ul className="list-disc pl-4 space-y-1 text-sm">
                                        <li>TOMORROW</li>
                                        <li>NEXT-WEEK</li>
                                        <li>SOON</li>
                                        <li>WILL</li>
                                        <li>FUTURE</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Quiz Mode */}
                <TabsContent value="quiz">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Test Your Knowledge</h3>

                        {quizQuestions.map((q) => (
                            <div key={q.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-3">{q.question}</h4>
                                <div className="space-y-2">
                                    {q.options.map((option) => (
                                        <div
                                            key={option}
                                            className={`p-3 rounded-lg cursor-pointer transition-all ${quizAnswers[q.id] === option
                                                ? quizSubmitted
                                                    ? quizResults[q.id]
                                                        ? "bg-green-100 border border-green-500"
                                                        : "bg-red-100 border border-red-500"
                                                    : "bg-blue-100 border border-blue-300"
                                                : "bg-white border border-gray-300 hover:bg-gray-100"
                                                }`}
                                            onClick={() => {
                                                if (!quizSubmitted) {
                                                    setQuizAnswers({ ...quizAnswers, [q.id]: option })
                                                }
                                            }}
                                        >
                                            <div className="flex items-center">
                                                <span className="flex-grow">{option}</span>
                                                {quizSubmitted && quizAnswers[q.id] === option && (
                                                    quizResults[q.id] ? (
                                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                                    ) : (
                                                        <span className="text-red-600 font-medium">✗</span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {quizSubmitted && !quizResults[q.id] && (
                                    <div className="mt-2 text-sm text-red-600">
                                        Correct answer: {q.answer}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-center mt-6">
                            {!quizSubmitted ? (
                                <Button
                                    onClick={handleQuizSubmit}
                                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Submit Answers
                                </Button>
                            ) : (
                                <div className="text-center">
                                    <div className="text-xl font-bold mb-4">
                                        Your Score: {calculateScore()} / {quizQuestions.length}
                                    </div>
                                    <Button onClick={resetQuiz} variant="outline">
                                        Try Again
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>

                {/* Practice Mode */}
                <TabsContent value="practice">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Practice Time Indicators</h3>

                        <div className="flex justify-between items-center mb-4">
                            <Button onClick={() => setPracticeStep(Math.max(0, practiceStep - 1))} variant="outline" className="flex items-center">
                                <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                            </Button>
                            <span className="text-lg font-medium text-blue-600">
                                {practiceStep + 1} / {practiceScenarios.length}
                            </span>
                            <Button onClick={nextPracticeStep} variant="outline" className="flex items-center">
                                Next <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>

                        <Progress value={((practiceStep + 1) / practiceScenarios.length) * 100} className="mb-6" />

                        <div className="bg-blue-50 p-6 rounded-lg mb-6">
                            <h4 className="text-xl font-bold text-blue-800 mb-4">
                                {practiceScenarios[practiceStep].instruction}
                            </h4>
                            <p className="text-gray-700">
                                {practiceScenarios[practiceStep].tips}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-3">Record Yourself</h4>
                                <p className="text-gray-700 mb-4">
                                    Practice signing the sentence above. Use your device's camera to record yourself and review your signing.
                                </p>
                                <Button className="w-full">Start Recording</Button>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-3">Time Line Visualization</h4>
                                <div className="relative h-20 bg-white rounded-lg border border-gray-300 p-2 mb-4">
                                    <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-red-100 rounded-l-lg flex items-center justify-center">
                                        <span className="text-red-800 font-medium">Past</span>
                                    </div>
                                    <div className="absolute left-1/3 top-0 bottom-0 w-1/3 bg-green-100 flex items-center justify-center">
                                        <span className="text-green-800 font-medium">Present</span>
                                    </div>
                                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-100 rounded-r-lg flex items-center justify-center">
                                        <span className="text-blue-800 font-medium">Future</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Remember: In ASL, the past is behind you, the present is at your body, and the future is in front of you.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-yellow-800 mb-2 flex items-center">
                            <Clock className="h-5 w-5 mr-2" /> Practice Tips
                        </h3>
                        <ul className="list-disc pl-6 text-gray-700">
                            <li>Always establish time at the beginning of your sentences</li>
                            <li>Use appropriate facial expressions along with time indicators</li>
                            <li>Practice transitioning between different time frames in a single conversation</li>
                            <li>Remember that ASL often uses specific time signs (YESTERDAY, TOMORROW) rather than tense indicators for common time references</li>
                        </ul>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/BackAndForthCommunication")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/lessons/DirectionalVerbs")}>
                    Next Lesson →
                </Button>
            </div>
        </LessonLayout>
    )
}

export default TimeIndicators
