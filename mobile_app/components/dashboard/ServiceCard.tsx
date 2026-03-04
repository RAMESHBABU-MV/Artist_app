import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ServiceCardProps {
    name: string;
    artist: string;
    price: string;
    duration: string;
    category: string;
    rating: number;
    categoryColor: string;
    onPress?: () => void;
}

export default function ServiceCard({
    name,
    artist,
    price,
    duration,
    category,
    rating,
    categoryColor,
    onPress,
}: ServiceCardProps) {
    return (
        <TouchableOpacity
            className="bg-dark-700 rounded-2xl p-4 mb-3 border border-white/5"
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View className="flex-row items-start gap-x-3">
                {/* Icon */}
                <View
                    className="w-12 h-12 rounded-xl items-center justify-center"
                    style={{ backgroundColor: `${categoryColor}18` }}
                >
                    <Ionicons name="sparkles" size={22} color={categoryColor} />
                </View>

                {/* Content */}
                <View className="flex-1">
                    <Text className="text-white text-sm font-bold" numberOfLines={1}>{name}</Text>
                    <View className="flex-row items-center gap-x-1 mt-1">
                        <Ionicons name="brush-outline" size={11} color="#64748b" />
                        <Text className="text-slate-400 text-xs">{artist}</Text>
                    </View>
                    <View className="flex-row items-center gap-x-3 mt-2">
                        <View
                            className="px-2.5 py-0.5 rounded-full border"
                            style={{
                                backgroundColor: `${categoryColor}12`,
                                borderColor: `${categoryColor}30`,
                            }}
                        >
                            <Text className="text-[10px] font-semibold" style={{ color: categoryColor }}>
                                {category}
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-x-0.5">
                            <Ionicons name="time-outline" size={11} color="#64748b" />
                            <Text className="text-slate-500 text-[10px]">{duration}</Text>
                        </View>
                        <View className="flex-row items-center gap-x-0.5">
                            <Ionicons name="star" size={11} color="#f59e0b" />
                            <Text className="text-slate-400 text-[10px] font-semibold">{rating}</Text>
                        </View>
                    </View>
                </View>

                {/* Price */}
                <View className="items-end">
                    <Text className="text-accent text-base font-extrabold">{price}</Text>
                    <TouchableOpacity
                        className="mt-2 bg-accent/15 px-3 py-1.5 rounded-lg border border-accent/20"
                        activeOpacity={0.7}
                    >
                        <Text className="text-accent text-[10px] font-bold">Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}
