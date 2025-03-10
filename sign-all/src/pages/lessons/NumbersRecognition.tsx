import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const NumbersRecognition = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Recognizing and Understanding Numbers">
            <p className="text-gray-700">
                Learn how to sign numbers from 0-9, and then up to 100, using correct hand movements
                and positioning.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default NumbersRecognition;
