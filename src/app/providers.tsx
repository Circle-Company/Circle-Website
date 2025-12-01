"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/language-context";
import { TermsProvider } from "@/contexts/terms-context";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <TermsProvider>{children}</TermsProvider>
    </LanguageProvider>
  );
}
