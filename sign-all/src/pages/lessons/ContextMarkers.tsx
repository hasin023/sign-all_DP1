import { useState } from "react";
import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const ContextMarkers = () => {
    const router = useRouter();
    const [selectedExpression, setSelectedExpression] = useState(null);

    // Expressions and their meanings
    const expressions = [
        {
            type: "Raised Eyebrows",
            meaning: "Used for Yes/No Questions",
            img: "https://media.tenor.com/rMLswxLq2uEAAAAM/funny-as.gif",
        },
        {
            type: "Furrowed Eyebrows",
            meaning: "Used for Wh-questions (who, what, where, why, how)",
            img: "https://media.tenor.com/t2vQvNA_GlYAAAAe/fille-choque-shocked.png",
        },
        {
            type: "Head Tilt",
            meaning: "Indicates interest or clarification",
            img: "https://media2.giphy.com/media/l41lLobFblybADG6Y/giphy.gif?cid=6c09b9521wek5ad2j5pwwzzem610h334f3euafhqujyjzm5e&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g",
        },
        {
            type: "Facial Tension",
            meaning: "Indicates intensity, urgency, or importance",
            img: "https://media.tenor.com/Yc-62-d3QCAAAAAM/stressed.gif",
        },
    ];

    return (
        <LessonLayout title="Understanding Context and Non-Manual Markers">
            <div className="space-y-6">
                {/* Lesson Introduction */}
                <p className="text-gray-700 text-lg">
                    ASL relies on facial expressions and non-manual markers to convey tone and emphasis.  
                    Learn how to properly use them in conversations.
                </p>

                {/* Section 1: What are Non-Manual Markers? */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">🧐 What are Non-Manual Markers (NMMs)?</h3>
                    <p className="text-gray-600 mb-4">
                        Non-manual markers (NMMs) are facial expressions, head movements, and body shifts  
                        that **modify or enhance** the meaning of a sign. They add **tone and context**  
                        to ASL communication.
                    </p>

                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Eyebrows</strong> – Raised for **Yes/No** questions, furrowed for **Wh-questions**.</li>
                        <li><strong>Head Tilt</strong> – Shows engagement, clarification, or emphasis.</li>
                        <li><strong>Facial Expressions</strong> – Convey emotion, urgency, or contrast.</li>
                    </ul>
                </div>

                {/* Section 2: Non-Manual Marker Examples */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">🎭 Non-Manual Markers in Action</h3>
                    <p className="text-gray-600 mb-4">These facial expressions change the meaning of a sentence.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {expressions.map((expression, index) => (
                            <div key={index} className="bg-white p-4 rounded-md shadow-md text-center">
                                <img src={expression.img} alt={expression.type} width="120" height="120" />
                                <p className="text-gray-700 mt-2 font-semibold">{expression.type}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Matching Activity */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">🎯 Match the Expression to its Meaning</h2>
                    <p className="text-gray-600 mb-4">Click an expression to see its meaning.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {expressions.map((expression, index) => (
                            <Button
                                key={index}
                                className="px-4 py-2 bg-gray-200 rounded-md font-semibold"
                                variant="outline"
                                onClick={() => setSelectedExpression(expression)}
                            >
                                {expression.type}
                            </Button>
                        ))}
                    </div>

                    {selectedExpression && (
                        <div className="mt-4 bg-white p-6 rounded-md shadow-sm text-center">
                            <p className="text-lg font-bold text-gray-700">{selectedExpression.type}</p>
                            <p className="text-gray-600">{selectedExpression.meaning}</p>
                            <img src={selectedExpression.img} alt="Expression Example" width="120" height="120" />
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="secondary" onClick={() => router.push("/lessons/SmallTalk")}>
                        ← Previous Lesson
                    </Button>
                    <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                    <Button variant="secondary" onClick={() => router.push("/lessons/BackAndForthCommunication")}>
                        Next Lesson →
                    </Button>
                </div>
            </div>
        </LessonLayout>
    );
};

export default ContextMarkers;
