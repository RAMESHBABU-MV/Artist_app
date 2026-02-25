import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "../../components/admin/Avatar";
import SectionHeader from "../../components/admin/SectionHeader";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import KPICard from "../../components/admin/KPICard";

const REVIEWS = [
    { id: "1", customer: "Priya Sharma", artist: "Meena K.", rating: 5, comment: "Absolutely stunning bridal look! Meena understood exactly what I wanted.", date: "Feb 20, 2026", service: "Bridal Makeup" },
    { id: "2", customer: "Ananya R.", artist: "Sai Veeranna", rating: 4, comment: "Great party makeup, lasted all night. Would recommend!", date: "Feb 18, 2026", service: "Party Makeup" },
    { id: "3", customer: "Divya M.", artist: "Aishwarya", rating: 5, comment: "Love the hairstyle! Perfect for the occasion.", date: "Feb 15, 2026", service: "Hair Styling" },
    { id: "4", customer: "Kavitha N.", artist: "Meena K.", rating: 3, comment: "Good but took longer than expected. Makeup was nice though.", date: "Feb 12, 2026", service: "Engagement Look" },
    { id: "5", customer: "Deepika S.", artist: "Priya M.", rating: 5, comment: "Beautiful mehendi design. Very intricate and detailed work.", date: "Feb 10, 2026", service: "Mehendi Design" },
];

const RATING_FILTERS = ["All", "5 ★", "4 ★", "3 ★", "2 ★", "1 ★"];

export default function ReviewsScreen() {
    const [search, setSearch] = useState("");
    const [ratingFilter, setRatingFilter] = useState("All");

    const filtered = useMemo(() => {
        return REVIEWS.filter((r) => {
            const q = search.toLowerCase();
            const matchSearch = !q || r.customer.toLowerCase().includes(q) || r.artist.toLowerCase().includes(q);
            const matchRating = ratingFilter === "All" || r.rating === parseInt(ratingFilter.charAt(0));
            return matchSearch && matchRating;
        });
    }, [search, ratingFilter]);

    const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

    const renderStars = (rating: number) =>
        Array.from({ length: 5 }, (_, i) => (
            <Ionicons key={i} name={i < rating ? "star" : "star-outline"} size={14}
                color={i < rating ? "#f59e0b" : "#64748b"} />
        ));

    return (
        <ScrollView className="flex-1 bg-dark-900" contentContainerStyle={{ padding: 20 }}>
            <View className="flex-row items-center gap-x-2 mb-4">
                <Text className="text-slate-500 text-xs">Admin</Text>
                <Ionicons name="chevron-forward" size={14} color="#64748b" />
                <Text className="text-slate-400 text-xs font-medium">Reviews</Text>
            </View>

            <SectionHeader title="Reviews & Ratings" subtitle="Monitor customer feedback and ratings" />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 -mx-5" contentContainerStyle={{ paddingHorizontal: 20 }}>
                <KPICard title="Total Reviews" value={REVIEWS.length}
                    icon={<Ionicons name="chatbubbles" size={18} color="#3b82f6" />} />
                <KPICard title="Avg Rating" value={`★ ${avgRating}`}
                    icon={<Ionicons name="star" size={18} color="#f59e0b" />} />
                <KPICard title="5-Star" value={REVIEWS.filter(r => r.rating === 5).length}
                    icon={<Ionicons name="star" size={18} color="#22c55e" />} />
            </ScrollView>

            <SearchFilterBar searchValue={search} onSearchChange={setSearch}
                placeholder="Search by customer or artist..."
                statusOptions={RATING_FILTERS} selectedStatus={ratingFilter} onStatusChange={setRatingFilter} />

            {filtered.map((review) => (
                <View key={review.id} className="bg-dark-700 rounded-2xl p-4 mb-3 border border-white/5">
                    <View className="flex-row items-start gap-x-3 mb-3">
                        <Avatar name={review.customer} size={40} />
                        <View className="flex-1">
                            <Text className="text-white text-sm font-semibold">{review.customer}</Text>
                            <Text className="text-slate-500 text-xs mt-0.5">{review.service}</Text>
                        </View>
                        <View className="items-end gap-y-1">
                            <View className="flex-row gap-x-0.5">{renderStars(review.rating)}</View>
                            <Text className="text-slate-500 text-[10px]">{review.date}</Text>
                        </View>
                    </View>

                    <View className="bg-dark-800 p-3 rounded-xl mb-3 border-l-[3px] border-l-accent">
                        <Text className="text-slate-400 text-sm italic leading-5">"{review.comment}"</Text>
                    </View>

                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center gap-x-2 bg-accent/15 px-3 py-1 rounded-full">
                            <Ionicons name="brush-outline" size={12} color="#3b82f6" />
                            <Text className="text-accent text-xs font-medium">{review.artist}</Text>
                        </View>
                        <View className="flex-row gap-x-2">
                            <TouchableOpacity className="w-[34] h-[34] rounded-md bg-dark-800 items-center justify-center border border-white/5">
                                <Ionicons name="eye-outline" size={16} color="#94a3b8" />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-[34] h-[34] rounded-md bg-danger/10 items-center justify-center border border-danger/20">
                                <Ionicons name="trash-outline" size={16} color="#ef4444" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}

            <View className="h-10" />
        </ScrollView>
    );
}
