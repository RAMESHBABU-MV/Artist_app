import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ArtistCardProps {
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    city: string;
    basePrice: string;
    avatarColor: string;
    isAvailable?: boolean;
    onPress?: () => void;
}

export default function ArtistCard({
    name,
    specialty,
    rating,
    reviews,
    city,
    basePrice,
    avatarColor,
    isAvailable = true,
    onPress,
}: ArtistCardProps) {
    return (
        <TouchableOpacity
            className="bg-dark-700 rounded-2xl p-4 mr-4 w-[200] border border-white/5"
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Avatar & Availability */}
            <View className="items-center mb-3">
                <View className="relative">
                    <View
                        className="w-16 h-16 rounded-full items-center justify-center"
                        style={{ backgroundColor: avatarColor }}
                    >
                        <Text className="text-white text-2xl font-bold">
                            {name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    {isAvailable && (
                        <View className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-success border-2 border-dark-700" />
                    )}
                </View>
            </View>

            {/* Info */}
            <Text className="text-white text-sm font-bold text-center" numberOfLines={1}>
                {name}
            </Text>
            <Text className="text-slate-400 text-xs text-center mt-0.5" numberOfLines={1}>
                {specialty}
            </Text>

            {/* Rating */}
            <View className="flex-row items-center justify-center mt-2 gap-x-1">
                <Ionicons name="star" size={12} color="#f59e0b" />
                <Text className="text-white text-xs font-semibold">{rating}</Text>
                <Text className="text-slate-500 text-[10px]">({reviews})</Text>
            </View>

            {/* Location & Price */}
            <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-white/5">
                <View className="flex-row items-center gap-x-1">
                    <Ionicons name="location-outline" size={12} color="#64748b" />
                    <Text className="text-slate-500 text-[10px]">{city}</Text>
                </View>
                <Text className="text-accent text-xs font-bold">{basePrice}</Text>
            </View>
        </TouchableOpacity>
    );
}
