"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { usersService } from "@/services/api/users";
import {
    ALLOWED_USER_ACCOUNT_REPORT_REASONS,
    UserAccountReportReasonEnum,
} from "@/services/api/users/types";

import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";
import { Screen } from "@/components/screen";
import { Text } from "@/components/themed";

import { useIsMobile } from "@/hooks/use.platform.detection";
import { useSizes } from "@/constants/sizes";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/buttons/standart.animated";
import { AnimatePresence, motion } from "framer-motion";

type ReportReason = UserAccountReportReasonEnum | null;

/**
 * Denúncia anônima de conta (User Account Report)
 * - Enum centralizado em `src/services/api/users/types.ts`
 */

const ALLOWED_REASONS = ALLOWED_USER_ACCOUNT_REPORT_REASONS;

function hasSelectedReason(
    reason: ReportReason,
): reason is UserAccountReportReasonEnum {
    return reason !== null;
}

type ReportAccountPayload = {
    /**
     * Username do usuário denunciado (input do cliente).
     * O use case resolve para `reportedUserId` internamente.
     */
    username: string;

    /** Motivo principal */
    reason: UserAccountReportReasonEnum;

    /** Detalhe (texto livre). */
    description: string;
};

function reasonLabel(reason: UserAccountReportReasonEnum): string {
    switch (reason) {
        case UserAccountReportReasonEnum.SPAM:
            return "Spam";
        case UserAccountReportReasonEnum.HARASSMENT:
            return "Harassment";
        case UserAccountReportReasonEnum.IMPERSONATION:
            return "Impersonation";
        case UserAccountReportReasonEnum.HATE_SPEECH:
            return "Hate speech";
        case UserAccountReportReasonEnum.VIOLENCE:
            return "Violence";
        case UserAccountReportReasonEnum.SELF_HARM:
            return "Self-harm";
        case UserAccountReportReasonEnum.SCAM:
            return "Scam";
        case UserAccountReportReasonEnum.NUDITY_OR_SEXUAL_CONTENT:
            return "Nudity or sexual content";
        case UserAccountReportReasonEnum.CHILD_SAFETY:
            return "Child safety";
        case UserAccountReportReasonEnum.ILLEGAL_GOODS:
            return "Illegal goods";
        case UserAccountReportReasonEnum.DOXXING_OR_PERSONAL_DATA:
            return "Doxxing or personal data";
        case UserAccountReportReasonEnum.NON_CONSENSUAL_CONTENT:
            return "Non-consensual content";
        case UserAccountReportReasonEnum.FAKE_ACCOUNT:
            return "Fake account";
        case UserAccountReportReasonEnum.UNDERAGE:
            return "Underage";
        case UserAccountReportReasonEnum.BAN_EVASION:
            return "Ban evasion";
        case UserAccountReportReasonEnum.OTHER:
            return "Other";
        default:
            return "Other";
    }
}

function useOnClickOutside(
    ref: React.RefObject<HTMLElement | null>,
    handler: () => void,
    when: boolean,
) {
    React.useEffect(() => {
        if (!when) return;

        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref.current;
            if (!el) return;
            if (event.target instanceof Node && el.contains(event.target))
                return;
            handler();
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler, when]);
}

