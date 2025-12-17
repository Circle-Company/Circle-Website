"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";
import { useLanguage } from "./language-context";
import { termsService } from "@/services/api/terms";
import type { TermsDocument } from "@/services/api/terms/types";

interface TermsState {
    communityGuidelines: TermsDocument | null;
    privacyPolicy: TermsDocument | null;
    termsOfService: TermsDocument | null;
    loading: boolean;
    error: string | null;
}

interface TermsContextType {
    state: TermsState;
    refreshTerms: () => Promise<void>;
    clearError: () => void;
}

const TermsContext = createContext<TermsContextType | undefined>(undefined);

interface TermsProviderProps {
    children: ReactNode;
}

export function TermsProvider({ children }: TermsProviderProps) {
    const { language, t } = useLanguage();
    const [state, setState] = useState<TermsState>({
        communityGuidelines: null,
        privacyPolicy: null,
        termsOfService: null,
        loading: true,
        error: null,
    });

    const loadTerms = useCallback(async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        try {
            const data = await termsService.getTerms(language);
            setState((prev) => ({
                ...prev,
                communityGuidelines: data.terms.communityGuidelines,
                privacyPolicy: data.terms.privacyPolicy,
                termsOfService: data.terms.termsOfService,
                loading: false,
                error: null,
            }));
        } catch (err) {
            console.error("Error loading terms:", err);
            setState((prev) => ({
                ...prev,
                loading: false,
                error: t(
                    "Unable to load terms. Check your internet connection and try again.",
                ),
            }));
        }
    }, [language, t]);

    const refreshTerms = async () => {
        await loadTerms();
    };

    const clearError = () => {
        setState((prev) => ({ ...prev, error: null }));
    };

    useEffect(() => {
        loadTerms();
    }, [loadTerms]);

    const contextValue: TermsContextType = {
        state,
        refreshTerms,
        clearError,
    };

    return (
        <TermsContext.Provider value={contextValue}>
            {children}
        </TermsContext.Provider>
    );
}

export function useTerms() {
    const context = useContext(TermsContext);
    if (context === undefined) {
        throw new Error("useTerms must be used within a TermsProvider");
    }
    return context;
}
