import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const SmallTalk = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Practicing Small Talk Scenarios">
            <p className="text-gray-700">
                Improve your ASL conversation skills by learning how to engage in small talk. 
                Common topics include greetings, weather, and daily activities.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default SmallTalk;
