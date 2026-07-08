import { ScrollView, Text, View, TouchableOpacity, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { trpc } from "@/lib/trpc";
import { ActivityIndicator, Alert } from "react-native";
import { useAuth } from "@/hooks/use-auth";
import { processPayment } from "@/lib/payment";

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [specialRequests, setSpecialRequests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | "fawry">("cod");

  const providerName = params.providerName as string;
  const service = params.service as string;
  const date = params.date as string;
  const time = params.time as string;
  const servicePrice = 150; // EGP per hour
  const tax = servicePrice * 0.1;
  const total = servicePrice + tax;

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const createBookingMutation = trpc.bookings.create.useMutation();

  const handleConfirmBooking = async () => {
    if (!user?.id) {
      Alert.alert("Error", "Please log in to make a booking");
      return;
    }

    setIsLoading(true);
    try {
      const bookingId = await createBookingMutation.mutateAsync({
        providerId: parseInt(params.providerId as string) || 1,
        serviceId: parseInt(params.serviceId as string) || 1,
        bookingDate: date,
        bookingTime: time,
        specialRequests,
        paymentMethod,
        totalAmount: Math.round(total * 100),
      });

      const paymentResult = await processPayment({
        bookingId,
        amount: total,
        currency: "EGP",
        description: `Service: ${service}`,
        customerEmail: user.email || "customer@servicehub.com",
        customerPhone: user.name || "20100000000",
        paymentMethod,
      });

      if (!paymentResult.success) {
        Alert.alert("Payment Error", paymentResult.message);
        return;
      }

      router.push({
        pathname: "/booking-confirmation",
        params: {
          bookingId: bookingId.toString(),
          providerName,
          service,
          date,
          time,
          total: total.toString(),
        },
      });
    } catch (error) {
      Alert.alert("Error", "Failed to create booking. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary px-6 pt-4 pb-6 flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text className="text-white text-xl font-bold flex-1">Booking Details</Text>
        </View>

        <View className="px-6 py-6">
          {/* Booking Summary */}
          <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
            <Text className="text-lg font-bold text-foreground mb-4">Booking Summary</Text>

            <View className="gap-3">
              <View className="flex-row justify-between items-center pb-3 border-b border-border">
                <Text className="text-sm text-muted">Provider</Text>
                <Text className="text-sm font-semibold text-foreground">{providerName}</Text>
              </View>

              <View className="flex-row justify-between items-center pb-3 border-b border-border">
                <Text className="text-sm text-muted">Service</Text>
                <Text className="text-sm font-semibold text-foreground">{service}</Text>
              </View>

              <View className="flex-row justify-between items-center pb-3 border-b border-border">
                <Text className="text-sm text-muted">Date</Text>
                <Text className="text-sm font-semibold text-foreground">{date}</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted">Time</Text>
                <Text className="text-sm font-semibold text-foreground">{time}</Text>
              </View>
            </View>
          </View>

          {/* Special Requests */}
          <Text className="text-lg font-bold text-foreground mb-3">Special Requests</Text>
          <View className="bg-surface rounded-lg border border-border mb-6">
            <TextInput
              className="p-4 text-foreground"
              placeholder="Add any special requests or notes..."
              placeholderTextColor="#9BA1A6"
              multiline
              numberOfLines={4}
              value={specialRequests}
              onChangeText={setSpecialRequests}
            />
          </View>

          {/* Pricing */}
          <Text className="text-lg font-bold text-foreground mb-3">Pricing</Text>
          <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
            <View className="flex-row justify-between items-center pb-3 border-b border-border">
              <Text className="text-sm text-muted">Service Fee</Text>
              <Text className="text-sm font-semibold text-foreground">EGP {servicePrice}</Text>
            </View>

            <View className="flex-row justify-between items-center pb-3 border-b border-border mt-3">
              <Text className="text-sm text-muted">Tax (10%)</Text>
              <Text className="text-sm font-semibold text-foreground">EGP {tax.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-border">
              <Text className="text-base font-bold text-foreground">Total</Text>
              <Text className="text-lg font-bold text-primary">EGP {total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Payment Method */}
          <Text className="text-lg font-bold text-foreground mb-3">Payment Method</Text>

          <Pressable
            onPress={() => setPaymentMethod("cod")}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View
              className={`p-4 rounded-lg mb-3 border flex-row items-center gap-3 ${
                paymentMethod === "cod"
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  paymentMethod === "cod"
                    ? "border-white bg-primary"
                    : "border-border"
                }`}
              >
                {paymentMethod === "cod" && (
                  <View className="w-2 h-2 rounded-full bg-white" />
                )}
              </View>
              <View className="flex-1">
                <Text
                  className={`font-semibold ${
                    paymentMethod === "cod" ? "text-white" : "text-foreground"
                  }`}
                >
                  Cash on Delivery
                </Text>
                <Text
                  className={`text-xs ${
                    paymentMethod === "cod" ? "text-white opacity-80" : "text-muted"
                  }`}
                >
                  Pay when service is complete
                </Text>
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => setPaymentMethod("card")}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View
              className={`p-4 rounded-lg mb-3 border flex-row items-center gap-3 ${
                paymentMethod === "card"
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  paymentMethod === "card"
                    ? "border-white bg-primary"
                    : "border-border"
                }`}
              >
                {paymentMethod === "card" && (
                  <View className="w-2 h-2 rounded-full bg-white" />
                )}
              </View>
              <View className="flex-1">
                <Text
                  className={`font-semibold ${
                    paymentMethod === "card" ? "text-white" : "text-foreground"
                  }`}
                >
                  Credit/Debit Card
                </Text>
                <Text
                  className={`text-xs ${
                    paymentMethod === "card" ? "text-white opacity-80" : "text-muted"
                  }`}
                >
                  Secure payment via Paymob
                </Text>
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => setPaymentMethod("fawry")}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View
              className={`p-4 rounded-lg mb-6 border flex-row items-center gap-3 ${
                paymentMethod === "fawry"
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  paymentMethod === "fawry"
                    ? "border-white bg-primary"
                    : "border-border"
                }`}
              >
                {paymentMethod === "fawry" && (
                  <View className="w-2 h-2 rounded-full bg-white" />
                )}
              </View>
              <View className="flex-1">
                <Text
                  className={`font-semibold ${
                    paymentMethod === "fawry" ? "text-white" : "text-foreground"
                  }`}
                >
                  Fawry
                </Text>
                <Text
                  className={`text-xs ${
                    paymentMethod === "fawry" ? "text-white opacity-80" : "text-muted"
                  }`}
                >
                  Pay via Fawry wallet or bill payment
                </Text>
              </View>
            </View>
          </Pressable>

          {/* Terms */}
          <View className="flex-row gap-2 mb-6">
            <MaterialIcons name="info" size={16} color="#0a7ea4" />
            <Text className="text-xs text-muted flex-1 leading-relaxed">
              By confirming, you agree to our Terms of Service and cancellation policy.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View className="px-6 pb-6 pt-3 border-t border-border">
        <TouchableOpacity
          onPress={handleConfirmBooking}
          disabled={isLoading}
          className={`${isLoading ? "bg-primary opacity-50" : "bg-primary"} rounded-lg py-4 items-center`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Confirm Booking</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
