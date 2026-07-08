import { ScrollView, Text, View, TouchableOpacity, Pressable, ActivityIndicator, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import * as Auth from "@/lib/_core/auth";
import * as Api from "@/lib/_core/api";

export default function ProfileScreen() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      Alert.alert("Login", "Please use the Manus OAuth login flow to sign in");
    } catch (error) {
      Alert.alert("Error", "Failed to initiate login");
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await Api.logout();
            await logout();
            router.replace("/(tabs)");
          } catch (error) {
            Alert.alert("Error", "Failed to logout");
          }
        },
        style: "destructive",
      },
    ]);
  };

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#0a7ea4" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="flex-1 items-center justify-center gap-6">
            <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
              <MaterialIcons name="person" size={40} color="white" />
            </View>

            <View className="items-center gap-2">
              <Text className="text-2xl font-bold text-foreground">Welcome to ServiceHub</Text>
              <Text className="text-sm text-muted text-center">
                Sign in to book services, manage your bookings, and save your preferences
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              className="w-full bg-primary rounded-lg py-4 items-center"
            >
              <Text className="text-white font-bold text-base">Sign In / Register</Text>
            </TouchableOpacity>

            <View className="gap-3 w-full mt-6">
              <Text className="text-sm font-semibold text-foreground">Why sign in?</Text>
              <View className="flex-row gap-2">
                <MaterialIcons name="check-circle" size={20} color="#22C55E" />
                <Text className="text-sm text-muted flex-1">Book services with one tap</Text>
              </View>
              <View className="flex-row gap-2">
                <MaterialIcons name="check-circle" size={20} color="#22C55E" />
                <Text className="text-sm text-muted flex-1">Track your bookings in real-time</Text>
              </View>
              <View className="flex-row gap-2">
                <MaterialIcons name="check-circle" size={20} color="#22C55E" />
                <Text className="text-sm text-muted flex-1">Save favorite providers</Text>
              </View>
              <View className="flex-row gap-2">
                <MaterialIcons name="check-circle" size={20} color="#22C55E" />
                <Text className="text-sm text-muted flex-1">Get personalized recommendations</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-primary px-6 pt-4 pb-8">
          <View className="flex-row items-center gap-4">
            <View className="w-16 h-16 rounded-full bg-white items-center justify-center">
              <MaterialIcons name="person" size={32} color="#0a7ea4" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-white">{user?.name || "User"}</Text>
              <Text className="text-sm text-white opacity-80">{user?.email || "No email"}</Text>
              <Text className="text-sm text-white opacity-80">{user?.loginMethod || "Manus"}</Text>
            </View>
          </View>
        </View>

        {/* Profile Content */}
        <View className="px-6 py-6">
          {/* Account Section */}
          <Text className="text-lg font-bold text-foreground mb-4">Account</Text>

          <View className="bg-surface rounded-2xl overflow-hidden border border-border mb-6">
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="person-outline" size={20} color="#0a7ea4" />
                  <Text className="text-base text-foreground font-semibold">Edit Profile</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="#9BA1A6" />
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="location-on" size={20} color="#0a7ea4" />
                  <Text className="text-base text-foreground font-semibold">Saved Addresses</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="#9BA1A6" />
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="flex-row items-center justify-between px-4 py-4">
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="payment" size={20} color="#0a7ea4" />
                  <Text className="text-base text-foreground font-semibold">Payment Methods</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="#9BA1A6" />
              </View>
            </Pressable>
          </View>

          {/* Settings Section */}
          <Text className="text-lg font-bold text-foreground mb-4">Settings</Text>

          <View className="bg-surface rounded-2xl overflow-hidden border border-border mb-6">
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="notifications" size={20} color="#0a7ea4" />
                  <Text className="text-base text-foreground font-semibold">Notifications</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="#9BA1A6" />
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="security" size={20} color="#0a7ea4" />
                  <Text className="text-base text-foreground font-semibold">Privacy & Security</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="#9BA1A6" />
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="flex-row items-center justify-between px-4 py-4">
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="help" size={20} color="#0a7ea4" />
                  <Text className="text-base text-foreground font-semibold">Help & Support</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="#9BA1A6" />
              </View>
            </Pressable>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-50 border border-red-200 rounded-lg py-4 items-center mt-6"
          >
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="logout" size={20} color="#EF4444" />
              <Text className="text-red-600 font-bold text-base">Logout</Text>
            </View>
          </TouchableOpacity>

          {/* App Info */}
          <View className="items-center gap-1 mt-8">
            <Text className="text-xs text-muted">ServiceHub Egypt v1.0.0</Text>
            <Text className="text-xs text-muted">© 2024 All rights reserved</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
