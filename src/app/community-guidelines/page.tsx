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

export default function CommunityGuidelinesPage() {
    const { state } = useTerms();
    const sizes = useSizes();
    const isMobile = useIsMobile();
    const { communityGuidelines, loading, error } = state;

    return (
        <div
            style={{
                position: "relative",
                // usado pelo TermsContainer para calcular a altura disponível
                ["--app-header-height" as any]: "72px",
                ["--app-footer-height" as any]: "140px",
            }}
        >
            <Header />
            <Screen>
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        background: "#f2f",
                        gap: 70,
                    }}
                >
                    <div
                        style={{
                            marginTop: isMobile ? 0 : sizes.margins[15],
                        }}
                    >
                        <TermsSidebar />
                    </div>
                    <TermsContainer
                        style={{
                            flex: 1,
                            maxWidth: 900,
                        }}
                    >
                        {error && <Error message={error} />}
                        {loading && <Loading />}
                        {!error && !loading && (
                            <RenderTerms doc={communityGuidelines!} />
                        )}
                    </TermsContainer>
                </div>
            </Screen>
            <Footer />
        </div>
    );
}
