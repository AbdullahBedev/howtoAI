import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { SiteLayout } from "@/components/layout/site-layout";

export const metadata: Metadata = {
  title: "Forgot Password | How-to-AI",
  description: "Reset your How-to-AI account password.",
};

export default function ForgotPasswordPage() {
  return (
    <SiteLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-md mx-auto">
          <ForgotPasswordForm />
        </div>
      </div>
    </SiteLayout>
  );
} 