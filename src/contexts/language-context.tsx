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

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languagesList: LanguageOption[];
  atualAppLanguage: LanguageOption;
  changeAppLanguage: (code: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

interface LanguageProviderProps {   
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "en" || stored === "pt") {
      setLanguageState(stored);
    }
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
    [language]
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


