import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const TimeIndicators = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Using Time Indicators">
            <p className="text-gray-700">
                Learn how to indicate past, present, and future tense in ASL 
                using time-related signs.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default TimeIndicators;
