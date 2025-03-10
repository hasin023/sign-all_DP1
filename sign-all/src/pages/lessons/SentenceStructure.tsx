import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const SentenceStructure = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Understanding ASL Sentence Structure">
            <p className="text-gray-700">
                ASL follows a topic-comment sentence structure. Learn how to correctly form 
                sentences using ASL grammar rules.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default SentenceStructure;
