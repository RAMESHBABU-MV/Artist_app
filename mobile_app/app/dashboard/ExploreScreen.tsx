import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../../components/dashboard/SearchBar";

// ── Mock Data ──
const SERVICES = [
    {
        id: "1",
        name: "Bridal Makeup Package",
        description: "Complete bridal makeup with hairstyling, draping & jewellery setting",
        duration: "3 hrs",
        timesBooked: 89,
        price: "₹15,000",
        rating: 4.9,
        iconColor: "#ec4899",
        icon: "heart" as const,
    },
    {
        id: "2",
        name: "Facial & Skin Prep",
        description: "Pre-event skin prep facial with hydration and glow treatment",
        duration: "1.5 hrs",
        timesBooked: 73,
        price: "₹3,000",
        rating: 4.7,
        iconColor: "#22c55e",
        icon: "leaf" as const,
    },
    {
        id: "3",
        name: "Editorial / Fashion Makeup",
        description: "Creative, bold looks for photoshoots, portfolios & fashion shows",
        duration: "2.5 hrs",
        timesBooked: 21,
        price: "₹10,000",
        rating: 4.8,
        iconColor: "#a855f7",
        icon: "diamond" as const,
    },
    {
        id: "4",
        name: "Natural / No-Makeup Look",
        description: "Subtle enhancement for a 'my skin but better' natural glow",
        duration: "1 hr",
        timesBooked: 58,
        price: "₹2,000",
        rating: 4.5,
        iconColor: "#06b6d4",
        icon: "sparkles" as const,
    },
    {
        id: "5",
        name: "Party Makeup",
        description: "Glamorous looks for parties, events & celebrations",
        duration: "1.5 hrs",
        timesBooked: 102,
        price: "₹3,500",
        rating: 4.6,
        iconColor: "#f59e0b",
        icon: "star" as const,
    },
    {
        id: "6",
        name: "Engagement Look",
        description: "Elegant engagement day makeup with soft glam finish",
        duration: "2 hrs",
        timesBooked: 45,
        price: "₹8,000",
        rating: 4.8,
        iconColor: "#3b82f6",
        icon: "ribbon" as const,
    },
    {
        id: "7",
        name: "Hair Styling",
        description: "Professional hairstyling for all occasions - buns, curls & braids",
        duration: "1 hr",
        timesBooked: 67,
        price: "₹2,500",
        rating: 4.4,
        iconColor: "#14b8a6",
        icon: "cut" as const,
    },
    {
        id: "8",
        name: "Mehendi Function Look",
        description: "Vibrant, fun makeup look perfect for mehendi celebrations",
        duration: "1.5 hrs",
        timesBooked: 38,
        price: "₹4,500",
        rating: 4.7,
        iconColor: "#ef4444",
        icon: "flower" as const,
    },
    {
        id: "9",
        name: "Airbrush Makeup",
        description: "Flawless airbrush application for a long-lasting porcelain finish",
        duration: "2 hrs",
        timesBooked: 31,
        price: "₹12,000",
        rating: 4.9,
        iconColor: "#8b5cf6",
        icon: "color-palette" as const,
    },
    {
        id: "10",
        name: "Saree Draping",
        description: "Expert saree draping in multiple styles - Nivi, Bengali, Gujarati",
        duration: "30 min",
        timesBooked: 54,
        price: "₹1,500",
        rating: 4.3,
        iconColor: "#f97316",
        icon: "shirt" as const,
    },
];

function renderStars(rating: number) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<Ionicons key={i} name="star" size={12} color="#f59e0b" />);
        } else if (i === fullStars && hasHalf) {
            stars.push(<Ionicons key={i} name="star-half" size={12} color="#f59e0b" />);
        } else {
            stars.push(<Ionicons key={i} name="star-outline" size={12} color="#f59e0b" />);
        }
    }
    return stars;
}

export default function ExploreScreen() {
    const [search, setSearch] = useState("");

    const filteredServices = useMemo(() => {
        return SERVICES.filter((s) => {
            const q = search.toLowerCase();
            return (
                !q ||
                s.name.toLowerCase().includes(q) ||
                s.description.toLowerCase().includes(q)
            );
        });
    }, [search]);

    return (
        <ScrollView className="flex-1 bg-dark-900" showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="light-content" backgroundColor="#0b1120" />

            {/* Header */}
            <View className="px-5 pt-14 pb-2">
                <View className="flex-row justify-between items-start">
                    <View>
                        <Text className="text-white text-2xl font-extrabold">Services</Text>
                        <Text className="text-slate-500 text-xs mt-1">
                            {SERVICES.length} beauty services offered
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

            {/* Search */}
            <View className="px-5 mt-4">
                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search services..."
                />
            </View>

            {/* Service Cards */}
            <View className="px-5">
                {filteredServices.length === 0 ? (
                    <View className="items-center justify-center py-16 gap-y-3">
                        <Ionicons name="search-outline" size={48} color="#334155" />
                        <Text className="text-slate-500 text-base">No services found</Text>
                    </View>
                ) : (
                    filteredServices.map((service) => (
                        <TouchableOpacity
                            key={service.id}
                            className="bg-dark-700 rounded-2xl p-4 mb-3 border border-white/5"
                            activeOpacity={0.7}
                        >
                            {/* Header Row */}
                            <View className="flex-row items-start gap-x-3 mb-3">
                                <View
                                    className="w-10 h-10 rounded-xl items-center justify-center"
                                    style={{ backgroundColor: `${service.iconColor}18` }}
                                >
                                    <Ionicons name={service.icon} size={20} color={service.iconColor} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white text-sm font-bold">{service.name}</Text>
                                    <Text className="text-slate-400 text-xs mt-0.5" numberOfLines={2}>
                                        {service.description}
                                    </Text>
                                </View>
                            </View>

                            {/* Duration & Times Booked */}
                            <View className="flex-row items-center gap-x-4 mb-3">
                                <View className="flex-row items-center gap-x-1.5">
                                    <Ionicons name="time-outline" size={13} color="#64748b" />
                                    <Text className="text-slate-400 text-xs">{service.duration}</Text>
                                </View>
                                <View className="flex-row items-center gap-x-1.5">
                                    <Ionicons name="calendar-outline" size={13} color="#64748b" />
                                    <Text className="text-slate-400 text-xs">{service.timesBooked} booked</Text>
                                </View>
                            </View>

                            {/* Price & Rating Row */}
                            <View className="flex-row justify-between items-center">
                                <Text className="text-accent text-base font-extrabold">
                                    {service.price}
                                </Text>
                                <View className="flex-row items-center gap-x-2">
                                    <View className="flex-row items-center gap-x-0.5">
                                        {renderStars(service.rating)}
                                    </View>
                                    <Text className="text-slate-400 text-xs font-semibold">
                                        {service.rating}
                                    </Text>
                                    <TouchableOpacity className="flex-row items-center gap-x-1 ml-2">
                                        <Text className="text-accent text-xs font-semibold">View Details</Text>
                                        <Ionicons name="arrow-forward" size={12} color="#3b82f6" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </View>

            {/* Bottom spacer */}
            <View className="h-24" />
        </ScrollView>
    );
}
