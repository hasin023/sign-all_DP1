import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User, LogOut } from "lucide-react"

const Navbar = () => {
  const { user, error, isLoading } = useUser()

  console.log(user);

  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-2">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={360} height={100} className="w-36 h-10" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="/detection">Sign Detection</NavLink>
          <NavLink href="/dictionary">Dictionary</NavLink>
          <NavLink href="/quiz">Quiz</NavLink>
          {!user ? (
            <Button asChild variant="default">
              <Link href="/api/auth/login">Login</Link>
            </Button>
          ) : (
            <UserMenu user={user} />
          )}
        </nav>

        <MobileMenu user={user} />
      </div>
    </header>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-gray-600 hover:text-rose-500 transition duration-300">
    {children}
  </Link>
)

const UserMenu = ({ user }: { user: any }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 border rounded-full transition-all hover:bg-gray-200 dark:hover:bg-gray-700">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.picture} alt={user.name} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link
          href="/profile"
          className="flex items-center px-2 py-2 rounded-md cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link
          href="/api/auth/logout"
          className="flex items-center px-2 py-2 rounded-md cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4 text-red-600" />
          <span className="text-red-600">Log out</span>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu >
)

const MobileMenu = ({ user }: { user: any }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem asChild>
        <Link href="/detection">Sign Detection</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dictionary">Dictionary</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/quiz">Quiz</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      {user ? (
        <>
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/api/auth/logout">Log out</Link>
          </DropdownMenuItem>
        </>
      ) : (
        <DropdownMenuItem asChild>
          <Link href="/api/auth/login">Login</Link>
        </DropdownMenuItem>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
)

export default Navbar

