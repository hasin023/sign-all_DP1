import { useState } from "react";
import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const PronounsClassifiers = () => {
    const router = useRouter();
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedClassifier, setSelectedClassifier] = useState(null);

    // Classifier matching options
    const classifiers = [
        { type: "CL:1", description: "Represents a thin, long object (e.g., pencil, person standing)" },
        { type: "CL:3", description: "Represents a vehicle (e.g., car, bus, truck)" },
        { type: "CL:V", description: "Represents a pair of legs (e.g., person sitting, walking)" },
        { type: "CL:B", description: "Represents a flat object (e.g., paper, book, table)" },
    ];

    return (
        <LessonLayout title="Using Pronouns and Classifiers">
            <div className="space-y-6">
                {/* Lesson Introduction */}
                <p className="text-gray-700 text-lg">
                    Pronouns and classifiers help provide more specific meanings in ASL.  
                    Learn how to use them properly in various contexts.
                </p>

                {/* Section 1: Personal Pronouns */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">🤟 Personal Pronouns</h3>
                    <p className="text-gray-600 mb-4">
                        ASL pronouns are pointed using **indexing** rather than spoken words.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img src="https://www.lifeprint.com/asl101/signjpegs/p/photography1.jpg" alt="I / Me" width="120" height="120" />
                            <p className="text-gray-700 mt-2 font-semibold">"I / Me"</p>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img src="https://www.lifeprint.com/asl101/signjpegs/y/you.ht1.jpg" alt="You" width="120" height="120" />
                            <p className="text-gray-700 mt-2 font-semibold">"You"</p>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img src="https://www.lifeprint.com/asl101/signjpegs/h/he.htm2.jpg" alt="He / She / They" width="120" height="120" />
                            <p className="text-gray-700 mt-2 font-semibold">"He / She / They"</p>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img src="https://lifeprint.com/asl101/gifs/w/we-two-2.gif" alt="We / Us" width="120" height="120" />
                            <p className="text-gray-700 mt-2 font-semibold">"We / Us"</p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Understanding Classifiers */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">📝 Classifiers in ASL</h3>
                    <p className="text-gray-600 mb-4">
                        Classifiers are **handshapes used to represent objects, people, or movement.**  
                        They help provide **more context** to a conversation.
                    </p>

                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {classifiers.map((item) => (
                            <li key={item.type}>
                                <strong>{item.type}:</strong> <span className="text-gray-600">{item.description}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Interactive Classifier Matching Activity */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">🎯 Match the Classifier</h2>
                    <p className="text-gray-600 mb-4">Click a classifier to reveal its meaning.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {classifiers.map((classifier) => (
                            <Button
                                key={classifier.type}
                                className="px-4 py-2 bg-gray-200 rounded-md font-semibold"
                                variant="outline"
                                onClick={() => setSelectedClassifier(classifier)}
                            >
                                {classifier.type}
                            </Button>
                        ))}
                    </div>

                    {selectedClassifier && (
                        <div className="mt-4 bg-white p-4 rounded-md shadow-sm text-center">
                            <p className="text-lg font-bold text-gray-700">{selectedClassifier.type}</p>
                            <p className="text-gray-600">{selectedClassifier.description}</p>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="secondary" onClick={() => router.push("/previous-lesson")}>
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

export default PronounsClassifiers;
