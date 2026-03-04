import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import BookingsScreen from "./BookingsScreen";
import ExploreScreen from "./ExploreScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface TabConfig {
    name: string;
    label: string;
    component: React.ComponentType<any>;
    icon: IoniconsName;
    activeIcon: IoniconsName;
}

const TABS: TabConfig[] = [
    { name: "Home", label: "Dashboard", component: HomeScreen, icon: "grid-outline", activeIcon: "grid" },
    { name: "Bookings", label: "Bookings", component: BookingsScreen, icon: "calendar-outline", activeIcon: "calendar" },
    { name: "Explore", label: "Services", component: ExploreScreen, icon: "brush-outline", activeIcon: "brush" },
    { name: "Profile", label: "Profile", component: ProfileScreen, icon: "person-outline", activeIcon: "person" },
];

export default function DashboardTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: "#3b82f6",
                tabBarInactiveTintColor: "#64748b",
                tabBarLabelStyle: styles.tabLabel,
                tabBarItemStyle: styles.tabItem,
            }}
        >
            {TABS.map((tab) => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarLabel: tab.label,
                        tabBarIcon: ({ focused, color, size }) => (
                            <View style={focused ? styles.activeIconContainer : undefined}>
                                <Ionicons
                                    name={focused ? tab.activeIcon : tab.icon}
                                    size={22}
                                    color={color}
                                />
                            </View>
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#0f172a",
        borderTopWidth: 1,
        borderTopColor: "rgba(255, 255, 255, 0.06)",
        height: 70,
        paddingBottom: 10,
        paddingTop: 8,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        shadowOpacity: 0,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: "600",
        marginTop: 2,
    },
    tabItem: {
        gap: 2,
    },
    activeIconContainer: {
        backgroundColor: "rgba(59, 130, 246, 0.12)",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 4,
    },
});
