import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const BasicGreetings = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Common Greetings">
            <p className="text-gray-700">
                Learn common ASL greetings such as "Hello," "Goodbye," "Please," and "Thank you."
                These phrases are essential for starting conversations.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default BasicGreetings;
