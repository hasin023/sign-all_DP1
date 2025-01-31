import Head from "next/head"
import { Poppins } from 'next/font/google'
import { useUser } from '@auth0/nextjs-auth0/client'
import Navbar from "@/components/common/Navbar"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"
import LearningRoadmap from "@/components/custom/learning-roadmap"

const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"] })

const RaodmapPage = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <LoadingSkeleton />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <>
            <Head>
                <title>Quiz - Sign All</title>
            </Head>

            <div className={`${poppins.className} min-h-screen bg-gray-50`}>
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <LearningRoadmap />
                </main>
            </div>
        </>
    )
}

const LoadingSkeleton = () => (
    <div className={`${poppins.className} min-h-screen bg-gray-50`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-10 w-40" />
                </CardContent>
            </Card>
        </main>
    </div>
)

const ErrorMessage = ({ message }: { message: any }) => (
    <div className={`${poppins.className} min-h-screen bg-gray-50 flex items-center justify-center`}>
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600">{message}</p>
            </CardContent>
        </Card>
    </div>
)

export default RaodmapPage
