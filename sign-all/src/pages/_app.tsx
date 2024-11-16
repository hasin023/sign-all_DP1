import "@/styles/globals.css"
import type { AppProps } from "next/app"
import {UserProvider} from "@auth0/nextjs-auth0/client";

import { Toaster } from "react-hot-toast"
import { User } from "lucide-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );

  
}
