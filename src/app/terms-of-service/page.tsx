"use client";

import { useEffect, useState } from "react";

import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { Screen } from "@/components/screen";
import type { TermsDocument } from "@/services/api/terms/types";
import { termsService } from "@/services/api/terms";
import { useLanguage } from "@/contexts/language-context";
import { useTextLibrary } from "@/hooks/use.text.library";
import { TermsContainer } from "@/components/terms.container";
import { Error } from "@/components/error";
import { Loading } from "@/components/loading";
import { RenderTerms } from "@/components/terms.render";
import { useTerms } from "@/contexts/terms-context";

export default function TermsOfServicePage() {
  const { t } = useLanguage();
  const { state } = useTerms();
  const { termsOfService, loading, error } = state;

  return (
    <div>
      <Header />
      <Screen>
        <TermsContainer>
          {error && <Error message={error} />}
          {loading && <Loading />}
          {!error && !loading && <RenderTerms doc={termsOfService!} />}
        </TermsContainer>
      </Screen>
      <Footer />
    </div>
  );
}
