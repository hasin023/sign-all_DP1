import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const CommonExpressions = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Common Expressions">
            <p className="text-gray-700">
                Learn commonly used ASL expressions to enhance natural conversation skills.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default CommonExpressions;
