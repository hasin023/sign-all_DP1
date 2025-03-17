import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRouter } from "next/router";

const REQUIRED_TOPICS = [
    "Brief history and importance of ASL",
    "Basic etiquette and common misconceptions",
    "Understanding hand shapes and movements",
    "Learning the ASL alphabet (A-Z)",
    "Practicing fingerspelling common words",
    "Recognizing and understanding numbers (0-9, then up to 100)",
    "Common greetings (hello, goodbye, please, thank you)",
    "Everyday words (yes, no, sorry, help)",
    "Basic question words (who, what, when, where, why)",
    "Constructing short sentences (e.g., 'My name is...')",
    "Common expressions used in daily life",
    "Understanding facial expressions and their role in ASL",
    "Learning key action words (eat, drink, go, want)",
    "Understanding ASL sentence structure (topic-comment order)",
    "Using pronouns and classifiers",
    "Practicing small talk scenarios",
    "Understanding context and non-manual markers",
    "Engaging in back-and-forth communication",
    "Using time indicators (past, present, future)",
    "Understanding directional verbs",
    "Constructing more detailed responses",
    "Emergency signs (help, danger, call police)",
    "Workplace and school-related signs",
    "Family and relationship signs",
    "Learning to tell a simple story in ASL",
    "Using facial expressions to convey emotions",
    "Watching and imitating real ASL conversations",
    "Final assessment to test comprehension"
];

const Certification = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [isEligible, setIsEligible] = useState(false);

     useEffect(() => {
        // Retrieve learning progress from localStorage
        const progress = JSON.parse(localStorage.getItem("asl_learning_progress")) || {};
        const completedLessons = progress.completedLessons || [];

        // Check if all required lessons are completed
        const allLessonsCompleted = REQUIRED_TOPICS.every(topic => completedLessons.includes(topic));
        setIsEligible(allLessonsCompleted);
    }, []);

    const generateCertificate = () => {
        const certificate = document.getElementById("certificate-preview");
        html2canvas(certificate).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("landscape");
            pdf.addImage(imgData, "PNG", 20, 20, 250, 150);
            pdf.save(`${name}_ASL_Certificate.pdf`);
        });
    };

    return (
        <LessonLayout title="Certificate of Completion">
            <p className="text-gray-700">
                Complete all lessons in the ASL Learning Roadmap to unlock your certificate.
            </p>
            {!isEligible ? (
                <p className="text-red-600 font-semibold">You haven't completed all required lessons yet.</p>
            ) : (
                <>
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-4"
                    />
                    {name && (
                        <>
                            <div id="certificate-preview" className="border p-6 mt-4 bg-white text-center shadow-lg w-full max-w-2xl mx-auto">
                                <img src="/logo.png" alt="Sign-All Logo" className="h-16 mx-auto mb-2" />
                                <h1 className="text-3xl font-bold">Certificate of Completion</h1>
                                <p className="text-lg mt-4">This is to certify that</p>
                                <h2 className="text-2xl font-semibold mt-2">{name}</h2>
                                <p className="mt-4">has successfully completed the course on</p>
                                <h3 className="text-xl font-semibold">American Sign Language (ASL)</h3>
                                <p className="mt-2">on <strong>Sign-All</strong></p>
                            </div>
                            <Button className="mt-4" onClick={generateCertificate}>
                                Download Certificate
                            </Button>
                        </>
                    )}
                </>
            )}
            <Button className="mt-6" onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default Certification;
