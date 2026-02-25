import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Colors, BorderRadius, FontSizes, FontWeights, Spacing } from "../../constants/theme";
import DashboardScreen from "./DashboardScreen";
import UsersScreen from "./UsersScreen";
import ArtistsScreen from "./ArtistsScreen";
import ServicesScreen from "./ServicesScreen";
import BookingsScreen from "./BookingsScreen";
import ReviewsScreen from "./ReviewsScreen";
import PaymentsScreen from "./PaymentsScreen";

const Drawer = createDrawerNavigator();

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface NavItem {
  name: string;
  label: string;
  icon: IoniconsName;
  component: React.ComponentType<any>;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", label: "Dashboard", icon: "grid-outline", component: DashboardScreen },
  { name: "Users", label: "Users", icon: "people-outline", component: UsersScreen },
  { name: "Artists", label: "Artists", icon: "brush-outline", component: ArtistsScreen },
  { name: "Services", label: "Services", icon: "cut-outline", component: ServicesScreen },
  { name: "Bookings", label: "Bookings", icon: "calendar-outline", component: BookingsScreen },
  { name: "Reviews", label: "Reviews", icon: "star-outline", component: ReviewsScreen },
  { name: "Payments", label: "Payments", icon: "card-outline", component: PaymentsScreen },
];

function CustomDrawerContent(props: any) {
  const { state, navigation } = props;
  const activeRoute = state.routeNames[state.index];

  return (
    <DrawerContentScrollView {...props}
      className="bg-slate-900"
      contentContainerClassName="flex-1 pt-4"
    >
      {/* Brand */}
      <View className="flex-row items-center px-5 pb-5 gap-x-3">
        <View className="w-[42] h-[42] rounded-xl bg-accent/15 items-center justify-center">
          <Ionicons name="color-palette" size={24} color={Colors.accentPrimary} />
        </View>
        <View>
          <Text className="text-white text-lg font-bold tracking-tight">Admin Panel</Text>
          <Text className="text-slate-500 text-[10px] mt-0.5">Makeup Artist App</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-white/5 mx-5 my-3" />

      {/* Nav Items */}
      {NAV_ITEMS.map((item) => {
        const isActive = activeRoute === item.name;
        return (
          <DrawerItem
            key={item.name}
            label={item.label}
            icon={() => (
              <Ionicons
                name={isActive ? (item.icon.replace("-outline", "") as IoniconsName) : item.icon}
                size={20}
                color={isActive ? Colors.accentPrimary : Colors.textSecondary}
              />
            )}
            onPress={() => navigation.navigate(item.name)}
            labelStyle={[
              styles.drawerLabel,
              {
                color: isActive ? Colors.accentPrimary : Colors.textSecondary,
                fontWeight: isActive ? FontWeights.semibold : FontWeights.medium,
              },
            ]}
            style={[
              styles.drawerItem,
              {
                backgroundColor: isActive ? Colors.drawerActive : "transparent",
                borderLeftWidth: isActive ? 3 : 0,
                borderLeftColor: Colors.drawerActiveBorder,
              },
            ]}
          />
        );
      })}

      {/* Spacer */}
      <View className="flex-1 min-h-[20]" />

      {/* Divider */}
      <View className="h-px bg-white/5 mx-5 my-3" />

      {/* User Info */}
      <View className="flex-row items-center px-5 py-3 gap-x-3">
        <View className="w-9 h-9 rounded-full bg-accent items-center justify-center">
          <Text className="text-white font-bold text-sm">A</Text>
        </View>
        <View className="flex-1">
          <Text className="text-white text-xs font-semibold">admin@artistapp.com</Text>
          <Text className="text-slate-500 text-[10px] capitalize">Admin</Text>
        </View>
      </View>

      {/* Settings & Logout */}
      <DrawerItem
        label="Settings"
        icon={() => <Ionicons name="settings-outline" size={20} color={Colors.textSecondary} />}
        onPress={() => { }}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Logout"
        icon={() => <Ionicons name="log-out-outline" size={20} color={Colors.error} />}
        onPress={() => { }}
        labelStyle={[styles.drawerLabel, { color: Colors.error }]}
        style={[styles.drawerItem, styles.drawerItemLast]}
      />
    </DrawerContentScrollView>
  );
}

export default function AdminDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: Colors.textPrimary,
        headerTitleStyle: styles.headerTitle,
        drawerStyle: styles.drawer,
        drawerType: "front",
        overlayColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      {NAV_ITEMS.map((item) => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item.label,
            headerRight: () => (
              <View className="flex-row items-center mr-4">
                <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} className="mr-4" />
                <View className="w-8 h-8 rounded-full bg-accent items-center justify-center mr-2">
                  <Text className="text-white font-bold text-xs">A</Text>
                </View>
              </View>
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}

// ── Styles for React Navigation components (don't support className) ──
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.bgPrimary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontWeight: FontWeights.semibold,
    fontSize: FontSizes.lg,
  },
  drawer: {
    backgroundColor: Colors.drawerBg,
    width: 280,
  },
  drawerItem: {
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.sm,
    marginVertical: 1,
  },
  drawerItemLast: {
    marginBottom: Spacing.lg,
  },
  drawerLabel: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    marginLeft: -4,
  },
});