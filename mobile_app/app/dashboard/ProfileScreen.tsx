import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ── Mock Data ──
const ARTIST = {
    name: "Divya",
    title: "Professional Makeup Artist",
    location: "Bangalore, India",
    bio: "Certified bridal & fashion makeup artist with 6+ years of experience. Specializing in HD airbrush, traditional & modern bridal looks.",
    completion: 85,
    email: "divya.artist@gmail.com",
    phone: "+91 98765 43210",
    bookings: 128,
    rating: 5,
    reviews: 96,
    experience: "6 yrs",
};

export default function ProfileScreen() {
    return (
        <ScrollView className="flex-1 bg-dark-900" showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="light-content" backgroundColor="#0b1120" />

            {/* Header */}
            <View className="px-5 pt-14 pb-2 flex-row justify-between items-center">
                <Text className="text-white text-2xl font-extrabold">Profile</Text>
                <TouchableOpacity className="w-10 h-10 rounded-xl bg-dark-700 items-center justify-center border border-white/5">
                    <Ionicons name="settings-sharp" size={20} color="#94a3b8" />
                </TouchableOpacity>
            </View>

            {/* Profile Info Card */}
            <View className="mx-5 mt-4 bg-dark-700 rounded-2xl p-5 border border-white/5">
                <View className="flex-row items-center gap-x-4 mb-4">
                    <View className="relative">
                        <View className="w-16 h-16 rounded-full bg-accent/20 items-center justify-center border-2 border-accent/40">
                            <Text className="text-accent text-2xl font-bold">{ARTIST.name.charAt(0)}</Text>
                        </View>
                        <View className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-accent items-center justify-center border-2 border-dark-700">
                            <Ionicons name="checkmark" size={12} color="white" />
                        </View>
                    </View>
                    <View className="flex-1">
                        <Text className="text-white text-xl font-bold">{ARTIST.name}</Text>
                        <Text className="text-accent text-xs font-semibold">{ARTIST.title}</Text>
                        <View className="flex-row items-center gap-x-1 mt-0.5">
                            <Ionicons name="location-sharp" size={12} color="#64748b" />
                            <Text className="text-slate-500 text-xs">{ARTIST.location}</Text>
                        </View>
                    </View>
                </View>

                <Text className="text-slate-400 text-xs leading-5 mb-4">
                    {ARTIST.bio}
                </Text>

                {/* Profile Completion */}
                <View className="mb-4">
                    <View className="flex-row justify-between items-center mb-1.5">
                        <Text className="text-slate-500 text-[10px] font-bold uppercase">Profile Completion</Text>
                        <Text className="text-accent text-[10px] font-bold">{ARTIST.completion}%</Text>
                    </View>
                    <View className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
                        <View
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${ARTIST.completion}%` }}
                        />
                    </View>
                </View>

                {/* Quick Info */}
                <View className="gap-y-2">
                    <View className="flex-row items-center gap-x-2">
                        <View className="w-7 h-7 rounded-lg bg-dark-800 items-center justify-center">
                            <Ionicons name="mail-outline" size={14} color="#3b82f6" />
                        </View>
                        <Text className="text-slate-300 text-xs">{ARTIST.email}</Text>
                    </View>
                    <View className="flex-row items-center gap-x-2">
                        <View className="w-7 h-7 rounded-lg bg-dark-800 items-center justify-center">
                            <Ionicons name="call-outline" size={14} color="#3b82f6" />
                        </View>
                        <Text className="text-slate-300 text-xs">{ARTIST.phone}</Text>
                    </View>
                </View>
            </View>

            {/* Badges Row */}
            <View className="flex-row mx-5 mt-4 gap-x-2">
                {[
                    { label: "Top Rated", icon: "ribbon", color: "#f59e0b" },
                    { label: "Verified", icon: "shield-checkmark", color: "#3b82f6" },
                    { label: "Quick Responder", icon: "time", color: "#22c55e" },
                ].map((badge) => (
                    <View
                        key={badge.label}
                        className="flex-1 bg-dark-700/50 rounded-xl py-3 items-center border border-white/5 flex-row justify-center gap-x-1.5"
                    >
                        <Ionicons name={badge.icon as any} size={14} color={badge.color} />
                        <Text className="text-slate-400 text-[9px] font-bold">{badge.label}</Text>
                    </View>
                ))}
            </View>

            {/* Stats Row */}
            <View className="mx-5 mt-4 bg-dark-700 rounded-2xl p-5 border border-white/5 flex-row justify-around">
                <View className="items-center">
                    <Text className="text-white text-xl font-extrabold">{ARTIST.bookings}</Text>
                    <Text className="text-slate-500 text-[10px] font-medium mt-0.5">Bookings</Text>
                </View>
                <View className="w-px h-8 bg-white/5 self-center" />
                <View className="items-center">
                    <View className="flex-row items-center gap-x-1">
                        <Text className="text-white text-xl font-extrabold">{ARTIST.rating}</Text>
                        <Ionicons name="star" size={14} color="#f59e0b" />
                    </View>
                    <Text className="text-slate-500 text-[10px] font-medium mt-0.5">{ARTIST.reviews} reviews</Text>
                </View>
                <View className="w-px h-8 bg-white/5 self-center" />
                <View className="items-center">
                    <Text className="text-white text-xl font-extrabold">{ARTIST.experience}</Text>
                    <Text className="text-slate-500 text-[10px] font-medium mt-0.5">Experience</Text>
                </View>
            </View>

            {/* Account Section */}
            <View className="mx-5 mt-6">
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">Account</Text>
                <View className="bg-dark-700 rounded-2xl overflow-hidden border border-white/5">
                    <TouchableOpacity className="flex-row items-center p-4 gap-x-3 border-b border-white/5">
                        <View className="w-9 h-9 rounded-xl bg-accent/10 items-center justify-center">
                            <Ionicons name="person-sharp" size={18} color="#3b82f6" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white text-sm font-semibold">Edit Profile</Text>
                            <Text className="text-slate-500 text-[10px]">Update your personal details</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#334155" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center p-4 gap-x-3 border-b border-white/5">
                        <View className="w-9 h-9 rounded-xl bg-purple-500/10 items-center justify-center">
                            <Ionicons name="images-sharp" size={18} color="#a855f7" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white text-sm font-semibold">Portfolio</Text>
                            <Text className="text-slate-500 text-[10px]">Manage your work gallery</Text>
                        </View>
                        <View className="bg-purple-500/20 px-2 py-0.5 rounded-lg mr-2">
                            <Text className="text-purple-400 text-[10px] font-bold">24</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#334155" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center p-4 gap-x-3">
                        <View className="w-9 h-9 rounded-xl bg-green-500/10 items-center justify-center">
                            <Ionicons name="ribbon-sharp" size={18} color="#22c55e" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white text-sm font-semibold">Certifications</Text>
                            <Text className="text-slate-500 text-[10px]">Your qualifications & training</Text>
                        </View>
                        <View className="bg-green-500/20 px-2 py-0.5 rounded-lg mr-2">
                            <Text className="text-green-400 text-[10px] font-bold">3</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#334155" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Business Section */}
            <View className="mx-5 mt-5">
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">Business</Text>
                <View className="bg-dark-700 rounded-2xl overflow-hidden border border-white/5">
                    <TouchableOpacity className="flex-row items-center p-4 gap-x-3">
                        <View className="w-9 h-9 rounded-xl bg-orange-500/10 items-center justify-center">
                            <Ionicons name="wallet-sharp" size={18} color="#f59e0b" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white text-sm font-semibold">Earnings</Text>
                            <Text className="text-slate-500 text-[10px]">View income & payouts</Text>
                        </View>
                        <View className="bg-orange-500/20 px-2 py-0.5 rounded-lg mr-2">
                            <Text className="text-orange-400 text-[10px] font-bold">₹42.5K</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#334155" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom spacer */}
            <View className="h-24" />
        </ScrollView>
    );
}
