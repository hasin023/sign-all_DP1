import Head from "next/head"
import { Poppins } from 'next/font/google'
import { useUser } from '@auth0/nextjs-auth0/client'
import Navbar from "@/components/common/Navbar"
import QuizBox from "@/components/custom/QuizBox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react'
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton"
import FloatingChatbot from "@/components/common/FloatingChatbot"

const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"] })

const QuizPage = () => {
  const { user, error, isLoading } = useUser();
  const [isDemoQuizStarted, setIsDemoQuizStarted] = useState(false)

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Head>
        <title>Quiz - Sign All</title>
      </Head>

      <div className={`${poppins.className} min-h-screen bg-gray-50`}>
        <FloatingChatbot/>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {isDemoQuizStarted ? (
            <QuizBox stopQuiz={() => setIsDemoQuizStarted(false)} />
          ) : (
            <QuizLandingPage
              user={user}
              startDemoQuiz={() => setIsDemoQuizStarted(true)}
            />
          )}
        </main>
      </div>
    </>
  )
}

const QuizLandingPage = ({ user, startDemoQuiz }: { user: any, startDemoQuiz: any }) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Sign Language Quiz</CardTitle>
        <CardDescription>Test your knowledge and learn American Sign Language</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <p className="text-center text-gray-600">
          Challenge yourself with our sign language quiz and improve your skills!
        </p>
        <Button
          onClick={startDemoQuiz}
          size="lg"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold"
        >
          Start Demo Quiz
        </Button>
        {user ? (
          <Link href="/roadmap">
            <Button variant="outline" size="lg">
              Go to Learning Roadmap
            </Button>
          </Link>
        ) : (
          <Link href="/api/auth/login">
            <Button variant="outline" size="lg">
              Log in for Full Learning Experience
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
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

export default QuizPage
