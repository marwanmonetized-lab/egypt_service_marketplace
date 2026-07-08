import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const bookingId = params.bookingId as string;
  const providerName = params.providerName as string;
  const service = params.service as string;
  const date = params.date as string;
  const time = params.time as string;
  const total = params.total as string;

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <View className="bg-success px-6 pt-8 pb-6 items-center">
          <View className="w-16 h-16 rounded-full bg-white items-center justify-center mb-4">
            <MaterialIcons name="check-circle" size={40} color="#22C55E" />
          </View>
          <Text className="text-2xl font-bold text-white">Booking Confirmed!</Text>
          <Text className="text-sm text-white opacity-80 mt-2">Your service has been scheduled</Text>
        </View>

        <View className="px-6 py-6">
          {/* Booking ID */}
          <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
            <Text className="text-xs text-muted mb-1">Booking ID</Text>
            <Text className="text-lg font-bold text-foreground font-mono">{bookingId}</Text>
          </View>

          {/* Booking Details */}
          <Text className="text-lg font-bold text-foreground mb-3">Booking Details</Text>
          <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
            <View className="gap-4">
              <View className="flex-row items-center gap-3 pb-4 border-b border-border">
                <MaterialIcons name="person" size={20} color="#0a7ea4" />
                <View className="flex-1">
                  <Text className="text-xs text-muted">Provider</Text>
                  <Text className="text-sm font-semibold text-foreground">{providerName}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3 pb-4 border-b border-border">
                <MaterialIcons name="build" size={20} color="#0a7ea4" />
                <View className="flex-1">
                  <Text className="text-xs text-muted">Service</Text>
                  <Text className="text-sm font-semibold text-foreground">{service}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3 pb-4 border-b border-border">
                <MaterialIcons name="calendar-today" size={20} color="#0a7ea4" />
                <View className="flex-1">
                  <Text className="text-xs text-muted">Date</Text>
                  <Text className="text-sm font-semibold text-foreground">{date}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3 pb-4 border-b border-border">
                <MaterialIcons name="access-time" size={20} color="#0a7ea4" />
                <View className="flex-1">
                  <Text className="text-xs text-muted">Time</Text>
                  <Text className="text-sm font-semibold text-foreground">{time}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3">
                <MaterialIcons name="attach-money" size={20} color="#0a7ea4" />
                <View className="flex-1">
                  <Text className="text-xs text-muted">Total Amount</Text>
                  <Text className="text-sm font-bold text-primary">EGP {total}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* What's Next */}
          <Text className="text-lg font-bold text-foreground mb-3">What's Next?</Text>
          <View className="gap-3">
            <View className="flex-row gap-3 p-4 bg-surface rounded-lg border border-border">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                <Text className="text-white font-bold">1</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-foreground">Confirmation Sent</Text>
                <Text className="text-xs text-muted mt-1">
                  Check your email and SMS for booking confirmation
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3 p-4 bg-surface rounded-lg border border-border">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                <Text className="text-white font-bold">2</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-foreground">Track Your Service</Text>
                <Text className="text-xs text-muted mt-1">
                  Monitor provider location and arrival time in real-time
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3 p-4 bg-surface rounded-lg border border-border">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                <Text className="text-white font-bold">3</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-foreground">Complete Payment</Text>
                <Text className="text-xs text-muted mt-1">
                  Pay the provider upon service completion
                </Text>
              </View>
            </View>
          </View>

          {/* Contact Provider */}
          <View className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <View className="flex-row items-start gap-3">
              <MaterialIcons name="info" size={20} color="#0a7ea4" />
              <View className="flex-1">
                <Text className="font-semibold text-foreground">Need to Contact Provider?</Text>
                <Text className="text-xs text-muted mt-1">
                  You can message or call the provider directly from the booking details screen.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="px-6 pb-6 pt-3 border-t border-border gap-3">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/bookings")}
          className="bg-primary rounded-lg py-4 items-center"
        >
          <Text className="text-white font-bold text-base">View My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="border border-primary rounded-lg py-4 items-center"
        >
          <Text className="text-primary font-bold text-base">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
