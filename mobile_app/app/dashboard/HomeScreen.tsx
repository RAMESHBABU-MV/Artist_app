import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ── Mock Data ──
const ARTIST_NAME = "Ramesh";

const OVERVIEW_STATS = [
    {
        label: "Total Artists",
        value: "24",
        icon: "people" as const,
        color: "#a855f7",
        borderColor: "#a855f7",
    },
    {
        label: "Bookings",
        value: "128",
        icon: "calendar" as const,
        color: "#3b82f6",
        borderColor: "#3b82f6",
    },
    {
        label: "Services",
        value: "36",
        icon: "brush" as const,
        color: "#22c55e",
        borderColor: "#22c55e",
    },
    {
        label: "Revenue",
        value: "₹42.5K",
        icon: "cash" as const,
        color: "#f59e0b",
        borderColor: "#f59e0b",
    },
];

const RECENT_BOOKINGS = [
    {
        id: "1",
        clientName: "Priya Sharma",
        serviceName: "Bridal Makeup Package",
        amount: "₹15,000",
        status: "Confirmed" as const,
        timeAgo: "2 hours ago",
        avatarColor: "#a855f7",
    },
    {
        id: "2",
        clientName: "Ananya Verma",
        serviceName: "Party Makeup",
        amount: "₹3,500",
        status: "Pending" as const,
        timeAgo: "3 hours ago",
        avatarColor: "#f59e0b",
    },
];

const STATUS_COLORS: Record<string, { text: string; dot: string }> = {
    confirmed: { text: "#22c55e", dot: "#22c55e" },
    pending: { text: "#f59e0b", dot: "#f59e0b" },
    completed: { text: "#06b6d4", dot: "#06b6d4" },
    cancelled: { text: "#ef4444", dot: "#ef4444" },
};

function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning 🌅";
    if (hour < 17) return "Good Afternoon ☀️";
    return "Good Evening 🌙";
}

export default function HomeScreen() {
    return (
        <ScrollView className="flex-1 bg-dark-900" showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="light-content" backgroundColor="#0b1120" />

            {/* ── Header ── */}
            <View className="px-5 pt-14 pb-4">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-slate-400 text-xs">{getGreeting()}</Text>
                        <Text className="text-white text-2xl font-extrabold mt-0.5">
                            Dashboard
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-x-3">
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-dark-700 items-center justify-center border border-white/5">
                            <Ionicons name="notifications-outline" size={20} color="#94a3b8" />
                            <View className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-accent" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-accent items-center justify-center">
                            <Text className="text-white text-sm font-bold">R</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* ── Welcome Banner ── */}
            <View className="mx-5 mb-6 rounded-2xl overflow-hidden" style={{ backgroundColor: "#4a7cf5" }}>
                <View className="p-5">
                    <View className="flex-row justify-between items-start">
                        <View className="flex-1">
                            <Text className="text-white text-lg font-bold">
                                Welcome back! ✨
                            </Text>
                            <Text className="text-white/70 text-xs mt-1">
                                You have 3 new booking requests waiting for your review.
                            </Text>
                            <TouchableOpacity
                                className="mt-3 bg-white/20 self-start px-4 py-2 rounded-lg flex-row items-center gap-x-1"
                                activeOpacity={0.7}
                            >
                                <Text className="text-white text-xs font-bold">View Requests</Text>
                                <Ionicons name="arrow-forward" size={14} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View className="w-14 h-14 rounded-2xl bg-white/10 items-center justify-center ml-3">
                            <Ionicons name="sparkles" size={28} color="#fff" />
                        </View>
                    </View>
                </View>
                {/* Gradient overlay at bottom */}
                <View style={{
                    height: 6,
                    backgroundColor: "rgba(0,0,0,0.1)",
                }} />
            </View>

            {/* ── Overview ── */}
            <View className="px-5 mb-6">
                <Text className="text-white text-base font-bold mb-3">Overview</Text>
                {OVERVIEW_STATS.map((stat) => (
                    <View
                        key={stat.label}
                        className="bg-dark-700 rounded-2xl p-4 mb-3 border-l-4 flex-row items-center gap-x-4"
                        style={{
                            borderLeftColor: stat.borderColor,
                            borderTopWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                            borderTopColor: "rgba(255,255,255,0.05)",
                            borderRightColor: "rgba(255,255,255,0.05)",
                            borderBottomColor: "rgba(255,255,255,0.05)",
                        }}
                    >
                        <View
                            className="w-10 h-10 rounded-xl items-center justify-center"
                            style={{ backgroundColor: `${stat.color}18` }}
                        >
                            <Ionicons name={stat.icon} size={20} color={stat.color} />
                        </View>
                        <View>
                            <Text className="text-slate-400 text-xs">{stat.label}</Text>
                            <Text className="text-white text-xl font-extrabold mt-0.5">
                                {stat.value}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* ── Recent Bookings ── */}
            <View className="px-5 mb-6">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-white text-base font-bold">Recent Bookings</Text>
                    <TouchableOpacity className="flex-row items-center gap-x-1">
                        <Text className="text-accent text-xs font-semibold">View All</Text>
                        <Ionicons name="chevron-forward" size={14} color="#3b82f6" />
                    </TouchableOpacity>
                </View>
                {RECENT_BOOKINGS.map((booking) => {
                    const statusConfig = STATUS_COLORS[booking.status.toLowerCase()] || STATUS_COLORS.pending;
                    return (
                        <TouchableOpacity
                            key={booking.id}
                            className="bg-dark-700 rounded-2xl p-4 mb-3 border border-white/5"
                            activeOpacity={0.7}
                        >
                            <View className="flex-row items-center">
                                {/* Avatar */}
                                <View
                                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                                    style={{ backgroundColor: booking.avatarColor }}
                                >
                                    <Text className="text-white text-sm font-bold">
                                        {booking.clientName.split(" ").map(n => n[0]).join("")}
                                    </Text>
                                </View>
                                {/* Info */}
                                <View className="flex-1">
                                    <Text className="text-white text-sm font-semibold">
                                        {booking.clientName}
                                    </Text>
                                    <Text className="text-slate-400 text-xs mt-0.5">
                                        {booking.serviceName}
                                    </Text>
                                </View>
                                {/* Amount & Status */}
                                <View className="items-end">
                                    <Text className="text-white text-sm font-extrabold">
                                        {booking.amount}
                                    </Text>
                                    <View className="flex-row items-center gap-x-1 mt-1">
                                        <View
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ backgroundColor: statusConfig.dot }}
                                        />
                                        <Text
                                            className="text-xs font-semibold"
                                            style={{ color: statusConfig.text }}
                                        >
                                            {booking.status}
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center gap-x-1 mt-0.5">
                                        <Ionicons name="time-outline" size={10} color="#64748b" />
                                        <Text className="text-slate-500 text-[10px]">
                                            {booking.timeAgo}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Bottom spacer for tab bar */}
            <View className="h-24" />
        </ScrollView>
    );
}
