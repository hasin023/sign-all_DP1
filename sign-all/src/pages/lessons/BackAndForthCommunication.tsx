import { useState } from "react";
import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const BackAndForthCommunication = () => {
    const router = useRouter();
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [showResponse, setShowResponse] = useState(false);

    // Role-playing responses
    const responses = [
        {
            scenario: "Someone asks: 'How are you?'",
            options: [
                { text: "I am fine, thank you!", gif: "https://www.lifeprint.com/asl101/gifs/f/fine.gif" },
                { text: "I am tired.", gif: "https://www.lifeprint.com/asl101/gifs/t/tired.gif" },
                { text: "I'm excited!", gif: "https://www.lifeprint.com/asl101/gifs/e/excited.gif" },
            ],
        },
        {
            scenario: "Someone tells you about their weekend.",
            options: [
                { text: "That’s interesting!", gif: "https://www.lifeprint.com/asl101/gifs/i/interesting.gif" },
                { text: "Wow!", gif: "https://www.lifeprint.com/asl101/signjpegs/w/wowwhew1.jpg" },
                { text: "Really?", gif: "https://d2drp7fo8uq4gv.cloudfront.net/455ae81a-b02b-4ad2-b8f5-b31c5ed3d0d8_poster.jpg" },
            ],
        },
    ];

    return (
        <LessonLayout title="Engaging in Back-and-Forth Communication">
            <div className="space-y-6">
                {/* Lesson Introduction */}
                <p className="text-gray-700 text-lg">
                    Learn how to maintain natural ASL conversations by understanding  
                    **back-and-forth communication techniques** such as turn-taking,  
                    backchanneling, and active engagement.
                </p>

                {/* Section 1: Turn-Taking in ASL */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">🔄 Turn-Taking in ASL</h3>
                    <p className="text-gray-600 mb-4">
                        In ASL, **taking turns in conversation** is signaled differently than in spoken languages.  
                        Instead of vocal pauses, **ASL uses eye gaze, hand movements, and facial expressions**  
                        to indicate when it's someone else's turn to speak.
                    </p>

                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Raised Eyebrows</strong> – Signals a question or expecting a response.</li>
                        <li><strong>Holding a Sign</strong> – A slight pause in signing to give the other person a chance to respond.</li>
                        <li><strong>Nodding or Shifting</strong> – Acknowledges the other person and keeps the flow of conversation.</li>
                    </ul>
                </div>

                {/* Section 2: Backchanneling (Active Listening) */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">🗣️ Backchanneling in ASL</h3>
                    <p className="text-gray-600 mb-4">
                        **Backchanneling** is how you show someone that you're engaged in the conversation  
                        without interrupting. In ASL, this can be done through:
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img src="https://thumbs.dreamstime.com/b/lady-saying-i-understand-sign-language-teacher-showing-words-asl-lesson-lady-saying-i-understand-sign-language-teacher-151778727.jpg" alt="Nodding" width="120" height="120" />
                            <p className="text-gray-700 mt-2 font-semibold">Nodding (I understand)</p>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img src="https://d2drp7fo8uq4gv.cloudfront.net/455ae81a-b02b-4ad2-b8f5-b31c5ed3d0d8_poster.jpg" alt="Really?" width="120" height="120" />
                            <p className="text-gray-700 mt-2 font-semibold">"Really?" (Engagement)</p>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img src="https://www.lifeprint.com/asl101/signjpegs/w/wowwhew1.jpg" alt="Wow!" width="120" height="120" />
                            <p className="text-gray-700 mt-2 font-semibold">"Wow!" (Surprise)</p>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <img src="https://www.lifeprint.com/asl101/gifs/i/interesting.gif" alt="Interesting" width="120" height="120" />
                            <p className="text-gray-700 mt-2 font-semibold">"Interesting!" (Curiosity)</p>
                        </div>
                    </div>
                </div>

                {/* Interactive Role-Playing Activity */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">🎭 Role-Playing: Choose Your Response</h2>
                    <p className="text-gray-600 mb-4">Select how you would respond in a conversation.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {responses.map((scenario, index) => (
                            <Button
                                key={index}
                                className="px-4 py-2 bg-gray-200 rounded-md font-semibold"
                                variant="outline"
                                onClick={() => {
                                    setSelectedResponse(scenario);
                                    setShowResponse(false);
                                }}
                            >
                                {scenario.scenario}
                            </Button>
                        ))}
                    </div>

                    {selectedResponse && (
                        <div className="mt-6 bg-white p-6 rounded-md shadow-sm text-center">
                            <h3 className="text-lg font-bold">{selectedResponse.scenario}</h3>
                            <p className="text-gray-700 mt-2">How would you respond?</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                {selectedResponse.options.map((option, index) => (
                                    <Button
                                        key={index}
                                        className="px-4 py-2 bg-gray-300 rounded-md font-semibold"
                                        variant="outline"
                                        onClick={() => setShowResponse(option)}
                                    >
                                        {option.text}
                                    </Button>
                                ))}
                            </div>

                            {showResponse && (
                                <div className="mt-4">
                                    <p className="text-lg font-bold text-gray-700">{showResponse.text}</p>
                                    <img src={showResponse.gif} alt="ASL Response" width="120" height="120" />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="secondary" onClick={() => router.push("/lessons/ContextMarkers")}>
                        ← Previous Lesson
                    </Button>
                    <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
                    <Button variant="secondary" onClick={() => router.push("/lessons/TimeIndicators")}>
                        Next Lesson →
                    </Button>
                </div>
            </div>
        </LessonLayout>
    );
};

export default BackAndForthCommunication;
