import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const BasicEtiquette = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Basic Etiquette and Common Misconceptions">
            <p className="text-gray-700">
                When communicating in ASL, it is important to maintain eye contact, use facial expressions, 
                and avoid interrupting by waving hands excessively. A common misconception is that ASL 
                is simply English in signs—it is actually a distinct language with its own grammar and structure.
            </p>
            <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>
            
        </LessonLayout>
    );
};

export default BasicEtiquette;
