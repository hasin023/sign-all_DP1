import { useState } from "react";
import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const SentenceStructure = () => {
    const router = useRouter();

    const correctOrder = ["STORE", "I", "GO"]; // ASL correct sentence structure
    const [scrambledSentence, setScrambledSentence] = useState([
        { word: "I", id: 1 },
        { word: "STORE", id: 2 },
        { word: "GO", id: 3 },
    ]);

    const [userSentence, setUserSentence] = useState([...scrambledSentence]); // Tracks the dragged order
    const [isCorrect, setIsCorrect] = useState(null);

    // Handles dragging
    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("index", index);
    };

    // Handles dropping
    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        const dragIndex = e.dataTransfer.getData("index");

        const updatedOrder = [...userSentence];
        const draggedItem = updatedOrder.splice(dragIndex, 1)[0]; // Remove dragged item
        updatedOrder.splice(dropIndex, 0, draggedItem); // Insert at new position

        setUserSentence(updatedOrder);
        setIsCorrect(null); // Reset correctness check
    };

    // Prevents default behavior
    const allowDrop = (e) => {
        e.preventDefault();
    };

    // Check if the order is correct
    const checkAnswer = () => {
        const isCorrectOrder = userSentence.map((w) => w.word).join(" ") === correctOrder.join(" ");
        setIsCorrect(isCorrectOrder);
    };

    return (
        <LessonLayout title="Understanding ASL Sentence Structure">
            <div className="space-y-6">
                {/* Lesson Introduction */}
                <p className="text-gray-700 text-lg">
                    ASL follows a <strong>topic-comment</strong> sentence structure.  
                    Unlike English, which typically uses Subject-Verb-Object (SVO),  
                    ASL focuses on the **most important information first**.
                </p>

                {/* Section 1: ASL vs English Structure */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">📝 ASL vs. English Word Order</h3>
                    <p className="text-gray-600 mb-4">
                        Compare how the same sentence is structured differently in ASL and English.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* English Order */}
                        <div className="bg-white p-4 rounded-md shadow-md text-center w-full">
                            <h4 className="text-lg font-bold mb-2">English (SVO)</h4>
                            <p className="text-gray-600">"I am going to the store."</p>
                        </div>

                        {/* ASL Order */}
                        <div className="bg-white p-4 rounded-md shadow-md text-center w-full">
                            <h4 className="text-lg font-bold mb-2">ASL (Topic-Comment)</h4>
                            <p className="text-gray-600">"STORE, I GO."</p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Common ASL Sentence Structures */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">📌 Common ASL Sentence Patterns</h3>

                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>
                            <strong>Topic-Comment:</strong> <span className="text-gray-600">"STORE, I GO."</span>
                        </li>
                        <li>
                            <strong>Time-Topic-Comment:</strong> <span className="text-gray-600">"YESTERDAY, STORE, I GO."</span>
                        </li>
                        <li>
                            <strong>Subject-Verb-Object (less common):</strong> <span className="text-gray-600">"I GO STORE."</span>
                        </li>
                    </ul>
                </div>

                {/* Interactive Sentence Rearrangement */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">🎯 Rearrange the Sentence</h2>
                    <p className="text-gray-600 mb-4">
                        Drag the words below to form the correct ASL sentence structure.
                    </p>

                    <div className="bg-white p-4 rounded-md shadow-sm text-center">
                        <p className="text-lg font-bold mb-2">"I GO TO STORE" (English)</p>

                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            {userSentence.map((wordObj, index) => (
                                <span
                                    key={wordObj.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={allowDrop}
                                    onDrop={(e) => handleDrop(e, index)}
                                    className="px-4 py-2 bg-gray-200 rounded-md font-semibold cursor-move border border-gray-400"
                                >
                                    {wordObj.word}
                                </span>
                            ))}
                        </div>

                        <Button className="mt-4" variant="outline" onClick={checkAnswer}>
                            Check Answer
                        </Button>

                        {isCorrect !== null && (
                            <div className="mt-4">
                                {isCorrect ? (
                                    <p className="text-lg font-bold text-green-600">✅ Correct! ASL Order: "STORE, I GO"</p>
                                ) : (
                                    <p className="text-lg font-bold text-red-600">❌ Incorrect. Try Again!</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="secondary" onClick={() => router.push("/lessons/ActionWords")}>
                        ← Previous Lesson
                    </Button>
                    <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                    <Button variant="secondary" onClick={() => router.push("/lessons/PronounsClassifiers")}>
                        Next Lesson →
                    </Button>
                </div>
            </div>
        </LessonLayout>
    );
};

export default SentenceStructure;
