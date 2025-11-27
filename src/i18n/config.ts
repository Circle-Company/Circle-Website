export const supportedLanguages = ["en", "pt"] as const;

export type Language = (typeof supportedLanguages)[number];

export const defaultLanguage: Language = "en";

export const LANGUAGE_STORAGE_KEY = "@circle:language";



