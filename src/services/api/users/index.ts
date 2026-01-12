import httpClient from "@/http";

import type {
    HttpLike,
    ReportAccountRequest,
    ReportAccountResponse,
    UserAccountReportReasonEnum,
} from "./types";

/**
 * Users API service (scoped).
 *
 * This module intentionally exposes ONLY the endpoint used by the Help > Report Account page:
 * POST `/users/reports`
 */
export class UsersService {
    constructor(private readonly http: HttpLike = httpClient) {}

    /**
     * Report an account by username.
     *
     * Sends JSON payload using the default http client headers.
     *
     * Endpoint: POST `/users/reports`
     */
    async reportAccount(
        payload: ReportAccountRequest,
    ): Promise<ReportAccountResponse> {
        // Ensure the reason sent to the API matches the enum values used by the selector.
        // This also protects against accidental string values coming from other call sites.
        const normalizedPayload: ReportAccountRequest = {
            ...payload,
            reason: payload.reason as UserAccountReportReasonEnum,
        };

        const { data } = await this.http.post<ReportAccountResponse>(
            "site/users/reports",
            normalizedPayload,
        );

        return data;
    }
}

export const usersService = new UsersService();
