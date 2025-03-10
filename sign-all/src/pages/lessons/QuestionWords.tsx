import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const QuestionWords = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Basic Question Words">
            <p className="text-gray-700">
                Learn how to ask questions in ASL, including "Who," "What," "When," "Where," and "Why."
                Understanding these words is crucial for communication.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default QuestionWords;
