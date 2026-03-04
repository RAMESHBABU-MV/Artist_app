import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BookingCardProps {
    customerName: string;
    serviceName: string;
    artistName: string;
    date: string;
    time: string;
    amount: string;
    status: "Upcoming" | "Confirmed" | "Completed" | "Cancelled" | "Pending";
    onPress?: () => void;
}

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string; icon: string }> = {
    upcoming: { bg: "bg-accent/10", text: "text-accent", dot: "bg-accent", icon: "time-outline" },
    confirmed: { bg: "bg-success/10", text: "text-success", dot: "bg-success", icon: "checkmark-circle-outline" },
    completed: { bg: "bg-info/10", text: "text-info", dot: "bg-info", icon: "checkmark-done-outline" },
    cancelled: { bg: "bg-danger/10", text: "text-danger", dot: "bg-danger", icon: "close-circle-outline" },
    pending: { bg: "bg-warn/10", text: "text-warn", dot: "bg-warn", icon: "hourglass-outline" },
};

export default function BookingCard({
    customerName,
    serviceName,
    artistName,
    date,
    time,
    amount,
    status,
    onPress,
}: BookingCardProps) {
    const config = STATUS_CONFIG[status.toLowerCase()] || STATUS_CONFIG.pending;

    return (
        <TouchableOpacity
            className="bg-dark-700 rounded-2xl p-4 mb-3 border border-white/5"
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Header */}
            <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1 mr-3">
                    <Text className="text-white text-base font-bold" numberOfLines={1}>
                        {serviceName}
                    </Text>
                    <View className="flex-row items-center gap-x-1 mt-1">
                        <Ionicons name="brush-outline" size={12} color="#94a3b8" />
                        <Text className="text-slate-400 text-xs">{artistName}</Text>
                    </View>
                </View>
                <View className={`flex-row items-center gap-x-1.5 px-2.5 py-1 rounded-full ${config.bg}`}>
                    <View className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    <Text className={`text-[10px] font-semibold ${config.text}`}>{status}</Text>
                </View>
            </View>

            {/* Details */}
            <View className="bg-dark-800 rounded-xl p-3 mb-3">
                <View className="flex-row items-center gap-x-4">
                    <View className="flex-row items-center gap-x-1.5 flex-1">
                        <Ionicons name="calendar-outline" size={14} color="#64748b" />
                        <Text className="text-slate-300 text-xs">{date}</Text>
                    </View>
                    <View className="flex-row items-center gap-x-1.5 flex-1">
                        <Ionicons name="time-outline" size={14} color="#64748b" />
                        <Text className="text-slate-300 text-xs">{time}</Text>
                    </View>
                </View>
            </View>

            {/* Footer */}
            <View className="flex-row justify-between items-center">
                <Text className="text-white text-lg font-extrabold">{amount}</Text>
                <View className="flex-row items-center gap-x-1">
                    <Text className="text-accent text-xs font-semibold">View Details</Text>
                    <Ionicons name="chevron-forward" size={14} color="#3b82f6" />
                </View>
            </View>
        </TouchableOpacity>
    );
}
