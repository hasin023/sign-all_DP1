import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const ActionWords = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Learning Key Action Words">
            <p className="text-gray-700">
                Learn the most commonly used ASL action words like "Eat," "Drink," "Go," and "Want."
                These verbs are essential for building meaningful conversations.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default ActionWords;
