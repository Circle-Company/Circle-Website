"use client";

import React, { useEffect } from "react";
import type { CSSProperties } from "react";
import { Footer } from "@/sections/footer";
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

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        const prevHtmlOverflowY = html.style.overflowY;
        const prevBodyOverflowY = body.style.overflowY;
        const prevHtmlHeight = html.style.height;
        const prevBodyHeight = body.style.height;
        const prevHtmlMaxHeight = html.style.maxHeight;
        const prevBodyMaxHeight = body.style.maxHeight;

        html.style.overflowY = "auto";
        body.style.overflowY = "auto";
        html.style.height = "auto";
        body.style.height = "auto";
        html.style.maxHeight = "none";
        body.style.maxHeight = "none";

        return () => {
            html.style.overflowY = prevHtmlOverflowY;
            body.style.overflowY = prevBodyOverflowY;
            html.style.height = prevHtmlHeight;
            body.style.height = prevBodyHeight;
            html.style.maxHeight = prevHtmlMaxHeight;
            body.style.maxHeight = prevBodyMaxHeight;
        };
    }, []);

    const pageStyle: CSSProperties = {
        position: "relative",
        width: "100%",
        maxWidth: "100vw",
        height: "auto",
        minHeight: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
    };

    const contentWrapStyle: CSSProperties = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingBlock: isMobile ? sizes.paddings[20] : sizes.paddings[40],
    };

    const contentStyle: CSSProperties = {
        width: "100%",
        maxWidth: 1200,
        paddingInline: isMobile ? sizes.paddings[20] : sizes.paddings[10],
        boxSizing: "border-box",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: isMobile ? sizes.paddings[20] : 70,
    };

    const sidebarWrapStyle: CSSProperties = {
        marginTop: isMobile ? 0 : sizes.margins[15],
    };

    const termsStyle: CSSProperties = {
        flex: 1,
        maxWidth: 900,
    };

    return (
        <div style={pageStyle}>
            <div style={contentWrapStyle}>
                <div style={contentStyle}>
                    {!isMobile && (
                        <div style={sidebarWrapStyle}>
                            <TermsSidebar />
                        </div>
                    )}
                    <TermsContainer style={termsStyle}>
                        {error && <Error message={error} />}
                        {loading && <Loading />}
                        {!error && !loading && (
                            <RenderTerms doc={privacyPolicy!} />
                        )}
                    </TermsContainer>

                    {isMobile && (
                        <div style={sidebarWrapStyle}>
                            <TermsSidebar />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
