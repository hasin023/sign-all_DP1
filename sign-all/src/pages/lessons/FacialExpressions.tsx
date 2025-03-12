import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";

const FacialExpressions = () => {
    const router = useRouter();
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <LessonLayout title="Understanding Facial Expressions">
            <div className="space-y-6">
                {/* Lesson Introduction */}
                <p className="text-gray-700 text-lg">
                    Facial expressions play a crucial role in ASL. They can completely change the meaning of a sign.  
                    Learn how expressions convey emotions and intent in signing.
                </p>

                {/* Section 1: Neutral vs. Expressive Faces */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Neutral vs. Expressive Signing</h3>
                    <p className="text-gray-600 mb-4">
                        In ASL, a neutral face can indicate a statement, while an expressive face adds emphasis.  
                        Compare these two examples:
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Neutral Face Example */}
                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTS5ysRe5G-_zBrb6113XKALWPFQt4mluoHA&s" 
                                alt="Neutral Face" 
                                width="200" 
                                height="200"
                            />
                            <p className="text-gray-600 mt-2">Neutral: "Yes."</p>
                        </div>

                        {/* Expressive Face Example */}
                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzn-I7qM_mZtySLyigR8Sx1h4iNI-90oKOQA&s" 
                                alt="Expressive Face" 
                                width="200" 
                                height="200"
                            />
                            <p className="text-gray-600 mt-2">Expressive: "YES!" (Excited)</p>
                        </div>
                    </div>
                </div>

                {/* Interactive Challenge */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">🎭 Guess the Expression!</h2>
                    <p className="text-gray-600 mb-4">
                        What emotion do you think is being expressed here?
                    </p>

                    <div className="bg-white p-4 rounded-md mt-4 justify-center gap-4">
                        <img 
                            src="https://media.istockphoto.com/id/1138637857/photo/thoughtful-confused-woman-looking-away-isolated-over-yellow-background.jpg?s=612x612&w=0&k=20&c=HBvRWqcNpsgKYXc4peZkXYHLpQCgZpqhqdnJEPxekhw=" 
                            alt="Guess Expression" 
                            width="200" 
                            height="200"
                        />

                        <Button 
                            className="mt-4" 
                            variant="outline" 
                            onClick={() => setShowAnswer(!showAnswer)}
                        >
                            {showAnswer ? "Hide Answer" : "Show Answer"}
                        </Button>
                        
                        {showAnswer && (
                            <p className="text-lg font-bold mt-4 text-gray-700">
                                This expression conveys **confusion/questioning**.
                            </p>
                        )}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="secondary" onClick={() => router.push("/lessons/CommonExpressions")}>
                        ← Previous Lesson
                    </Button>
                    <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                    <Button variant="secondary" onClick={() => router.push("/lessons/ActionWords")}>
                        Next Lesson →
                    </Button>
                </div>
            </div>
        </LessonLayout>
    );
};

export default FacialExpressions;
