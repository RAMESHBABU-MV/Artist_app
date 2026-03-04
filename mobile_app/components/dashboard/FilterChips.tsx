import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface FilterChipsProps {
    options: string[];
    selected: string;
    onSelect: (val: string) => void;
}

export default function FilterChips({ options, selected, onSelect }: FilterChipsProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            contentContainerStyle={{ gap: 8 }}
        >
            {options.map((opt) => {
                const isActive = selected === opt;
                return (
                    <TouchableOpacity
                        key={opt}
                        className={`px-4 py-2 rounded-full border ${isActive
                                ? "bg-accent/15 border-accent"
                                : "bg-dark-700 border-white/5"
                            }`}
                        onPress={() => onSelect(opt)}
                        activeOpacity={0.7}
                    >
                        <Text
                            className={`text-xs font-semibold ${isActive ? "text-accent" : "text-slate-400"
                                }`}
                        >
                            {opt}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}
