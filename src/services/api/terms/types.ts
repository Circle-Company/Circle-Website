import { Language } from "@/i18n/config";

export interface TermsMetadata {
  author: string;
  version: string;
  updatedAt: string;
  language: Language;
}

// Em algumas seções os parágrafos são strings simples,
// em outras são objetos com `text` e `topics`.
export type RawParagraph =
  | string
  | {
      text: string;
      topics: string[];
    };

export interface TermsSection {
  title: string;
  paragraphs: RawParagraph[];
}

export interface TermsDocument {
  metadata: TermsMetadata;
  title: string;
  body: TermsSection[];
}

export interface TermsResponse {
  success: boolean;
  terms: {
    communityGuidelines: TermsDocument;
    privacyPolicy: TermsDocument;
    termsOfService: TermsDocument;
  };
}