export default function ReportAccountPage() {
    const { t, atualAppLanguage } = useLanguage();
    const isMobile = useIsMobile();
    const sizes = useSizes();
    const searchParams = useSearchParams();

    const [username, setUsername] = React.useState("");
    const [reason, setReason] = React.useState<ReportReason>(null);
    const [description, setDescription] = React.useState("");

    const [includeMetadata, setIncludeMetadata] = React.useState(true);

    const [status, setStatus] = React.useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [statusMessage, setStatusMessage] = React.useState<string>("");

    const [showReasonDropdown, setShowReasonDropdown] = React.useState(false);
    const reasonDropdownRef = React.useRef<HTMLDivElement | null>(null);

    useOnClickOutside(
        reasonDropdownRef,
        () => setShowReasonDropdown(false),
        showReasonDropdown,
    );

    const sanitizeUsernameInput = (raw: string): string => {
        // allow only: a-z 0-9 _ .
        // (we no longer block consecutive separators or trailing dots/underscores)
        // also force lowercase: usernames must not contain uppercase letters
        let v = raw.toLowerCase().replace(/[^a-z0-9_.]/g, "");

        // allow passing "@username" via query param and still sanitize correctly
        v = v.replace(/^@+/, "");

        // disallow '.' at start (keep this, common constraint and avoids awkward usernames)
        v = v.replace(/^\.+/, "");

        return v;
    };

    const isValidUsername = (value: string): boolean => {
        if (!value) return false;
        if (value.startsWith(".")) return false;
        if (/[^a-z0-9_.]/.test(value)) return false;
        // explicitly reject uppercase if it somehow bypasses sanitize
        if (/[A-Z]/.test(value)) return false;
        return true;
    };

    // Prefill username from URL query param (e.g. /help/report-account?username=john or ?u=john)
    React.useEffect(() => {
        if (!searchParams) return;

        const raw =
            searchParams.get("username") ??
            searchParams.get("u") ??
            searchParams.get("user") ??
            "";

        const prefilled = sanitizeUsernameInput(raw);

        // Only prefill when there's a value and the user hasn't typed yet
        if (prefilled && username.trim() === "") {
            setUsername(prefilled);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const container: React.CSSProperties = {
        width: "100%",
        maxWidth: 980,
        margin: "0 auto",
        paddingInline: isMobile ? sizes.paddings[15] : sizes.paddings[28],
        paddingBlock: isMobile ? sizes.paddings[20] : sizes.paddings[28],
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 12 : 18,
    };

    const card: React.CSSProperties = {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        borderRadius: isMobile ? 18 : 24,
        padding: isMobile ? 16 : 28,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 10 : 14,
    };

    const title: React.CSSProperties = {
        fontFamily: fonts.family.Black,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: isMobile ? fonts.size.title2 * 1.05 : fonts.size.title2 * 1.3,
        lineHeight: 1.05,
        color: colors.gray.white,
        textAlign: isMobile ? "center" : "left",
        margin: 0,
    };

    const subtitle: React.CSSProperties = {
        fontFamily: fonts.family.Semibold ?? fonts.family.Medium,
        fontSize: isMobile
            ? fonts.size.subheadline * 0.95
            : fonts.size.subheadline * 1.05,
        color: colors.gray[4],
        textAlign: isMobile ? "center" : "left",
        maxWidth: isMobile ? "100%" : 820,
        margin: 0,
        lineHeight: 1.5,
    };

    const sectionTitle: React.CSSProperties = {
        fontFamily: fonts.family.Black,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: isMobile ? fonts.size.body : fonts.size.body * 1.15,
        color: colors.gray.white,
        margin: 0,
        textAlign: isMobile ? "center" : "left",
    };

    const label: React.CSSProperties = {
        fontFamily: fonts.family.Semibold ?? fonts.family.Medium,
        fontSize: fonts.size.body,
        color: colors.gray[4],
        margin: 0,
        textAlign: isMobile ? "center" : "left",
    };

    const inputBase: React.CSSProperties = {
        width: "100%",
        borderRadius: 14,
        border: "1px solid rgba(255, 255, 255, 0.10)",
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        color: colors.gray.white,
        paddingInline: 14,
        paddingBlock: 12,
        outline: "none",
        boxSizing: "border-box",
        fontFamily: fonts.family.Semibold ?? fonts.family.Medium,
        fontSize: fonts.size.body * 0.95,
    };

    const dropdownContainer: React.CSSProperties = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginTop: 10,
        marginBottom: 10,
    };

    const dropdownButtonStyle: React.CSSProperties = {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        cursor: "pointer",
        backgroundColor: "#00000000",
        padding: 0,
    };

    const dropdownValuePill: React.CSSProperties = {
        width: "100%",
        borderRadius: 14,
        border: "1px solid rgba(255, 255, 255, 0.10)",
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        paddingInline: 14,
        paddingBlock: 12,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        opacity: showReasonDropdown ? 0.85 : 1,
    };

    const dropdownValueText: React.CSSProperties = {
        fontFamily: fonts.family.Semibold ?? fonts.family.Medium,
        fontSize: fonts.size.body * 0.95,
        color: colors.gray.white,
        textAlign: "left",
        letterSpacing: -0.2,
        margin: 0,
    };

    const chevron: React.CSSProperties = {
        width: 6,
        height: 6,
        borderRight: `2px solid ${colors.gray[4]}`,
        borderBottom: `2px solid ${colors.gray[4]}`,
        transform: showReasonDropdown ? "rotate(-135deg)" : "rotate(45deg)",
        transition: "transform 150ms ease",
        marginTop: showReasonDropdown ? 6 : 0,
        flex: "0 0 auto",
        opacity: 0.9,
    };

    const selectorContainer: React.CSSProperties = {
        top: "calc(100% + 8px)",
        left: 0,
        right: 0,
        zIndex: 200,
        position: "absolute",
        borderRadius: sizes.borderRadius[10] + 4,
        overflow: "hidden",
        backgroundColor: colors.gray.white,
        padding: 6,
        boxShadow: "0 18px 48px rgba(0,0,0,0.45), 0 6px 18px rgba(0,0,0,0.25)",
        border: "1px solid rgba(0,0,0,0.08)",
        minWidth: 150,
    };

    const optionButton: React.CSSProperties = {
        paddingBlock: sizes.paddings[10] * 0.8,
        paddingInline: sizes.paddings[20],
        borderRadius: sizes.borderRadius[10],
        overflow: "hidden",
        border: "none",
        width: "100%",
        textAlign: "left",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    };

    const optionText: React.CSSProperties = {
        alignSelf: "center",
        fontFamily: fonts.family.Semibold,
        fontSize: fonts.size.body * 0.9,
        letterSpacing: -0.4,
    };

    const usernameFieldWrap: React.CSSProperties = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderRadius: 14,
        border: "1px solid rgba(255, 255, 255, 0.10)",
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        paddingInline: 12,
        paddingBlock: 10,
        boxSizing: "border-box",
    };

    const usernameInput: React.CSSProperties = {
        width: "100%",
        border: "none",
        backgroundColor: "transparent",
        color: colors.gray.white,
        outline: "none",
        boxSizing: "border-box",
        fontFamily: fonts.family.Semibold ?? fonts.family.Medium,
        fontSize: fonts.size.body * 0.95,
        paddingBlock: 2,
    };

    const textareaBase: React.CSSProperties = {
        ...inputBase,
        minHeight: 110,
        resize: "vertical",
        lineHeight: 1.5,
        fontFamily: fonts.family.Medium ?? fonts.family.Semibold,
    };

    const helperText: React.CSSProperties = {
        fontFamily: fonts.family.Medium ?? fonts.family.Semibold,
        fontSize: fonts.size.body * 0.82,
        color: colors.gray[4],
        margin: 0,
        lineHeight: 1.45,
        textAlign: isMobile ? "center" : "left",
        opacity: 0.85,
    };

    const row: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 10,
    };

    const buttonRow: React.CSSProperties = {
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 10,
        marginTop: 6,
    };

    const button: React.CSSProperties = {
        width: "100%",
        borderRadius: 999,
        paddingBlock: 14,
        paddingInline: 16,
        border: "none",
        cursor: "pointer",
        backgroundColor: colors.gray.white,
        color: colors.gray.black,
        fontFamily: fonts.family.Black,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: fonts.size.body,
    };

    const buttonSecondary: React.CSSProperties = {
        ...button,
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        color: colors.gray.white,
        border: "1px solid rgba(255, 255, 255, 0.12)",
    };

    const statusBox: React.CSSProperties = {
        borderRadius: 14,
        padding: 12,
        backgroundColor:
            status === "success"
                ? "rgba(98, 255, 171, 0.10)"
                : status === "error"
                  ? "rgba(255, 100, 100, 0.10)"
                  : "rgba(255, 255, 255, 0.06)",
        border:
            status === "success"
                ? "1px solid rgba(98, 255, 171, 0.18)"
                : status === "error"
                  ? "1px solid rgba(255, 100, 100, 0.18)"
                  : "1px solid rgba(255, 255, 255, 0.10)",
        color: colors.gray.white,
    };

    function collectPrivacySafeMetadata(): Record<string, unknown> {
        const locale =
            atualAppLanguage?.code ??
            (typeof navigator !== "undefined" && navigator.language
                ? navigator.language
                : "en");

        const timezone =
            typeof Intl !== "undefined" && Intl.DateTimeFormat
                ? Intl.DateTimeFormat().resolvedOptions().timeZone
                : undefined;

        const screenInfo =
            typeof window !== "undefined" && window.screen
                ? {
                      width: window.screen.width,
                      height: window.screen.height,
                      pixelRatio: window.devicePixelRatio,
                  }
                : undefined;

        // IMPORTANT: To be readable on the client, this must be defined as NEXT_PUBLIC_*
        // in your `.env` (e.g. NEXT_PUBLIC_APP_VERSION=1.2.3).
        const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;

        return {
            client: isMobile ? "mobile_web" : "web",
            appVersion: appVersion ?? undefined,
            locale,
            timezone,
            screen: screenInfo,
            path: typeof window !== "undefined" ? window.location.pathname : "",
            userAgent:
                typeof navigator !== "undefined" ? navigator.userAgent : "",
        };
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const trimmedUsername = username.trim();
        if (!trimmedUsername) {
            setStatus("error");
            setStatusMessage(t("Please enter the username to report."));
            return;
        }

        if (!isValidUsername(trimmedUsername)) {
            setStatus("error");
            setStatusMessage(
                t("Invalid username. Use only letters, numbers, '_' and '.'."),
            );
            return;
        }

        if (trimmedUsername.length < 4) {
            setStatus("error");
            setStatusMessage(
                t("Username needs to be at least 4 characters long."),
            );
            return;
        }

        if (!hasSelectedReason(reason)) {
            setStatus("error");
            setStatusMessage(t("Please choose a reason for the report."));
            return;
        }

        const trimmedDescription = description.trim();
        if (!trimmedDescription) {
            setStatus("error");
            setStatusMessage(t("Please enter a description for the report."));
            return;
        }

        if (trimmedDescription.length < 10) {
            setStatus("error");
            setStatusMessage(
                t("Please enter at least 10 characters in the description."),
            );
            return;
        }

        // Payload (matches the required curl format)
        const requestBody: ReportAccountPayload = {
            username: trimmedUsername,
            reason,
            description: trimmedDescription,
        };

        // Optional privacy-safe metadata (not required by the curl format)
        const metadata: Record<string, unknown> | undefined = includeMetadata
            ? collectPrivacySafeMetadata()
            : undefined;

        setStatus("submitting");
        setStatusMessage("");

        try {
            await usersService.reportAccount(requestBody);

            setStatus("success");
            setStatusMessage(
                t("Thanks. Your report was submitted and will be reviewed."),
            );

            setUsername("");
            setReason(null);
            setDescription("");
        } catch (err: any) {
            const apiMessage =
                err?.response?.data?.message ??
                err?.response?.data?.error ??
                err?.message;

            setStatus("error");
            setStatusMessage(
                apiMessage
                    ? String(apiMessage)
                    : t("We could not submit your report. Please try again."),
            );
        }
    }

    return (
        <div>
            <Header />

            <Screen>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",

                        // Allow scrolling when content exceeds available viewport height
                        minHeight: isMobile
                            ? "auto"
                            : `calc(100vh - ${sizes.header.height}px - ${sizes.footer.height}px)`,
                        maxHeight: isMobile
                            ? "auto"
                            : `calc(100vh - ${sizes.header.height}px - ${sizes.footer.height}px)`,
                        overflowY: isMobile ? "visible" : "auto",
                        overflowX: "hidden",

                        // Hide scroll indicator (while keeping scroll enabled)
                        scrollbarWidth: "none", // Firefox
                        msOverflowStyle: "none", // IE/Edge legacy
                    }}
                >
                    <div
                        style={{
                            ...container,
                            // Hide scrollbars on WebKit browsers (Chrome/Safari)
                        }}
                        className="hide-scrollbar"
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: isMobile ? 8 : 10,
                                alignItems: isMobile ? "center" : "flex-start",
                                textAlign: isMobile ? "center" : "left",
                            }}
                        >
                            <Text as="div" style={title}>
                                {t("Report an account")}
                            </Text>

                            <Text as="p" style={subtitle}>
                                {t(
                                    "Use this form to report an account for review. Please avoid sharing personal data. If you are in danger, contact local emergency services.",
                                )}
                            </Text>

                            <Text as="p" style={helperText}>
                                <Link
                                    href="/help"
                                    style={{
                                        color: colors.gray.white,
                                        textDecoration: "none",
                                        borderBottom:
                                            "1px solid rgba(255,255,255,0.35)",
                                    }}
                                >
                                    {t("Back to Help")}
                                </Link>
                            </Text>
                        </div>

                        <form onSubmit={onSubmit} style={card}>
                            <Text as="div" style={sectionTitle}>
                                {t("Report details")}
                            </Text>

                            <div style={row}>
                                <Text as="div" style={label}>
                                    {t("Username")}
                                </Text>

                                <div style={usernameFieldWrap}>
                                    <Image
                                        src="/icons/svg/@2.svg"
                                        alt=""
                                        width={18}
                                        height={18}
                                        style={{
                                            width: 18,
                                            height: 18,
                                            display: "block",
                                            filter: "invert(1)",
                                            opacity: 0.9,
                                        }}
                                    />

                                    <input
                                        style={usernameInput}
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(
                                                sanitizeUsernameInput(
                                                    e.target.value,
                                                ),
                                            )
                                        }
                                        placeholder={t("e.g. username")}
                                        autoComplete="off"
                                        inputMode="text"
                                    />
                                </div>

                                <Text as="p" style={helperText}>
                                    {t(
                                        "Enter the username of the account being reported (the person you are reporting). Allowed: letters, numbers, '_' and '.'.",
                                    )}
                                </Text>
                            </div>

                            <div style={row}>
                                <Text as="div" style={label}>
                                    {t("Reason")}
                                </Text>

                                <div
                                    ref={reasonDropdownRef}
                                    style={dropdownContainer}
                                >
                                    <Button
                                        action={async () =>
                                            setShowReasonDropdown(
                                                (prev) => !prev,
                                            )
                                        }
                                        animation={{
                                            enabled: true,
                                            tap: {
                                                scale: 0.96,
                                                duration: 0.18,
                                                bounciness: 10,
                                            },
                                            hover: {
                                                scale: 1.0,
                                                scaleDuration: 0,
                                                colorDuration: 0,
                                                backgroundColor: "transparent",
                                                textColor: "inherit",
                                            },
                                        }}
                                        style={dropdownButtonStyle}
                                    >
                                        <div style={dropdownValuePill}>
                                            <Text
                                                as="div"
                                                style={dropdownValueText}
                                            >
                                                {reason === null
                                                    ? t("Select a reason")
                                                    : t(reasonLabel(reason))}
                                            </Text>
                                            <span
                                                aria-hidden="true"
                                                style={chevron}
                                            />
                                        </div>
                                    </Button>

                                    <AnimatePresence>
                                        {showReasonDropdown && (
                                            <motion.div
                                                style={selectorContainer}
                                                initial={{
                                                    opacity: 0,
                                                    y: 8,
                                                    scale: 0.98,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: 8,
                                                    scale: 0.98,
                                                }}
                                                transition={{
                                                    duration: 0.18,
                                                    ease: "easeOut",
                                                }}
                                            >
                                                {ALLOWED_REASONS.map((r) => {
                                                    const isActive =
                                                        r === reason;

                                                    return (
                                                        <button
                                                            key={r}
                                                            type="button"
                                                            onClick={() => {
                                                                setReason(r);
                                                                setShowReasonDropdown(
                                                                    false,
                                                                );
                                                            }}
                                                            style={{
                                                                ...optionButton,
                                                                backgroundColor:
                                                                    isActive
                                                                        ? colors
                                                                              .gray
                                                                              .black
                                                                        : "transparent",
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    ...optionText,
                                                                    color: isActive
                                                                        ? colors
                                                                              .gray
                                                                              .white
                                                                        : colors
                                                                              .gray
                                                                              .black,
                                                                    fontFamily:
                                                                        isActive
                                                                            ? fonts
                                                                                  .family
                                                                                  .Semibold
                                                                            : fonts
                                                                                  .family
                                                                                  .Bold,
                                                                }}
                                                            >
                                                                {t(
                                                                    reasonLabel(
                                                                        r,
                                                                    ),
                                                                )}
                                                            </Text>

                                                            {isActive && (
                                                                <span
                                                                    aria-hidden="true"
                                                                    style={{
                                                                        width: 10,
                                                                        height: 10,
                                                                        borderRadius: 999,
                                                                        backgroundColor:
                                                                            colors
                                                                                .gray
                                                                                .white,
                                                                        opacity: 0.9,
                                                                        flex: "0 0 auto",
                                                                    }}
                                                                />
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <Text as="p" style={helperText}>
                                    {t(
                                        "Choose the main reason for the report. Pick the option that best matches the most serious issue you observed.",
                                    )}
                                </Text>
                            </div>

                            <div style={row}>
                                <Text as="div" style={label}>
                                    {t("Description")}
                                </Text>
                                <textarea
                                    style={textareaBase}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder={t(
                                        "Add helpful context (what happened, where, when). Do not include sensitive personal data.",
                                    )}
                                />
                                <Text as="p" style={helperText}>
                                    {t(
                                        "Why this matters: a clear description helps our team review your report faster and more accurately. Include what happened, where in the app it happened (profile, chat, comments), and when (approximate date/time). Avoid personal/sensitive data.",
                                    )}
                                </Text>
                            </div>

                            {status !== "idle" && (
                                <div style={statusBox}>
                                    <Text
                                        as="p"
                                        style={{
                                            margin: 0,
                                            fontFamily:
                                                fonts.family.Semibold ??
                                                fonts.family.Medium,
                                            fontSize: fonts.size.body * 0.9,
                                            color: colors.gray.white,
                                            textAlign: isMobile
                                                ? "center"
                                                : "left",
                                        }}
                                    >
                                        {status === "submitting"
                                            ? t("Submitting…")
                                            : statusMessage}
                                    </Text>
                                </div>
                            )}

                            <div style={buttonRow}>
                                <button
                                    type="submit"
                                    style={{
                                        ...button,
                                        opacity:
                                            status === "submitting" ? 0.7 : 1,
                                    }}
                                    disabled={status === "submitting"}
                                >
                                    {t("Submit")}
                                </button>

                                {(() => {
                                    const hasAnyInput =
                                        username.trim() !== "" ||
                                        reason !== null ||
                                        description.trim() !== "";

                                    const cancelDisabled =
                                        status === "submitting" || !hasAnyInput;

                                    return (
                                        <Link
                                            href="/help"
                                            aria-disabled={cancelDisabled}
                                            tabIndex={cancelDisabled ? -1 : 0}
                                            style={{
                                                ...buttonSecondary,
                                                textAlign: "center",
                                                textDecoration: "none",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                opacity: cancelDisabled
                                                    ? 0.45
                                                    : 1,
                                                cursor: cancelDisabled
                                                    ? "not-allowed"
                                                    : "pointer",
                                                pointerEvents: cancelDisabled
                                                    ? "none"
                                                    : "auto",
                                            }}
                                        >
                                            {t("Cancel")}
                                        </Link>
                                    );
                                })()}
                            </div>
                        </form>

                        <div style={card}>
                            <Text as="div" style={sectionTitle}>
                                {t("What happens next?")}
                            </Text>
                            <Text as="p" style={subtitle}>
                                {t(
                                    "Our team reviews reports and may take action according to our policies. We may not be able to share the outcome of every report.",
                                )}
                            </Text>

                            <Text as="p" style={helperText}>
                                {t("Prefer email?")}{" "}
                                <Link
                                    href="/contact-us"
                                    style={{
                                        color: colors.gray.white,
                                        textDecoration: "none",
                                        borderBottom:
                                            "1px solid rgba(255,255,255,0.35)",
                                    }}
                                >
                                    {t("Contact us")}
                                </Link>
                                .
                            </Text>
                        </div>
                    </div>
                </div>
            </Screen>

            <Footer />

            {/* Local CSS to hide scrollbars without disabling scroll */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    width: 0px;
                    height: 0px;
                }
                .hide-scrollbar::-webkit-scrollbar-thumb {
                    background: transparent;
                }
                .hide-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
            `}</style>
        </div>
    );
}
