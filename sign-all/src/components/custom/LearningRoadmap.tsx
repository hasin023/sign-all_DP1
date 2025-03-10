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
    const [completedLevels, setCompletedLevels] = useState<number[]>([]);
    const router = useRouter();

    const toggleLevel = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const markAsComplete = (index: number) => {
        if (!completedLevels.includes(index)) {
            setCompletedLevels((prev) => [...prev, index]);
        }
    };

    const progress = (completedLevels.length / roadmapLevels.length) * 100;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">ASL Learning Roadmap</h1>
            <p className="text-center text-gray-600 mb-4">
                Track your progress as you learn American Sign Language step by step.
            </p>

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

            {roadmapLevels.map((level, index) => (
                <Card key={index} className={`transition-all ${completedLevels.includes(index) ? "bg-green-100" : "bg-white"}`}>
                    <CardHeader onClick={() => toggleLevel(index)} className="cursor-pointer flex justify-between items-center">
                        <CardTitle className="text-lg font-semibold">{level.title}</CardTitle>
                        {completedLevels.includes(index) && <span className="text-green-600 font-semibold">✔ Completed</span>}
                    </CardHeader>
                    {expandedIndex === index && (
                        <CardContent>
                            <ul className="list-disc pl-6 space-y-2">
                                {level.lessons.map((lesson, i) => (
                                    <li key={i} className="text-gray-700">
                                        <Button variant="link" onClick={() => router.push(lesson.path)}>
                                            {lesson.name}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            {!completedLevels.includes(index) && (
                                <Button onClick={() => markAsComplete(index)} className="mt-4">
                                    Mark as Complete
                                </Button>
                            )}
                        </CardContent>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default LearningRoadmap;
