import { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | How-to-AI",
  description: "Log in to access your How-to-AI account and continue your learning journey."
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-220px)] py-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm redirectUrl={searchParams.redirect} />
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="font-medium underline underline-offset-4 hover:text-primary">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 