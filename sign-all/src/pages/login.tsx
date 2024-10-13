import AuthForm from "@/components/custom/auth-form"
import { Poppins } from "next/font/google"
import Head from "next/head"

const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"] })

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={`${poppins.className} min-h-screen bg-box`}>
        <main className='max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 justify-between items-center'>
          <AuthForm />
        </main>
      </div>
    </>
  )
}
