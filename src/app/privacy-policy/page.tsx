"use client";

import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { Screen } from "@/components/screen";
import { TermsContainer } from "@/components/terms/terms.container";
import { TermsSidebar } from "@/sections/terms.sidebar";
import { useTerms } from "@/contexts/terms-context";
import { RenderTerms } from "@/components/terms/terms.render";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
import { useSizes } from "@/constants/sizes";
import { useIsMobile } from "@/hooks/use.platform.detection";

export default function PrivacyPolicyPage() {
    const { state } = useTerms();
    const sizes = useSizes();
    const isMobile = useIsMobile();
    const { privacyPolicy, loading, error } = state;

    return (
        <div>
            <Header />
            <Screen>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        gap: 70,
                    }}
                >
                    <div
                        style={{ marginTop: isMobile ? 0 : sizes.margins[15] }}
                    >
                        <TermsSidebar />
                    </div>
                    <TermsContainer style={{ flex: 1, maxWidth: 900 }}>
                        {error && <Error message={error} />}
                        {loading && <Loading />}
                        {!error && !loading && (
                            <RenderTerms doc={privacyPolicy!} />
                        )}
                    </TermsContainer>
                </div>
            </Screen>
            <Footer />
        </div>
    );
}
