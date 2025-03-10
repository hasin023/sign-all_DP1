import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const BackAndForthCommunication = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Engaging in Back-and-Forth Communication">
            <p className="text-gray-700">
                Learn how to maintain natural ASL conversations by understanding 
                back-and-forth communication techniques.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default BackAndForthCommunication;
