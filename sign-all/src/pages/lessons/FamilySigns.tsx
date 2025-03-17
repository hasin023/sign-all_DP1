"use client"

import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, CheckCircle, Search, Zap, Star, Puzzle, Award, Smile, Frown, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const FamilySigns = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("learn")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedSign, setSelectedSign] = useState<string | null>(null)
    const [currentStory, setCurrentStory] = useState(0)
    const [storyProgress, setStoryProgress] = useState(0)
    const [showStoryFeedback, setShowStoryFeedback] = useState(false)
    const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string | null }>({})
    const [quizSubmitted, setQuizSubmitted] = useState(false)
    const [quizScore, setQuizScore] = useState(0)
    const [gameState, setGameState] = useState<"setup" | "playing" | "complete">("setup")
    const [familyTree, setFamilyTree] = useState<{ [key: string]: string }>({})
    const [gameLevel, setGameLevel] = useState(1)
    const [gameScore, setGameScore] = useState(0)
    const [currentGameQuestion, setCurrentGameQuestion] = useState(0)
    const [draggedSign, setDraggedSign] = useState<string | null>(null)
    const [dropTarget, setDropTarget] = useState<string | null>(null)
    const [storyFills, setStoryFills] = useState<{ [key: string]: string }>({})

    // Family signs data
    const familySigns = [
        {
            sign: "MOTHER",
            description: "Thumb of '5' handshape tapped on chin",
            usage: "Used when referring to one's mother or someone else's mother",
            category: "immediate",
            videoUrl: "https://www.handspeak.com/word/m/mot/mother.mp4",
            imageUrl: "https://www.handspeak.com/word/m/mot/mother-shot.jpg",
        },
        {
            sign: "FATHER",
            description: "Thumb of '5' handshape tapped on forehead",
            usage: "Used when referring to one's father or someone else's father",
            category: "immediate",
            videoUrl: "https://www.handspeak.com/word/g/gra/grandfather.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "SISTER",
            description: "Female sign followed by initialized 'S' handshape circled by chin",
            usage: "Used when referring to one's sister or someone else's sister",
            category: "immediate",
            videoUrl: "https://www.handspeak.com/word/s/sis/sister.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "BROTHER",
            description: "Male sign followed by initialized 'B' handshape circled by chin",
            usage: "Used when referring to one's brother or someone else's brother",
            category: "immediate",
            videoUrl: "https://www.handspeak.com/word/b/bro/brother.mp4",
            imageUrl: "https://www.handspeak.com/word/b/bro/brother-oldasl.jpg",
        },
        {
            sign: "BABY",
            description: "Arms cradled as if holding an infant",
            usage: "Used when referring to an infant or very young child",
            category: "immediate",
            videoUrl: "https://www.handspeak.com/word/b/bab/baby.mp4",
            imageUrl: "https://www.handspeak.com/word/b/bab/baby.jpg",
        },
        {
            sign: "GRANDMOTHER",
            description: "Sign for 'mother' followed by moving hand from chin outward in an arc",
            usage: "Used when referring to one's grandmother or someone else's grandmother",
            category: "extended",
            videoUrl: "https://www.handspeak.com/word/g/gra/grandmother.mp4",
            imageUrl: "https://www.handspeak.com/word/g/gra/grandmother-drawasl.jpg",
        },
        {
            sign: "GRANDFATHER",
            description: "Sign for 'father' followed by moving hand from forehead outward in an arc",
            usage: "Used when referring to one's grandfather or someone else's grandfather",
            category: "extended",
            videoUrl: "https://www.handspeak.com/word/g/gra/grandfather.mp4",
            imageUrl: "https://www.handspeak.com/word/g/gra/grandfather-drawasl.jpg",
        },
        {
            sign: "HUSBAND",
            description: "'H' handshape tapped on chest",
            usage: "Used when referring to one's husband or someone else's husband",
            category: "relationship",
            videoUrl: "https://www.handspeak.com/word/h/hus/husband.mp4",
            imageUrl: "https://www.handspeak.com/word/h/hus/husband-aslwrite.png",
        },
        {
            sign: "WIFE",
            description: "'W' handshape tapped on chest",
            usage: "Used when referring to one's wife or someone else's wife",
            category: "relationship",
            videoUrl: "https://www.handspeak.com/word/h/hus/husband.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "FAMILY",
            description: "Both hands in 'F' handshape, circled together",
            usage: "Used when referring to a family unit or group of relatives",
            category: "general",
            videoUrl: "https://www.handspeak.com/word/f/fam/family.mp4",
            imageUrl: "https://www.handspeak.com/word/f/fam/family-screenshot.jpg",
        },
    ]

    // Family stories for practice
    const familyStories = [
        {
            title: "Family Reunion",
            story:
                "Last weekend, my FAMILY had a big reunion. My MOTHER and FATHER organized it. My SISTER brought her HUSBAND and their BABY. My BROTHER came with his WIFE. My GRANDMOTHER baked cookies, and my GRANDFATHER told stories. Even my AUNT, UNCLE, and COUSIN joined us.",
            blanks: [
                "FAMILY",
                "MOTHER",
                "FATHER",
                "SISTER",
                "HUSBAND",
                "BABY",
                "BROTHER",
                "WIFE",
                "GRANDMOTHER",
                "GRANDFATHER",
                "AUNT",
                "UNCLE",
                "COUSIN",
            ],
            feedback: "Great job! You've correctly identified all the family members in this reunion story.",
        },
        {
            title: "Holiday Celebration",
            story:
                "During the holidays, our FAMILY always gets together. My PARENTS host at their house. My older SISTER and her PARTNER bring gifts for everyone. My younger BROTHER plays with our little COUSIN. Our GRANDMOTHER makes her famous pie, while our GRANDFATHER takes photos. My AUNT and UNCLE help with decorations.",
            blanks: [
                "FAMILY",
                "PARENTS",
                "SISTER",
                "PARTNER",
                "BROTHER",
                "COUSIN",
                "GRANDMOTHER",
                "GRANDFATHER",
                "AUNT",
                "UNCLE",
            ],
            feedback: "Excellent! You've successfully identified all the family relationships in this holiday story.",
        },
        {
            title: "Family Tree Project",
            story:
                "For school, I created a FAMILY tree. I put my MOTHER and FATHER at the top. Then I added my SISTER and BROTHER. I included my GRANDMOTHER and GRANDFATHER on my mother's side, and my other GRANDPARENTS on my father's side. I also added my AUNT, UNCLE, and all my COUSINS.",
            blanks: [
                "FAMILY",
                "MOTHER",
                "FATHER",
                "SISTER",
                "BROTHER",
                "GRANDMOTHER",
                "GRANDFATHER",
                "GRANDPARENTS",
                "AUNT",
                "UNCLE",
                "COUSINS",
            ],
            feedback: "Well done! You've correctly identified all the family members in this family tree project.",
        },
    ]

    // Quiz questions
    const quizQuestions = [
        {
            question: "Which sign uses a thumb tapped on the chin?",
            options: ["MOTHER", "FATHER", "SISTER", "BROTHER"],
            correctAnswer: "MOTHER",
        },
        {
            question: "How do you sign 'BROTHER'?",
            options: [
                "Male sign followed by 'B' handshape circled by chin",
                "Female sign followed by 'B' handshape circled by chin",
                "'B' handshape tapped on forehead",
                "'B' handshape circled near cheek",
            ],
            correctAnswer: "Male sign followed by 'B' handshape circled by chin",
        },
        {
            question: "Which sign involves cradling arms as if holding an infant?",
            options: ["CHILD", "BABY", "COUSIN", "NEPHEW"],
            correctAnswer: "BABY",
        },
        {
            question: "How is 'GRANDMOTHER' signed?",
            options: [
                "Sign for 'mother' followed by moving hand from chin outward in an arc",
                "'G' handshape tapped on chin",
                "Sign for 'woman' followed by 'old'",
                "'G' handshape circled near cheek",
            ],
            correctAnswer: "Sign for 'mother' followed by moving hand from chin outward in an arc",
        },
        {
            question: "Which sign uses both hands in 'F' handshape, circled together?",
            options: ["FRIEND", "FAMILY", "FOREVER", "FATHER"],
            correctAnswer: "FAMILY",
        },
    ]

    // Family tree game levels
    const gameLevels = [
        {
            level: 1,
            title: "Immediate Family",
            description: "Place the correct family signs in the tree",
            relationships: [
                { position: "parent1", label: "Parent 1", correctSign: "MOTHER" },
                { position: "parent2", label: "Parent 2", correctSign: "FATHER" },
                { position: "child1", label: "Child 1", correctSign: "SISTER" },
                { position: "child2", label: "Child 2", correctSign: "BROTHER" },
                { position: "baby", label: "Baby", correctSign: "BABY" },
            ],
        },
        {
            level: 2,
            title: "Extended Family",
            description: "Add extended family members to the tree",
            relationships: [
                { position: "grandparent1", label: "Grandparent 1", correctSign: "GRANDMOTHER" },
                { position: "grandparent2", label: "Grandparent 2", correctSign: "GRANDFATHER" },
                { position: "parent1", label: "Parent 1", correctSign: "MOTHER" },
                { position: "parent2", label: "Parent 2", correctSign: "FATHER" },
                { position: "aunt", label: "Aunt", correctSign: "AUNT" },
                { position: "uncle", label: "Uncle", correctSign: "UNCLE" },
                { position: "child", label: "Child", correctSign: "BROTHER" },
                { position: "cousin", label: "Cousin", correctSign: "COUSIN" },
            ],
        },
        {
            level: 3,
            title: "Family Relationships",
            description: "Complete the family with relationship signs",
            relationships: [
                { position: "grandparent1", label: "Grandparent 1", correctSign: "GRANDMOTHER" },
                { position: "grandparent2", label: "Grandparent 2", correctSign: "GRANDFATHER" },
                { position: "parent1", label: "Parent 1", correctSign: "MOTHER" },
                { position: "parent2", label: "Parent 2", correctSign: "FATHER" },
                { position: "spouse1", label: "Spouse 1", correctSign: "HUSBAND" },
                { position: "spouse2", label: "Spouse 2", correctSign: "WIFE" },
                { position: "partner", label: "Partner", correctSign: "PARTNER" },
                { position: "relative", label: "Relative", correctSign: "RELATIVE" },
            ],
        },
    ]

    // Filter signs based on search
    const filteredSigns = familySigns.filter(
        (sign) => searchTerm === "" || sign.sign.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Handle story fill-in-the-blank
    const handleStoryFill = (blank: string, value: string) => {
        setStoryFills({
            ...storyFills,
            [blank]: value,
        })
    }

    // Check story progress
    useEffect(() => {
        if (Object.keys(storyFills).length > 0) {
            const story = familyStories[currentStory]
            const totalBlanks = story.blanks.length
            const correctFills = story.blanks.filter((blank) => storyFills[blank] === blank)

            setStoryProgress((correctFills.length / totalBlanks) * 100)
        }
    }, [storyFills, currentStory])

    // Handle quiz answer selection
    const handleQuizAnswer = (questionIndex: number, answer: string) => {
        setQuizAnswers((prev) => ({
            ...prev,
            [questionIndex]: answer,
        }))
    }

    // Submit quiz
    const handleQuizSubmit = () => {
        const correctAnswers = quizQuestions.filter((q, index) => quizAnswers[index] === q.correctAnswer).length

        setQuizScore(correctAnswers)
        setQuizSubmitted(true)
    }

    // Reset quiz
    const resetQuiz = () => {
        setQuizAnswers({})
        setQuizSubmitted(false)
        setQuizScore(0)
    }

    // Start family tree game
    const startGame = () => {
        setGameState("playing")
        setFamilyTree({})
        setGameScore(0)
        setCurrentGameQuestion(0)
    }

    // Handle drag start in game
    const handleDragStart = (sign: string) => {
        setDraggedSign(sign)
    }

    // Handle drop in game
    const handleDrop = (position: string) => {
        if (draggedSign) {
            setFamilyTree({
                ...familyTree,
                [position]: draggedSign,
            })
            setDraggedSign(null)
        }
    }

    // Check game level completion
    const checkLevelCompletion = () => {
        const currentLevelData = gameLevels[gameLevel - 1]
        const totalPositions = currentLevelData.relationships.length
        let correctPositions = 0

        currentLevelData.relationships.forEach((rel) => {
            if (familyTree[rel.position] === rel.correctSign) {
                correctPositions++
            }
        })

        if (correctPositions === totalPositions) {
            // Level completed
            if (gameLevel < gameLevels.length) {
                setGameLevel(gameLevel + 1)
                setFamilyTree({})
                setGameScore(gameScore + 100)
            } else {
                // Game completed
                setGameState("complete")
                setGameScore(gameScore + 100)
            }
        }
    }

    // Reset story
    const resetStory = () => {
        setStoryFills({})
        setShowStoryFeedback(false)
        setCurrentStory((currentStory + 1) % familyStories.length)
    }

    return (
        <LessonLayout title="Family and Relationship Signs">
            <div className="bg-pink-50 p-6 rounded-lg shadow-md mb-8 border-l-4 border-pink-500">
                <div className="flex items-start">
                    <Heart className="h-6 w-6 text-pink-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                        <h2 className="text-2xl font-bold text-pink-800 mb-2">Family Connections</h2>
                        <p className="text-gray-700">
                            Learning family and relationship signs allows you to share about your loved ones and understand when
                            others discuss their families. These signs are essential for personal conversations and building
                            connections.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mode Tabs */}
            <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                    <TabsTrigger value="stories">Stories</TabsTrigger>
                    <TabsTrigger value="quiz">Quiz</TabsTrigger>
                    <TabsTrigger value="game">Family Tree</TabsTrigger>
                </TabsList>

                {/* Learn Mode */}
                <TabsContent value="learn">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 md:mb-0 flex items-center">
                                <Users className="h-5 w-5 text-pink-500 mr-2" />
                                Family and Relationship Signs
                            </h3>

                            <div className="relative w-full md:w-64">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Search signs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredSigns.map((sign, index) => (
                                <Card
                                    key={index}
                                    className="cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => setSelectedSign(sign.sign)}
                                >
                                    <CardHeader className="p-4 bg-pink-50">
                                        <CardTitle className="text-lg text-pink-700">{sign.sign}</CardTitle>
                                        <CardDescription className="text-xs text-gray-500">
                                            {sign.category === "immediate" && "Immediate Family"}
                                            {sign.category === "extended" && "Extended Family"}
                                            {sign.category === "relationship" && "Relationship"}
                                            {sign.category === "general" && "General Term"}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <img
                                            src={`/api/proxy-image?url=${sign.imageUrl}`}
                                            alt={`ASL sign for ${sign.sign}`}
                                            className="w-full h-48 object-cover rounded-t-md"
                                        />
                                    </CardContent>
                                    <CardFooter className="p-3 bg-gray-50 text-sm text-gray-500">Click to learn more</CardFooter>
                                </Card>
                            ))}
                        </div>

                        {filteredSigns.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No signs found matching your search.</p>
                            </div>
                        )}

                        {/* Sign Detail Modal */}
                        {selectedSign && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-bold text-pink-700">{selectedSign}</h3>
                                            <Button variant="ghost" size="sm" onClick={() => setSelectedSign(null)}>
                                                ✕
                                            </Button>
                                        </div>

                                        <div className="aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                                            <video
                                                src={`/api/proxy-video?url=${familySigns.find((s) => s.sign === selectedSign)?.videoUrl}`}
                                                title={`ASL sign for ${selectedSign}`}
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
                                                <h4 className="font-semibold text-gray-700 mb-1">How to Sign</h4>
                                                <p className="text-gray-600">{familySigns.find((s) => s.sign === selectedSign)?.description}</p>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-gray-700 mb-1">When to Use</h4>
                                                <p className="text-gray-600">{familySigns.find((s) => s.sign === selectedSign)?.usage}</p>
                                            </div>

                                            <div className="bg-pink-50 p-4 rounded-md">
                                                <h4 className="font-semibold text-pink-700 mb-1">Practice Tip</h4>
                                                <p className="text-gray-600 text-sm">
                                                    Practice this sign by describing your own family members or creating sentences about
                                                    relationships.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-end">
                                            <Button onClick={() => setSelectedSign(null)}>Close</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Family Sign Patterns</h3>
                        <p className="text-gray-700 mb-6">
                            Many family signs follow patterns that can help you remember them more easily:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="bg-pink-50">
                                    <CardTitle className="text-lg text-pink-700">Parent Signs</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-gray-600 mb-4">
                                        Parent signs use the '5' handshape with the thumb touching different locations:
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="inline-block bg-pink-100 text-pink-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                •
                                            </span>
                                            <span className="text-gray-700">
                                                <strong>MOTHER</strong>: Thumb touches the chin
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block bg-pink-100 text-pink-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                •
                                            </span>
                                            <span className="text-gray-700">
                                                <strong>FATHER</strong>: Thumb touches the forehead
                                            </span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="bg-pink-50">
                                    <CardTitle className="text-lg text-pink-700">Sibling Signs</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-gray-600 mb-4">
                                        Sibling signs combine gender indicators with initialized handshapes:
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="inline-block bg-pink-100 text-pink-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                •
                                            </span>
                                            <span className="text-gray-700">
                                                <strong>SISTER</strong>: Female sign + 'S' handshape
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block bg-pink-100 text-pink-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                •
                                            </span>
                                            <span className="text-gray-700">
                                                <strong>BROTHER</strong>: Male sign + 'B' handshape
                                            </span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="bg-pink-50">
                                    <CardTitle className="text-lg text-pink-700">Grandparent Signs</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-gray-600 mb-4">
                                        Grandparent signs build on parent signs with an additional movement:
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="inline-block bg-pink-100 text-pink-800 rounded-full w-5 h-5 items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                •
                                            </span>
                                            <span className="text-gray-700">
                                                <strong>GRANDMOTHER</strong>: MOTHER sign + outward arc
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block bg-pink-100 text-pink-800 rounded-full w-5 h-5 items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                •
                                            </span>
                                            <span className="text-gray-700">
                                                <strong>GRANDFATHER</strong>: FATHER sign + outward arc
                                            </span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="bg-pink-50">
                                    <CardTitle className="text-lg text-pink-700">Spouse Signs</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-gray-600 mb-4">Spouse signs use initialized handshapes on the chest:</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="inline-block bg-pink-100 text-pink-800 rounded-full w-5 h-5 items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                •
                                            </span>
                                            <span className="text-gray-700">
                                                <strong>HUSBAND</strong>: 'H' handshape tapped on chest
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block bg-pink-100 text-pink-800 rounded-full w-5 h-5 items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                •
                                            </span>
                                            <span className="text-gray-700">
                                                <strong>WIFE</strong>: 'W' handshape tapped on chest
                                            </span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Stories Mode */}
                <TabsContent value="stories">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Family Story Practice</h3>
                        <p className="text-gray-600 mb-6">
                            Read the story and identify the family signs by clicking on the highlighted words.
                        </p>

                        <div className="mb-4">
                            <h4 className="font-semibold text-pink-700 mb-2">{familyStories[currentStory].title}</h4>
                            <Progress value={storyProgress} className="h-2 mb-4" />
                        </div>

                        <div className="bg-pink-50 p-5 rounded-lg mb-6">
                            <p className="text-gray-700 leading-relaxed">
                                {familyStories[currentStory].story.split(" ").map((word, index) => {
                                    const isBlank = familyStories[currentStory].blanks.includes(word)
                                    return (
                                        <span key={index}>
                                            {isBlank ? (
                                                <span
                                                    className={`inline-block px-2 py-1 mx-1 rounded cursor-pointer ${storyFills[word] === word
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-200 text-gray-800 hover:bg-pink-100"
                                                        }`}
                                                    onClick={() => handleStoryFill(word, word)}
                                                >
                                                    {word}
                                                </span>
                                            ) : (
                                                <span>{word} </span>
                                            )}
                                            {!isBlank && " "}
                                        </span>
                                    )
                                })}
                            </p>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-700 mb-3">Available Signs:</h4>
                            <div className="flex flex-wrap gap-2">
                                {familySigns.slice(0, 12).map((sign, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className={`cursor-pointer ${Object.values(storyFills).includes(sign.sign)
                                            ? "bg-gray-100 text-gray-400 border-gray-200"
                                            : "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100"
                                            }`}
                                        onClick={() => {
                                            if (!Object.values(storyFills).includes(sign.sign)) {
                                                // Find the first unfilled blank
                                                const unfilled = familyStories[currentStory].blanks.find((blank) => !storyFills[blank])
                                                if (unfilled) {
                                                    handleStoryFill(unfilled, sign.sign)
                                                }
                                            }
                                        }}
                                    >
                                        {sign.sign}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {showStoryFeedback && (
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-green-800 mb-1">Great job!</h4>
                                        <p className="text-gray-600">{familyStories[currentStory].feedback}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <Button onClick={resetStory}>Next Story</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                            <Zap className="h-5 w-5 text-purple-600 mr-2" />
                            Family Conversation Starters
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Practice these common questions and statements about family to build your conversation skills:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="p-4 bg-purple-100">
                                    <CardTitle className="text-lg text-purple-700">Questions</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <ul className="space-y-3">
                                        <li className="text-gray-700">
                                            <span className="font-medium">YOU HAVE HOW-MANY BROTHER SISTER?</span>
                                            <p className="text-sm text-gray-500 mt-1">How many brothers and sisters do you have?</p>
                                        </li>
                                        <li className="text-gray-700">
                                            <span className="font-medium">YOUR FAMILY LIVE WHERE?</span>
                                            <p className="text-sm text-gray-500 mt-1">Where does your family live?</p>
                                        </li>
                                        <li className="text-gray-700">
                                            <span className="font-medium">YOU MARRIED?</span>
                                            <p className="text-sm text-gray-500 mt-1">Are you married?</p>
                                        </li>
                                        <li className="text-gray-700">
                                            <span className="font-medium">YOU HAVE CHILDREN?</span>
                                            <p className="text-sm text-gray-500 mt-1">Do you have children?</p>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="p-4 bg-purple-100">
                                    <CardTitle className="text-lg text-purple-700">Statements</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <ul className="space-y-3">
                                        <li className="text-gray-700">
                                            <span className="font-medium">MY FAMILY HAVE FIVE PEOPLE.</span>
                                            <p className="text-sm text-gray-500 mt-1">My family has five people.</p>
                                        </li>
                                        <li className="text-gray-700">
                                            <span className="font-medium">MY SISTER LIVE FAR.</span>
                                            <p className="text-sm text-gray-500 mt-1">My sister lives far away.</p>
                                        </li>
                                        <li className="text-gray-700">
                                            <span className="font-medium">MY PARENTS MARRIED 30 YEARS.</span>
                                            <p className="text-sm text-gray-500 mt-1">My parents have been married for 30 years.</p>
                                        </li>
                                        <li className="text-gray-700">
                                            <span className="font-medium">MY GRANDMOTHER TEACH-ME COOK.</span>
                                            <p className="text-sm text-gray-500 mt-1">My grandmother taught me how to cook.</p>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Quiz Mode */}
                <TabsContent value="quiz">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Family Signs Quiz</h3>
                        <p className="text-gray-600 mb-6">Test your knowledge of family and relationship signs with this quiz.</p>

                        <div className="space-y-6">
                            {quizQuestions.map((question, qIndex) => (
                                <div key={qIndex} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 className="font-medium text-gray-800 mb-3">
                                        {qIndex + 1}. {question.question}
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2">
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
                                                className={`justify-start text-left ${quizSubmitted && option === question.correctAnswer ? "bg-green-500 hover:bg-green-600" : ""
                                                    }`}
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
                                    You got {quizScore} out of {quizQuestions.length} correct!
                                </p>
                                <Progress value={(quizScore / quizQuestions.length) * 100} className="h-2" />

                                <div className="mt-4">
                                    {quizScore === quizQuestions.length ? (
                                        <div className="flex items-start">
                                            <Star className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                                            <p className="text-gray-700">Perfect score! You've mastered the family signs!</p>
                                        </div>
                                    ) : quizScore >= 3 ? (
                                        <div className="flex items-start">
                                            <Smile className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <p className="text-gray-700">Good job! Keep practicing to master all the signs.</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-start">
                                            <Frown className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                                            <p className="text-gray-700">Keep practicing! Review the signs and try again.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                            <Award className="h-5 w-5 text-yellow-600 mr-2" />
                            Family Sign Variations
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Like spoken languages, ASL has regional and cultural variations in how family signs are produced:
                        </p>

                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Regional Variations</h4>
                                <p className="text-gray-600">
                                    Some regions may use slightly different handshapes or movements for family signs. For example, the
                                    sign for COUSIN might be produced with a different movement pattern depending on the region.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Name Signs</h4>
                                <p className="text-gray-600">
                                    In Deaf culture, individuals often have personal name signs. When referring to family members, you
                                    might use their name sign rather than the generic family term, especially in conversations about
                                    specific people.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Blended Families</h4>
                                <p className="text-gray-600">
                                    ASL has ways to indicate step-relationships and adoptive relationships. These often involve combining
                                    the family sign with additional modifiers or context.
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Game Mode */}
                <TabsContent value="game">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <Puzzle className="h-5 w-5 text-blue-500 mr-2" />
                            Family Tree Challenge
                        </h3>

                        {gameState === "setup" && (
                            <div className="text-center py-8">
                                <h4 className="text-lg font-semibold text-gray-700 mb-4">Build Your Family Tree</h4>
                                <p className="text-gray-600 mb-6">
                                    Drag and drop the correct family signs to build a complete family tree. Complete all three levels to
                                    master family relationships!
                                </p>
                                <Button onClick={startGame} size="lg">
                                    Start Game
                                </Button>
                            </div>
                        )}

                        {gameState === "playing" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h4 className="font-semibold text-blue-700">
                                            Level {gameLevel}: {gameLevels[gameLevel - 1].title}
                                        </h4>
                                        <p className="text-sm text-gray-500">{gameLevels[gameLevel - 1].description}</p>
                                    </div>
                                    <div className="bg-blue-50 px-4 py-2 rounded-md">
                                        <span className="font-medium text-blue-700">Score: {gameScore}</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h5 className="font-medium text-gray-700 mb-3">Available Signs:</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {familySigns
                                            .filter((sign) =>
                                                gameLevels[gameLevel - 1].relationships.some((rel) => rel.correctSign === sign.sign),
                                            )
                                            .map((sign, index) => (
                                                <div
                                                    key={index}
                                                    className={`px-3 py-2 bg-pink-50 text-pink-700 rounded-md cursor-grab ${Object.values(familyTree).includes(sign.sign) ? "opacity-50" : ""
                                                        }`}
                                                    draggable={!Object.values(familyTree).includes(sign.sign)}
                                                    onDragStart={() =>
                                                        !Object.values(familyTree).includes(sign.sign) && handleDragStart(sign.sign)
                                                    }
                                                >
                                                    {sign.sign}
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <h5 className="font-medium text-gray-700 mb-4">Family Tree:</h5>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {gameLevels[gameLevel - 1].relationships.map((rel, index) => (
                                            <div
                                                key={index}
                                                className={`p-3 border-2 rounded-md min-h-[80px] flex items-center justify-center ${familyTree[rel.position]
                                                    ? familyTree[rel.position] === rel.correctSign
                                                        ? "border-green-300 bg-green-50"
                                                        : "border-red-300 bg-red-50"
                                                    : "border-dashed border-gray-300 bg-white"
                                                    }`}
                                                onDragOver={(e) => {
                                                    e.preventDefault()
                                                    setDropTarget(rel.position)
                                                }}
                                                onDragLeave={() => setDropTarget(null)}
                                                onDrop={(e) => {
                                                    e.preventDefault()
                                                    handleDrop(rel.position)
                                                    checkLevelCompletion()
                                                }}
                                            >
                                                <div className="text-center">
                                                    <div className="text-sm text-gray-500 mb-1">{rel.label}</div>
                                                    {familyTree[rel.position] ? (
                                                        <div
                                                            className={`font-medium ${familyTree[rel.position] === rel.correctSign ? "text-green-600" : "text-red-600"
                                                                }`}
                                                        >
                                                            {familyTree[rel.position]}
                                                            {familyTree[rel.position] !== rel.correctSign && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="ml-1 p-0 h-auto"
                                                                    onClick={() => {
                                                                        const newTree = { ...familyTree }
                                                                        delete newTree[rel.position]
                                                                        setFamilyTree(newTree)
                                                                    }}
                                                                >
                                                                    ✕
                                                                </Button>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="text-gray-400">Drop sign here</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setFamilyTree({})
                                        }}
                                    >
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Reset Level
                                    </Button>
                                </div>
                            </div>
                        )}

                        {gameState === "complete" && (
                            <div className="text-center py-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                                <h4 className="text-xl font-bold text-green-700 mb-2">Game Complete!</h4>
                                <p className="text-gray-600 mb-2">
                                    Congratulations! You've successfully completed all levels of the Family Tree Challenge.
                                </p>
                                <p className="font-medium text-blue-700 mb-6">Final Score: {gameScore}</p>
                                <Button
                                    onClick={() => {
                                        setGameState("setup")
                                        setGameLevel(1)
                                        setGameScore(0)
                                    }}
                                >
                                    Play Again
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-indigo-800 mb-4">Family Sign Resources</h3>
                        <p className="text-gray-700 mb-6">Continue learning and practicing family signs with these resources:</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader className="bg-indigo-100">
                                    <CardTitle className="text-lg text-indigo-700">Practice Videos</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-gray-600">
                                        Watch videos of native signers discussing their families to see family signs used in natural
                                        conversation.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="bg-indigo-100">
                                    <CardTitle className="text-lg text-indigo-700">Create Your Tree</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-gray-600">
                                        Practice by creating a sign video describing your own family tree, using the signs you've learned in
                                        this lesson.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="bg-indigo-100">
                                    <CardTitle className="text-lg text-indigo-700">Deaf Community</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-gray-600">
                                        Attend Deaf community events where you can practice your family signs in real conversations with
                                        native signers.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/WorkplaceSigns")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/roadmap")}>
                    Back to Roadmap
                </Button>
            </div>
        </LessonLayout>
    )
}

export default FamilySigns

