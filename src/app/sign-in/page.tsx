
import type { Metadata } from "next";
import SignInClient from "@/components/auth/SignInClient";

export const metadata: Metadata = {
  title: "Sign in | UzaDeals",
  description: "Sign in to manage your UzaDeals demo account.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return <SignInClient />;
}
