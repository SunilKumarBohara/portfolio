import { Metadata } from "next";
import PromptStudioWorkspace from "@/components/prompt-studio/PromptStudioWorkspace";

export const metadata: Metadata = {
  title: "AI Prompt Engineering Studio & IDE | Sunil Kumar Bohara",
  description:
    "Production-grade AI Prompt Engineering OS. Transform simple ideas into structured, implementation-ready software specifications with Prompt DNA, visual section builder, and quality auditor.",
  keywords: [
    "Prompt Engineering",
    "AI Prompt IDE",
    "Prompt DNA",
    "Antigravity Prompts",
    "Cursor AI Prompts",
    "Claude Prompts",
    "Prompt Auditor",
    "SEO Prompts",
  ],
};

export default function PromptStudioPage() {
  return <PromptStudioWorkspace />;
}
