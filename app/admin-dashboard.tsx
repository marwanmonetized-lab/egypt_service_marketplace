import { ScrollView, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";

interface AdminStats {
  totalUsers: number;
  totalProviders: number;
  totalBookings: number;
  totalRevenue: number;
  completedBookings: number;
  cancelledBookings: number;
  averageRating: number;
  activeNow: number;
}

interface RecentBooking {
  id: number;
  customer: string;
  provider: string;
  service: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
  date: string;
}

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [stats] = useState<AdminStats>({
    totalUsers: 12450,
    totalProviders: 1850,
    totalBookings: 45230,
    totalRevenue: 1250000,
    completedBookings: 43120,
    cancelledBookings: 2110,
    averageRating: 4.7,
    activeNow: 342,
  });

  const [recentBookings] = useState<RecentBooking[]>([
    {
      id: 1,
      customer: "Ahmed Hassan",
      provider: "Ahmed's Electrical",
      service: "Electrical Installation",
      amount: 150,
      status: "completed",
      date: "Today 2:30 PM",
    },
    {
      id: 2,
      customer: "Fatima Mohamed",
      provider: "Professional Plumbing",
      service: "Pipe Repair",
      amount: 200,
      status: "pending",
      date: "Today 3:15 PM",
    },
    {
      id: 3,
      customer: "Omar Ali",
      provider: "Style Barber Shop",
      service: "Haircut",
      amount: 50,
      status: "completed",
      date: "Today 1:45 PM",
    },
  ]);

  const statusColors: Record<string, string> = {
    completed: "#22C55E",
    pending: "#F59E0B",
    cancelled: "#EF4444",
  };

  const statusIcons: Record<string, string> = {
    completed: "check-circle",
    pending: "schedule",
    cancelled: "cancel",
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">Admin Dashboard</Text>
        <TouchableOpacity className="p-2">
          <MaterialIcons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View className="px-6 py-6">
          <Text className="text-lg font-bold text-foreground mb-4">Key Metrics</Text>

          <View className="gap-3 mb-6">
            {/* Revenue Card */}
            <View className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-sm text-white opacity-80">Total Revenue</Text>
                  <Text className="text-3xl font-bold text-white mt-1">
                    EGP {(stats.totalRevenue / 1000).toFixed(0)}K
                  </Text>
                </View>
                <MaterialIcons name="trending-up" size={40} color="white" />
              </View>
            </View>

            {/* Active Users Card */}
            <View className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-sm text-white opacity-80">Active Now</Text>
                  <Text className="text-3xl font-bold text-white mt-1">{stats.activeNow}</Text>
                </View>
                <MaterialIcons name="people" size={40} color="white" />
              </View>
            </View>
          </View>

          {/* Stats Grid */}
          <Text className="text-lg font-bold text-foreground mb-4">Overview</Text>

          <View className="gap-3 mb-6">
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-2xl border border-border p-4">
                <View className="flex-row items-center justify-between mb-2">
                  <MaterialIcons name="person" size={24} color="#0a7ea4" />
                  <Text className="text-xs text-muted">Users</Text>
                </View>
                <Text className="text-2xl font-bold text-foreground">
                  {(stats.totalUsers / 1000).toFixed(1)}K
                </Text>
              </View>

              <View className="flex-1 bg-surface rounded-2xl border border-border p-4">
                <View className="flex-row items-center justify-between mb-2">
                  <MaterialIcons name="build" size={24} color="#0a7ea4" />
                  <Text className="text-xs text-muted">Providers</Text>
                </View>
                <Text className="text-2xl font-bold text-foreground">
                  {(stats.totalProviders / 1000).toFixed(1)}K
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-2xl border border-border p-4">
                <View className="flex-row items-center justify-between mb-2">
                  <MaterialIcons name="calendar-today" size={24} color="#0a7ea4" />
                  <Text className="text-xs text-muted">Bookings</Text>
                </View>
                <Text className="text-2xl font-bold text-foreground">
                  {(stats.totalBookings / 1000).toFixed(1)}K
                </Text>
              </View>

              <View className="flex-1 bg-surface rounded-2xl border border-border p-4">
                <View className="flex-row items-center justify-between mb-2">
                  <MaterialIcons name="star" size={24} color="#F59E0B" />
                  <Text className="text-xs text-muted">Rating</Text>
                </View>
                <Text className="text-2xl font-bold text-foreground">{stats.averageRating}</Text>
              </View>
            </View>
          </View>

          {/* Booking Status */}
          <Text className="text-lg font-bold text-foreground mb-4">Booking Status</Text>

          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            <View className="flex-row justify-between items-center py-3 border-b border-border">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="check-circle" size={20} color="#22C55E" />
                <Text className="text-sm text-foreground">Completed</Text>
              </View>
              <Text className="text-base font-bold text-foreground">
                {stats.completedBookings.toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-3">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="cancel" size={20} color="#EF4444" />
                <Text className="text-sm text-foreground">Cancelled</Text>
              </View>
              <Text className="text-base font-bold text-foreground">
                {stats.cancelledBookings.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Recent Bookings */}
          <Text className="text-lg font-bold text-foreground mb-4">Recent Bookings</Text>

          <View className="bg-surface rounded-2xl border border-border overflow-hidden mb-6">
            {recentBookings.map((booking, index) => (
              <View
                key={booking.id}
                className={`px-4 py-4 ${
                  index < recentBookings.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-foreground">{booking.customer}</Text>
                    <Text className="text-xs text-muted mt-1">{booking.provider}</Text>
                  </View>
                  <View
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: statusColors[booking.status] }}
                  >
                    <MaterialIcons
                      name={statusIcons[booking.status] as any}
                      size={14}
                      color="white"
                    />
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-xs text-muted">{booking.service}</Text>
                  <Text className="text-xs font-bold text-foreground">EGP {booking.amount}</Text>
                </View>

                <Text className="text-xs text-muted mt-2">{booking.date}</Text>
              </View>
            ))}
          </View>

          {/* Management Options */}
          <Text className="text-lg font-bold text-foreground mb-4">Management</Text>

          <View className="gap-3 mb-6">
            <TouchableOpacity className="bg-surface rounded-2xl border border-border p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="person-add" size={24} color="#0a7ea4" />
                <Text className="text-base font-semibold text-foreground">Manage Providers</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#9BA1A6" />
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface rounded-2xl border border-border p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="flag" size={24} color="#0a7ea4" />
                <Text className="text-base font-semibold text-foreground">Handle Disputes</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#9BA1A6" />
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface rounded-2xl border border-border p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="analytics" size={24} color="#0a7ea4" />
                <Text className="text-base font-semibold text-foreground">View Analytics</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#9BA1A6" />
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface rounded-2xl border border-border p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="settings" size={24} color="#0a7ea4" />
                <Text className="text-base font-semibold text-foreground">App Settings</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#9BA1A6" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
