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

export default function TermsOfServicePage() {
    const { state } = useTerms();
    const sizes = useSizes();
    const isMobile = useIsMobile();
    const { termsOfService, loading, error } = state;

    return (
        <div>
            <Header />
            <Screen
                style={
                    isMobile
                        ? undefined
                        : {
                              // Desktop trava o scroll no html/body, então esta área
                              // precisa rolar por conta própria.
                              height: `calc(100vh - ${sizes.header.height + sizes.footer.height}px)`,
                              overflowY: "auto",
                              justifyContent: "flex-start",
                          }
                }
            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        // No mobile empilha: conteúdo primeiro, menu no fim da página.
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "stretch" : "flex-start",
                        justifyContent: "center",
                        gap: isMobile ? sizes.margins[15] : 70,
                    }}
                >
                    <div
                        style={{
                            order: isMobile ? 2 : 1,
                            marginTop: isMobile ? 0 : sizes.margins[15],
                            width: isMobile ? "100%" : "auto",
                        }}
                    >
                        <TermsSidebar />
                    </div>
                    <TermsContainer
                        style={{
                            order: isMobile ? 1 : 2,
                            flex: isMobile ? "none" : 1,
                            maxWidth: isMobile ? "100%" : 900,
                        }}
                    >
                        {error && <Error message={error} />}
                        {loading && <Loading />}
                        {!error && !loading && (
                            <RenderTerms doc={termsOfService!} />
                        )}
                    </TermsContainer>
                </div>
            </Screen>
            <Footer />
        </div>
    );
}
