import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";

const HandShapes = () => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Handshape options with correct answer
    const handshapeOptions = [
        { id: "A", imgSrc: "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/a.gif", alt: "Handshape A (Correct)", correct: true },
        { id: "B", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSji8HVwqXSKS5ETrRonr1qQOiyi3i3UxLNJQ&s", alt: "Handshape B (Incorrect)", correct: false },
        { id: "C", imgSrc: "https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/c.gif", alt: "Handshape C (Incorrect)", correct: false },
    ];

    // Function to handle user selection
    const handleSelectOption = (optionId: string, isCorrectAnswer: boolean) => {
        setSelectedOption(optionId);
        setIsCorrect(isCorrectAnswer);
    };

    return (
        <LessonLayout title="Understanding Hand Shapes and Movements">
            <p className="text-gray-700">
                Hand shapes are fundamental to ASL, and each sign requires specific finger positioning and hand movements.
                In this lesson, we’ll explore the most common hand shapes used in ASL and how they change the meaning of a sign.
            </p>

            <h3 className="text-2xl font-semibold mt-6 text-center">Basic Hand Shapes in ASL</h3>
            <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li><strong>Flat Hand:</strong> Used for signs like "thank you" or "more."</li>
                <li><strong>Fist:</strong> Common for signs such as "no" or "stop."</li>
                <li><strong>C Hand:</strong> Often used in the letter "C" or signs like "cup" or "cookie."</li>
                <li><strong>Open Hand:</strong> Used for signs like "please" or "goodbye."</li>
            </ul>

            <h4 className="mt-6 font-semibold">Select the Correct Handshape for "A"</h4>
            <p className="text-gray-700">
                Look at the three options below and select the correct handshape for the letter "A."
            </p>

            {/* Handshape Selection Options */}
            <div className="flex justify-center gap-6 mt-6">
                {handshapeOptions.map((option) => (
                    <div
                        key={option.id}
                        className={`cursor-pointer p-2 border-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                            selectedOption === option.id ? (isCorrect ? "border-green-500" : "border-red-500") : "border-gray-300"
                        }`}
                        onClick={() => handleSelectOption(option.id, option.correct)}
                    >
                        <img
                            src={option.imgSrc}
                            alt={option.alt}
                            className="w-36 h-36 object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>

            {/* Feedback Message */}
            {selectedOption && (
                <div className="mt-6 text-center">
                    {isCorrect ? (
                        <p className="text-lg text-green-600 font-semibold animate__animated animate__fadeIn">
                            🎉 Correct! This is the correct "A" handshape.
                        </p>
                    ) : (
                        <p className="text-lg text-red-600 font-semibold animate__animated animate__fadeIn">
                            ❌ Incorrect! Try again. The correct "A" handshape requires your thumb to rest on the side of your index finger.
                        </p>
                    )}
                </div>
            )}

            {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="secondary" onClick={() => router.push("/lessons/BasicEtiquette")}>
                        ← Previous Lesson
                    </Button>
                    <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                    <Button variant="secondary" onClick={() => router.push("/lessons/Fingerspelling")}>
                        Next Lesson →
                    </Button>
                </div>
        </LessonLayout>
    );
};

export default HandShapes;
