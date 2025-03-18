import QuizBox from "@/components/custom/QuizBox";
import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FinalAssessment = () => {
    const router = useRouter();
    const [isDemoQuizStarted, setIsDemoQuizStarted] = useState(false);

    const startDemoQuiz = () => {
        setIsDemoQuizStarted(true);
    };

    return (
        <LessonLayout title="Final Assessment">
            <>
                <Head>
                    <title>Quiz - Sign All</title>
                </Head>

                <div className="min-h-screen bg-gray-50">
                    <main className="container mx-auto px-4 py-8">
                        {/* Introduction Section */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Test Your Knowledge!
                            </h2>
                            <p className="text-gray-600 mt-2">
                                This final assessment will help you evaluate your understanding of the signs
                                you’ve learned so far. Answer the questions and see how well you perform!
                            </p>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-white p-6 shadow rounded-lg mb-6">
                            <h3 className="text-lg font-semibold text-gray-800">Why Take This Quiz?</h3>
                            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                                <li>Reinforce your learning through interactive questions.</li>
                                <li>Identify areas where you need more practice.</li>
                                <li>Boost your confidence in using sign language effectively.</li>
                            </ul>
                        </div>

                        {/* Quiz Section */}
                        <div className="flex flex-col items-center">
                            {isDemoQuizStarted ? (
                                <QuizBox stopQuiz={() => setIsDemoQuizStarted(false)} />
                            ) : (
                                <Button
                                    onClick={startDemoQuiz}
                                    size="lg"
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3"
                                >
                                    Start Demo Quiz
                                </Button>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-12">
                            <Button
                                variant="secondary"
                                onClick={() => router.push("/lessons/WorkplaceSigns")}
                            >
                                ← Previous Lesson
                            </Button>
                            <Button onClick={() => router.push("/roadmap")}>
                                Back to Roadmap
                            </Button>
                        </div>
                    </main>
                </div>
            </>
        </LessonLayout>
    );
};

export default FinalAssessment;
