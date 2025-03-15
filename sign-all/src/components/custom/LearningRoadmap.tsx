"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp, CheckCircle, Circle, BookOpen, Award, Clock, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@auth0/nextjs-auth0/client"

// Define the roadmap data structure
interface Lesson {
    name: string
    path: string
    duration?: string // Estimated time to complete
}

interface RoadmapLevel {
    title: string
    description?: string
    category: "beginner" | "intermediate" | "advanced"
    lessons: Lesson[]
}

const roadmapLevels: RoadmapLevel[] = [
    {
        title: "Introduction to ASL",
        description: "Learn the basics and history of American Sign Language",
        category: "beginner",
        lessons: [
            { name: "Brief history and importance of ASL", path: "/lessons/BriefHistory", duration: "15 min" },
            { name: "Basic etiquette and common misconceptions", path: "/lessons/BasicEtiquette", duration: "20 min" },
            { name: "Understanding hand shapes and movements", path: "/lessons/HandShapes", duration: "25 min" },
        ],
    },
    {
        title: "Fingerspelling (Alphabet & Numbers)",
        description: "Master the ASL alphabet and numbers",
        category: "beginner",
        lessons: [
            { name: "Learning the ASL alphabet (A-Z)", path: "/lessons/Fingerspelling", duration: "30 min" },
            { name: "Practicing fingerspelling common words", path: "/lessons/FingerspellingPractice", duration: "25 min" },
            {
                name: "Recognizing and understanding numbers (0-9, then up to 100)",
                path: "/lessons/NumbersRecognition",
                duration: "20 min",
            },
        ],
    },
    {
        title: "Basic Vocabulary",
        description: "Learn essential everyday words and phrases",
        category: "beginner",
        lessons: [
            {
                name: "Common greetings (hello, goodbye, please, thank you)",
                path: "/lessons/BasicGreetings",
                duration: "15 min",
            },
            { name: "Everyday words (yes, no, sorry, help)", path: "/lessons/EverydayWords", duration: "20 min" },
            {
                name: "Basic question words (who, what, when, where, why)",
                path: "/lessons/QuestionWords",
                duration: "25 min",
            },
        ],
    },
    {
        title: "Simple Phrases & Sentences",
        description: "Start constructing meaningful sentences",
        category: "beginner",
        lessons: [
            {
                name: "Constructing short sentences (e.g., 'My name is...')",
                path: "/lessons/ShortSentences",
                duration: "30 min",
            },
            { name: "Common expressions used in daily life", path: "/lessons/CommonExpressions", duration: "25 min" },
            {
                name: "Understanding facial expressions and their role in ASL",
                path: "/lessons/FacialExpressions",
                duration: "20 min",
            },
        ],
    },
    {
        title: "Verbs and Grammar Basics",
        description: "Learn how to express actions and basic grammar",
        category: "intermediate",
        lessons: [
            { name: "Learning key action words (eat, drink, go, want)", path: "/lessons/ActionWords", duration: "25 min" },
            {
                name: "Understanding ASL sentence structure (topic-comment order)",
                path: "/lessons/SentenceStructure",
                duration: "30 min",
            },
            { name: "Using pronouns and classifiers", path: "/lessons/PronounsClassifiers", duration: "35 min" },
        ],
    },
    {
        title: "Conversational Skills",
        description: "Practice real-world conversation scenarios",
        category: "intermediate",
        lessons: [
            { name: "Practicing small talk scenarios", path: "/lessons/SmallTalk", duration: "30 min" },
            { name: "Understanding context and non-manual markers", path: "/lessons/ContextMarkers", duration: "25 min" },
            {
                name: "Engaging in back-and-forth communication",
                path: "/lessons/BackAndForthCommunication",
                duration: "40 min",
            },
        ],
    },
    {
        title: "Advanced Grammar & Complex Sentences",
        description: "Master more complex grammatical structures",
        category: "advanced",
        lessons: [
            { name: "Using time indicators (past, present, future)", path: "/lessons/TimeIndicators", duration: "30 min" },
            { name: "Understanding directional verbs", path: "/lessons/DirectionalVerbs", duration: "35 min" },
            { name: "Constructing more detailed responses", path: "/lessons/DetailedResponses", duration: "40 min" },
        ],
    },
    {
        title: "Thematic Learning Modules",
        description: "Learn signs for specific contexts and situations",
        category: "advanced",
        lessons: [
            { name: "Emergency signs (help, danger, call police)", path: "/lessons/EmergencySigns", duration: "25 min" },
            { name: "Workplace and school-related signs", path: "/lessons/WorkplaceSigns", duration: "30 min" },
            { name: "Family and relationship signs", path: "/lessons/FamilySigns", duration: "25 min" },
        ],
    },
    {
        title: "Storytelling & Expressive Signing",
        description: "Learn to express yourself fluently through stories",
        category: "advanced",
        lessons: [
            { name: "Learning to tell a simple story in ASL", path: "/lessons/TellingAStory", duration: "45 min" },
            { name: "Using facial expressions to convey emotions", path: "/lessons/ExpressiveSigning", duration: "30 min" },
            {
                name: "Watching and imitating real ASL conversations",
                path: "/lessons/ImitatingConversations",
                duration: "40 min",
            },
        ],
    },
    {
        title: "Quiz & Certification",
        description: "Test your knowledge and earn your certificate",
        category: "advanced",
        lessons: [
            { name: "Final assessment to test comprehension", path: "/lessons/FinalAssessment", duration: "60 min" },
            { name: "Earning a completion badge/certificate", path: "/lessons/Certification", duration: "15 min" },
        ],
    },
]

