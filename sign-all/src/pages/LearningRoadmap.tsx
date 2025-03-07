import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from "next/router";

const roadmapLevels = [
    {
        title: "Introduction to ASL",
        lessons: [
            "Brief history and importance of ASL",
            "Basic etiquette and common misconceptions",
            "Understanding hand shapes and movements",
        ],
    },
    {
        title: "Fingerspelling (Alphabet & Numbers)",
        lessons: [
            "Learning the ASL alphabet (A-Z)",
            "Practicing fingerspelling common words",
            "Recognizing and understanding numbers (0-9, then up to 100)",
        ],
    },
    {
        title: "Basic Vocabulary",
        lessons: [
            "Common greetings (hello, goodbye, please, thank you)",
            "Everyday words (yes, no, sorry, help)",
            "Basic question words (who, what, when, where, why)",
        ],
    },
    {
        title: "Simple Phrases & Sentences",
        lessons: [
            "Constructing short sentences (e.g., 'My name is...')",
            "Common expressions used in daily life",
            "Understanding facial expressions and their role in ASL",
        ],
    },
    {
        title: "Verbs and Grammar Basics",
        lessons: [
            "Learning key action words (eat, drink, go, want)",
            "Understanding ASL sentence structure (topic-comment order)",
            "Using pronouns and classifiers",
        ],
    },
    {
        title: "Conversational Skills",
        lessons: [
            "Practicing small talk scenarios",
            "Understanding context and non-manual markers",
            "Engaging in back-and-forth communication",
        ],
    },
    {
        title: "Advanced Grammar & Complex Sentences",
        lessons: [
            "Using time indicators (past, present, future)",
            "Understanding directional verbs",
            "Constructing more detailed responses",
        ],
    },
    {
        title: "Thematic Learning Modules",
        lessons: [
            "Emergency signs (help, danger, call police)",
            "Workplace and school-related signs",
            "Family and relationship signs",
        ],
    },
    {
        title: "Storytelling & Expressive Signing",
        lessons: [
            "Learning to tell a simple story in ASL",
            "Using facial expressions to convey emotions",
            "Watching and imitating real ASL conversations",
        ],
    },
    {
        title: "Quiz & Certification",
        lessons: [
            "Final assessment to test comprehension",
            "Earning a completion badge/certificate",
        ],
    },
];

const lessonsContent = {
    "Brief history and importance of ASL": "ASL has a rich history, originating from a mix of indigenous sign languages and French Sign Language (LSF). It evolved over time to become a fully developed and widely used language in the Deaf community.",
    "Basic etiquette and common misconceptions": "When communicating in ASL, it is important to maintain eye contact, use facial expressions, and avoid interrupting by waving hands excessively. A common misconception is that ASL is simply English in signs—it is actually a distinct language with its own grammar and structure.",
    "Understanding hand shapes and movements": "Hand shapes are fundamental in ASL. Each sign requires specific finger positioning and movement. The shape and motion of hands can completely change the meaning of a sign.",
};

const LessonPage = ({ lesson, goBack }: { lesson: string; goBack: () => void }) => (
    <div className="p-6">
        <h2 className="text-xl font-bold mb-4">{lesson}</h2>
        <p className="text-gray-700 mb-4">{lessonsContent[lesson] || "Content coming soon."}</p>
        <Button onClick={goBack}>Back to Roadmap</Button>
    </div>
);

const LearningRoadmap = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [completedLevels, setCompletedLevels] = useState<number[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
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

    if (selectedLesson) {
        return <LessonPage lesson={selectedLesson} goBack={() => setSelectedLesson(null)} />;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">ASL Learning Roadmap</h1>
            <p className="text-center text-gray-600 mb-4">Track your progress as you learn American Sign Language step by step.</p>
            
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
                <Card 
                    key={index} 
                    className={`transition-all ${completedLevels.includes(index) ? "bg-green-100" : "bg-white"}`}
                >
                    <CardHeader onClick={() => toggleLevel(index)} className="cursor-pointer flex justify-between items-center">
                        <CardTitle className="text-lg font-semibold">{level.title}</CardTitle>
                        {completedLevels.includes(index) && <span className="text-green-600 font-semibold">✔ Completed</span>}
                    </CardHeader>
                    {expandedIndex === index && (
                        <CardContent>
                            <ul className="list-disc pl-6 space-y-2">
                                {level.lessons.map((lesson, i) => (
                                    <li key={i} className="text-gray-700">
                                        <Button variant="link" onClick={() => setSelectedLesson(lesson)}>{lesson}</Button>
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