import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";

const CommonExpressions = () => {
    const router = useRouter();
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <LessonLayout title="Common Expressions">
            <div className="space-y-6">
                {/* Lesson Introduction */}
                <p className="text-gray-700 text-lg">
                    Learn commonly used ASL expressions to enhance natural conversation skills.
                </p>

                {/* Example 1 */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-4">
                    <img 
                        src="https://www.lifeprint.com/asl101/gifs/t/thank-you.gif" 
                        alt="Thank You" 
                        width="302" 
                        height="302"
                    />
                    <div>
                        <h3 className="font-semibold text-xl">"Thank You"</h3>
                        <p className="text-gray-600">Extend your fingers and bring them from your chin outward.</p>
                    </div>
                </div>

                {/* Example 2 */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-4">
                    <img
                        src="https://www.lifeprint.com/asl101/gifs/e/excuse.gif" 
                        alt="Excuse Me" 
                        width={302} 
                        height={302} 
                        className="rounded-md"
                    />
                    <div>
                        <h3 className="font-semibold text-xl">"Excuse Me"</h3>
                        <p className="text-gray-600">Swipe your hand gently across your other hand's palm.</p>
                    </div>
                </div>

                {/* Interactive Practice */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">👋 Try It Yourself!</h2>
                    <p className="text-gray-600 mb-4">Can you sign this expression?</p>
                    <div className="bg-white p-4 rounded-md shadow-sm text-center">
                        <p className="text-lg font-bold mb-2">"I'm Sorry"</p>
                        <Button 
                            className="mt-2" 
                            variant="outline" 
                            onClick={() => setShowAnswer(!showAnswer)}
                        >
                            {showAnswer ? "Hide Answer" : "Show Answer"}
                        </Button>
                        
                        {showAnswer && (
                            <div className="mt-4 flex justify-center gap-4">
                                <img 
                                    src="https://media1.tenor.com/m/Fiv04grCo0oAAAAd/sorry-im-sorry.gif" 
                                    alt="ASL sign for Sorry" 
                                    width="280" 
                                    height="280" 
                                    className="rounded-md"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="secondary" onClick={() => router.push("/lessons/ShortSentences")}>
                        ← Previous Lesson
                    </Button>
                    <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                    <Button variant="secondary" onClick={() => router.push("/next-lesson")}>
                        Next Lesson →
                    </Button>
                </div>
            </div>
        </LessonLayout>
    );
};

export default CommonExpressions;
