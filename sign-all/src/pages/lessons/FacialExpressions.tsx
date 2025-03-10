import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const FacialExpressions = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Understanding Facial Expressions">
            <p className="text-gray-700">
                Facial expressions play a crucial role in ASL. Learn how they change the meaning of words.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default FacialExpressions;
