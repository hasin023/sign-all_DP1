import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/router";

const BriefHistory = () => {
    const router = useRouter();
    
    // State for tracking the selected answer and feedback
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Handle when the user selects an answer
    const handleAnswerSelect = (answer: string) => {
        setSelectedAnswer(answer);
        setIsSubmitted(false);
        setIsCorrect(null);
    };

    // Handle submitting the answer
    const handleSubmit = () => {
        setIsSubmitted(true);
        if (selectedAnswer === "ASL was recognized as a fully developed language.") {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <LessonLayout title="Brief History and Importance of ASL">
            {/* Introduction Section */}
            <section className="bg-blue-50 p-6 rounded-lg shadow-md">
                <p className="text-gray-700 text-lg">
                    ASL (American Sign Language) originated in the early 19th century, shaped by a mix of indigenous
                    sign languages and French Sign Language (LSF). It has evolved over time, establishing itself as a
                    distinct and fully developed language used primarily within the Deaf community.
                </p>
            </section>

            {/* Timeline Section */}
            <h3 className="text-3xl font-bold mt-12 text-center text-blue-600">Timeline of ASL History</h3>
            <div className="relative mt-6 px-6 max-w-3xl mx-auto bg-gradient-to-b from-blue-100 to-white p-6 rounded-lg shadow-md">
                {/* Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-1 w-1 h-full bg-gray-300"></div>

                {/* Timeline Events */}
                <div className="relative flex flex-col space-y-10">
                    {/* 1817 - First Deaf School */}
                    <div className="flex items-center justify-between">
                        <div className="w-1/2 text-right pr-6">
                            <h4 className="text-lg font-semibold text-blue-600">1817</h4>
                            <p className="text-gray-700">
                                The first Deaf school was established in Hartford, Connecticut, blending LSF with local sign languages.
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full shadow-lg">
                            🎓
                        </div>
                    </div>

                    {/* 1864 - Gallaudet University */}
                    <div className="flex items-center justify-between flex-row-reverse">
                        <div className="w-1/2 text-left pl-6">
                            <h4 className="text-lg font-semibold text-green-600">1864</h4>
                            <p className="text-gray-700">
                                The first Deaf president of Gallaudet University was appointed, a milestone for Deaf advocacy.
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full shadow-lg">
                            🏛️
                        </div>
                    </div>

                    {/* 1970s - Recognition of ASL */}
                    <div className="flex items-center justify-between">
                        <div className="w-1/2 text-right pr-6">
                            <h4 className="text-lg font-semibold text-purple-600">1970s</h4>
                            <p className="text-gray-700">
                                ASL was formally recognized as a fully developed language with its own grammar and lexicon.
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-600 text-white flex items-center justify-center rounded-full shadow-lg">
                            📝
                        </div>
                    </div>
                </div>
            </div>

            {/* Importance of ASL Section */}
            <section className="bg-green-50 p-6 mt-12 rounded-lg shadow-md">
                <h4 className="text-2xl font-semibold text-green-700">Why ASL is Important</h4>
                <p className="text-gray-700 mt-2">
                    ASL allows Deaf and hard-of-hearing individuals to communicate freely, bridging gaps with the broader
                    hearing world. Its growth and development have been instrumental in bringing attention to the linguistic
                    needs of the Deaf community.
                </p>
            </section>

            {/* Interactive Quiz Section */}
            <section className="bg-gray-50 p-6 mt-12 rounded-lg shadow-md">
                <h4 className="text-2xl font-semibold text-gray-800">Quick Quiz</h4>
                <p className="text-lg text-gray-700 mb-4">
                    What was a major milestone for ASL in the 1970s?
                </p>

                {/* Quiz Options */}
                <div className="space-y-4">
                    {[
                        "ASL was recognized as a fully developed language.",
                        "The first Deaf president of Gallaudet University was elected.",
                        "ASL became a mandatory subject in schools."
                    ].map((answer) => (
                        <label
                            key={answer}
                            className={`cursor-pointer flex items-center space-x-2 p-4 rounded-lg border-2 transition-all duration-200 
                                ${selectedAnswer === answer ? (isCorrect ? "border-green-600 bg-green-100" : "border-red-600 bg-red-100") : "border-gray-400 bg-white hover:bg-gray-100"}`}
                            onClick={() => handleAnswerSelect(answer)}
                        >
                            <input
                                type="radio"
                                name="quiz"
                                checked={selectedAnswer === answer}
                                onChange={() => handleAnswerSelect(answer)}
                                className="h-5 w-5 text-green-600"
                            />
                            <span className="text-lg">{answer}</span>
                        </label>
                    ))}
                </div>

                {/* Submit Button */}
                {!isSubmitted && (
                    <div className="mt-6">
                        <Button onClick={handleSubmit} className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200">
                            Submit Answer
                        </Button>
                    </div>
                )}

                {/* Feedback */}
                {isSubmitted && (
                    <div className="mt-4 text-center">
                        {isCorrect ? (
                            <p className="text-lg font-semibold text-green-600">🎉 Correct! ASL was recognized as a fully developed language.</p>
                        ) : (
                            <p className="text-lg font-semibold text-red-600">
                                ❌ Incorrect. The correct answer is: <strong>"ASL was recognized as a fully developed language."</strong>
                            </p>
                        )}
                    </div>
                )}
            </section>

            {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    
                    <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                    <Button variant="secondary" onClick={() => router.push("/lessons/BasicEtiquette")}>
                        Next Lesson →
                    </Button>
                </div>
        </LessonLayout>
    );
};

export default BriefHistory;
