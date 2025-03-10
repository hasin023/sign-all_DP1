import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const ContextMarkers = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Understanding Context and Non-Manual Markers">
            <p className="text-gray-700">
                ASL relies on facial expressions and non-manual markers to convey tone and emphasis.
                Learn how to properly use them in conversations.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default ContextMarkers;
