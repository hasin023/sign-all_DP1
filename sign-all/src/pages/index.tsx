import Head from "next/head"
import { Poppins } from "next/font/google"

import Navbar from "@/components/common/Navbar"
import LandingPage from "@/components/custom/landing-page"

import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client"
import Spinner from "@/components/common/Spinner";

const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"] })

export default function Home() {

  const router = useRouter()
  const { user, error, isLoading } = useUser()

  if (isLoading) return <Spinner />

  if (error) return <div>{error.message}</div>

  if (user && user.nickname === "admin") {
    router.push('/admin')
  }

  return (
    <>
      <Head>
        <title>Sign All</title>
      </Head>
      <div className={`${poppins.className} min-h-screen`}>
        <Navbar />
        <main className='container mx-auto px-4 py-24 gap-12 justify-between items-center'>
          <LandingPage />
        </main>
      </div>
    </>
  )
}
