import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Navbar from "./common/Navbar";

const LessonLayout = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar/Header */}
            <Navbar/>

            {/* Lesson Content */}
            <main className="flex-grow p-6 bg-gray-100">
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">{children}</div>
            </main>
        </div>
    );
};

export default LessonLayout;
