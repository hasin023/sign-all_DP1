import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";

const ActionWords = () => {
    const router = useRouter();
    const [showAnswer, setShowAnswer] = useState(false);
    const [revealedVerb, setRevealedVerb] = useState("");

    const actionWords = [
        { word: "Eat", img: "https://www.lifeprint.com/asl101/gifs/e/eat.gif" },
        { word: "Drink", img: "https://www.lifeprint.com/asl101/gifs/e/eat.gif" },
        { word: "Go", img: "https://www.lifeprint.com/asl101/gifs/g/go.gif" },
        { word: "Want", img: "https://www.lifeprint.com/asl101/gifs/w/want.gif" },
    ];

    return (
        <LessonLayout title="Learning Key Action Words">
            <div className="space-y-6">
                {/* Lesson Introduction */}
                <p className="text-gray-700 text-lg">
                    Learn the most commonly used ASL action words like <strong>"Eat," "Drink," "Go,"</strong> and <strong>"Want."</strong>  
                    These verbs are essential for building meaningful conversations.
                </p>

                {/* Section 1: Common Action Words */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">🛠 Daily Action Words</h3>
                    <p className="text-gray-600 mb-4">These signs are frequently used in daily activities.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {actionWords.map((item) => (
                            <div key={item.word} className="bg-white p-4 rounded-md shadow text-center">
                                <img src={item.img} alt={item.word} width="120" height="120" />
                                <p className="text-gray-700 mt-2 font-semibold">{item.word}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Movement & Emphasis in ASL Verbs */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">🏃‍♂️ Movement & Emphasis</h3>
                    <p className="text-gray-600">
                        In ASL, action words can be modified with movement or facial expressions to add meaning.
                        For example, signing <strong>"Go fast"</strong> uses a sharper, quicker motion compared to a normal "Go."
                    </p>

                    <div className="mt-4 flex flex-col md:flex-row gap-4 items-center justify-center">
                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img 
                                src="https://www.lifeprint.com/asl101/gifs/g/go.gif" 
                                alt="Go normal" 
                                width="150" 
                                height="150"
                            />
                            <p className="text-gray-600 mt-2">"Go" (Normal)</p>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img 
                                src="https://d2drp7fo8uq4gv.cloudfront.net/aacb8b44-dc22-4e7d-8e6d-5e904356e946_poster.jpg" 
                                alt="Go Fast" 
                                width="200" 
                                height="200"
                            />
                            <p className="text-gray-600 mt-2">"Go Fast" (Emphasized)</p>
                        </div>
                    </div>
                </div>

                {/* Interactive "Try It" Section */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">🤔 Try It Yourself!</h2>
                    <p className="text-gray-600 mb-4">Click the button to reveal a random action word. Try signing it!</p>

                    <div className="bg-white p-4 rounded-md shadow-sm text-center">
                        <Button 
                            className="mt-2" 
                            variant="outline" 
                            onClick={() => {
                                const randomWord = actionWords[Math.floor(Math.random() * actionWords.length)];
                                setRevealedVerb(randomWord);
                            }}
                        >
                            Reveal an Action Word
                        </Button>

                        {revealedVerb && (
                            <div className="mt-4">
                                <img 
                                    src={revealedVerb.img} 
                                    alt={revealedVerb.word} 
                                    width="120" 
                                    height="120" 
                                    className="rounded-md"
                                />
                                <p className="text-lg font-bold mt-2">{revealedVerb.word}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="secondary" onClick={() => router.push("/lessons/FacialExpressions")}>
                        ← Previous Lesson
                    </Button>
                    <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                    <Button variant="secondary" onClick={() => router.push("/lessons/SentenceStructure")}>
                        Next Lesson →
                    </Button>
                </div>
            </div>
        </LessonLayout>
    );
};

export default ActionWords;
