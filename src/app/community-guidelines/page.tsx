"use client";

import { Text } from "@/components/themed";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { Screen } from "@/components/screen";
import { TermsContainer } from "@/components/terms.container";
import { useLanguage } from "@/contexts/language-context";
import { useTerms } from "@/contexts/terms-context";
import { RenderTerms } from "@/components/terms.render";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";

export default function CommunityGuidelinesPage() {
  const { t } = useLanguage();
  const { state } = useTerms();
  const { communityGuidelines, loading, error } = state;

  return (
    <div>
      <Header />
      <Screen>
        <TermsContainer>
          {error && <Error message={error} />}
          {loading && <Loading />}
          {!error && !loading && <RenderTerms doc={communityGuidelines!} />}
        </TermsContainer>
      </Screen>
      <Footer />
    </div>
  );
}
