import Head from "next/head";
import { Poppins } from "next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/common/Navbar";
import LearningRoadmap from "@/components/custom/LearningRoadmap";



const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"] });

const RoadmapPage = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-red-600 text-center py-10">{error.message}</div>;

    return (
        <>
            <Head>
                <title>Learning Roadmap - Sign All</title>
            </Head>
            <div className={`${poppins.className} min-h-screen bg-gray-50`}>
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <LearningRoadmap />
                </main>
            </div>
        </>
    );
};

export default RoadmapPage;
