import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const ImitatingConversations = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Watching and Imitating Real ASL Conversations">
            <p className="text-gray-700">
                Improve your ASL skills by watching real ASL conversations and practicing imitation. 
                This helps with fluency and natural expression.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default ImitatingConversations;
