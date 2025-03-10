import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const FingerspellingPractice = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Practicing Fingerspelling Common Words">
            <p className="text-gray-700">
                Practice fingerspelling by spelling out names and common words using ASL letters.
                This will enhance fluency and recognition speed.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default FingerspellingPractice;
