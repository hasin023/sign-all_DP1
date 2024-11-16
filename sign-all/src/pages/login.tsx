import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Auth0 login page
    router.push("/api/auth/login");
  }, [router]);

  return null; // Optionally, you can show a loading spinner here
}
