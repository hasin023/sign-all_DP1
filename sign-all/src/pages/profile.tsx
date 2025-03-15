import { useUser } from "@auth0/nextjs-auth0/client"
import { Poppins } from "next/font/google"
import Head from "next/head"
import { type FormEvent, useState } from "react"
import Navbar from "@/components/common/Navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import Link from "next/link"

const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"] })

export default function Profile() {
  const { user, error, isLoading } = useUser()
  const [name, setName] = useState(user?.name || "")
  const [isSaving, setIsSaving] = useState(false)

  console.log(user)

  const save = async (e: FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // Simulating an API call to update the user's name
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast.success("Your profile has been successfully updated.")
  }

  if (isLoading) return <ProfileSkeleton />
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <Head>
        <title>Profile - Sign All</title>
      </Head>
      <div className={`${poppins.className} min-h-screen bg-gray-50`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Your Profile</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {!user ? (
                <div className="text-center text-gray-600">
                  <p className="text-lg">You are not logged in.</p>
                  <Button asChild className="mt-4">
                    <Link href="/api/auth/login">Log In</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={save} className="space-y-6">
                  <div className="flex justify-center">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={user.picture || undefined} alt={user.name || "User"} />
                      <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" value={user.name as string} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" value={user.email || ""} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Status</Label>
                    <div>
                      <Badge variant="default">
                        {user.email_verified ? "Verified" : "Not Verified"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button type="submit" className="hover:bg-gray-100" disabled={isSaving || name === user.name}>
                      {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}

function ProfileSkeleton() {
  return (
    <div className={`${poppins.className} min-h-screen bg-gray-50`}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Skeleton className="w-24 h-24 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="flex justify-end pt-4">
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

