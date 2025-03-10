import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const BasicEtiquette = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Basic Etiquette and Common Misconceptions">
            <p className="text-gray-700">
                When communicating in ASL, it's important to understand cultural etiquette to ensure respectful and effective interaction.
                Here are some key etiquette points:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-700">
                <li><strong>Maintain eye contact:</strong> This is crucial for effective communication in ASL. It shows attentiveness and respect.</li>
                <li><strong>Use facial expressions:</strong> ASL relies heavily on non-manual signals such as facial expressions to convey meaning.</li>
                <li><strong>Don't interrupt:</strong> When someone is signing, wait until they're done before responding. It’s rude to interrupt by waving hands excessively.</li>
                <li><strong>Be patient:</strong> ASL is not English translated into signs. It has its own grammar and structure, which may take time to learn.</li>
            </ul>

            <h3 className="mt-6 font-semibold">Common Misconceptions About ASL</h3>
            <ul className="list-disc pl-6 text-gray-700">
                <li><strong>Myth:</strong> ASL is just signed English. <br /><strong>Fact:</strong> ASL is a complete, independent language with its own grammar and vocabulary.</li>
                <li><strong>Myth:</strong> ASL is the same as other sign languages worldwide. <br /><strong>Fact:</strong> Different countries have different sign languages (e.g., BSL, LSF, etc.).</li>
            </ul>

            {/* Video demonstration */}
            <h4 className="mt-6 font-semibold">Watch This Demonstration:</h4>
            <div className="flex justify-center mt-2">
                <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/D7TWKTMcj_8"
    title="ASL Etiquette"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
></iframe>

            </div>

            <Button onClick={() => router.push("/roadmap")} className="mt-4">
                Back to Roadmap
            </Button>
        </LessonLayout>
    );
};

export default BasicEtiquette;
