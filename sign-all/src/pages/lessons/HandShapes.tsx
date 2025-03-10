import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const HandShapes = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Understanding Hand Shapes and Movements">
            <p className="text-gray-700">
                Hand shapes are fundamental in ASL. Each sign requires specific finger positioning and movement. 
                The shape and motion of hands can completely change the meaning of a sign.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default HandShapes;
