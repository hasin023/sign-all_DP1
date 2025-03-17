"use client"

import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    AlertTriangle,
    CheckCircle,
    XCircle,
    Volume2,
    Clock,
    AlertCircle,
    PhoneCall,
    Shield,
    Siren,
} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

const EmergencySigns = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("learn")
    const [currentScenario, setCurrentScenario] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)
    const [selectedSign, setSelectedSign] = useState<string | null>(null)
    const [scenarioProgress, setScenarioProgress] = useState(0)
    const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string | null }>({})
    const [quizSubmitted, setQuizSubmitted] = useState(false)
    const [simulationStep, setSimulationStep] = useState(0)
    const [simulationComplete, setSimulationComplete] = useState(false)
    const [showHint, setShowHint] = useState(false)

    // Emergency signs data
    const emergencySigns = [
        {
            sign: "HELP",
            description: "Both hands in 'A' handshape, dominant hand taps on non-dominant palm, moving upward",
            usage: "Use when you need assistance or see someone who needs help",
            videoUrl: "https://www.handspeak.com/word/h/hel/help.mp4",
            imageUrl: "https://www.handspeak.com/word/h/hel/help.jpg",
        },
        {
            sign: "EMERGENCY",
            description: "Both hands in 'E' handshape, crossed at wrists and moved outward quickly",
            usage: "Use for urgent situations requiring immediate attention",
            videoUrl: "https://www.handspeak.com/word/e/eme/emergency.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "DANGER",
            description:
                "Index fingers extended from both fists, touching at fingertips, then pulled apart with a serious expression",
            usage: "Use to warn about hazardous situations or potential harm",
            videoUrl: "https://www.handspeak.com/word/d/dan/danger-us.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "CALL POLICE",
            description: "'P' handshape tapped on shoulder, followed by phone sign motion",
            usage: "Use when law enforcement assistance is needed",
            videoUrl: "https://www.handspeak.com/word/p/pol/police.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "FIRE",
            description: "Wiggling fingers moving upward from waist to head level, representing flames",
            usage: "Use to alert others about a fire or when discussing fire-related emergencies",
            videoUrl: "https://www.handspeak.com/word/f/fir/fire.mp4",
            imageUrl: "https://www.handspeak.com/word/f/fir/fire-shot.jpg",
        },
        {
            sign: "AMBULANCE",
            description: "Both hands in 'A' handshape, alternating forward circular motion",
            usage: "Use when medical emergency transportation is needed",
            videoUrl: "https://www.handspeak.com/word/a/amb/ambulance.mp4",
            imageUrl: "https://www.handspeak.com/word/a/amb/ambulance.jpg",
        },
        {
            sign: "HOSPITAL",
            description: "'H' handshape traced in cross pattern on upper arm",
            usage: "Use when referring to medical facilities or emergency medical care",
            videoUrl: "https://www.handspeak.com/word/h/hos/hospital.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "ACCIDENT",
            description: "Both 'A' handshapes collide in front of body",
            usage: "Use when describing crashes, falls, or unexpected harmful events",
            videoUrl: "https://www.handspeak.com/word/a/acc/accident.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
    ]

    // Emergency scenarios for practice
    const emergencyScenarios = [
        {
            situation: "You see smoke coming from a building across the street.",
            question: "What would you sign to alert others?",
            correctSign: "FIRE",
            options: ["FIRE", "DANGER", "HELP", "EMERGENCY"],
            explanation: "You would sign 'FIRE' to specifically alert others about the smoke and potential fire hazard.",
        },
        {
            situation: "You witness a car accident and someone is injured.",
            question: "What would you sign to get medical help?",
            correctSign: "AMBULANCE",
            options: ["AMBULANCE", "HOSPITAL", "ACCIDENT", "HELP"],
            explanation:
                "Signing 'AMBULANCE' communicates the need for emergency medical transportation for the injured person.",
        },
        {
            situation: "You notice someone trying to break into a store at night.",
            question: "What would you sign to indicate law enforcement is needed?",
            correctSign: "CALL POLICE",
            options: ["CALL POLICE", "DANGER", "EMERGENCY", "HELP"],
            explanation:
                "Signing 'CALL POLICE' clearly communicates that law enforcement should be contacted for this crime in progress.",
        },
        {
            situation: "You're hiking and see a warning sign about unstable cliffs ahead.",
            question: "What would you sign to warn your friend?",
            correctSign: "DANGER",
            options: ["DANGER", "EMERGENCY", "HELP", "ACCIDENT"],
            explanation: "Signing 'DANGER' warns about the hazardous condition ahead and potential risk of harm.",
        },
    ]

    // Quiz questions
    const quizQuestions = [
        {
            question: "Which sign would you use if you saw someone collapse on the street?",
            options: ["HELP", "DANGER", "FIRE", "ACCIDENT"],
            correctAnswer: "HELP",
        },
        {
            question: "What sign would you use to warn about a snake on the path?",
            options: ["DANGER", "EMERGENCY", "CALL POLICE", "FIRE"],
            correctAnswer: "DANGER",
        },
        {
            question: "Which sign involves a 'P' handshape on the shoulder?",
            options: ["CALL POLICE", "AMBULANCE", "HOSPITAL", "EMERGENCY"],
            correctAnswer: "CALL POLICE",
        },
        {
            question: "What sign would you use if you needed to evacuate a building immediately?",
            options: ["EMERGENCY", "HOSPITAL", "ACCIDENT", "AMBULANCE"],
            correctAnswer: "EMERGENCY",
        },
        {
            question: "Which sign uses wiggling fingers moving upward?",
            options: ["FIRE", "HELP", "AMBULANCE", "HOSPITAL"],
            correctAnswer: "FIRE",
        },
    ]

    // Emergency simulation steps
    const simulationSteps = [
        {
            situation: "You're at a shopping mall when you hear a loud crash and see people running.",
            instruction: "What sign would you use to ask someone what's happening?",
            correctSign: "EMERGENCY",
            hint: "You need to ask about an urgent situation that's occurring.",
        },
        {
            situation: "You learn there's been a structural collapse in part of the building.",
            instruction: "What sign would you use to warn others to stay away from that area?",
            correctSign: "DANGER",
            hint: "You need to warn about a hazardous area that could cause harm.",
        },
        {
            situation: "You notice an elderly person who has fallen during the commotion.",
            instruction: "What sign would you use to get assistance for this person?",
            correctSign: "HELP",
            hint: "The person needs immediate assistance from others.",
        },
        {
            situation: "The person appears to be seriously injured and needs medical attention.",
            instruction: "What sign would you use to indicate emergency medical transportation is needed?",
            correctSign: "AMBULANCE",
            hint: "The person needs to be transported to a medical facility quickly.",
        },
        {
            situation: "Security personnel arrive and ask if anyone saw what caused the initial collapse.",
            instruction: "What sign would you use to describe what happened?",
            correctSign: "ACCIDENT",
            hint: "You need to describe an unexpected harmful event.",
        },
    ]

    // Handle scenario answer selection
    const handleScenarioAnswer = (selectedOption: string) => {
        const isCorrect = selectedOption === emergencyScenarios[currentScenario].correctSign

        setSelectedSign(selectedOption)
        setShowSuccess(isCorrect)

        if (isCorrect) {
            // Update progress
            setScenarioProgress((prev) => prev + (1 / emergencyScenarios.length) * 100)

            // Move to next scenario after delay
            setTimeout(() => {
                if (currentScenario < emergencyScenarios.length - 1) {
                    setCurrentScenario((prev) => prev + 1)
                    setSelectedSign(null)
                    setShowSuccess(false)
                }
            }, 2000)
        }
    }

    // Handle quiz answer selection
    const handleQuizAnswer = (questionIndex: number, answer: string) => {
        setQuizAnswers((prev) => ({
            ...prev,
            [questionIndex]: answer,
        }))
    }

    // Submit quiz
    const handleQuizSubmit = () => {
        setQuizSubmitted(true)

        // Calculate score
        const correctAnswers = quizQuestions.filter((q, index) => quizAnswers[index] === q.correctAnswer).length
    }

    // Handle simulation answer
    const handleSimulationAnswer = (sign: string) => {
        const isCorrect = sign === simulationSteps[simulationStep].correctSign

        if (isCorrect) {
            if (simulationStep < simulationSteps.length - 1) {
                setSimulationStep((prev) => prev + 1)
                setShowHint(false)
            } else {
                setSimulationComplete(true)
            }
        } else {
            // Show hint on incorrect answer
            setShowHint(true)
        }
    }

    // Reset quiz
    const resetQuiz = () => {
        setQuizAnswers({})
        setQuizSubmitted(false)
    }

    // Reset simulation
    const resetSimulation = () => {
        setSimulationStep(0)
        setSimulationComplete(false)
        setShowHint(false)
    }

    return (
        <LessonLayout title="Emergency Signs in ASL">
            <div className="bg-red-50 p-6 rounded-lg shadow-md mb-8 border-l-4 border-red-500">
                <div className="flex items-start">
                    <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                        <h2 className="text-2xl font-bold text-red-800 mb-2">Emergency Communication</h2>
                        <p className="text-gray-700">
                            Learning emergency signs in ASL can be crucial in urgent situations. These signs allow you to quickly
                            communicate needs, warnings, and call for help when every second counts.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mode Tabs */}
            <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                    <TabsTrigger value="simulate">Simulate</TabsTrigger>
                </TabsList>

                {/* Learn Mode */}
                <TabsContent value="learn">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                            Essential Emergency Signs
                        </h3>

                        <p className="text-gray-700 mb-6">
                            These signs are critical for communicating during emergencies. Practice them regularly so you can recall
                            them quickly when needed.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {emergencySigns.map((sign, index) => (
                                <Dialog key={index} >
                                    <DialogTrigger asChild>
                                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                            <CardHeader className="p-4 bg-red-50">
                                                <CardTitle className="text-lg text-red-700 flex items-center justify-between">
                                                    {sign.sign}
                                                    {index < 4 && (
                                                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                                                            Critical
                                                        </Badge>
                                                    )}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <img
                                                    src={`/api/proxy-image?url=${sign.imageUrl}`}
                                                    alt={`ASL sign for ${sign.sign}`}
                                                    className="w-full h-48 object-cover rounded-t-md"
                                                />
                                            </CardContent>
                                            <CardFooter className="p-3 bg-gray-50 text-sm text-gray-500 text-center">
                                                Click for details
                                            </CardFooter>
                                        </Card>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-2xl w-full bg-white shadow-lg border border-gray-200 p-6">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl text-red-700">{sign.sign}</DialogTitle>
                                            <DialogDescription className="text-lg">Learn how to sign and use this emergency term</DialogDescription>
                                        </DialogHeader>
                                        <div className="mt-6">
                                            <div className="aspect-video bg-gray-100 rounded-md mb-6 overflow-hidden">
                                                <video
                                                    src={`/api/proxy-video?url=${sign.videoUrl}`}
                                                    title={`ASL sign for ${sign.sign}`}
                                                    className="w-full h-full"
                                                    width="800px"
                                                    height="450px"
                                                    controls
                                                    controlsList="nodownload"
                                                    onContextMenu={() => false}
                                                ></video>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-semibold text-lg text-gray-700">How to Sign</h4>
                                                    <p className="text-gray-600 text-base">{sign.description}</p>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <h4 className="font-semibold text-lg text-gray-700">When to Use</h4>
                                                    <p className="text-gray-600 text-base">{sign.usage}</p>
                                                </div>
                                                <div className="bg-yellow-50 p-4 rounded-md">
                                                    <h4 className="font-semibold text-yellow-800 text-lg">Practice Tip</h4>
                                                    <p className="text-gray-600 text-base">
                                                        Practice this sign until you can produce it quickly and clearly. In emergencies, speed and clarity are essential.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">Emergency Communication Tips</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <Volume2 className="h-4 w-4 text-blue-500 mr-2" />
                                    Get Attention First
                                </h4>
                                <p className="text-gray-600">
                                    Before signing, get the person's attention with a wave, tap on shoulder (if appropriate), or light
                                    flicker. Make sure they're looking at you before signing emergency information.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                    Be Clear and Concise
                                </h4>
                                <p className="text-gray-600">
                                    In emergencies, use short, clear signs. Focus on critical information: what the emergency is, where
                                    it's happening, and what help is needed.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <PhoneCall className="h-4 w-4 text-blue-500 mr-2" />
                                    Know Emergency Services
                                </h4>
                                <p className="text-gray-600">
                                    Be aware that many emergency services have text-to-911 capabilities. In the US, you can often text
                                    emergency information to 911 if you cannot call.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <Shield className="h-4 w-4 text-blue-500 mr-2" />
                                    Safety First
                                </h4>
                                <p className="text-gray-600">
                                    Always prioritize your safety. If you're in danger, focus on getting to safety first, then communicate
                                    about the emergency when you're in a secure location.
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Practice Mode */}
                <TabsContent value="practice">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Emergency Scenarios</h3>
                            <p className="text-gray-600 mb-4">
                                Practice identifying the appropriate signs to use in different emergency situations.
                            </p>

                            <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${scenarioProgress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
                            <div className="flex items-start">
                                <Siren className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Scenario:</h4>
                                    <p className="text-gray-700 mb-4">{emergencyScenarios[currentScenario].situation}</p>
                                    <h4 className="font-semibold text-gray-800 mb-2">{emergencyScenarios[currentScenario].question}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {emergencyScenarios[currentScenario].options.map((option, index) => (
                                <Button
                                    key={index}
                                    variant={
                                        selectedSign === option
                                            ? option === emergencyScenarios[currentScenario].correctSign
                                                ? "default"
                                                : "destructive"
                                            : "outline"
                                    }
                                    className={`h-16 text-lg ${selectedSign === option && option === emergencyScenarios[currentScenario].correctSign
                                        ? "bg-green-500 hover:bg-green-600"
                                        : ""
                                        }`}
                                    onClick={() => handleScenarioAnswer(option)}
                                    disabled={selectedSign !== null}
                                >
                                    {option}
                                </Button>
                            ))}
                        </div>

                        <AnimatePresence>
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
                                >
                                    <div className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                        <div>
                                            <h4 className="font-medium text-green-800 mb-1">Correct!</h4>
                                            <p className="text-gray-600">{emergencyScenarios[currentScenario].explanation}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {selectedSign !== null && selectedSign !== emergencyScenarios[currentScenario].correctSign && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200"
                                >
                                    <div className="flex items-start">
                                        <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                                        <div>
                                            <h4 className="font-medium text-red-800 mb-1">Not quite right</h4>
                                            <p className="text-gray-600">
                                                Try again! Think about which sign would be most specific to this situation.
                                            </p>
                                            <Button variant="outline" size="sm" className="mt-2" onClick={() => setSelectedSign(null)}>
                                                Try Again
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Emergency Signs Quiz</h3>
                        <p className="text-gray-600 mb-6">Test your knowledge of emergency signs with this quick quiz.</p>

                        <div className="space-y-6">
                            {quizQuestions.map((question, qIndex) => (
                                <div key={qIndex} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 className="font-medium text-gray-800 mb-3">
                                        {qIndex + 1}. {question.question}
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {question.options.map((option, oIndex) => (
                                            <Button
                                                key={oIndex}
                                                variant={
                                                    quizSubmitted
                                                        ? option === question.correctAnswer
                                                            ? "default"
                                                            : quizAnswers[qIndex] === option
                                                                ? "destructive"
                                                                : "outline"
                                                        : quizAnswers[qIndex] === option
                                                            ? "default"
                                                            : "outline"
                                                }
                                                className={
                                                    quizSubmitted && option === question.correctAnswer ? "bg-green-500 hover:bg-green-600" : ""
                                                }
                                                onClick={() => !quizSubmitted && handleQuizAnswer(qIndex, option)}
                                                disabled={quizSubmitted}
                                            >
                                                {option}
                                            </Button>
                                        ))}
                                    </div>
                                    {quizSubmitted && quizAnswers[qIndex] !== question.correctAnswer && (
                                        <div className="mt-2 text-sm text-red-600">Correct answer: {question.correctAnswer}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                            {!quizSubmitted ? (
                                <Button onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < quizQuestions.length}>
                                    Submit Answers
                                </Button>
                            ) : (
                                <Button onClick={resetQuiz} variant="outline">
                                    Retake Quiz
                                </Button>
                            )}
                        </div>

                        {quizSubmitted && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-800 mb-2">Quiz Results</h4>
                                <p className="text-gray-700 mb-2">
                                    You got {quizQuestions.filter((q, index) => quizAnswers[index] === q.correctAnswer).length} out of{" "}
                                    {quizQuestions.length} correct!
                                </p>
                                <Progress
                                    value={
                                        (quizQuestions.filter((q, index) => quizAnswers[index] === q.correctAnswer).length /
                                            quizQuestions.length) *
                                        100
                                    }
                                    className="h-2"
                                />
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* Simulate Mode */}
                <TabsContent value="simulate">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Emergency Simulation</h3>
                        <p className="text-gray-600 mb-6">
                            Work through this interactive emergency scenario to practice using the appropriate signs in context.
                        </p>

                        {!simulationComplete ? (
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Step {simulationStep + 1} of {simulationSteps.length}
                                    </span>
                                    <Progress value={(simulationStep / simulationSteps.length) * 100} className="w-2/3 h-2" />
                                </div>

                                <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
                                    <h4 className="font-semibold text-gray-800 mb-3">Situation:</h4>
                                    <p className="text-gray-700 mb-4">{simulationSteps[simulationStep].situation}</p>
                                    <h4 className="font-semibold text-gray-800 mb-2">{simulationSteps[simulationStep].instruction}</h4>
                                </div>

                                {showHint && (
                                    <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm text-yellow-800">
                                            <span className="font-medium">Hint:</span> {simulationSteps[simulationStep].hint}
                                        </p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {emergencySigns.slice(0, 8).map((sign, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            className="h-16 flex flex-col items-center justify-center"
                                            onClick={() => handleSimulationAnswer(sign.sign)}
                                        >
                                            {sign.sign}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                                <h4 className="text-xl font-bold text-green-700 mb-2">Simulation Complete!</h4>
                                <p className="text-gray-600 mb-6">
                                    Great job! You've successfully navigated through the emergency scenario using the appropriate ASL
                                    signs.
                                </p>
                                <Button onClick={resetSimulation}>Try Another Simulation</Button>
                            </div>
                        )}
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-yellow-800 mb-4">Real-World Preparation</h3>
                        <p className="text-gray-700 mb-4">
                            While learning emergency signs is important, here are additional ways to prepare for real emergencies:
                        </p>

                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Create an Emergency Card</h4>
                                <p className="text-gray-600">
                                    Prepare a card with your name, emergency contacts, and any medical information. This can be crucial if
                                    you need to communicate with first responders who don't know ASL.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Know Text-to-911 Services</h4>
                                <p className="text-gray-600">
                                    Research if text-to-911 is available in your area and save emergency numbers in your phone for quick
                                    access.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Practice with Friends</h4>
                                <p className="text-gray-600">
                                    Role-play emergency scenarios with friends who know ASL to build confidence and speed in emergency
                                    signing.
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/DetailedResponses")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/lessons/WorkplaceSigns")}>
                    Next Lesson →
                </Button>
            </div>
        </LessonLayout>
    )
}

export default EmergencySigns

