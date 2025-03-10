import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const ShortSentences = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Constructing Short Sentences">
            <p className="text-gray-700">
                Learn how to construct simple ASL sentences such as "My name is..." and "I am learning ASL."
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default ShortSentences;
