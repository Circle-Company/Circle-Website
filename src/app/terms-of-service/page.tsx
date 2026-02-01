"use client";

import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { Screen } from "@/components/screen";
import { TermsContainer } from "@/components/terms.container";
import { Error } from "@/components/error";
import { Loading } from "@/components/loading";
import { RenderTerms } from "@/components/terms.render";
import { useTerms } from "@/contexts/terms-context";

export default function TermsOfServicePage() {
    const { state } = useTerms();
    const { termsOfService, loading, error } = state;

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
                <TermsContainer>
                    {error && <Error message={error} />}
                    {loading && <Loading />}
                    {!error && !loading && (
                        <RenderTerms doc={termsOfService!} />
                    )}
                </TermsContainer>
            </Screen>

            <div
                style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 50,
                }}
            >
                <Footer />
            </div>
        </div>
    );
}
