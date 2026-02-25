import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchFilterBarProps {
    searchValue: string;
    onSearchChange: (text: string) => void;
    placeholder?: string;
    filterOptions?: string[];
    selectedFilter?: string;
    onFilterChange?: (val: string) => void;
    statusOptions?: string[];
    selectedStatus?: string;
    onStatusChange?: (val: string) => void;
}

export default function SearchFilterBar({
    searchValue,
    onSearchChange,
    placeholder = "Search by name or email...",
    filterOptions,
    selectedFilter,
    onFilterChange,
    statusOptions,
    selectedStatus,
    onStatusChange,
}: SearchFilterBarProps) {
    return (
        <View className="mb-4">
            {/* Search */}
            <View className="flex-row items-center bg-dark-600 rounded-xl px-4 py-3 border border-white/5 gap-x-2 mb-3">
                <Ionicons name="search-outline" size={18} color="#64748b" />
                <TextInput
                    className="flex-1 text-slate-200 text-sm"
                    placeholder={placeholder}
                    placeholderTextColor="#64748b"
                    value={searchValue}
                    onChangeText={onSearchChange}
                />
                {searchValue.length > 0 && (
                    <TouchableOpacity onPress={() => onSearchChange("")}>
                        <Ionicons name="close-circle" size={18} color="#64748b" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Filters */}
            {(filterOptions || statusOptions) && (
                <View className="flex-row gap-x-3 flex-wrap gap-y-2">
                    {filterOptions && onFilterChange && (
                        <View className="flex-row gap-x-2 flex-wrap">
                            {filterOptions.map((opt) => (
                                <TouchableOpacity
                                    key={opt}
                                    className={`px-3 py-2 rounded-full border ${selectedFilter === opt
                                        ? "bg-accent/15 border-accent"
                                        : "bg-dark-700 border-white/5"
                                        }`}
                                    onPress={() => onFilterChange(opt)}
                                >
                                    <Text
                                        className={`text-xs font-medium ${selectedFilter === opt ? "text-accent" : "text-slate-400"
                                            }`}
                                    >
                                        {opt}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                    {statusOptions && onStatusChange && (
                        <View className="flex-row gap-x-2 flex-wrap">
                            {statusOptions.map((opt) => (
                                <TouchableOpacity
                                    key={opt}
                                    className={`px-3 py-2 rounded-full border ${selectedStatus === opt
                                        ? "bg-accent/15 border-accent"
                                        : "bg-dark-700 border-white/5"
                                        }`}
                                    onPress={() => onStatusChange(opt)}
                                >
                                    <Text
                                        className={`text-xs font-medium ${selectedStatus === opt ? "text-accent" : "text-slate-400"
                                            }`}
                                    >
                                        {opt}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}
