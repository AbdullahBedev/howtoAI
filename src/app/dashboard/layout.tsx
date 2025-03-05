import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | How-to-AI",
  description: "Your How-to-AI dashboard with personalized tutorials and progress tracking.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 