import type { Language } from "@/i18n/config";

/**
 * Users: report-account endpoint types
 *
 * This module is intentionally scoped to the single public endpoint used by:
 * `src/app/help/report-account/page.tsx` -> POST `/users/reports`
 */

/**
 * Canonical reasons supported by the report-account selector and request payload.
 * Keep ALL callers aligned to this list.
 *
 * Note: If your backend uses different literal values, adjust these strings.
 */
export enum UserAccountReportReasonEnum {
    SPAM = "spam",
    HARASSMENT = "harassment",
    IMPERSONATION = "impersonation",
    HATE_SPEECH = "hate_speech",
    VIOLENCE = "violence",
    SELF_HARM = "self_harm",
    SCAM = "scam",
    NUDITY_OR_SEXUAL_CONTENT = "nudity_or_sexual_content",
    CHILD_SAFETY = "child_safety",
    ILLEGAL_GOODS = "illegal_goods",
    DOXXING_OR_PERSONAL_DATA = "doxxing_or_personal_data",
    NON_CONSENSUAL_CONTENT = "non_consensual_content",
    FAKE_ACCOUNT = "fake_account",
    UNDERAGE = "underage",
    BAN_EVASION = "ban_evasion",
    OTHER = "other",
}

/**
 * Canonical reason type used across UI + API.
 * (Alias to make intent explicit.)
 */
export type UserAccountReportReason = UserAccountReportReasonEnum;

/**
 * Canonical, ordered list of allowed reasons.
 * Use this for dropdowns/selectors and for validation.
 */
export const ALLOWED_USER_ACCOUNT_REPORT_REASONS: readonly UserAccountReportReason[] =
    [
        UserAccountReportReasonEnum.SPAM,
        UserAccountReportReasonEnum.HARASSMENT,
        UserAccountReportReasonEnum.IMPERSONATION,
        UserAccountReportReasonEnum.HATE_SPEECH,
        UserAccountReportReasonEnum.VIOLENCE,
        UserAccountReportReasonEnum.SELF_HARM,
        UserAccountReportReasonEnum.SCAM,
        UserAccountReportReasonEnum.NUDITY_OR_SEXUAL_CONTENT,
        UserAccountReportReasonEnum.CHILD_SAFETY,
        UserAccountReportReasonEnum.ILLEGAL_GOODS,
        UserAccountReportReasonEnum.DOXXING_OR_PERSONAL_DATA,
        UserAccountReportReasonEnum.NON_CONSENSUAL_CONTENT,
        UserAccountReportReasonEnum.FAKE_ACCOUNT,
        UserAccountReportReasonEnum.UNDERAGE,
        UserAccountReportReasonEnum.BAN_EVASION,
        UserAccountReportReasonEnum.OTHER,
    ] as const;

export interface ReportAccountRequest {
    /**
     * Username of the reported user (client input).
     * Backend resolves it to an internal user id.
     */
    username: string;

    /** Primary reason */
    reason: UserAccountReportReason;

    /** Free-text details (required by the current UI validation). */
    description: string;
}

/**
 * Backend response envelope (kept permissive).
 * The report-account page reads `message` / `error` on failures.
 */
export interface ReportAccountResponse {
    success: boolean;
    message?: string;
    error?: string;
}

/**
 * Minimal axios-like http interface for this endpoint.
 */
export interface HttpLike {
    post<T>(
        url: string,
        body?: unknown,
        config?: {
            headers?: Record<string, string>;
            params?: Record<string, unknown>;
            withCredentials?: boolean;
        },
    ): Promise<{ data: T }>;
}

/**
 * Helper type for the Accept-Language header usage in the UI.
 * The page currently passes a 2-letter language derived from locale.
 */
export type AcceptLanguage = Language | string;
