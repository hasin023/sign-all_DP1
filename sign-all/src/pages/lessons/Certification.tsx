import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Certification = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Earning a Completion Badge/Certificate">
            <p className="text-gray-700">
                After completing the ASL course, you can earn a certificate recognizing your proficiency.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default Certification;
