"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/language-context";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <LanguageProvider>{children}</LanguageProvider>;
}



