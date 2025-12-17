"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import {
    LANGUAGE_STORAGE_KEY,
    defaultLanguage,
    type Language,
} from "@/i18n/config";
import { getMessage } from "@/i18n/translations";

type LanguageOption = {
    code: Language;
    nativeName: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
    { code: "en", nativeName: "English" },
    { code: "pt", nativeName: "Português" },
];

const SUPPORTED_LANGUAGES: Language[] = ["en", "pt"];

function normalizeNavigatorLanguage(
    lang: string | undefined | null,
): Language | null {
    if (!lang) return null;

    // Exemplos: "pt-BR", "pt", "en-US"
    const base = lang.toLowerCase().split("-")[0];

    if (base === "pt") return "pt";
    if (base === "en") return "en";

    return null;
}

function detectBrowserLanguage(): Language | null {
    if (typeof window === "undefined") return null;

    const nav = window.navigator;

    // Prioriza a lista de linguagens, quando disponível
    const candidates: string[] =
        Array.isArray(nav.languages) && nav.languages.length > 0
            ? nav.languages
            : [nav.language];

    for (const candidate of candidates) {
        const normalized = normalizeNavigatorLanguage(candidate);
        if (normalized && SUPPORTED_LANGUAGES.includes(normalized))
            return normalized;
    }

    return null;
}

interface LanguageContextValue {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    languagesList: LanguageOption[];
    atualAppLanguage: LanguageOption;
    changeAppLanguage: (code: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
    undefined,
);

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguageState] = useState<Language>(defaultLanguage);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // 1) Se houver preferência salva, ela manda
        const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored === "en" || stored === "pt") {
            setLanguageState(stored);
            return;
        }

        // 2) Caso contrário, usa o idioma do navegador (se suportado)
        const detected = detectBrowserLanguage();
        if (detected) {
            setLanguageState(detected);
            window.localStorage.setItem(LANGUAGE_STORAGE_KEY, detected);
            return;
        }

        // 3) Fallback: defaultLanguage (config)
        setLanguageState(defaultLanguage);
    }, []);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);

        if (typeof window !== "undefined") {
            window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        }
    }, []);

    const changeAppLanguage = useCallback(
        (code: Language) => {
            setLanguage(code);
        },
        [setLanguage],
    );

    const t = useCallback(
        (key: string) => {
            return getMessage(language, key);
        },
        [language],
    );

    const atualAppLanguage =
        LANGUAGE_OPTIONS.find((option) => option.code === language) ??
        LANGUAGE_OPTIONS[0];

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t,
                languagesList: LANGUAGE_OPTIONS,
                atualAppLanguage,
                changeAppLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    return context;
}
