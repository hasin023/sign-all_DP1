import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const FinalAssessment = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Final Assessment">
            <p className="text-gray-700">
                Test your comprehension of ASL through a series of questions and exercises
                that evaluate your understanding.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default FinalAssessment;
