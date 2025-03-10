import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const ExpressiveSigning = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Using Facial Expressions to Convey Emotions">
            <p className="text-gray-700">
                Facial expressions are crucial in ASL for conveying emotions and tone. 
                Learn how to enhance your signing with appropriate expressions.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default ExpressiveSigning;
