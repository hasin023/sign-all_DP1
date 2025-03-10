import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const TellingAStory = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Learning to Tell a Story in ASL">
            <p className="text-gray-700">
                Storytelling is an important part of ASL. Learn techniques for telling engaging stories.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default TellingAStory;
