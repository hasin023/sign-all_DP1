import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, Play, Pause, Volume2 } from "lucide-react"

const BasicGreetings = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("hello")
    const [showQuiz, setShowQuiz] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    // Greeting data
    const greetings = {
        hello: {
            title: "Hello",
            description: "The most common greeting in ASL",
            instructions: "Touch your fingers to your forehead, then move your hand outward and away from your body.",
            videoUrl: "https://www.youtube.com/embed/uKKvNqA9N20",
            imageUrl: "https://www.handspeak.com/word/h/hello.jpg",
            quiz: {
                question: "Which part of your body do you touch when signing 'Hello'?",
                options: ["Forehead", "Chin", "Chest", "Shoulder"],
                correctAnswer: "Forehead",
            },
        },
        goodbye: {
            title: "Goodbye",
            description: "A common way to say farewell",
            instructions: "Start with an open hand, palm facing the person you're addressing, then wave your hand.",
            videoUrl: "https://www.youtube.com/embed/R_WzZx_4Cw0",
            imageUrl: "https://www.handspeak.com/word/b/bye.jpg",
            quiz: {
                question: "How do you sign 'Goodbye' in ASL?",
                options: [
                    "Tap your chest twice",
                    "Wave with your palm facing outward",
                    "Point to the door",
                    "Make a fist and pull it down",
                ],
                correctAnswer: "Wave with your palm facing outward",
            },
        },
        please: {
            title: "Please",
            description: "Used when making a request or asking for something",
            instructions: "Place your dominant hand flat on your chest and make a circular motion clockwise.",
            videoUrl: "https://www.youtube.com/embed/K0mD_RcESHI",
            imageUrl: "https://www.handspeak.com/word/p/please.jpg",
            quiz: {
                question: "What motion do you make when signing 'Please'?",
                options: ["Up and down", "Side to side", "Circular", "Zigzag"],
                correctAnswer: "Circular",
            },
        },
        thankyou: {
            title: "Thank You",
            description: "Expressing gratitude",
            instructions:
                "Touch your chin or lips with the fingertips of your dominant hand, then move your hand forward and down.",
            videoUrl: "https://www.youtube.com/embed/3YJ6hyyL4nw",
            imageUrl: "https://www.handspeak.com/word/t/thankyou.jpg",
            quiz: {
                question: "Where do you start the sign for 'Thank You'?",
                options: ["Forehead", "Chin or lips", "Chest", "Shoulder"],
                correctAnswer: "Chin or lips",
            },
        },
    }

    // Get current greeting data
    const currentGreeting = greetings[activeTab as keyof typeof greetings]

    // Handle answer selection
    const handleAnswerSelect = (answer: string) => {
        setSelectedAnswer(answer)
        setIsCorrect(answer === currentGreeting.quiz.correctAnswer)
    }

    // Reset quiz state when changing tabs
    const handleTabChange = (value: string) => {
        setActiveTab(value)
        setShowQuiz(false)
        setSelectedAnswer(null)
        setIsCorrect(null)
    }

    // Toggle video playback
    const togglePlayback = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <LessonLayout title="Common Greetings in ASL">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">ASL Greetings</h2>
                <p className="text-gray-700">
                    Greetings are essential for starting conversations in any language. In this lesson, you'll learn common ASL
                    greetings like "hello," "goodbye," "please," and "thank you."
                </p>
            </div>

            {/* Greeting Tabs */}
            <Tabs defaultValue="hello" value={activeTab} onValueChange={handleTabChange} className="mb-8">
                <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="hello">Hello</TabsTrigger>
                    <TabsTrigger value="goodbye">Goodbye</TabsTrigger>
                    <TabsTrigger value="please">Please</TabsTrigger>
                    <TabsTrigger value="thankyou">Thank You</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card>
                                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                                    <CardTitle className="text-2xl text-blue-800">{currentGreeting.title}</CardTitle>
                                    <CardDescription>{currentGreeting.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-semibold mb-2">How to Sign</h3>
                                            <p className="text-gray-700 mb-4">{currentGreeting.instructions}</p>

                                            <div className="relative aspect-video mb-4 bg-gray-100 rounded-lg overflow-hidden">
                                                <iframe
                                                    src={currentGreeting.videoUrl}
                                                    title={`ASL sign for ${currentGreeting.title}`}
                                                    className="absolute inset-0 w-full h-full"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>

                                            <div className="flex justify-center space-x-4">
                                                <Button variant="outline" onClick={togglePlayback} className="flex items-center">
                                                    {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                                                    {isPlaying ? "Pause" : "Play"}
                                                </Button>
                                                <Button variant="outline" className="flex items-center">
                                                    <Volume2 className="h-4 w-4 mr-2" />
                                                    Slow Motion
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <img
                                                src={currentGreeting.imageUrl || "/placeholder.svg"}
                                                alt={`ASL sign for ${currentGreeting.title}`}
                                                className="max-w-full h-auto rounded-lg shadow-md mb-4"
                                            />

                                            {!showQuiz ? (
                                                <Button onClick={() => setShowQuiz(true)} className="mt-4">
                                                    Test Your Knowledge
                                                </Button>
                                            ) : (
                                                <div className="w-full bg-gray-50 p-4 rounded-lg">
                                                    <h3 className="text-lg font-semibold mb-3">{currentGreeting.quiz.question}</h3>
                                                    <div className="space-y-2">
                                                        {currentGreeting.quiz.options.map((option) => (
                                                            <div
                                                                key={option}
                                                                className={`p-3 rounded-lg cursor-pointer transition-all ${selectedAnswer === option
                                                                    ? selectedAnswer === currentGreeting.quiz.correctAnswer
                                                                        ? "bg-green-100 border border-green-500"
                                                                        : "bg-red-100 border border-red-500"
                                                                    : "bg-white border border-gray-300 hover:bg-gray-100"
                                                                    }`}
                                                                onClick={() => handleAnswerSelect(option)}
                                                            >
                                                                <div className="flex items-center">
                                                                    <span className="flex-grow">{option}</span>
                                                                    {selectedAnswer === option &&
                                                                        (selectedAnswer === currentGreeting.quiz.correctAnswer ? (
                                                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                                                        ) : (
                                                                            <XCircle className="h-5 w-5 text-red-600" />
                                                                        ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {isCorrect !== null && (
                                                        <div
                                                            className={`mt-4 p-3 rounded-lg ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                                        >
                                                            {isCorrect ? (
                                                                <p>Correct! Well done!</p>
                                                            ) : (
                                                                <p>Incorrect. The correct answer is "{currentGreeting.quiz.correctAnswer}".</p>
                                                            )}
                                                        </div>
                                                    )}

                                                    <Button onClick={() => setShowQuiz(false)} variant="outline" className="mt-4">
                                                        Back to Lesson
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </TabsContent>
            </Tabs>

            {/* Cultural Context */}
            <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold text-purple-800 mb-2">Cultural Context</h3>
                <p className="text-gray-700 mb-4">
                    In Deaf culture, greetings often include maintaining eye contact and using appropriate facial expressions.
                    When meeting someone for the first time, it's common to fingerspell your name after saying "hello."
                </p>
                <p className="text-gray-700">
                    Remember that ASL is a visual language, so clear hand movements and appropriate facial expressions are
                    essential for effective communication.
                </p>
            </div>

            {/* Practice Scenario */}
            <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold text-green-800 mb-2">Practice Scenario</h3>
                <p className="text-gray-700 mb-4">
                    Imagine you're meeting a Deaf person for the first time. Practice the following conversation:
                </p>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                    <li>Sign "Hello"</li>
                    <li>Fingerspell your name</li>
                    <li>Sign "Nice to meet you"</li>
                    <li>At the end of your conversation, sign "Thank you" and "Goodbye"</li>
                </ol>
                <p className="text-gray-700 mt-4">
                    Practice this sequence in front of a mirror or record yourself to review your signs.
                </p>
            </div>

            {/* Immersive Practice */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8 mt-8">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Immersive Practice</h3>
                <p className="text-gray-700 mb-4">
                    Watch this video of a natural conversation using the greetings you've learned, then try to follow along.
                </p>

                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/TWwKwKH8MwA"
                        title="ASL Greetings Conversation"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Practice Challenge:</h4>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                        <li>Watch the video once through</li>
                        <li>Watch again and try to identify all the greetings used</li>
                        <li>Practice responding appropriately to each greeting</li>
                        <li>Try recording yourself having a similar conversation</li>
                    </ol>
                </div>
            </div>

            {/* Mirror Practice Tool */}
            <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold text-purple-800 mb-4">Mirror Practice Tool</h3>
                <p className="text-gray-700 mb-4">
                    Use your device's camera to practice signing greetings and see yourself sign.
                </p>

                <div className="bg-white p-4 rounded-lg text-center">
                    <Button
                        onClick={() => {
                            // Simple permission check and webcam display
                            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                                // Create video element if it doesn't exist
                                let videoElement = document.getElementById("mirror-practice")
                                if (!videoElement) {
                                    videoElement = document.createElement("video")
                                    videoElement.id = "mirror-practice"
                                    videoElement.width = 640
                                    videoElement.height = 480
                                    videoElement.autoplay = true
                                    videoElement.className = "mx-auto mt-4 rounded-lg border border-gray-300"
                                    document.getElementById("mirror-container")?.appendChild(videoElement)
                                }

                                // Get webcam feed
                                navigator.mediaDevices
                                    .getUserMedia({ video: true })
                                    .then((stream) => {
                                        if (videoElement instanceof HTMLVideoElement) {
                                            videoElement.srcObject = stream
                                        }
                                    })
                                    .catch((err) => {
                                        console.log("An error occurred: " + err)
                                        alert("Could not access webcam. Please check permissions.")
                                    })
                            } else {
                                alert("Your browser doesn't support webcam access.")
                            }
                        }}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        Start Mirror Practice
                    </Button>
                    <div id="mirror-container" className="mt-4"></div>
                    <p className="text-xs text-gray-500 mt-2">Webcam access is required for this feature.</p>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/NumbersRecognition")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/lessons/EverydayWords")}>
                    Next Lesson →
                </Button>
            </div>
        </LessonLayout>
    )
}

export default BasicGreetings

