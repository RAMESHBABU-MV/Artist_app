import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ── Mock Data ──
const BOOKINGS = [
    {
        id: "1",
        clientName: "Priya Sharma",
        serviceName: "Bridal Makeup Package",
        date: "Mar 5, 2026",
        time: "9:00 AM",
        duration: "3 hrs",
        location: "Client's Home, Banjara Hills",
        amount: "₹15,000",
        status: "Confirmed" as const,
        notes: "Traditional South Indian bridal look",
        avatarColor: "#a855f7",
    },
    {
        id: "2",
        clientName: "Ananya Verma",
        serviceName: "Party Makeup",
        date: "Mar 5, 2026",
        time: "4:00 PM",
        duration: "1.5 hrs",
        location: "Studio - Jubilee Hills",
        amount: "₹3,500",
        status: "Pending" as const,
        avatarColor: "#f59e0b",
    },
    {
        id: "3",
        clientName: "Meera Patel",
        serviceName: "Pre-Wedding Shoot Makeup",
        date: "Mar 6, 2026",
        time: "6:00 AM",
        duration: "2 hrs",
        location: "Ramoji Film City",
        amount: "₹8,000",
        status: "Confirmed" as const,
        notes: "Outdoor shoot, waterproof products needed",
        avatarColor: "#ec4899",
    },
    {
        id: "4",
        clientName: "Sneha Reddy",
        serviceName: "Engagement Look",
        date: "Mar 8, 2026",
        time: "11:00 AM",
        duration: "2 hrs",
        location: "Taj Falaknuma Palace",
        amount: "₹12,000",
        status: "Confirmed" as const,
        avatarColor: "#22c55e",
    },
    {
        id: "5",
        clientName: "Kavya Singh",
        serviceName: "Hair Styling",
        date: "Feb 28, 2026",
        time: "3:00 PM",
        duration: "1 hr",
        location: "Studio - Jubilee Hills",
        amount: "₹2,500",
        status: "Completed" as const,
        avatarColor: "#3b82f6",
    },
    {
        id: "6",
        clientName: "Ritu Agarwal",
        serviceName: "Natural Makeup",
        date: "Feb 27, 2026",
        time: "10:00 AM",
        duration: "1 hr",
        location: "Client's Home, Madhapur",
        amount: "₹2,000",
        status: "Completed" as const,
        avatarColor: "#06b6d4",
    },
    {
        id: "7",
        clientName: "Deepika Nair",
        serviceName: "Mehendi Function",
        date: "Feb 25, 2026",
        time: "5:00 PM",
        duration: "1.5 hrs",
        location: "Novotel Convention Centre",
        amount: "₹4,500",
        status: "Cancelled" as const,
        avatarColor: "#ef4444",
    },
];

