import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
    CheckCircle,
    XCircle,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    RefreshCw,
    ArrowLeft,
    ArrowRight,
    Info,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const DetailedResponses = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("learn")
    const [currentExample, setCurrentExample] = useState(0)
    const [userResponse, setUserResponse] = useState("")
    const [feedback, setFeedback] = useState<string | null>(null)
    const [feedbackType, setFeedbackType] = useState<"positive" | "negative" | null>(null)
    const [showAnswer, setShowAnswer] = useState(false)
    const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null)
    const [matchedPairs, setMatchedPairs] = useState<string[]>([])
    const [highlightedPart, setHighlightedPart] = useState<number | null>(null)

    // Example detailed responses
    const detailedResponseExamples = [
        {
            question: "How was your weekend?",
            basicResponse: "GOOD",
            detailedResponse: "WEEKEND GOOD. SATURDAY I GO-TO PARK WALK DOG. SUNDAY I VISIT FRIEND, WE COOK DINNER TOGETHER.",
            techniques: ["Adding specific details", "Using time sequencing", "Including activities"],
            parts: [
                { text: "WEEKEND GOOD.", explanation: "Start with a general statement that answers the question directly." },
                {
                    text: "SATURDAY I GO-TO PARK WALK DOG.",
                    explanation: "Add specific details about what you did on Saturday, including location and activity.",
                },
                {
                    text: "SUNDAY I VISIT FRIEND, WE COOK DINNER TOGETHER.",
                    explanation: "Continue with Sunday's activities, mentioning who you were with and what you did together.",
                },
            ],
        },
        {
            question: "What do you think about the movie?",
            basicResponse: "I LIKE",
            detailedResponse:
                "MOVIE INTERESTING. STORY COMPLEX BUT ACTING EXCELLENT. ENDING SURPRISE ME. I RECOMMEND YOU WATCH.",
            techniques: ["Giving specific opinions", "Comparing aspects", "Adding a recommendation"],
            parts: [
                { text: "MOVIE INTERESTING.", explanation: "Begin with your general impression of the movie." },
                {
                    text: "STORY COMPLEX BUT ACTING EXCELLENT.",
                    explanation: "Compare different aspects of the movie (story vs. acting) to give a nuanced opinion.",
                },
                { text: "ENDING SURPRISE ME.", explanation: "Add a specific detail about your reaction to part of the movie." },
                {
                    text: "I RECOMMEND YOU WATCH.",
                    explanation: "Conclude with a recommendation, making the response interactive.",
                },
            ],
        },
        {
            question: "Why are you learning ASL?",
            basicResponse: "INTERESTING",
            detailedResponse:
                "I LEARN ASL FOR THREE REASON: FIRST, I WANT COMMUNICATE WITH DEAF FRIEND. SECOND, ASL GRAMMAR FASCINATING. THIRD, SIGN LANGUAGE BEAUTIFUL VISUAL LANGUAGE.",
            techniques: ["Listing multiple reasons", "Using enumeration (FIRST, SECOND, THIRD)", "Explaining motivations"],
            parts: [
                {
                    text: "I LEARN ASL FOR THREE REASON:",
                    explanation: "Set up your answer by indicating you have multiple points to make.",
                },
                {
                    text: "FIRST, I WANT COMMUNICATE WITH DEAF FRIEND.",
                    explanation: "Start with your primary reason, which is practical and personal.",
                },
                { text: "SECOND, ASL GRAMMAR FASCINATING.", explanation: "Add an intellectual reason for your interest." },
                {
                    text: "THIRD, SIGN LANGUAGE BEAUTIFUL VISUAL LANGUAGE.",
                    explanation: "Conclude with an aesthetic appreciation of ASL.",
                },
            ],
        },
        {
            question: "Can you describe your house?",
            basicResponse: "BIG HOUSE",
            detailedResponse:
                "MY HOUSE TWO-STORY WITH THREE BEDROOM, TWO BATHROOM. KITCHEN LARGE WITH ISLAND. BACKYARD HAVE GARDEN AND PATIO. NEIGHBORHOOD QUIET.",
            techniques: ["Describing physical features", "Using spatial organization", "Including surroundings"],
            parts: [
                {
                    text: "MY HOUSE TWO-STORY WITH THREE BEDROOM, TWO BATHROOM.",
                    explanation: "Begin with the basic structure and size of your house.",
                },
                { text: "KITCHEN LARGE WITH ISLAND.", explanation: "Describe a specific room with distinctive features." },
                { text: "BACKYARD HAVE GARDEN AND PATIO.", explanation: "Move to the exterior space and its features." },
                {
                    text: "NEIGHBORHOOD QUIET.",
                    explanation: "Expand to the surrounding area to complete the spatial description.",
                },
            ],
        },
    ]

    // Techniques for constructing detailed responses
    const responseTechniques = [
        {
            name: "Enumeration",
            description: "List multiple points using FIRST, SECOND, THIRD",
            example: "I LOVE ASL FOR THREE REASON: FIRST... SECOND... THIRD...",
        },
        {
            name: "Comparison",
            description: "Compare and contrast different aspects",
            example: "OLD JOB BORING BUT PAY GOOD. NEW JOB INTERESTING BUT PAY LESS.",
        },
        {
            name: "Spatial Organization",
            description: "Use the signing space to organize your thoughts",
            example: "HOUSE LAYOUT: BEDROOM (left), KITCHEN (center), BATHROOM (right)",
        },
        {
            name: "Time Sequencing",
            description: "Organize information chronologically",
            example: "MORNING I EXERCISE, AFTERNOON I STUDY, EVENING I RELAX",
        },
        {
            name: "Cause and Effect",
            description: "Explain why something happened and its results",
            example: "RAIN HEAVY, THEREFORE ROAD FLOOD. RESULT: I LATE WORK.",
        },
        {
            name: "Specific Details",
            description: "Add descriptive details to basic statements",
            example: "Not just 'BOOK GOOD' but 'BOOK HAVE INTERESTING CHARACTER, SURPRISE ENDING'",
        },
    ]

    // Practice prompts
    const practicePrompts = [
        "Describe your favorite hobby",
        "Explain how to make your favorite meal",
        "Tell me about your last vacation",
        "Describe your daily routine",
        "Explain why you like/dislike a particular season",
    ]

    // Interactive examples for practice
    const interactiveExamples = [
        {
            prompt: "Tell me about your job",
            structure: [
                { label: "General statement", placeholder: "MY JOB..." },
                { label: "Specific responsibilities", placeholder: "I RESPONSIBLE-FOR..." },
                { label: "What you like/dislike", placeholder: "I LIKE/DISLIKE..." },
                { label: "Compare to previous experiences", placeholder: "BEFORE I..." },
            ],
        },
        {
            prompt: "Describe your hometown",
            structure: [
                { label: "Location and size", placeholder: "MY HOMETOWN LOCATED..." },
                { label: "Notable features", placeholder: "HAVE FAMOUS..." },
                { label: "Activities available", placeholder: "PEOPLE CAN..." },
                { label: "Your feelings about it", placeholder: "I FEEL..." },
            ],
        },
        {
            prompt: "What did you do last weekend?",
            structure: [
                { label: "Overview", placeholder: "LAST WEEKEND I..." },
                { label: "Saturday activities", placeholder: "SATURDAY I..." },
                { label: "Sunday activities", placeholder: "SUNDAY I..." },
                { label: "How you felt about it", placeholder: "I FEEL..." },
            ],
        },
    ]

    // Handle user response submission
    const handleResponseSubmit = () => {
        if (!userResponse.trim()) return

        // Simple feedback based on response length and complexity
        if (userResponse.split(" ").length < 5) {
            setFeedback("Your response is quite brief. Try adding more details using the techniques you've learned.")
            setFeedbackType("negative")
        } else if (userResponse.split(" ").length >= 15) {
            setFeedback("Excellent detailed response! You've provided good context and information.")
            setFeedbackType("positive")
        } else {
            setFeedback(
                "Good start! Consider adding more specific details or using techniques like enumeration or comparison.",
            )
            setFeedbackType("negative")
        }
    }

    // Reset response and feedback
    const resetResponse = () => {
        setUserResponse("")
        setFeedback(null)
        setFeedbackType(null)
        setShowAnswer(false)
    }

    // Handle technique selection
    const handleTechniqueSelect = (technique: string) => {
        setSelectedTechnique(technique)
    }

    // Handle technique matching
    const handleTechniqueMatch = (technique: string) => {
        if (matchedPairs.includes(technique)) {
            setMatchedPairs(matchedPairs.filter((t) => t !== technique))
        } else {
            setMatchedPairs([...matchedPairs, technique])
        }
    }

    // Next example
    const nextExample = () => {
        setCurrentExample((currentExample + 1) % detailedResponseExamples.length)
        setShowAnswer(false)
        setHighlightedPart(null)
    }

    // Previous example
    const prevExample = () => {
        setCurrentExample((currentExample - 1 + detailedResponseExamples.length) % detailedResponseExamples.length)
        setShowAnswer(false)
        setHighlightedPart(null)
    }

    // Highlight a specific part of the response
    const highlightPart = (index: number) => {
        setHighlightedPart(index === highlightedPart ? null : index)
    }

    return (
        <LessonLayout title="Constructing More Detailed Responses">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Detailed Responses in ASL</h2>
                <p className="text-gray-700">
                    Moving beyond basic responses is essential for fluent ASL conversations. In this lesson, you'll learn
                    techniques for constructing more detailed, informative, and engaging responses that enhance your communication
                    skills.
                </p>
            </div>

            {/* Mode Tabs */}
            <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                    <TabsTrigger value="techniques">Techniques</TabsTrigger>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>

                {/* Learn Mode */}
                <TabsContent value="learn">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <Button onClick={prevExample} variant="outline" className="flex items-center">
                                <ArrowLeft className="h-4 w-4 mr-2" /> Previous Example
                            </Button>
                            <span className="text-lg font-medium text-blue-600">
                                Example {currentExample + 1} / {detailedResponseExamples.length}
                            </span>
                            <Button onClick={nextExample} variant="outline" className="flex items-center">
                                Next Example <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Question:</h3>
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <p className="text-lg font-medium text-gray-700">
                                        {detailedResponseExamples[currentExample].question}
                                    </p>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Response:</h3>
                                <div className="bg-red-50 p-4 rounded-lg mb-6">
                                    <p className="text-lg font-medium text-red-700">
                                        {detailedResponseExamples[currentExample].basicResponse}
                                    </p>
                                </div>

                                <Button onClick={() => setShowAnswer(!showAnswer)} className="w-full">
                                    {showAnswer ? "Hide Detailed Response" : "Show Detailed Response"}
                                </Button>

                                <AnimatePresence>
                                    {showAnswer && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-6"
                                        >
                                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Response:</h3>
                                            <div className="bg-green-50 p-4 rounded-lg">
                                                <p className="text-lg font-medium text-green-700">
                                                    {detailedResponseExamples[currentExample].detailedResponse}
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <h4 className="font-semibold text-gray-800 mb-2">Techniques Used:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {detailedResponseExamples[currentExample].techniques.map((technique, index) => (
                                                        <Badge key={index} className="bg-blue-100 text-blue-800 py-1">
                                                            {technique}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Response Structure:</h3>

                                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                    <p className="text-gray-600 mb-4">
                                        Click on each part of the response to see how it's constructed and why it's effective.
                                    </p>

                                    <div className="space-y-3">
                                        {detailedResponseExamples[currentExample].parts.map((part, index) => (
                                            <div
                                                key={index}
                                                className={`p-3 rounded-lg cursor-pointer ${highlightedPart === index
                                                    ? "bg-blue-100 border-l-4 border-blue-500"
                                                    : "bg-white hover:bg-blue-50"
                                                    }`}
                                                onClick={() => highlightPart(index)}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <p className="font-medium">{part.text}</p>
                                                    <span className="text-blue-500 ml-2">
                                                        <Info size={16} />
                                                    </span>
                                                </div>

                                                {highlightedPart === index && (
                                                    <div
                                                        className="mt-2 text-sm text-gray-600 bg-blue-50 p-2 rounded"
                                                    >
                                                        {part.explanation}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-yellow-800 mb-2">Response Structure Tips:</h4>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start">
                                            <span className="inline-block bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                1
                                            </span>
                                            <span>Start with a direct answer to the question</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                2
                                            </span>
                                            <span>Add specific details that expand on your answer</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                3
                                            </span>
                                            <span>Use appropriate techniques (enumeration, comparison, etc.)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                4
                                            </span>
                                            <span>End with a conclusion or related information</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-purple-800 mb-2">Basic vs. Detailed Responses</h3>
                        <p className="text-gray-700 mb-4">
                            Compare how basic and detailed responses differ in the amount of information conveyed and the impression
                            they make.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="bg-red-50">
                                    <CardTitle className="text-lg text-red-800">Basic Responses</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <ThumbsDown className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">Limited information</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ThumbsDown className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">May seem abrupt or rude</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ThumbsDown className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">Conversation ends quickly</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ThumbsDown className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">Shows limited fluency</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="bg-green-50">
                                    <CardTitle className="text-lg text-green-800">Detailed Responses</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <ThumbsUp className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">Rich, informative content</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ThumbsUp className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">Shows cultural competence</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ThumbsUp className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">Keeps conversations flowing</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ThumbsUp className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">Demonstrates fluency and comfort with ASL</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Techniques Mode */}
                <TabsContent value="techniques">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Response Construction Techniques</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {responseTechniques.map((technique, index) => (
                                <Card
                                    key={index}
                                    className={`cursor-pointer transition-all ${selectedTechnique === technique.name ? "ring-2 ring-blue-500" : ""
                                        }`}
                                    onClick={() => handleTechniqueSelect(technique.name)}
                                >
                                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                                        <CardTitle className="text-lg">{technique.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <p className="text-gray-700 mb-3">{technique.description}</p>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-sm text-gray-600 italic">"{technique.example}"</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {selectedTechnique && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 p-6 bg-blue-50 rounded-lg"
                            >
                                <h4 className="text-lg font-semibold text-blue-800 mb-3">Using the {selectedTechnique} Technique</h4>
                                <p className="text-gray-700 mb-4">
                                    {responseTechniques.find((t) => t.name === selectedTechnique)?.description}
                                </p>
                                <div className="bg-white p-4 rounded-lg">
                                    <h5 className="font-medium text-gray-800 mb-2">Try it yourself:</h5>
                                    <p className="text-gray-700 mb-3">
                                        Create a response using the {selectedTechnique.toLowerCase()} technique to answer this question:
                                    </p>
                                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                                        <p className="font-medium">
                                            {selectedTechnique === "Enumeration" && "What are your favorite hobbies?"}
                                            {selectedTechnique === "Comparison" && "How does your current job compare to your previous one?"}
                                            {selectedTechnique === "Spatial Organization" && "Can you describe the layout of your home?"}
                                            {selectedTechnique === "Time Sequencing" && "What is your typical day like?"}
                                            {selectedTechnique === "Cause and Effect" && "Why were you late to the meeting?"}
                                            {selectedTechnique === "Specific Details" && "What did you think of the book you just read?"}
                                        </p>
                                    </div>
                                    <Textarea placeholder="Type your response here..." className="w-full h-24 mb-3" />
                                    <div className="text-sm text-gray-500">
                                        Remember to incorporate the key elements of the {selectedTechnique.toLowerCase()} technique in your
                                        response.
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">Technique Identification Exercise</h3>
                        <p className="text-gray-700 mb-4">
                            Read the following responses and identify which techniques are being used.
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white p-4 rounded-lg">
                                <p className="font-medium text-gray-800 mb-3">
                                    "MY WEEKEND HAVE THREE PART: FRIDAY NIGHT I GO MOVIE, SATURDAY I CLEAN HOUSE, SUNDAY I VISIT FAMILY."
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Enumeration", "Time Sequencing", "Specific Details"].map((technique) => (
                                        <Badge
                                            key={technique}
                                            variant="outline"
                                            className={`cursor-pointer ${matchedPairs.includes(technique)
                                                ? "bg-green-100 text-green-800 border-green-300"
                                                : "bg-gray-100 text-gray-800 border-gray-300"
                                                }`}
                                            onClick={() => handleTechniqueMatch(technique)}
                                        >
                                            {technique}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="mt-2 text-sm text-gray-500">Click on the techniques you identify in this response.</div>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <p className="font-medium text-gray-800 mb-3">
                                    "OLD APARTMENT SMALL, NOISY, BUT CHEAP. NEW APARTMENT SPACIOUS, QUIET, BUT EXPENSIVE."
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Comparison", "Spatial Organization", "Cause and Effect"].map((technique) => (
                                        <Badge
                                            key={technique}
                                            variant="outline"
                                            className={`cursor-pointer ${matchedPairs.includes(technique)
                                                ? "bg-green-100 text-green-800 border-green-300"
                                                : "bg-gray-100 text-gray-800 border-gray-300"
                                                }`}
                                            onClick={() => handleTechniqueMatch(technique)}
                                        >
                                            {technique}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="mt-2 text-sm text-gray-500">Click on the techniques you identify in this response.</div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Practice Mode */}
                <TabsContent value="practice">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Practice Constructing Detailed Responses</h3>

                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">Prompt:</h4>
                            <p className="text-lg font-medium text-gray-800">
                                {practicePrompts[Math.floor(Math.random() * practicePrompts.length)]}
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Construct a detailed response:</label>
                            <Textarea
                                value={userResponse}
                                onChange={(e) => setUserResponse(e.target.value)}
                                placeholder="Type your detailed ASL response here (in gloss notation)..."
                                className="w-full h-32"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Use ASL gloss notation (ALL-CAPS for signs). Try to incorporate at least two different techniques.
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <Button onClick={resetResponse} variant="outline" className="flex items-center">
                                <RefreshCw className="h-4 w-4 mr-2" /> Reset
                            </Button>
                            <Button onClick={handleResponseSubmit} className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-2" /> Submit Response
                            </Button>
                        </div>

                        <AnimatePresence>
                            {feedback && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`mt-6 p-4 rounded-lg ${feedbackType === "positive" ? "bg-green-50" : "bg-yellow-50"}`}
                                >
                                    <div className="flex items-start">
                                        {feedbackType === "positive" ? (
                                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                                        )}
                                        <div>
                                            <h4
                                                className={`font-medium ${feedbackType === "positive" ? "text-green-800" : "text-yellow-800"
                                                    } mb-1`}
                                            >
                                                Feedback on Your Response
                                            </h4>
                                            <p className="text-gray-700">{feedback}</p>
                                        </div>
                                    </div>

                                    {feedbackType === "negative" && (
                                        <div className="mt-4 bg-white p-3 rounded-lg">
                                            <h5 className="font-medium text-gray-800 mb-2">Tips to Improve:</h5>
                                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                                <li>Add more specific details about when, where, how</li>
                                                <li>Try using enumeration to list multiple points</li>
                                                <li>Include your opinions or feelings about the topic</li>
                                                <li>Compare different aspects of what you're describing</li>
                                            </ul>
                                        </div>
                                    )}

                                    <Button onClick={() => setShowAnswer(!showAnswer)} variant="outline" className="mt-4">
                                        {showAnswer ? "Hide Example" : "Show Example Response"}
                                    </Button>

                                    {showAnswer && (
                                        <div className="mt-4 bg-green-50 p-3 rounded-lg">
                                            <h5 className="font-medium text-green-800 mb-2">Example Detailed Response:</h5>
                                            <p className="text-gray-700">
                                                MY FAVORITE HOBBY GARDENING. I GROW THREE TYPE PLANT: VEGETABLE, FLOWER, HERB. VEGETABLE INCLUDE
                                                TOMATO, CUCUMBER, PEPPER. I GARDEN BECAUSE: FIRST, RELAXING. SECOND, I GET FRESH FOOD. THIRD,
                                                GOOD EXERCISE. SUMMER I GARDEN EVERY-DAY, WINTER I PLAN NEXT YEAR.
                                            </p>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <span className="font-medium">Techniques used:</span> Enumeration, Specific Details, Time
                                                Sequencing, Cause and Effect
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-purple-800 mb-2">Response Structure Builder</h3>
                        <p className="text-gray-700 mb-4">Use this interactive tool to build a detailed response step by step.</p>

                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold mb-3">Prompt: {interactiveExamples[0].prompt}</h4>

                            <div className="space-y-3">
                                {interactiveExamples[0].structure.map((part, index) => (
                                    <div key={index} className="mb-3">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                        {part.label} <Info className="h-4 w-4 ml-1 text-gray-400" />
                                                    </label>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="text-xs">This part helps build a structured detailed response</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <Textarea placeholder={part.placeholder} className="w-full h-12 text-sm" />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <Button className="w-full">Generate Complete Response</Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-blue-800 mb-2">Real Conversation Practice</h3>
                        <p className="text-gray-700 mb-4">
                            The best way to improve your detailed response skills is through real conversation practice.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold mb-3">Find a Practice Partner</h4>
                                <p className="text-gray-700 mb-3">
                                    Practice with a friend, classmate, or through online ASL communities. Take turns asking questions and
                                    giving detailed responses.
                                </p>
                                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                    <li>Ask open-ended questions</li>
                                    <li>Give each other feedback</li>
                                    <li>Try to incorporate different techniques</li>
                                </ul>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold mb-3">Record Yourself</h4>
                                <p className="text-gray-700 mb-3">
                                    Record videos of yourself answering common questions with detailed responses. Review the videos to
                                    identify areas for improvement.
                                </p>
                                <Button className="w-full">Start Recording</Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/DirectionalVerbs")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/lessons/EmergencySigns")}>
                    Next Lesson →
                </Button>
            </div>
        </LessonLayout >
    )
}

export default DetailedResponses

