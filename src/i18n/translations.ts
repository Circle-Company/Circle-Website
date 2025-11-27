import type { Language } from "./config";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";

type Messages = Record<string, string>;

const messagesByLanguage: Record<Language, Messages> = {
  en,
  pt,
};

export function getMessage(lang: Language, key: string): string {
  const langMessages = messagesByLanguage[lang] ?? messagesByLanguage.en;
  return langMessages[key] ?? key;
}

