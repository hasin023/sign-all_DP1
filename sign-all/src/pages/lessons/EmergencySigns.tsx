import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const EmergencySigns = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Emergency Signs">
            <p className="text-gray-700">
                Learn important emergency ASL signs such as "Help," "Danger," "Call Police," 
                and "Fire" to effectively communicate in urgent situations.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default EmergencySigns;
