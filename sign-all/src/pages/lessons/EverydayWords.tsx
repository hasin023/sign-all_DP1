import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const EverydayWords = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Everyday Words">
            <p className="text-gray-700">
                Master key everyday words such as "Yes," "No," "Sorry," and "Help." These signs
                will help you navigate daily interactions with ease.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default EverydayWords;
