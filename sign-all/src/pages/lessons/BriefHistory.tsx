import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const BriefHistory = () => {
    const router = useRouter();
    return (
        <LessonLayout title="Brief History and Importance of ASL">
            <p className="text-gray-700">
                ASL has a rich history, originating from a mix of indigenous sign languages 
                and French Sign Language (LSF). It evolved over time to become a fully developed 
                and widely used language in the Deaf community.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default BriefHistory;
