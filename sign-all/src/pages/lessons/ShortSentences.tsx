import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";

const ShortSentences = () => {
    const router = useRouter();
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <LessonLayout title="Constructing Short Sentences">
            <div className="space-y-6">
                {/* Lesson Introduction */}
                <p className="text-gray-700 text-lg">
                    Learn how to construct simple ASL sentences such as{" "}
                    <strong>"My name is..."</strong> and <strong>"I am learning ASL."</strong> 
                    with correct sign order and grammar.
                </p>

                {/* Example 1 */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-4">
                    <img 
                        src="https://www.lifeprint.com/asl101/gifs/p/possessive-my.gif" 
                        alt="Possessive My" 
                        width="302" 
                        height="302"
                    />
                    <div>
                        <h3 className="font-semibold text-xl">"My name is..."</h3>
                        <p className="text-gray-600">Sign each word in sequence with correct finger spelling.</p>
                    </div>
                </div>

                {/* Example 2 */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-4">
                    <img
                        src="https://www.lifeprint.com/asl101/gifs/l/learn.gif" 
                        alt="I am learning ASL" 
                        width={302} 
                        height={302} 
                        className="rounded-md"
                    />
                    <div>
                        <h3 className="font-semibold text-xl">"I am learning ASL"</h3>
                        <p className="text-gray-600">Use the sign for "learning" followed by "ASL."</p>
                    </div>
                </div>

                {/* Interactive Practice */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">👋 Try It Yourself!</h2>
                    <p className="text-gray-600 mb-4">Can you sign this sentence?</p>
                    <div className="bg-white p-4 rounded-md shadow-sm text-center">
                        <p className="text-lg font-bold mb-2">"What is your name?"</p>
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
                                    src="https://www.lifeprint.com/asl101/gifs/n/name.gif" 
                                    alt="ASL sign for Name" 
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
                    <Button variant="secondary" onClick={() => router.push("/lessons/QuestionWords")}>
                        ← Previous Lesson
                    </Button>
                    <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                    <Button variant="secondary" onClick={() => router.push("/lessons/CommonExpressions  ")}>
                        Next Lesson →
                    </Button>
                </div>
            </div>
        </LessonLayout>
    );
};

export default ShortSentences;
