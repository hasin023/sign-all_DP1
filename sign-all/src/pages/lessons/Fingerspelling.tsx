import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Fingerspelling = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Fingerspelling (Alphabet & Numbers)">
            <p className="text-gray-700">
                Fingerspelling in ASL involves using hand shapes to represent letters and numbers. 
                It is often used for spelling names, places, or technical words that do not have a sign.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
        </LessonLayout>
    );
};

export default Fingerspelling;
