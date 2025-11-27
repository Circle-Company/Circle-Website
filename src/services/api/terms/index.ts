import httpClient from "@/http";
import type { Language } from "@/i18n/config";
import type { TermsResponse } from "./types";

export class TermsService {
  constructor(private readonly http = httpClient) {}

  async getTerms(lang: Language) {
    const { data } = await this.http.get<TermsResponse>(`/terms/${lang}`);
    return data;
  }
}

export const termsService = new TermsService();
