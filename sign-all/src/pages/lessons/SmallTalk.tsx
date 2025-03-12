import { useState } from "react";
import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const SmallTalk = () => {
    const router = useRouter();
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [showResponse, setShowResponse] = useState(false);

    // List of Small Talk Topics
    const smallTalkScenarios = [
        {
            topic: "Greetings",
            question: "How are you?",
            response: "I am fine, thank you.",
            img: "https://i.makeagif.com/media/9-29-2017/5dbNgH.gif",
            responseImg: "https://www.lifeprint.com/asl101/gifs/f/fine.gif",
        },
        {
            topic: "Weather",
            question: "What's the weather like today?",
            response: "It's sunny today.",
            img: "https://www.lifeprint.com/asl101/gifs/w/weather.gif",
            responseImg: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmJ5aHk2bzZhOWR4bTZhZjdxMDNpbmFlYnZxOXRtdHM2MnF5cXFrZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6Zt7merN2zxEtNRK/giphy.gif",
        },
        {
            topic: "Daily Activities",
            question: "What did you do today?",
            response: "I went to school.",
            img: "https://www.lifeprint.com/asl101/gifs/d/do.gif",
            responseImg: "https://www.lifeprint.com/asl101/gifs/s/school.gif",
        },
    ];

    return (
        <LessonLayout title="Practicing Small Talk Scenarios">
            <div className="space-y-6">
                {/* Lesson Introduction */}
                <p className="text-gray-700 text-lg">
                    Improve your ASL conversation skills by learning how to engage in small talk.  
                    Common topics include greetings, weather, and daily activities.
                </p>

                {/* Section 1: Common Small Talk Topics */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">💬 Common Small Talk Topics</h3>
                    <p className="text-gray-600 mb-4">These topics are frequently used in ASL conversations.</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {smallTalkScenarios.map((scenario, index) => (
                            <div key={index} className="bg-white p-4 rounded-md shadow-md text-center">
                                <h4 className="text-lg font-bold mb-2">{scenario.topic}</h4>
                                <img src={scenario.img} alt={scenario.topic} width="120" height="120" />
                                <p className="text-gray-700 mt-2">{scenario.question}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Small Talk Practice */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">🎭 Practice Small Talk</h2>
                    <p className="text-gray-600 mb-4">Select a conversation scenario and try responding in ASL.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {smallTalkScenarios.map((scenario, index) => (
                            <Button
                                key={index}
                                className="px-4 py-2 bg-gray-200 rounded-md font-semibold"
                                variant="outline"
                                onClick={() => {
                                    setSelectedScenario(scenario);
                                    setShowResponse(false);
                                }}
                            >
                                {scenario.topic}
                            </Button>
                        ))}
                    </div>

                    {selectedScenario && (
                        <div className="mt-6 bg-white p-6 rounded-md shadow-sm text-center">
                            <h3 className="text-lg font-bold">{selectedScenario.topic}</h3>
                            <p className="text-gray-700 mt-2">{selectedScenario.question}</p>
                            <img src={selectedScenario.img} alt="Question" width="120" height="120" className="mt-2" />

                            <Button
                                className="mt-4"
                                variant="outline"
                                onClick={() => setShowResponse(!showResponse)}
                            >
                                {showResponse ? "Hide Response" : "Show Response"}
                            </Button>

                            {showResponse && (
                                <div className="mt-4">
                                    <p className="text-lg font-bold text-gray-700">{selectedScenario.response}</p>
                                    <img src={selectedScenario.responseImg} alt="Response" width="120" height="120" />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="secondary" onClick={() => router.push("/lessons/PronounsClassifiers")}>
                        ← Previous Lesson
                    </Button>
                    <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                    <Button variant="secondary" onClick={() => router.push("/lessons/ContextMarkers")}>
                        Next Lesson →
                    </Button>
                </div>
            </div>
        </LessonLayout>
    );
};

export default SmallTalk;
