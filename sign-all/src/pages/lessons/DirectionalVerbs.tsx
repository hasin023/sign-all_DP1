import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, Play, Pause, RotateCcw, CheckCircle, XCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

const DirectionalVerbs = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("learn")
    const [currentVerb, setCurrentVerb] = useState("give")
    const [showExplanation, setShowExplanation] = useState(false)
    const [draggedItem, setDraggedItem] = useState<string | null>(null)
    const [droppedItems, setDroppedItems] = useState<Record<string, string>>({})
    const [isCorrect, setIsCorrect] = useState<Record<string, boolean>>({})
    const [practiceStep, setPracticeStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement | null>(null)

    // Directional verbs data
    const directionalVerbs = {
        give: {
            title: "GIVE",
            description: "The sign moves from the giver to the receiver",
            examples: [
                "I-GIVE-you (I give you)",
                "you-GIVE-me (You give me)",
                "she-GIVE-him (She gives him)"
            ],
            videoUrl: "https://www.handspeak.com/word/g/giv/give2.mp4",
            imageUrl: "https://www.handspeak.com/word/g/giv/give-aslwrite.png",
            explanation: "The sign GIVE starts near the signer's body and moves toward the recipient. The direction of movement shows who is giving to whom."
        },
        ask: {
            title: "ASK",
            description: "The sign moves from the asker to the person being asked",
            examples: [
                "I-ASK-you (I ask you)",
                "you-ASK-me (You ask me)",
                "he-ASK-her (He asks her)"
            ],
            videoUrl: "https://www.handspeak.com/word/a/ask/ask.mp4",
            imageUrl: "https://www.handspeak.com/word/a/ask/ask-aslwrite.jpg",
            explanation: "The sign ASK starts near the signer's mouth and moves toward the person being asked. The direction shows who is asking whom."
        },
        help: {
            title: "HELP",
            description: "The sign moves from the helper to the person being helped",
            examples: [
                "I-HELP-you (I help you)",
                "you-HELP-me (You help me)",
                "they-HELP-us (They help us)"
            ],
            videoUrl: "https://www.handspeak.com/word/h/hel/help.mp4",
            imageUrl: "https://www.handspeak.com/word/h/hel/help.jpg",
            explanation: "The sign HELP is made with one hand supporting the other, moving from the helper to the person being helped."
        },
        tell: {
            title: "TELL",
            description: "The sign moves from the teller to the person being told",
            examples: [
                "I-TELL-you (I tell you)",
                "you-TELL-me (You tell me)",
                "she-TELL-them (She tells them)"
            ],
            videoUrl: "https://www.handspeak.com/word/s/say/say.mp4",
            imageUrl: "https://www.handspeak.com/word/t/tell.jpg",
            explanation: "The sign TELL starts near the signer's mouth and moves toward the recipient of the information."
        },
    }

    // Practice scenarios
    const practiceScenarios = [
        {
            instruction: "Sign: 'I give you the book'",
            tips: "Start the GIVE sign near your body and move it toward the person you're addressing",
            videoUrl: "https://www.handspeak.com/word/g/giv/give-you.mp4"
        },
        {
            instruction: "Sign: 'You help me with homework'",
            tips: "Start the HELP sign near the person you're addressing and move it toward yourself",
            videoUrl: "https://www.handspeak.com/word/h/hel/help2.mp4"
        },
        {
            instruction: "Sign: 'She asks him a question'",
            tips: "Establish 'she' on your right and 'him' on your left, then sign ASK moving from right to left",
            videoUrl: "https://www.handspeak.com/word/a/ask/ask-out.mp4"
        }
    ]

    // Drag and drop exercise data
    const dragDropExercise = [
        { id: "drop1", sentence: "I _____ you the answer", correctVerb: "tell" },
        { id: "drop2", sentence: "Can you _____ me with this?", correctVerb: "help" },
        { id: "drop3", sentence: "She _____ him a gift", correctVerb: "give" },
        { id: "drop4", sentence: "They _____ us a message", correctVerb: "send" },
        { id: "drop5", sentence: "He _____ her a question", correctVerb: "ask" }
    ]

    // Handle drag start
    const handleDragStart = (verb: string) => {
        setDraggedItem(verb)
    }

    // Handle drop
    const handleDrop = (dropId: string) => {
        if (draggedItem) {
            const newDroppedItems = { ...droppedItems, [dropId]: draggedItem }
            setDroppedItems(newDroppedItems)

            // Check if correct
            const exercise = dragDropExercise.find(ex => ex.id === dropId)
            if (exercise) {
                setIsCorrect({
                    ...isCorrect,
                    [dropId]: exercise.correctVerb === draggedItem
                })
            }

            setDraggedItem(null)
        }
    }

    // Reset drag and drop exercise
    const resetExercise = () => {
        setDroppedItems({})
        setIsCorrect({})
    }

    // Toggle video playback
    const togglePlayback = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    // Calculate score
    const calculateScore = () => {
        return Object.values(isCorrect).filter(result => result).length
    }

    return (
        <LessonLayout title="Understanding Directional Verbs">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Directional Verbs in ASL</h2>
                <p className="text-gray-700">
                    Directional verbs (also called indicating verbs) are a special category of verbs in ASL that show who is doing what to whom by changing the direction of the sign. The movement of these verbs indicates the subject and object without needing separate signs for pronouns.
                </p>
            </div>

            {/* Mode Tabs */}
            <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                    <TabsTrigger value="exercise">Exercise</TabsTrigger>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>

                {/* Learn Mode */}
                <TabsContent value="learn">
                    {/* Verb Selection */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {Object.keys(directionalVerbs).map((verb) => (
                            <Button
                                key={verb}
                                variant={currentVerb === verb ? "default" : "outline"}
                                onClick={() => {
                                    setCurrentVerb(verb)
                                    setShowExplanation(false)
                                }}
                                className="capitalize"
                            >
                                {verb.toUpperCase()}
                            </Button>
                        ))}
                    </div>

                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-lg mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`learn-${currentVerb}`}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <h3 className="text-3xl font-bold text-blue-600 mb-4">
                                    {directionalVerbs[currentVerb as keyof typeof directionalVerbs].title}
                                </h3>
                                <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden">
                                    <iframe
                                        src={`/api/proxy-video?url=${directionalVerbs[currentVerb as keyof typeof directionalVerbs].videoUrl}`}
                                        title={`ASL sign for ${currentVerb}`}
                                        className="absolute inset-0 w-full h-full"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="flex justify-center">
                                    <Button onClick={() => setShowExplanation(!showExplanation)} variant="outline">
                                        {showExplanation ? "Hide Explanation" : "Show Explanation"}
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">How It Works</h4>
                                <p className="text-gray-700 mb-6">
                                    {directionalVerbs[currentVerb as keyof typeof directionalVerbs].description}
                                </p>

                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Examples</h4>
                                <ul className="list-disc pl-6 text-gray-700 mb-6">
                                    {directionalVerbs[currentVerb as keyof typeof directionalVerbs].examples.map((example, index) => (
                                        <li key={index} className="mb-2">
                                            {example}
                                        </li>
                                    ))}
                                </ul>

                                {showExplanation && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 p-6 rounded-lg">
                                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Detailed Explanation</h4>
                                        <p className="text-gray-700">
                                            {directionalVerbs[currentVerb as keyof typeof directionalVerbs].explanation}
                                        </p>

                                        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                                            <h5 className="font-semibold text-blue-800 mb-2">Spatial Grammar</h5>
                                            <p className="text-gray-700">
                                                Directional verbs use the signing space to show grammatical relationships. This is a key feature of ASL's spatial grammar, where the location and movement of signs convey meaning.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-purple-800 mb-2">Key Concepts</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-semibold text-purple-800 mb-2">Subject-Object Relationship</h4>
                                <p className="text-gray-700">
                                    In ASL, directional verbs show who is doing the action (subject) and who is receiving the action (object) through the direction of movement. This eliminates the need for separate subject and object pronouns in many cases.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-semibold text-purple-800 mb-2">Establishing Referents</h4>
                                <p className="text-gray-700">
                                    Before using directional verbs with third-person referents (he, she, they), you must first establish these people or things in the signing space. Once established, you can direct verbs between these points.
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Exercise Mode */}
                <TabsContent value="exercise">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Match the Directional Verbs</h3>

                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">Instructions:</h4>
                            <p className="text-gray-700">
                                Drag the correct directional verb to complete each sentence. Pay attention to who is doing the action and who is receiving it.
                            </p>
                        </div>

                        {/* Draggable Verbs */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8 p-4 bg-gray-50 rounded-lg">
                            {Object.keys(directionalVerbs).map((verb) => (
                                <div
                                    key={verb}
                                    draggable
                                    onDragStart={() => handleDragStart(verb)}
                                    className={`px-4 py-2 bg-blue-100 text-blue-800 rounded-md cursor-move capitalize ${Object.values(droppedItems).includes(verb) ? "opacity-50" : "opacity-100"
                                        }`}
                                >
                                    {verb}
                                </div>
                            ))}
                        </div>

                        {/* Drop Zones */}
                        <div className="space-y-4">
                            {dragDropExercise.map((item) => (
                                <div
                                    key={item.id}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => handleDrop(item.id)}
                                    className={`p-4 rounded-lg border-2 ${droppedItems[item.id]
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
                                                droppedItems[item.id] ? (
                                                    <span
                                                        className={`font-bold capitalize ${isCorrect[item.id] ? "text-green-600" : "text-red-600"}`}
                                                    >
                                                        {droppedItems[item.id]}
                                                    </span>
                                                ) : (
                                                    <span className="px-8 py-1 bg-gray-200 rounded">____</span>
                                                ),
                                            )}
                                        </div>
                                        {droppedItems[item.id] &&
                                            (isCorrect[item.id] ? (
                                                <CheckCircle className="h-6 w-6 text-green-600 ml-2" />
                                            ) : (
                                                <XCircle className="h-6 w-6 text-red-600 ml-2" />
                                            ))}
                                    </div>
                                    {droppedItems[item.id] && !isCorrect[item.id] && (
                                        <div className="mt-2 text-sm text-red-600">
                                            Hint: Think about the direction of the action.
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between mt-8">
                            <div>
                                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                    Score: {calculateScore()} / {dragDropExercise.length}
                                </Badge>
                            </div>
                            <Button onClick={resetExercise} variant="outline" className="flex items-center">
                                <RotateCcw className="h-4 w-4 mr-2" /> Reset Exercise
                            </Button>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">Understanding Directionality</h3>
                        <p className="text-gray-700 mb-4">
                            The direction of movement in these verbs is crucial for clear communication. Here's a visual representation of how directionality works:
                        </p>

                        <div className="bg-white p-4 rounded-lg">
                            <div className="relative h-40 mb-4">
                                <div className="absolute left-0 top-0 bottom-0 w-1/3 flex items-center justify-center">
                                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                                        <span className="font-bold text-blue-800">I</span>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <ArrowRight className="h-12 w-12 text-red-500" />
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-center">
                                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                                        <span className="font-bold text-green-800">You</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center font-medium text-gray-800">
                                I → You (I give to you, I ask you, I help you)
                            </p>

                            <div className="relative h-40 mt-8 mb-4">
                                <div className="absolute left-0 top-0 bottom-0 w-1/3 flex items-center justify-center">
                                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                                        <span className="font-bold text-blue-800">I</span>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <ArrowLeft className="h-12 w-12 text-red-500" />
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-center">
                                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                                        <span className="font-bold text-green-800">You</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center font-medium text-gray-800">
                                You → I (You give to me, You ask me, You help me)
                            </p>
                        </div>
                    </div>
                </TabsContent>

                {/* Practice Mode */}
                <TabsContent value="practice">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Practice Directional Verbs</h3>

                        <div className="flex justify-between items-center mb-4">
                            <Button
                                onClick={() => setPracticeStep(Math.max(0, practiceStep - 1))}
                                variant="outline"
                                disabled={practiceStep === 0}
                                className="flex items-center"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                            </Button>
                            <span className="text-lg font-medium text-blue-600">
                                {practiceStep + 1} / {practiceScenarios.length}
                            </span>
                            <Button
                                onClick={() => setPracticeStep(Math.min(practiceScenarios.length - 1, practiceStep + 1))}
                                variant="outline"
                                disabled={practiceStep === practiceScenarios.length - 1}
                                className="flex items-center"
                            >
                                Next <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg mb-6">
                            <h4 className="text-xl font-bold text-blue-800 mb-4">
                                {practiceScenarios[practiceStep].instruction}
                            </h4>
                            <p className="text-gray-700 mb-4">
                                {practiceScenarios[practiceStep].tips}
                            </p>

                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                <video
                                    ref={videoRef}
                                    src={`/api/proxy-video?url=${practiceScenarios[practiceStep].videoUrl}`}
                                    className="w-full h-full object-cover"
                                    loop
                                ></video>

                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                    <Button
                                        onClick={togglePlayback}
                                        variant="secondary"
                                        size="sm"
                                        className="bg-white/80 hover:bg-white"
                                    >
                                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-3">Mirror Practice</h4>
                                <p className="text-gray-700 mb-4">
                                    Practice signing the sentence in front of a mirror. Pay attention to the direction of your signs.
                                </p>
                                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                    <li>Make sure your movements clearly show who is doing what to whom</li>
                                    <li>Practice with different subject-object combinations</li>
                                    <li>Use appropriate facial expressions</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-3">Record Yourself</h4>
                                <p className="text-gray-700 mb-4">
                                    Record a video of yourself signing the practice sentence and review it.
                                </p>
                                <Button className="w-full">Start Recording</Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-green-800 mb-2">Advanced Practice: Third-Person References</h3>
                        <p className="text-gray-700 mb-4">
                            When using directional verbs with third-person references (he, she, they), you need to establish these referents in the signing space first.
                        </p>

                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold mb-3">Steps for Third-Person References:</h4>
                            <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                                <li>Establish Person A on your right side (e.g., "WOMAN THERE")</li>
                                <li>Establish Person B on your left side (e.g., "MAN THERE")</li>
                                <li>Direct the verb from one established point to another (e.g., "WOMAN GIVE MAN")</li>
                            </ol>

                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <strong>Pro Tip:</strong> Be consistent with your referent locations throughout your conversation. If you establish someone on your right, keep referring to them in that same location.
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/TimeIndicators")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/lessons/DetailedResponses")}>
                    Next Lesson →
                </Button>
            </div>
        </LessonLayout>
    )
}

export default DirectionalVerbs