// Add a new interface for tracking user progress
interface UserProgress {
    completedLessons: string[]
    lastLessonPath: string | null
    lastLevelTitle: string | null
}

// Define a constant storage key
const STORAGE_KEY = "asl_learning_progress"

// Update the LearningRoadmap component
const LearningRoadmap = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const [completedLessons, setCompletedLessons] = useState<string[]>([])
    const [lastLessonPath, setLastLessonPath] = useState<string | null>(null)
    const [lastLevelTitle, setLastLevelTitle] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<string>("all")
    const [isLoaded, setIsLoaded] = useState(false)
    const router = useRouter()
    const { user, error, isLoading } = useUser()

    // Save progress to localStorage
    const saveProgressToLocalStorage = (
        updatedCompletedLessons: string[] = completedLessons,
        updatedLastLessonPath: string | null = lastLessonPath,
        updatedLastLevelTitle: string | null = lastLevelTitle,
    ) => {
        try {
            const progress: UserProgress = {
                completedLessons: updatedCompletedLessons,
                lastLessonPath: updatedLastLessonPath,
                lastLevelTitle: updatedLastLevelTitle,
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
            console.log("Progress saved to localStorage:", progress)
        } catch (error) {
            console.error("Error saving progress to localStorage:", error)
        }
    }

    // Load progress from localStorage on component mount
    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem(STORAGE_KEY)

            if (savedProgress) {
                const parsedProgress: UserProgress = JSON.parse(savedProgress)
                setCompletedLessons(parsedProgress.completedLessons || [])
                setLastLessonPath(parsedProgress.lastLessonPath || null)
                setLastLevelTitle(parsedProgress.lastLevelTitle || null)
                console.log("Loaded progress from localStorage:", parsedProgress)
            }
        } catch (error) {
            console.error("Error loading progress from localStorage:", error)
        } finally {
            setIsLoaded(true)
        }
    }, [])

    const toggleLevel = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    // Handles marking lessons as complete
    const toggleLessonCompletion = (lessonName: string) => {
        const newCompletedLessons = completedLessons.includes(lessonName)
            ? completedLessons.filter((name) => name !== lessonName)
            : [...completedLessons, lessonName]

        setCompletedLessons(newCompletedLessons)
        saveProgressToLocalStorage(newCompletedLessons)
    }

    // Track the last accessed lesson
    const trackLessonAccess = (lesson: Lesson, levelTitle: string) => {
        setLastLessonPath(lesson.path)
        setLastLevelTitle(levelTitle)

        // Save to localStorage before navigation
        saveProgressToLocalStorage(completedLessons, lesson.path, levelTitle)

        // Navigate to the lesson
        router.push(lesson.path)
    }

    // Calculate progress dynamically based on completed lessons
    const totalLessons = roadmapLevels.reduce((total, level) => total + level.lessons.length, 0)
    const progress = (completedLessons.length / totalLessons) * 100

    // Find the next recommended lesson
    const getNextRecommendedLesson = () => {
        // If there's a last accessed lesson, return that first
        if (lastLessonPath && lastLevelTitle) {
            const level = roadmapLevels.find((l) => l.title === lastLevelTitle)
            if (level) {
                const lesson = level.lessons.find((l) => l.path === lastLessonPath)
                if (lesson) {
                    return { lesson, levelTitle: lastLevelTitle }
                }
            }
        }

        // Otherwise find the first incomplete lesson
        for (const level of roadmapLevels) {
            for (const lesson of level.lessons) {
                if (!completedLessons.includes(lesson.name)) {
                    return { lesson, levelTitle: level.title }
                }
            }
        }
        return null
    }

    const nextLesson = getNextRecommendedLesson()

    // Filter levels based on active tab
    const filteredLevels =
        activeTab === "all" ? roadmapLevels : roadmapLevels.filter((level) => level.category === activeTab)

    // Calculate category progress
    const getCategoryProgress = (category: string) => {
        const categoryLevels = roadmapLevels.filter((level) => level.category === category)
        const categoryLessons = categoryLevels.reduce((acc, level) => [...acc, ...level.lessons], [] as Lesson[])
        const completedCategoryLessons = categoryLessons.filter((lesson) => completedLessons.includes(lesson.name))
        return (completedCategoryLessons.length / categoryLessons.length) * 100
    }

    // Show loading state while data is being loaded
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your progress...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-blue-800 mb-2">ASL Learning Roadmap</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Track your progress as you learn American Sign Language step by step. Complete lessons to unlock achievements
                    and become fluent in ASL.
                </p>
                {user && (
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <img src={user.picture || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                        <p className="text-sm text-gray-600">Welcome, {user.name}</p>
                    </div>
                )}
            </div>

            {/* Overall Progress Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-semibold text-gray-800">Your Learning Progress</h2>
                        <p className="text-gray-500">
                            {completedLessons.length} of {totalLessons} lessons completed
                        </p>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-4">
                            <Progress value={progress} className="h-3 w-full" />
                            <span className="text-lg font-semibold text-blue-600 whitespace-nowrap">{Math.round(progress)}%</span>
                        </div>
                    </div>
                </div>

                {nextLesson && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">CONTINUE LEARNING</h3>
                                <p className="text-lg font-medium text-gray-800">{nextLesson.lesson.name}</p>
                                <p className="text-sm text-gray-500">{nextLesson.levelTitle}</p>
                            </div>
                            <Button
                                onClick={() => trackLessonAccess(nextLesson.lesson, nextLesson.levelTitle)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Continue <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Category Tabs */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="all">All Levels</TabsTrigger>
                    <TabsTrigger value="beginner">
                        Beginner
                        <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                            {getCategoryProgress("beginner").toFixed(0)}%
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="intermediate">
                        Intermediate
                        <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                            {getCategoryProgress("intermediate").toFixed(0)}%
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="advanced">
                        Advanced
                        <Badge variant="outline" className="ml-2 bg-purple-100 text-purple-800 border-purple-200">
                            {getCategoryProgress("advanced").toFixed(0)}%
                        </Badge>
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Learning Levels */}
            <div className="space-y-4">
                {filteredLevels.map((level, index) => {
                    const levelIndex = roadmapLevels.findIndex((l) => l.title === level.title)
                    const completedCount = level.lessons.filter((lesson) => completedLessons.includes(lesson.name)).length
                    const isLevelComplete = completedCount === level.lessons.length
                    const levelProgress = (completedCount / level.lessons.length) * 100

                    // Determine category-based styling
                    let categoryColor = "bg-green-100 text-green-800 border-green-200"
                    if (level.category === "intermediate") categoryColor = "bg-blue-100 text-blue-800 border-blue-200"
                    if (level.category === "advanced") categoryColor = "bg-purple-100 text-purple-800 border-purple-200"

                    return (
                        <motion.div
                            key={level.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                className={`overflow-hidden transition-all ${isLevelComplete ? "border-green-300 shadow-md" : "border-gray-200"}`}
                            >
                                <CardHeader
                                    onClick={() => toggleLevel(levelIndex)}
                                    className={`cursor-pointer p-4 ${expandedIndex === levelIndex ? "bg-gray-50" : ""}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Badge className={categoryColor}>
                                                {level.category.charAt(0).toUpperCase() + level.category.slice(1)}
                                            </Badge>
                                            <CardTitle className="text-lg font-semibold">{level.title}</CardTitle>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    {completedCount}/{level.lessons.length}
                                                </span>
                                                {isLevelComplete ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <Progress value={levelProgress} className="h-2 w-16" />
                                                )}
                                            </div>
                                            {expandedIndex === levelIndex ? (
                                                <ChevronUp className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-gray-500" />
                                            )}
                                        </div>
                                    </div>
                                    {level.description && <CardDescription className="mt-1">{level.description}</CardDescription>}
                                </CardHeader>

                                <AnimatePresence>
                                    {expandedIndex === levelIndex && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CardContent className="p-4 bg-white">
                                                <ul className="space-y-3">
                                                    {level.lessons.map((lesson, i) => {
                                                        const isCompleted = completedLessons.includes(lesson.name)
                                                        const isCurrentLesson = lesson.path === lastLessonPath
                                                        return (
                                                            <li
                                                                key={i}
                                                                className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 ${isCurrentLesson ? "bg-blue-50 border border-blue-200" : ""}`}
                                                            >
                                                                <div className="flex items-center gap-3 flex-1">
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            toggleLessonCompletion(lesson.name)
                                                                        }}
                                                                        className="focus:outline-none"
                                                                    >
                                                                        {isCompleted ? (
                                                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                                                        ) : (
                                                                            <Circle className="h-5 w-5 text-gray-300" />
                                                                        )}
                                                                    </button>
                                                                    <span
                                                                        className={`${isCompleted ? "text-gray-500" : "text-gray-800"} ${isCurrentLesson ? "font-medium" : ""}`}
                                                                    >
                                                                        {lesson.name}
                                                                        {isCurrentLesson && (
                                                                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                                                                Current
                                                                            </span>
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    {lesson.duration && (
                                                                        <div className="flex items-center text-gray-500 text-sm">
                                                                            <Clock className="h-4 w-4 mr-1" />
                                                                            {lesson.duration}
                                                                        </div>
                                                                    )}
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            trackLessonAccess(lesson, level.title)
                                                                        }}
                                                                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                                                    >
                                                                        <BookOpen className="h-4 w-4 mr-1" />
                                                                        {isCurrentLesson ? "Resume" : "Start"}
                                                                    </Button>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </CardContent>
                                            {isLevelComplete && (
                                                <CardFooter className="p-4 bg-green-50 border-t border-green-100">
                                                    <div className="flex items-center gap-2 text-green-700">
                                                        <Award className="h-5 w-5" />
                                                        <span className="font-medium">Level Complete! You&apos;ve mastered {level.title}.</span>
                                                    </div>
                                                </CardFooter>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>

            {/* Achievement Section */}
            {completedLessons.length > 0 && (
                <div className="mt-10 p-6 bg-white rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-yellow-500" />
                        Your Achievements
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {roadmapLevels.map((level, i) => {
                            const isComplete = level.lessons.every((lesson) => completedLessons.includes(lesson.name))
                            if (!isComplete) return null

                            return (
                                <Badge key={i} className="py-2 px-3 bg-yellow-100 text-yellow-800 border-yellow-200">
                                    {level.title} Master
                                </Badge>
                            )
                        })}

                        {progress >= 25 && (
                            <Badge className="py-2 px-3 bg-blue-100 text-blue-800 border-blue-200">25% Journey Complete</Badge>
                        )}

                        {progress >= 50 && (
                            <Badge className="py-2 px-3 bg-purple-100 text-purple-800 border-purple-200">Halfway There!</Badge>
                        )}

                        {progress >= 75 && (
                            <Badge className="py-2 px-3 bg-pink-100 text-pink-800 border-pink-200">Almost Fluent</Badge>
                        )}

                        {progress === 100 && (
                            <Badge className="py-2 px-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">ASL Master</Badge>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default LearningRoadmap