const STATUS_FILTERS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const STATUS_COLORS: Record<string, { text: string; dot: string; bg: string }> = {
    confirmed: { text: "#22c55e", dot: "#22c55e", bg: "rgba(34, 197, 94, 0.1)" },
    pending: { text: "#f59e0b", dot: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" },
    completed: { text: "#06b6d4", dot: "#06b6d4", bg: "rgba(6, 182, 212, 0.1)" },
    cancelled: { text: "#ef4444", dot: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" },
};

const SUMMARY_STATS = [
    {
        label: "Upcoming",
        icon: "calendar-outline" as const,
        color: "#3b82f6",
        count: 3,
    },
    {
        label: "Pending",
        icon: "time-outline" as const,
        color: "#f59e0b",
        count: 2,
    },
    {
        label: "Done",
        icon: "checkmark-done-outline" as const,
        color: "#22c55e",
        count: 2,
    },
];

export default function BookingsScreen() {
    const [statusFilter, setStatusFilter] = useState("All");

    const filtered = useMemo(() => {
        return BOOKINGS.filter((b) => {
            const matchStatus =
                statusFilter === "All" || b.status === statusFilter;
            return matchStatus;
        });
    }, [statusFilter]);

    return (
        <ScrollView className="flex-1 bg-dark-900" showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="light-content" backgroundColor="#0b1120" />

            {/* Header */}
            <View className="px-5 pt-14 pb-2">
                <View className="flex-row justify-between items-start">
                    <View>
                        <Text className="text-white text-2xl font-extrabold">Bookings</Text>
                        <Text className="text-slate-500 text-xs mt-1">
                            {BOOKINGS.length} total appointments
                        </Text>
                    </View>
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-accent items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="add" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Summary Stats */}
            <View className="flex-row mx-5 mt-4 mb-4 gap-x-3">
                {SUMMARY_STATS.map((stat) => (
                    <View
                        key={stat.label}
                        className="flex-1 bg-dark-700 rounded-2xl py-4 items-center border border-white/5"
                    >
                        <Ionicons name={stat.icon} size={22} color={stat.color} />
                        <Text className="text-white text-2xl font-extrabold mt-2">
                            {stat.count}
                        </Text>
                        <Text className="text-slate-500 text-[10px] font-medium mt-1">
                            {stat.label}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Filter Chips */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-5 mb-4"
                contentContainerStyle={{ gap: 8 }}
            >
                {STATUS_FILTERS.map((filter) => {
                    const isActive = statusFilter === filter;
                    const statusConfig = STATUS_COLORS[filter.toLowerCase()];
                    return (
                        <TouchableOpacity
                            key={filter}
                            className={`px-4 py-2 rounded-full border flex-row items-center gap-x-1.5 ${isActive
                                    ? "bg-accent/15 border-accent"
                                    : "bg-dark-700 border-white/5"
                                }`}
                            onPress={() => setStatusFilter(filter)}
                            activeOpacity={0.7}
                        >
                            {filter !== "All" && statusConfig && (
                                <View
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: statusConfig.dot }}
                                />
                            )}
                            {filter === "All" && isActive && (
                                <Ionicons name="checkmark-circle" size={14} color="#3b82f6" />
                            )}
                            <Text
                                className={`text-xs font-semibold ${isActive ? "text-accent" : "text-slate-400"
                                    }`}
                            >
                                {filter}
                            </Text>
                            {filter !== "All" && (
                                <Ionicons name="chevron-down" size={12} color={isActive ? "#3b82f6" : "#64748b"} />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Section Title */}
            <View className="px-5 flex-row justify-between items-center mb-3">
                <Text className="text-white text-base font-bold">All Bookings</Text>
                <Text className="text-slate-500 text-xs">{filtered.length} results</Text>
            </View>

            {/* Booking Cards */}
            <View className="px-5">
                {filtered.length === 0 ? (
                    <View className="items-center justify-center py-16 gap-y-3">
                        <Ionicons name="calendar-outline" size={48} color="#334155" />
                        <Text className="text-slate-500 text-base">No bookings found</Text>
                        <Text className="text-slate-600 text-xs">
                            Try adjusting your filters
                        </Text>
                    </View>
                ) : (
                    filtered.map((booking) => {
                        const config = STATUS_COLORS[booking.status.toLowerCase()] || STATUS_COLORS.pending;
                        return (
                            <TouchableOpacity
                                key={booking.id}
                                className="bg-dark-700 rounded-2xl p-4 mb-3 border border-white/5"
                                style={{
                                    borderLeftWidth: 3,
                                    borderLeftColor: config.dot,
                                }}
                                activeOpacity={0.7}
                            >
                                {/* Header Row */}
                                <View className="flex-row items-center mb-3">
                                    <View
                                        className="w-10 h-10 rounded-full items-center justify-center mr-3"
                                        style={{ backgroundColor: booking.avatarColor }}
                                    >
                                        <Text className="text-white text-xs font-bold">
                                            {booking.clientName.split(" ").map(n => n[0]).join("")}
                                        </Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white text-sm font-bold">
                                            {booking.clientName}
                                        </Text>
                                        <Text className="text-slate-400 text-xs mt-0.5">
                                            {booking.serviceName}
                                        </Text>
                                    </View>
                                    <View
                                        className="flex-row items-center gap-x-1.5 px-2.5 py-1 rounded-full"
                                        style={{ backgroundColor: config.bg }}
                                    >
                                        <View
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ backgroundColor: config.dot }}
                                        />
                                        <Text
                                            className="text-[10px] font-semibold"
                                            style={{ color: config.text }}
                                        >
                                            {booking.status}
                                        </Text>
                                    </View>
                                </View>

                                {/* Date, Time, Duration Row */}
                                <View className="flex-row items-center gap-x-4 mb-2">
                                    <View className="flex-row items-center gap-x-1.5">
                                        <Ionicons name="calendar-outline" size={13} color="#64748b" />
                                        <Text className="text-slate-300 text-xs">{booking.date}</Text>
                                    </View>
                                    <View className="flex-row items-center gap-x-1.5">
                                        <Ionicons name="time-outline" size={13} color="#64748b" />
                                        <Text className="text-slate-300 text-xs">{booking.time}</Text>
                                    </View>
                                    <View className="flex-row items-center gap-x-1.5">
                                        <Ionicons name="hourglass-outline" size={13} color="#64748b" />
                                        <Text className="text-slate-300 text-xs">{booking.duration}</Text>
                                    </View>
                                </View>

                                {/* Location Row */}
                                <View className="flex-row items-center gap-x-1.5 mb-3">
                                    <Ionicons name="location-outline" size={13} color="#64748b" />
                                    <Text className="text-slate-400 text-xs">{booking.location}</Text>
                                </View>

                                {/* Notes (if any) */}
                                {booking.notes && (
                                    <View className="bg-dark-800 rounded-xl px-3 py-2 mb-3 flex-row items-center gap-x-2">
                                        <Ionicons name="document-text-outline" size={13} color="#64748b" />
                                        <Text className="text-slate-500 text-xs flex-1">{booking.notes}</Text>
                                    </View>
                                )}

                                {/* Amount */}
                                <View className="flex-row justify-end">
                                    <Text className="text-accent text-base font-extrabold">
                                        {booking.amount}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                )}
            </View>

            {/* Bottom spacer */}
            <View className="h-24" />
        </ScrollView>
    );
}
