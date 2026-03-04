// === Dashboard Theme for Makeup Artist Booking App ===

export const Colors = {
    // Background
    bgPrimary: "#0b1120",
    bgSecondary: "#111827",
    bgCard: "#1a2236",
    bgCardHover: "#1e293b",
    bgInput: "#1e293b",

    // Accent
    accentPrimary: "#3b82f6",
    accentSecondary: "#60a5fa",
    accentDark: "#1d4ed8",
    accentGlow: "rgba(59, 130, 246, 0.15)",

    // Text
    textPrimary: "#f1f5f9",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    textWhite: "#ffffff",

    // Status
    success: "#22c55e",
    successBg: "rgba(34, 197, 94, 0.12)",
    error: "#ef4444",
    errorBg: "rgba(239, 68, 68, 0.12)",
    warning: "#f59e0b",
    warningBg: "rgba(245, 158, 11, 0.12)",
    info: "#06b6d4",
    infoBg: "rgba(6, 182, 212, 0.12)",

    // Borders & Dividers
    border: "rgba(255, 255, 255, 0.06)",
    borderLight: "rgba(255, 255, 255, 0.1)",
    divider: "rgba(255, 255, 255, 0.04)",

    // Tab Bar
    tabBarBg: "#0f172a",
    tabBarActive: "#3b82f6",
    tabBarInactive: "#64748b",
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

export const BorderRadius = {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 18,
    xxl: 24,
    round: 999,
};

export const FontSizes = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    xxxl: 28,
    hero: 36,
};

export const FontWeights = {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
};

// Avatar color presets (for initials-based avatars)
export const AvatarColors = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#a855f7",
    "#06b6d4",
    "#ef4444",
    "#ec4899",
    "#14b8a6",
];

export const getAvatarColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AvatarColors[Math.abs(hash) % AvatarColors.length];
};
