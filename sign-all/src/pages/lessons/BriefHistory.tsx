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
            <p className="text-gray-700">
                ASL (American Sign Language) originated in the early 19th century, shaped by a mix of indigenous
                sign languages and French Sign Language (LSF). It has evolved over time, establishing itself as a
                distinct and fully developed language used primarily within the Deaf community.
            </p>

            <h3 className="text-xl font-semibold mt-6">Timeline of ASL History</h3>
            <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li><strong>1817:</strong> The establishment of the first Deaf school in the U.S. in Hartford, Connecticut, where LSF and local signs blended.</li>
                <li><strong>1864:</strong> The first Deaf president of Gallaudet University was appointed, marking a turning point in Deaf advocacy.</li>
                <li><strong>1970s:</strong> The recognition of ASL as a fully developed language with its own grammar, syntax, and lexicon.</li>
            </ul>

            <h4 className="mt-4 font-semibold">Why ASL is Important</h4>
            <p className="text-gray-700">
                ASL allows Deaf and hard-of-hearing individuals to communicate freely, bridging gaps with the broader
                hearing world. Its growth and development have been instrumental in bringing attention to the linguistic
                needs of the Deaf community.
            </p>

            {/* Interactive Quiz */}
<h4 className="text-xl font-semibold mt-6">Quick Quiz</h4>
<p className="text-lg text-gray-700 mb-4">
    What was a major milestone for ASL in the 1970s?
</p>

{/* Quiz Options */}
<div className="space-y-4">
    <label className={`cursor-pointer flex items-center space-x-2 p-4 rounded-lg border-2 transition-all duration-200 
        ${selectedAnswer === "ASL was recognized as a fully developed language." ? "border-green-600 bg-green-100" : "border-gray-400 bg-white hover:bg-gray-100"}`}
        onClick={() => handleAnswerSelect("ASL was recognized as a fully developed language.")}>
        <input
            type="radio"
            name="quiz"
            checked={selectedAnswer === "ASL was recognized as a fully developed language."}
            onChange={() => handleAnswerSelect("ASL was recognized as a fully developed language.")}
            className="h-5 w-5 text-green-600"
        />
        <span className="text-lg">ASL was recognized as a fully developed language.</span>
    </label>

    <label className={`cursor-pointer flex items-center space-x-2 p-4 rounded-lg border-2 transition-all duration-200 
        ${selectedAnswer === "The first Deaf president of Gallaudet University was elected." ? "border-green-600 bg-green-100" : "border-gray-400 bg-white hover:bg-gray-100"}`}
        onClick={() => handleAnswerSelect("The first Deaf president of Gallaudet University was elected.")}>
        <input
            type="radio"
            name="quiz"
            checked={selectedAnswer === "The first Deaf president of Gallaudet University was elected."}
            onChange={() => handleAnswerSelect("The first Deaf president of Gallaudet University was elected.")}
            className="h-5 w-5 text-green-600"
        />
        <span className="text-lg">The first Deaf president of Gallaudet University was elected.</span>
    </label>

    <label className={`cursor-pointer flex items-center space-x-2 p-4 rounded-lg border-2 transition-all duration-200 
        ${selectedAnswer === "ASL became a mandatory subject in schools." ? "border-green-600 bg-green-100" : "border-gray-400 bg-white hover:bg-gray-100"}`}
        onClick={() => handleAnswerSelect("ASL became a mandatory subject in schools.")}>
        <input
            type="radio"
            name="quiz"
            checked={selectedAnswer === "ASL became a mandatory subject in schools."}
            onChange={() => handleAnswerSelect("ASL became a mandatory subject in schools.")}
            className="h-5 w-5 text-green-600"
        />
        <span className="text-lg">ASL became a mandatory subject in schools.</span>
    </label>
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
            <p className="text-lg font-semibold text-green-600">Correct! ASL was recognized as a fully developed language.</p>
        ) : (
            <p className="text-lg font-semibold text-red-600">
                Incorrect. The correct answer is: <strong>"ASL was recognized as a fully developed language."</strong>
            </p>
        )}
    </div>
)}

{/* Back to Roadmap Button */}
<Button
    onClick={() => router.push("/roadmap")}
    className="mt-6 w-full py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition duration-200"
>
    Back to Roadmap
</Button>


        </LessonLayout>
    );
};

export default BriefHistory;
