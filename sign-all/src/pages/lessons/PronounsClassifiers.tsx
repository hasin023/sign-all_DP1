import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const PronounsClassifiers = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Using Pronouns and Classifiers">
            <p className="text-gray-700">
                Pronouns and classifiers help provide more specific meanings in ASL.
                Learn how to use them properly in various contexts.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default PronounsClassifiers;
