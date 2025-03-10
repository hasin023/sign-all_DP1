import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const FamilySigns = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Family and Relationship Signs">
            <p className="text-gray-700">
                Learn ASL signs for family members and relationships, such as "Mother," "Father," 
                "Brother," "Sister," "Friend," and "Marriage."
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default FamilySigns;
