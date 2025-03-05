import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | How-to-AI",
    default: "Prompt Engineering | How-to-AI",
  },
  description: "Master the art of prompt engineering to get the most out of AI models with our comprehensive guides, templates, and tools.",
};

export default function PromptsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
} 