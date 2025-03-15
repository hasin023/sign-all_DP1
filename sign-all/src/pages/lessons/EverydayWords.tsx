import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, Play, Pause, RefreshCw } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

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
            imageUrl: "https://www.handspeak.com/word/w/who.jpg",
            videoUrl: "https://www.youtube.com/embed/SYXbdExjHmI?start=5&end=10",
        },
        what: {
            sign: "Shake both hands with index fingers extended, palms facing up.",
            examples: ["What is your name?", "What happened yesterday?", "What do you want?"],
            imageUrl: "https://www.handspeak.com/word/w/what.jpg",
            videoUrl: "https://www.youtube.com/embed/SYXbdExjHmI?start=31&end=36",
        },
        when: {
            sign: "Point the index finger of your dominant hand toward your wrist (where a watch would be).",
            examples: ["When is the meeting?", "When did you arrive?", "When will you graduate?"],
            imageUrl: "https://www.handspeak.com/word/w/when.jpg",
            videoUrl: "https://www.youtube.com/embed/SYXbdExjHmI?start=78&end=83",
        },
        where: {
            sign: "Shake your dominant hand with index finger extended, moving it side to side.",
            examples: ["Where is the bathroom?", "Where do you live?", "Where did you put my keys?"],
            imageUrl: "https://www.handspeak.com/word/w/where.jpg",
            videoUrl: "https://www.youtube.com/embed/SYXbdExjHmI?start=107&end=112",
        },
        why: {
            sign: "Touch your temple with the index finger of your dominant hand, then move it forward while changing to a Y handshape.",
            examples: ["Why are you late?", "Why did that happen?", "Why do you study ASL?"],
            imageUrl: "https://www.handspeak.com/word/w/why.jpg",
            videoUrl: "https://www.youtube.com/embed/SYXbdExjHmI?start=135&end=141",
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

            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8 mt-8">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Interactive Video Quiz</h3>
                <p className="text-gray-700 mb-4">
                    Watch this comprehensive video about ASL question words and try to answer the questions that follow.
                </p>

                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/SYXbdExjHmI"
                        title="ASL Question Words"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="bg-white p-4 rounded-lg mt-4">
                    <h4 className="font-semibold mb-3">Video Quiz:</h4>
                    <div className="space-y-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-medium mb-2">
                                1. What non-manual markers (facial expressions) are used with WH-questions?
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                                <Button variant="outline" className="justify-start text-left">
                                    Raised eyebrows
                                </Button>
                                <Button variant="outline" className="justify-start text-left">
                                    Smiling
                                </Button>
                                <Button variant="outline" className="justify-start text-left">
                                    Furrowed brows
                                </Button>
                                <Button variant="outline" className="justify-start text-left">
                                    Head tilted back
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 opacity-0 hover:opacity-100 transition-opacity">
                                Answer: Furrowed brows
                            </p>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-medium mb-2">2. Where are question words typically placed in ASL sentences?</p>
                            <div className="grid grid-cols-1 gap-2 mt-3">
                                <Button variant="outline" className="justify-start text-left">
                                    Always at the beginning
                                </Button>
                                <Button variant="outline" className="justify-start text-left">
                                    Always at the end
                                </Button>
                                <Button variant="outline" className="justify-start text-left">
                                    Can be at the beginning or end (or both)
                                </Button>
                                <Button variant="outline" className="justify-start text-left">
                                    In the middle of the sentence
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 opacity-0 hover:opacity-100 transition-opacity">
                                Answer: Can be at the beginning or end (or both)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold text-green-800 mb-4">Role-Playing Scenarios</h3>
                <p className="text-gray-700 mb-4">
                    Put your question word skills to the test with these interactive role-playing scenarios.
                </p>

                <div className="bg-white p-5 rounded-lg">
                    <h4 className="font-semibold mb-4 text-center">Getting to Know Someone</h4>

                    <div className="space-y-6">
                        <div className="border-l-4 border-blue-500 pl-4 py-2">
                            <p className="italic text-gray-600 mb-1">Scenario: You're meeting a new classmate at an ASL meetup.</p>
                            <p className="font-medium">Try asking these questions in ASL:</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium mb-1">What is your name?</p>
                                <div className="flex items-center mt-2">
                                    <Button
                                        onClick={() => window.open("https://www.signingsavvy.com/sign/WHAT/470/1", "_blank")}
                                        size="sm"
                                        variant="outline"
                                        className="mr-2"
                                    >
                                        See "WHAT"
                                    </Button>
                                    <Button
                                        onClick={() => window.open("https://www.signingsavvy.com/sign/NAME/7306/1", "_blank")}
                                        size="sm"
                                        variant="outline"
                                    >
                                        See "NAME"
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium mb-1">Where are you from?</p>
                                <div className="flex items-center mt-2">
                                    <Button
                                        onClick={() => window.open("https://www.signingsavvy.com/sign/WHERE/482/1", "_blank")}
                                        size="sm"
                                        variant="outline"
                                        className="mr-2"
                                    >
                                        See "WHERE"
                                    </Button>
                                    <Button
                                        onClick={() => window.open("https://www.signingsavvy.com/sign/FROM/7240/1", "_blank")}
                                        size="sm"
                                        variant="outline"
                                    >
                                        See "FROM"
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium mb-1">When did you start learning ASL?</p>
                                <div className="flex items-center mt-2">
                                    <Button
                                        onClick={() => window.open("https://www.signingsavvy.com/sign/WHEN/481/1", "_blank")}
                                        size="sm"
                                        variant="outline"
                                        className="mr-2"
                                    >
                                        See "WHEN"
                                    </Button>
                                    <Button
                                        onClick={() => window.open("https://www.signingsavvy.com/sign/START/3695/1", "_blank")}
                                        size="sm"
                                        variant="outline"
                                    >
                                        See "START"
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium mb-1">Why are you learning ASL?</p>
                                <div className="flex items-center mt-2">
                                    <Button
                                        onClick={() => window.open("https://www.signingsavvy.com/sign/WHY/483/1", "_blank")}
                                        size="sm"
                                        variant="outline"
                                        className="mr-2"
                                    >
                                        See "WHY"
                                    </Button>
                                    <Button
                                        onClick={() => window.open("https://www.signingsavvy.com/sign/LEARN/1805/1", "_blank")}
                                        size="sm"
                                        variant="outline"
                                    >
                                        See "LEARN"
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-3">
                                Record yourself asking these questions, then try answering them!
                            </p>
                            <Button className="bg-green-600 hover:bg-green-700">Start Recording Practice</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold text-red-800 mb-4">Common Mistakes to Avoid</h3>
                <p className="text-gray-700 mb-4">Be aware of these common errors when using question words in ASL.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-red-700">Mistake: Forgetting Facial Expressions</h4>
                        <p className="text-gray-700">
                            In ASL, the facial expression is as important as the hand sign. Without the proper facial expression, a
                            question may not be recognized as a question at all.
                        </p>
                        <div className="mt-3 p-2 bg-green-50 rounded">
                            <p className="text-sm font-medium text-green-800">Correct approach:</p>
                            <p className="text-sm text-gray-700">Always use furrowed eyebrows when asking WH-questions.</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-red-700">Mistake: Using English Word Order</h4>
                        <p className="text-gray-700">
                            ASL has its own grammar structure. Question words can often appear at the end of sentences, unlike in
                            English where they typically come at the beginning.
                        </p>
                        <div className="mt-3 p-2 bg-green-50 rounded">
                            <p className="text-sm font-medium text-green-800">Correct approach:</p>
                            <p className="text-sm text-gray-700">"YOU LIVE WHERE?" instead of "WHERE YOU LIVE?"</p>
                        </div>
                    </div>
                </div>
            </div>

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

