import React from "react";
import { View, Text } from "react-native";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: string;
    trendPositive?: boolean;
    accentColor?: string;
}

export default function StatCard({ title, value, icon, trend, trendPositive, accentColor }: StatCardProps) {
    return (
        <View className="bg-dark-700 rounded-2xl p-4 w-[155] mr-3 border border-white/5">
            <View className="flex-row justify-between items-start mb-2">
                <View
                    className="w-10 h-10 rounded-xl items-center justify-center"
                    style={{ backgroundColor: accentColor ? `${accentColor}18` : "rgba(255,255,255,0.05)" }}
                >
                    {icon}
                </View>
                {trend && (
                    <View className={`px-2 py-0.5 rounded-full ${trendPositive ? "bg-success/10" : "bg-danger/10"}`}>
                        <Text className={`text-[10px] font-semibold ${trendPositive ? "text-success" : "text-danger"}`}>
                            {trend}
                        </Text>
                    </View>
                )}
            </View>
            <Text className="text-white text-2xl font-extrabold tracking-tight mt-1">{value}</Text>
            <Text className="text-slate-500 text-xs font-medium mt-1">{title}</Text>
        </View>
    );
}
