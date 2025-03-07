import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ASLHistory from "@/components/custom/ASLHistory"; // Import ASL History Component

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

const LearningRoadmap = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [completedLevels, setCompletedLevels] = useState<number[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

    const toggleLevel = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const markAsComplete = (index: number) => {
        if (!completedLevels.includes(index)) {
            setCompletedLevels((prev) => [...prev, index]);
        }
    };

    // If "Brief history and importance of ASL" is selected, render ASLHistory component
    if (selectedLesson === "Brief history and importance of ASL") {
        return (
            <div className="p-6">
                <ASLHistory />
                <Button onClick={() => setSelectedLesson(null)} className="mt-4">
                    Back to Roadmap
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
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
                                        <Button variant="link" onClick={() => setSelectedLesson(lesson)}>
                                            {lesson}
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
