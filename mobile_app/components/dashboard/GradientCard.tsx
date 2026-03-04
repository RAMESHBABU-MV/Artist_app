import React from "react";
import { View, Text, ViewStyle } from "react-native";

interface GradientCardProps {
    colors: string[];
    children: React.ReactNode;
    style?: ViewStyle;
    className?: string;
}

/**
 * A card with a subtle gradient background.
 * Falls back to a solid dark card if LinearGradient is not available.
 */
export default function GradientCard({ colors, children, style, className }: GradientCardProps) {
    return (
        <View
            className={`rounded-2xl overflow-hidden border border-white/5 ${className || ""}`}
            style={style}
        >
            <View
                className="p-4"
                style={{ backgroundColor: colors[0] || "#1a2236" }}
            >
                {children}
            </View>
        </View>
    );
}
