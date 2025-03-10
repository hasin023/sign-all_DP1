import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const roadmapLevels = [
    {
        title: "Introduction to ASL",
        lessons: [
            { name: "Brief history and importance of ASL", path: "/lessons/BriefHistory" },
            { name: "Basic etiquette and common misconceptions", path: "/lessons/BasicEtiquette" },
            { name: "Understanding hand shapes and movements", path: "/lessons/HandShapes" },
        ],
    },
    {
        title: "Fingerspelling (Alphabet & Numbers)",
        lessons: [
            { name: "Learning the ASL alphabet (A-Z)", path: "/lessons/Fingerspelling" },
            { name: "Practicing fingerspelling common words", path: "/lessons/FingerspellingPractice" },
            { name: "Recognizing and understanding numbers (0-9, then up to 100)", path: "/lessons/NumbersRecognition" },
        ],
    },
    {
        title: "Basic Vocabulary",
        lessons: [
            { name: "Common greetings (hello, goodbye, please, thank you)", path: "/lessons/BasicGreetings" },
            { name: "Everyday words (yes, no, sorry, help)", path: "/lessons/EverydayWords" },
            { name: "Basic question words (who, what, when, where, why)", path: "/lessons/QuestionWords" },
        ],
    },
    {
        title: "Simple Phrases & Sentences",
        lessons: [
            { name: "Constructing short sentences (e.g., 'My name is...')", path: "/lessons/ShortSentences" },
            { name: "Common expressions used in daily life", path: "/lessons/CommonExpressions" },
            { name: "Understanding facial expressions and their role in ASL", path: "/lessons/FacialExpressions" },
        ],
    },
    {
        title: "Verbs and Grammar Basics",
        lessons: [
            { name: "Learning key action words (eat, drink, go, want)", path: "/lessons/ActionWords" },
            { name: "Understanding ASL sentence structure (topic-comment order)", path: "/lessons/SentenceStructure" },
            { name: "Using pronouns and classifiers", path: "/lessons/PronounsClassifiers" },
        ],
    },
    {
        title: "Conversational Skills",
        lessons: [
            { name: "Practicing small talk scenarios", path: "/lessons/SmallTalk" },
            { name: "Understanding context and non-manual markers", path: "/lessons/ContextMarkers" },
            { name: "Engaging in back-and-forth communication", path: "/lessons/BackAndForthCommunication" },
        ],
    },
    {
        title: "Advanced Grammar & Complex Sentences",
        lessons: [
            { name: "Using time indicators (past, present, future)", path: "/lessons/TimeIndicators" },
            { name: "Understanding directional verbs", path: "/lessons/DirectionalVerbs" },
            { name: "Constructing more detailed responses", path: "/lessons/DetailedResponses" },
        ],
    },
    {
        title: "Thematic Learning Modules",
        lessons: [
            { name: "Emergency signs (help, danger, call police)", path: "/lessons/EmergencySigns" },
            { name: "Workplace and school-related signs", path: "/lessons/WorkplaceSigns" },
            { name: "Family and relationship signs", path: "/lessons/FamilySigns" },
        ],
    },
    {
        title: "Storytelling & Expressive Signing",
        lessons: [
            { name: "Learning to tell a simple story in ASL", path: "/lessons/TellingAStory" },
            { name: "Using facial expressions to convey emotions", path: "/lessons/ExpressiveSigning" },
            { name: "Watching and imitating real ASL conversations", path: "/lessons/ImitatingConversations" },
        ],
    },
    {
        title: "Quiz & Certification",
        lessons: [
            { name: "Final assessment to test comprehension", path: "/lessons/FinalAssessment" },
            { name: "Earning a completion badge/certificate", path: "/lessons/Certification" },
        ],
    },
];




const LearningRoadmap = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const router = useRouter();

    const toggleLevel = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // Handles marking lessons as complete
    const toggleLessonCompletion = (lessonName: string) => {
        setCompletedLessons((prev) =>
            prev.includes(lessonName) ? prev.filter((name) => name !== lessonName) : [...prev, lessonName]
        );
    };

    

    // Calculate progress dynamically based on completed lessons
    const totalLessons = roadmapLevels.reduce((total, level) => total + level.lessons.length, 0);
    const progress = (completedLessons.length / totalLessons) * 100;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">ASL Learning Roadmap</h1>
            <p className="text-center text-gray-600 mb-4">
                Track your progress as you learn American Sign Language step by step.
            </p>

            {/* Progress Bar */}
            <div className="flex justify-center mb-6">
                <div className="w-24 h-24">
                    <CircularProgressbar
                        value={progress}
                        text={`${Math.round(progress)}%`}
                        styles={buildStyles({
                            textSize: "16px",
                            pathColor: `#4caf50`,
                            textColor: "#4caf50",
                            trailColor: "#d6d6d6",
                        })}
                    />
                </div>
            </div>

            {/* Learning Levels */}
            {roadmapLevels.map((level, index) => (
                <Card key={index} className="transition-all bg-white shadow-lg">
                    <CardHeader
                        onClick={() => toggleLevel(index)}
                        className="cursor-pointer flex justify-between items-center p-4 border-b"
                    >
                        <CardTitle className="text-lg font-semibold">{level.title}</CardTitle>
                        <span
                            className={`text-sm px-2 py-1 rounded-full ${
                                level.lessons.every((lesson) => completedLessons.includes(lesson.name))
                                    ? "bg-green-200 text-green-800"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            {completedLessons.filter((lesson) => level.lessons.some((l) => l.name === lesson)).length} / {level.lessons.length} completed
                        </span>
                    </CardHeader>
                    {expandedIndex === index && (
                        <CardContent className="p-4">
                            <ul className="space-y-4">
                                {level.lessons.map((lesson, i) => (
                                    <li key={i} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="h-5 w-5 text-green-600 focus:ring-green-500"
                                                checked={completedLessons.includes(lesson.name)}
                                                onChange={() => toggleLessonCompletion(lesson.name)}
                                            />
                                            <Button variant="link" onClick={() => router.push(lesson.path)} className="ml-3">
                                                {lesson.name}
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default LearningRoadmap;