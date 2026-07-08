import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

type BookingStatus = "pending" | "accepted" | "on_the_way" | "in_progress" | "completed" | "cancelled";

interface BookingTrackingData {
  id: number;
  providerName: string;
  service: string;
  status: BookingStatus;
  bookingDate: string;
  bookingTime: string;
  estimatedArrival?: string;
  providerPhone?: string;
  totalAmount: number;
  paymentStatus: "pending" | "completed";
}

const statusConfig: Record<BookingStatus, { label: string; color: string; icon: string }> = {
  pending: { label: "Waiting for Provider", color: "#F59E0B", icon: "schedule" },
  accepted: { label: "Provider Accepted", color: "#3B82F6", icon: "check-circle" },
  on_the_way: { label: "Provider on the Way", color: "#8B5CF6", icon: "directions" },
  in_progress: { label: "Service in Progress", color: "#10B981", icon: "build" },
  completed: { label: "Service Completed", color: "#22C55E", icon: "task-alt" },
  cancelled: { label: "Booking Cancelled", color: "#EF4444", icon: "cancel" },
};

export default function BookingTrackingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const [booking, setBooking] = useState<BookingTrackingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching booking data
    const mockBooking: BookingTrackingData = {
      id: parseInt(params.bookingId as string) || 1,
      providerName: params.providerName as string || "Ahmed's Electrical",
      service: params.service as string || "Electrical Installation",
      status: "accepted",
      bookingDate: params.date as string || "2024-07-15",
      bookingTime: params.time as string || "14:00",
      estimatedArrival: "14:25",
      providerPhone: "+20 123 456 7890",
      totalAmount: parseFloat(params.total as string) || 165,
      paymentStatus: "completed",
    };
    setBooking(mockBooking);
    setLoading(false);
  }, [params]);

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#0a7ea4" />
      </ScreenContainer>
    );
  }

  if (!booking) {
    return (
      <ScreenContainer className="p-6">
        <Text className="text-lg text-foreground font-bold">Booking not found</Text>
      </ScreenContainer>
    );
  }

  const statusInfo = statusConfig[booking.status];

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary px-6 pt-4 pb-8">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-white">Booking Tracking</Text>
            <View className="w-6" />
          </View>

          {/* Booking ID */}
          <View className="bg-white bg-opacity-20 rounded-lg px-4 py-3">
            <Text className="text-xs text-white opacity-80">Booking ID</Text>
            <Text className="text-xl font-bold text-white">#{booking.id}</Text>
          </View>
        </View>

        {/* Status Section */}
        <View className="px-6 py-6">
          <View className="bg-surface rounded-2xl border border-border overflow-hidden p-6 mb-6">
            <View className="flex-row items-center gap-3 mb-4">
              <View
                className={`w-12 h-12 rounded-full items-center justify-center`}
                style={{ backgroundColor: statusInfo.color }}
              >
                <MaterialIcons name={statusInfo.icon as any} size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-muted">Current Status</Text>
                <Text className="text-lg font-bold text-foreground">{statusInfo.label}</Text>
              </View>
            </View>

            {/* Status Timeline */}
            <View className="mt-4 pt-4 border-t border-border">
              <View className="flex-row items-center gap-3 mb-4">
                <View className="w-2 h-2 rounded-full bg-success" />
                <Text className="text-sm text-foreground">Booking Confirmed</Text>
              </View>
              <View className="flex-row items-center gap-3 mb-4">
                <View className="w-2 h-2 rounded-full bg-success" />
                <Text className="text-sm text-foreground">Provider Accepted</Text>
              </View>
              <View className="flex-row items-center gap-3 mb-4">
                <View className="w-2 h-2 rounded-full bg-warning" />
                <Text className="text-sm text-muted">On the Way</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <View className="w-2 h-2 rounded-full bg-border" />
                <Text className="text-sm text-muted">Service Complete</Text>
              </View>
            </View>
          </View>

          {/* Provider Info */}
          <Text className="text-lg font-bold text-foreground mb-3">Provider Information</Text>
          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            <View className="flex-row items-center gap-4 mb-4">
              <View className="w-16 h-16 rounded-full bg-primary items-center justify-center">
                <MaterialIcons name="person" size={32} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-foreground">{booking.providerName}</Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <MaterialIcons name="star" size={16} color="#F59E0B" />
                  <Text className="text-sm text-foreground font-semibold">4.8 (245 reviews)</Text>
                </View>
              </View>
            </View>

            <View className="border-t border-border pt-4">
              <TouchableOpacity className="flex-row items-center justify-between py-3">
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="call" size={20} color="#0a7ea4" />
                  <Text className="text-base text-foreground font-semibold">Call Provider</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="#9BA1A6" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between py-3 border-t border-border">
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="message" size={20} color="#0a7ea4" />
                  <Text className="text-base text-foreground font-semibold">Message Provider</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="#9BA1A6" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Booking Details */}
          <Text className="text-lg font-bold text-foreground mb-3">Booking Details</Text>
          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            <View className="flex-row justify-between items-center py-3 border-b border-border">
              <Text className="text-sm text-muted">Service</Text>
              <Text className="text-sm font-semibold text-foreground">{booking.service}</Text>
            </View>

            <View className="flex-row justify-between items-center py-3 border-b border-border">
              <Text className="text-sm text-muted">Date</Text>
              <Text className="text-sm font-semibold text-foreground">{booking.bookingDate}</Text>
            </View>

            <View className="flex-row justify-between items-center py-3 border-b border-border">
              <Text className="text-sm text-muted">Time</Text>
              <Text className="text-sm font-semibold text-foreground">{booking.bookingTime}</Text>
            </View>

            {booking.estimatedArrival && (
              <View className="flex-row justify-between items-center py-3">
                <Text className="text-sm text-muted">Estimated Arrival</Text>
                <Text className="text-sm font-semibold text-foreground">{booking.estimatedArrival}</Text>
              </View>
            )}
          </View>

          {/* Payment Summary */}
          <Text className="text-lg font-bold text-foreground mb-3">Payment Summary</Text>
          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            <View className="flex-row justify-between items-center py-2 mb-3">
              <Text className="text-sm text-muted">Service Amount</Text>
              <Text className="text-sm font-semibold text-foreground">EGP {booking.totalAmount * 0.9}</Text>
            </View>

            <View className="flex-row justify-between items-center py-2 mb-3 border-b border-border pb-3">
              <Text className="text-sm text-muted">Tax (10%)</Text>
              <Text className="text-sm font-semibold text-foreground">EGP {booking.totalAmount * 0.1}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-base font-bold text-foreground">Total</Text>
              <Text className="text-lg font-bold text-primary">EGP {booking.totalAmount}</Text>
            </View>

            <View className="mt-3 pt-3 border-t border-border">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="check-circle" size={16} color="#22C55E" />
                <Text className="text-xs text-success font-semibold">Payment {booking.paymentStatus}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="gap-3 mb-6">
            <TouchableOpacity className="bg-surface border border-border rounded-lg py-4 items-center">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="location-on" size={20} color="#0a7ea4" />
                <Text className="text-base font-bold text-primary">Track Location</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-error bg-opacity-10 border border-error rounded-lg py-4 items-center">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="cancel" size={20} color="#EF4444" />
                <Text className="text-base font-bold text-error">Cancel Booking</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
