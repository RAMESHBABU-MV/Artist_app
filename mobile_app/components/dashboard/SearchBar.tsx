import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
    return (
        <View className="flex-row items-center bg-dark-600 rounded-2xl px-4 py-3 border border-white/5 gap-x-2 mb-4">
            <Ionicons name="search-outline" size={18} color="#64748b" />
            <TextInput
                className="flex-1 text-slate-200 text-sm"
                placeholder={placeholder}
                placeholderTextColor="#4a5568"
                value={value}
                onChangeText={onChange}
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChange("")}>
                    <Ionicons name="close-circle" size={18} color="#64748b" />
                </TouchableOpacity>
            )}
        </View>
    );
}
