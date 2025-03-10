import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const WorkplaceSigns = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Workplace & School-Related Signs">
            <p className="text-gray-700">
                Master ASL signs related to the workplace and school settings. 
                These include terms like "Meeting," "Homework," "Supervisor," and "Classroom."
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default WorkplaceSigns;
