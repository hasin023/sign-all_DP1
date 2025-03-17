"use client"

import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Briefcase,
    GraduationCap,
    Search,
    Clock,
    Calendar,
    Users,
    FileText,
    Presentation,
    BookOpen,
    Lightbulb,
    Shuffle,
    Layers,
    ArrowRight,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const WorkplaceSigns = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("learn")
    const [activeCategory, setActiveCategory] = useState("workplace")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedSign, setSelectedSign] = useState<string | null>(null)
    const [matchedPairs, setMatchedPairs] = useState<string[]>([])
    const [emailContent, setEmailContent] = useState("")
    const [showEmailFeedback, setShowEmailFeedback] = useState(false)
    const [currentScenario, setCurrentScenario] = useState(0)
    const [userResponses, setUserResponses] = useState<{ [key: number]: string }>({})
    const [showScenarioFeedback, setShowScenarioFeedback] = useState(false)
    const [flashcardIndex, setFlashcardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [shuffledSigns, setShuffledSigns] = useState<any[]>([])
    const flashcardRef = useRef<HTMLDivElement>(null)

    // Workplace signs data
    const workplaceSigns = [
        {
            sign: "MEETING",
            description: "Both hands in 'B' handshape, palms facing each other, brought together",
            usage: "Used when discussing scheduled gatherings with colleagues",
            category: "workplace",
            videoUrl: "https://www.handspeak.com/word/m/mee/meeting.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "FINISH",
            description: "Dominant hand in 'D' handshape moves down to meet non-dominant flat hand",
            usage: "Used when referring to time limits for project completion",
            category: "workplace",
            videoUrl: "https://www.handspeak.com/word/f/fin/finish2.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "BOSS",
            description: "'B' handshape tapped on forehead",
            usage: "Used when referring to a supervisor or manager",
            category: "workplace",
            videoUrl: "https://www.handspeak.com/word/b/bos/boss.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "COLLEAGUE",
            description: "'C' handshapes on both hands move in parallel",
            usage: "Used when referring to coworkers or peers",
            category: "workplace",
            videoUrl: "https://www.handspeak.com/word/b/bos/boss.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "PROJECT",
            description: "'P' handshape circles in space",
            usage: "Used when discussing work assignments or initiatives",
            category: "workplace",
            videoUrl: "https://www.handspeak.com/word/p/pro/project.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "EMAIL",
            description: "'E' handshape moves from sender to receiver",
            usage: "Used when discussing electronic messages",
            category: "workplace",
            videoUrl: "https://www.handspeak.com/word/e/ema/email.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "PRESENTATION",
            description: "Both hands in 'P' handshape, one moves forward",
            usage: "Used when discussing formal talks or demonstrations",
            category: "workplace",
            videoUrl: "https://www.handspeak.com/word/p/pre/presentation.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "INTERVIEW",
            description: "Alternating index fingers pointing at each other",
            usage: "Used when discussing job interviews or formal conversations",
            category: "workplace",
            videoUrl: "https://www.handspeak.com/word/i/int/interview.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "TEACHER",
            description: "'T' handshape tapped on opposite palm",
            usage: "Used when referring to an educator or instructor",
            category: "school",
            videoUrl: "https://www.handspeak.com/word/b/bos/boss.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "STUDENT",
            description: "'S' handshape moved from chin outward",
            usage: "Used when referring to a learner or pupil",
            category: "school",
            videoUrl: "https://www.handspeak.com/word/l/lea/learn.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "LECTURE",
            description: "'H' handshape moved from school to home",
            usage: "Used when discussing assignments to be completed outside class",
            category: "school",
            videoUrl: "https://www.handspeak.com/word/l/lec/lecture.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "EXAM",
            description: "'E' handshape with stress movement",
            usage: "Used when discussing tests or assessments",
            category: "school",
            videoUrl: "https://www.handspeak.com/word/e/exa/exam.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "CLASSROOM",
            description: "'C' handshape circled in space",
            usage: "Used when referring to a learning environment",
            category: "school",
            videoUrl: "https://www.handspeak.com/word/c/cla/class.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "BOOKS",
            description: "'L' handshape moved across palm",
            usage: "Used when referring to a place with books and resources",
            category: "school",
            videoUrl: "https://www.handspeak.com/word/b/boo/book.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "GRADUATE",
            description: "Mimicking moving tassel on graduation cap",
            usage: "Used when discussing completion of education",
            category: "school",
            videoUrl: "https://www.handspeak.com/word/f/fin/finish-complete.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
        {
            sign: "RESEARCH",
            description: "'R' handshape with searching motion",
            usage: "Used when discussing investigation or study",
            category: "school",
            videoUrl: "https://www.handspeak.com/word/r/res/research.mp4",
            imageUrl: "https://fakeimg.pl/800x800",
        },
    ]

    // Workplace scenarios
    const workplaceScenarios = [
        {
            title: "Team Meeting",
            description:
                "You need to explain to your deaf colleague that there's an important team meeting tomorrow at 2 PM to discuss the new project deadline.",
            relevantSigns: ["MEETING", "DEADLINE", "PROJECT"],
            exampleResponse: "TOMORROW 2PM IMPORTANT TEAM MEETING. DISCUSS NEW PROJECT DEADLINE.",
        },
        {
            title: "Email Communication",
            description: "Your boss has asked you to email the presentation to all colleagues before the end of the day.",
            relevantSigns: ["BOSS", "EMAIL", "PRESENTATION", "COLLEAGUE"],
            exampleResponse: "BOSS ASK-ME EMAIL PRESENTATION TO-ALL COLLEAGUE BEFORE DAY END.",
        },
        {
            title: "Job Interview",
            description:
                "You're telling a friend about your upcoming job interview next week and that you're nervous about meeting the potential boss.",
            relevantSigns: ["INTERVIEW", "BOSS", "NERVOUS"],
            exampleResponse: "NEXT-WEEK I HAVE JOB INTERVIEW. I NERVOUS ABOUT MEET POTENTIAL BOSS.",
        },
    ]

    // School scenarios
    const schoolScenarios = [
        {
            title: "Study Group",
            description:
                "You want to invite classmates to form a study group at the library to prepare for the upcoming exam.",
            relevantSigns: ["STUDENT", "LIBRARY", "EXAM"],
            exampleResponse: "I WANT INVITE CLASSMATE FORM STUDY GROUP AT LIBRARY. PREPARE FOR UPCOMING EXAM.",
        },
        {
            title: "Homework Help",
            description: "You need to ask your teacher for help with your homework assignment that's due tomorrow.",
            relevantSigns: ["TEACHER", "HOMEWORK", "HELP"],
            exampleResponse: "I NEED ASK TEACHER HELP WITH HOMEWORK. DUE TOMORROW.",
        },
        {
            title: "Graduation Plans",
            description: "You're discussing your plans after graduation with your classmates in the classroom.",
            relevantSigns: ["GRADUATE", "CLASSROOM", "FUTURE"],
            exampleResponse: "AFTER GRADUATE, MY PLAN INCLUDE WORK AS RESEARCHER. WHAT YOUR FUTURE PLAN?",
        },
    ]

    // Combined scenarios
    const allScenarios = [...workplaceScenarios, ...schoolScenarios]

    // Filter signs based on search and category
    const filteredSigns = workplaceSigns.filter(
        (sign) =>
            (activeCategory === "all" || sign.category === activeCategory) &&
            (searchTerm === "" || sign.sign.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    // Handle matching pairs in the game
    const handleMatchPair = (sign: string) => {
        if (matchedPairs.includes(sign)) {
            setMatchedPairs(matchedPairs.filter((s) => s !== sign))
        } else {
            setMatchedPairs([...matchedPairs, sign])
        }
    }

    // Handle email composition submission
    const handleEmailSubmit = () => {
        setShowEmailFeedback(true)
    }

    // Handle scenario response submission
    const handleScenarioSubmit = () => {
        setShowScenarioFeedback(true)
    }

    // Reset email exercise
    const resetEmail = () => {
        setEmailContent("")
        setShowEmailFeedback(false)
    }

    // Reset scenario exercise
    const resetScenario = () => {
        setUserResponses({})
        setShowScenarioFeedback(false)
        setCurrentScenario((currentScenario + 1) % allScenarios.length)
    }

    // Handle flashcard flip
    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    // Move to next flashcard
    const nextFlashcard = () => {
        setIsFlipped(false)
        setTimeout(() => {
            setFlashcardIndex((flashcardIndex + 1) % shuffledSigns.length)
        }, 300)
    }

    // Move to previous flashcard
    const prevFlashcard = () => {
        setIsFlipped(false)
        setTimeout(() => {
            setFlashcardIndex((flashcardIndex - 1 + shuffledSigns.length) % shuffledSigns.length)
        }, 300)
    }

    // Shuffle signs for flashcards
    const shuffleSigns = () => {
        const shuffled = [...workplaceSigns].sort(() => Math.random() - 0.5)
        setShuffledSigns(shuffled)
        setFlashcardIndex(0)
        setIsFlipped(false)
    }

    // Initialize shuffled signs on first render
    useState(() => {
        shuffleSigns()
    })

    return (
        <LessonLayout title="Workplace and School-Related Signs">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8 border-l-4 border-blue-500">
                <div className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0">
                        <div className="flex">
                            <Briefcase className="h-6 w-6 text-blue-500" />
                            <GraduationCap className="h-6 w-6 text-blue-500 ml-1" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2">Professional Communication</h2>
                        <p className="text-gray-700">
                            Learning workplace and school-related signs will help you communicate effectively in professional and
                            educational settings. These signs are essential for career advancement and academic success.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mode Tabs */}
            <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                    <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                    <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                </TabsList>

                {/* Learn Mode */}
                <TabsContent value="learn">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                                    {activeCategory === "workplace" ? (
                                        <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
                                    ) : (
                                        <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
                                    )}
                                    {activeCategory === "workplace" ? "Workplace Signs" : "School-Related Signs"}
                                </h3>
                                <p className="text-gray-600 mb-4 md:mb-0">
                                    {activeCategory === "workplace"
                                        ? "Essential signs for professional environments and workplace communication."
                                        : "Important signs for educational settings and academic discussions."}
                                </p>
                            </div>

                            <div className="flex space-x-2">
                                <Button
                                    variant={activeCategory === "workplace" ? "default" : "outline"}
                                    onClick={() => setActiveCategory("workplace")}
                                    className="flex items-center"
                                >
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Workplace
                                </Button>
                                <Button
                                    variant={activeCategory === "school" ? "default" : "outline"}
                                    onClick={() => setActiveCategory("school")}
                                    className="flex items-center"
                                >
                                    <GraduationCap className="h-4 w-4 mr-2" />
                                    School
                                </Button>
                            </div>
                        </div>

                        <div className="relative mb-6">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredSigns.map((sign, index) => (
                                <Card
                                    key={index}
                                    className="cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => setSelectedSign(sign.sign)}
                                >
                                    <CardHeader className="p-4 bg-blue-50">
                                        <CardTitle className="text-lg text-blue-700">{sign.sign}</CardTitle>
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
                                <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-bold text-blue-700">{selectedSign}</h3>
                                            <Button variant="ghost" size="sm" onClick={() => setSelectedSign(null)}>
                                                ✕
                                            </Button>
                                        </div>

                                        <div className="aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                                            <video
                                                src={`/api/proxy-video?url=${workplaceSigns.find((s) => s.sign === selectedSign)?.videoUrl}`}
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
                                                <p className="text-gray-600">
                                                    {workplaceSigns.find((s) => s.sign === selectedSign)?.description}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-gray-700 mb-1">When to Use</h4>
                                                <p className="text-gray-600">{workplaceSigns.find((s) => s.sign === selectedSign)?.usage}</p>
                                            </div>

                                            <div className="bg-blue-50 p-4 rounded-md">
                                                <h4 className="font-semibold text-blue-700 mb-1">Practice Tip</h4>
                                                <p className="text-gray-600 text-sm">
                                                    Practice this sign in context by creating sentences that might be used in a{" "}
                                                    {workplaceSigns.find((s) => s.sign === selectedSign)?.category} setting.
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
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Communication Tips</h3>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-left font-medium">
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-blue-500 mr-2" />
                                        Time Management Signs
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    <p className="mb-2">Time-related signs are crucial in professional settings. Learn signs for:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Specific times (9 AM, 2:30 PM)</li>
                                        <li>Duration (short meeting, long project)</li>
                                        <li>Deadlines (due tomorrow, by Friday)</li>
                                        <li>Scheduling (next week, postpone, reschedule)</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-left font-medium">
                                    <div className="flex items-center">
                                        <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                                        Meeting Etiquette
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    <p className="mb-2">When participating in meetings with deaf colleagues:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Ensure good lighting so signs are visible</li>
                                        <li>Take turns speaking/signing to avoid confusion</li>
                                        <li>Use visual aids when possible</li>
                                        <li>Confirm understanding with clarifying questions</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-left font-medium">
                                    <div className="flex items-center">
                                        <Users className="h-5 w-5 text-blue-500 mr-2" />
                                        Hierarchy and Respect
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    <p className="mb-2">ASL has ways to show respect and acknowledge hierarchy:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Use formal signing when addressing supervisors</li>
                                        <li>Maintain appropriate eye contact</li>
                                        <li>Use proper introductions when meeting new colleagues</li>
                                        <li>Learn signs for different professional titles</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger className="text-left font-medium">
                                    <div className="flex items-center">
                                        <FileText className="h-5 w-5 text-blue-500 mr-2" />
                                        Document and Email Communication
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    <p className="mb-2">For discussing written communication:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Learn signs for different document types (report, proposal, contract)</li>
                                        <li>Know email-related terminology (send, receive, attach, forward)</li>
                                        <li>Understand signs for formatting (bold, bullet points, paragraph)</li>
                                        <li>Learn signs for feedback and revisions</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </TabsContent>

                {/* Practice Mode */}
                <TabsContent value="practice">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
                                Workplace Vocabulary
                            </h3>

                            <p className="text-gray-600 mb-4">Match the signs to their correct meanings in a workplace context.</p>

                            <div className="space-y-3">
                                {workplaceSigns
                                    .filter((s) => s.category === "workplace")
                                    .slice(0, 5)
                                    .map((sign, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-700">{sign.sign}</span>
                                            </div>
                                            <div>
                                                <Button
                                                    variant={matchedPairs.includes(sign.sign) ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => handleMatchPair(sign.sign)}
                                                    className="min-w-[80px]"
                                                >
                                                    {matchedPairs.includes(sign.sign) ? "Matched" : "Match"}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-700 mb-3">Matching Definitions:</h4>
                                <div className="space-y-2">
                                    {workplaceSigns
                                        .filter((s) => s.category === "workplace")
                                        .slice(0, 5)
                                        .map((sign, index) => (
                                            <div
                                                key={index}
                                                className={`p-2 rounded-md ${matchedPairs.includes(sign.sign)
                                                    ? "bg-green-50 border border-green-200"
                                                    : "bg-gray-50 border border-gray-200"
                                                    }`}
                                            >
                                                <p className="text-sm text-gray-600">
                                                    {sign.usage}
                                                    {matchedPairs.includes(sign.sign) && (
                                                        <span className="ml-2 text-green-600 font-medium">← {sign.sign}</span>
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
                                School Vocabulary
                            </h3>

                            <p className="text-gray-600 mb-4">
                                Practice using school-related signs in context by composing an email to a teacher.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="email-subject" className="text-gray-700">
                                        Subject:
                                    </Label>
                                    <Input id="email-subject" placeholder="Question about homework assignment" className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="email-content" className="text-gray-700">
                                        Email Content (use ASL gloss notation):
                                    </Label>
                                    <Textarea
                                        id="email-content"
                                        placeholder="HELLO TEACHER, I HAVE QUESTION ABOUT HOMEWORK..."
                                        className="mt-1 h-32"
                                        value={emailContent}
                                        onChange={(e) => setEmailContent(e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Try to include at least 3 school-related signs in your email.
                                    </p>
                                </div>

                                <div className="bg-blue-50 p-3 rounded-md">
                                    <h4 className="font-medium text-blue-700 mb-2">Suggested Signs to Include:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {workplaceSigns
                                            .filter((s) => s.category === "school")
                                            .slice(0, 5)
                                            .map((sign, index) => (
                                                <Badge key={index} variant="outline" className="bg-white">
                                                    {sign.sign}
                                                </Badge>
                                            ))}
                                    </div>
                                </div>

                                <Button onClick={handleEmailSubmit} disabled={emailContent.length < 10} className="w-full">
                                    Submit Email
                                </Button>

                                {showEmailFeedback && (
                                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                        <h4 className="font-medium text-green-800 mb-2">Feedback:</h4>
                                        <p className="text-gray-600 mb-3">
                                            {emailContent.split(" ").length < 15
                                                ? "Good start! Try to make your email more detailed by adding more context."
                                                : "Excellent job! Your email effectively uses school-related signs in context."}
                                        </p>
                                        <div className="flex justify-end">
                                            <Button variant="outline" size="sm" onClick={resetEmail}>
                                                Try Again
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-purple-800 mb-4">Sign Combinations</h3>
                        <p className="text-gray-700 mb-6">
                            In professional settings, signs are often combined to create more specific meanings. Practice these common
                            combinations:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader className="p-4 bg-purple-100">
                                    <CardTitle className="text-lg text-purple-700">MEETING + SCHEDULE</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <p className="text-gray-600">Used to discuss arranging or planning meetings at specific times.</p>
                                    <p className="text-sm text-gray-500 mt-2 italic">"WE NEED MEETING SCHEDULE FOR NEXT WEEK"</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="p-4 bg-purple-100">
                                    <CardTitle className="text-lg text-purple-700">PROJECT + DEADLINE</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <p className="text-gray-600">Used to discuss when assignments or initiatives must be completed.</p>
                                    <p className="text-sm text-gray-500 mt-2 italic">"PROJECT DEADLINE FRIDAY, WE MUST FINISH"</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="p-4 bg-purple-100">
                                    <CardTitle className="text-lg text-purple-700">EXAM + STUDY</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <p className="text-gray-600">Used to discuss preparation for tests or assessments.</p>
                                    <p className="text-sm text-gray-500 mt-2 italic">"I NEED EXAM STUDY ALL WEEKEND"</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Scenarios Mode */}
                <TabsContent value="scenarios">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Real-World Scenarios</h3>
                        <p className="text-gray-600 mb-6">
                            Practice constructing responses for common workplace and school situations.
                        </p>

                        <div className="bg-blue-50 p-5 rounded-lg mb-6 border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-3">Scenario: {allScenarios[currentScenario].title}</h4>
                            <p className="text-gray-700 mb-4">{allScenarios[currentScenario].description}</p>

                            <div className="bg-white p-3 rounded-md mb-4">
                                <h5 className="font-medium text-gray-700 mb-2">Relevant Signs:</h5>
                                <div className="flex flex-wrap gap-2">
                                    {allScenarios[currentScenario].relevantSigns.map((sign, index) => (
                                        <Badge key={index} className="bg-blue-100 text-blue-800 border-none">
                                            {sign}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <Label htmlFor="scenario-response" className="text-gray-700 font-medium">
                                Your Response (in ASL gloss notation):
                            </Label>
                            <Textarea
                                id="scenario-response"
                                placeholder="Type your response using ASL grammar..."
                                className="mt-2 h-32"
                                value={userResponses[currentScenario] || ""}
                                onChange={(e) => setUserResponses({ ...userResponses, [currentScenario]: e.target.value })}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Try to incorporate the relevant signs and use proper ASL grammar.
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setCurrentScenario((currentScenario - 1 + allScenarios.length) % allScenarios.length)
                                                }
                                                disabled={showScenarioFeedback}
                                            >
                                                Previous Scenario
                                            </Button>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Try a different scenario</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <Button
                                onClick={handleScenarioSubmit}
                                disabled={!userResponses[currentScenario] || userResponses[currentScenario].length < 5}
                            >
                                Submit Response
                            </Button>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentScenario((currentScenario + 1) % allScenarios.length)}
                                                disabled={showScenarioFeedback}
                                            >
                                                Next Scenario
                                            </Button>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Try a different scenario</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {showScenarioFeedback && (
                            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                                <h4 className="font-medium text-green-800 mb-2">Feedback:</h4>

                                <div className="mb-4">
                                    <p className="text-gray-600 mb-2">
                                        {userResponses[currentScenario].split(" ").length < 8
                                            ? "Your response is a bit brief. Try to provide more details and context."
                                            : "Good job! Your response effectively addresses the scenario."}
                                    </p>

                                    <div className="mt-3">
                                        <h5 className="font-medium text-gray-700 mb-1">Example Response:</h5>
                                        <div className="bg-white p-3 rounded-md">
                                            <p className="text-blue-600 font-medium">{allScenarios[currentScenario].exampleResponse}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button onClick={resetScenario}>Next Scenario</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                            <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                            Cultural Considerations
                        </h3>
                        <p className="text-gray-700 mb-4">
                            When using ASL in professional settings, keep these cultural considerations in mind:
                        </p>

                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Direct Communication</h4>
                                <p className="text-gray-600">
                                    Deaf culture values direct, clear communication. In professional settings, it's appropriate to be more
                                    straightforward than you might be in spoken English.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Visual Attention</h4>
                                <p className="text-gray-600">
                                    Getting and maintaining visual attention is important. In meetings, ensure everyone can see each
                                    other, and use appropriate attention-getting techniques.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Interpreters in Meetings</h4>
                                <p className="text-gray-600">
                                    When working with interpreters, speak directly to the deaf person, not the interpreter. Allow extra
                                    time for interpretation and turn-taking in discussions.
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Flashcards Mode */}
                <TabsContent value="flashcards">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Sign Flashcards</h3>
                            <Button variant="outline" size="sm" onClick={shuffleSigns} className="flex items-center">
                                <Shuffle className="h-4 w-4 mr-2" />
                                Shuffle
                            </Button>
                        </div>

                        <div className="flex justify-center mb-6">
                            <div
                                ref={flashcardRef}
                                className={`w-full max-w-md h-64 cursor-pointer perspective-1000 ${isFlipped ? "rotate-y-180" : ""}`}
                                onClick={handleFlip}
                            >
                                <div className="relative w-full h-full transition-transform duration-500 transform-style-3d">
                                    <div
                                        className={`absolute w-full h-full backface-hidden bg-white border-2 border-blue-200 rounded-xl p-6 flex flex-col items-center justify-center ${isFlipped ? "rotate-y-180 invisible" : ""}`}
                                    >
                                        <h4 className="text-2xl font-bold text-blue-700 mb-4">{shuffledSigns[flashcardIndex]?.sign}</h4>
                                        <p className="text-gray-500 text-sm">Click to see the meaning</p>
                                    </div>
                                    <div
                                        className={`absolute w-full h-full backface-hidden bg-blue-50 border-2 border-blue-200 rounded-xl p-6 flex flex-col items-center justify-center rotate-y-180 ${isFlipped ? "visible" : "invisible"}`}
                                    >
                                        <p className="text-gray-700 text-center mb-4">{shuffledSigns[flashcardIndex]?.usage}</p>
                                        <div className="text-sm text-blue-600 font-medium">
                                            {shuffledSigns[flashcardIndex]?.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <Button variant="outline" onClick={prevFlashcard} className="flex items-center">
                                Previous
                            </Button>
                            <div className="px-4 py-2 bg-gray-100 rounded-md">
                                {flashcardIndex + 1} / {shuffledSigns.length}
                            </div>
                            <Button onClick={nextFlashcard} className="flex items-center">
                                Next
                            </Button>
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                            <Layers className="h-5 w-5 text-indigo-600 mr-2" />
                            Building Your Professional Vocabulary
                        </h3>

                        <p className="text-gray-700 mb-4">
                            Expanding your professional ASL vocabulary is an ongoing process. Here are strategies to continue
                            learning:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <BookOpen className="h-4 w-4 text-indigo-500 mr-2" />
                                    Industry-Specific Terms
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Learn signs specific to your field or industry. Connect with deaf professionals in your area of
                                    expertise to learn specialized vocabulary.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <Presentation className="h-4 w-4 text-indigo-500 mr-2" />
                                    Attend Workshops
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Look for ASL workshops focused on business or educational settings. These often cover specialized
                                    vocabulary not taught in general ASL classes.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <Users className="h-4 w-4 text-indigo-500 mr-2" />
                                    Practice Groups
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Join or form an ASL practice group with colleagues. Role-play common workplace scenarios to build
                                    fluency in professional contexts.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <ArrowRight className="h-4 w-4 text-indigo-500 mr-2" />
                                    Next Steps
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    After mastering these signs, consider learning vocabulary for meetings, presentations, and interviews
                                    to further enhance your professional communication.
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
                <Button variant="secondary" onClick={() => router.push("/lessons/EmergencySigns")}>
                    ← Previous Lesson
                </Button>
                <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                <Button variant="secondary" onClick={() => router.push("/lessons/FamilySigns")}>
                    Next Lesson →
                </Button>
            </div>
        </LessonLayout>
    )
}

export default WorkplaceSigns

