import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const DetailedResponses = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Constructing More Detailed Responses">
            <p className="text-gray-700">
                Improve your ASL fluency by learning how to give detailed responses 
                rather than short, one-word answers.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default DetailedResponses;
