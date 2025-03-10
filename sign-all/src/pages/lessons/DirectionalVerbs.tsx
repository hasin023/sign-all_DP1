import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const DirectionalVerbs = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Understanding Directional Verbs">
            <p className="text-gray-700">
                Learn how directional verbs in ASL convey information about movement and subjects.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default DirectionalVerbs;
