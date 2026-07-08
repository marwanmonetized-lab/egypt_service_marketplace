import { ScrollView, Text, View, TouchableOpacity, FlatList, Pressable } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";

// Mock provider data
const PROVIDER_DATA = {
  id: "1",
  name: "Ahmed's Electrical",
  service: "Electrician",
  rating: 4.8,
  reviews: 245,
  price: "EGP 150/hr",
  distance: "2.5 km",
  description:
    "Professional electrician with 10+ years of experience. Specializes in residential and commercial electrical work. Available 24/7 for emergencies.",
  responseTime: "15 minutes",
  completionRate: "98%",
  joinedDate: "Jan 2020",
  services: [
    { id: "1", name: "General Electrical Repair", price: "EGP 150/hr" },
    { id: "2", name: "Wiring Installation", price: "EGP 200/hr" },
    { id: "3", name: "Emergency Service", price: "EGP 250/hr" },
  ],
  availability: [
    { day: "Today", slots: ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"] },
    { day: "Tomorrow", slots: ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
    { day: "Jul 9", slots: ["9:00 AM", "10:00 AM", "1:00 PM", "4:00 PM"] },
  ],
  customerReviews: [
    {
      id: "1",
      author: "Fatima M.",
      rating: 5,
      date: "2 days ago",
      text: "Excellent work! Very professional and on time. Highly recommended.",
    },
    {
      id: "2",
      author: "Hassan K.",
      rating: 5,
      date: "1 week ago",
      text: "Fixed my electrical issue quickly. Great service and fair pricing.",
    },
    {
      id: "3",
      author: "Layla S.",
      rating: 4,
      date: "2 weeks ago",
      text: "Good work, arrived a bit late but the quality was excellent.",
    },
  ]
};

export default function ProviderDetailScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBooking = () => {
    if (selectedService && selectedDay && selectedTime) {
      router.push({
        pathname: "/booking",
        params: {
          providerId: PROVIDER_DATA.id,
          providerName: PROVIDER_DATA.name,
          service: selectedService,
          date: selectedDay,
          time: selectedTime,
        },
      });
    }
  };

  const renderServiceOption = ({ item }: { item: (typeof PROVIDER_DATA.services)[0] }) => (
    <Pressable
      onPress={() => setSelectedService(item.id)}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
    >
      <View
        className={`p-3 rounded-lg mb-2 border ${
          selectedService === item.id
            ? "bg-primary border-primary"
            : "bg-surface border-border"
        }`}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text
              className={`font-semibold ${
                selectedService === item.id ? "text-white" : "text-foreground"
              }`}
            >
              {item.name}
            </Text>
          </View>
          <Text
            className={`font-bold ${
              selectedService === item.id ? "text-white" : "text-primary"
            }`}
          >
            {item.price}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const renderReview = ({ item }: { item: (typeof PROVIDER_DATA.customerReviews)[0] }) => (
    <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="font-semibold text-foreground">{item.author}</Text>
        <View className="flex-row items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <MaterialIcons
              key={i}
              name={i < item.rating ? "star" : "star-outline"}
              size={14}
              color={i < item.rating ? "#FFB800" : "#9BA1A6"}
            />
          ))}
        </View>
      </View>
      <Text className="text-xs text-muted mb-2">{item.date}</Text>
      <Text className="text-sm text-foreground leading-relaxed">{item.text}</Text>
    </View>
  );

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View className="bg-primary px-6 pt-4 pb-6 flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text className="text-white text-xl font-bold flex-1">{PROVIDER_DATA.name}</Text>
        </View>

        <View className="px-6 py-6">
          {/* Provider Info Card */}
          <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
            <View className="flex-row items-start gap-4 mb-4">
              <View className="w-16 h-16 rounded-full bg-primary items-center justify-center">
                <Text className="text-3xl">👨‍🔧</Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-foreground">{PROVIDER_DATA.name}</Text>
                <Text className="text-sm text-muted">{PROVIDER_DATA.service}</Text>
                <View className="flex-row items-center gap-2 mt-2">
                  <MaterialIcons name="star" size={16} color="#FFB800" />
                  <Text className="text-sm font-semibold text-foreground">
                    {PROVIDER_DATA.rating}
                    <Text className="text-xs text-muted"> ({PROVIDER_DATA.reviews})</Text>
                  </Text>
                </View>
              </View>
            </View>

            <Text className="text-sm text-foreground leading-relaxed mb-4">
              {PROVIDER_DATA.description}
            </Text>

            {/* Stats */}
            <View className="flex-row justify-between">
              <View className="flex-1 items-center">
                <Text className="text-xs text-muted mb-1">Response Time</Text>
                <Text className="text-sm font-bold text-foreground">{PROVIDER_DATA.responseTime}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-xs text-muted mb-1">Completion Rate</Text>
                <Text className="text-sm font-bold text-foreground">
                  {PROVIDER_DATA.completionRate}
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-xs text-muted mb-1">Joined</Text>
                <Text className="text-sm font-bold text-foreground">{PROVIDER_DATA.joinedDate}</Text>
              </View>
            </View>
          </View>

          {/* Services Section */}
          <Text className="text-lg font-bold text-foreground mb-3">Select Service</Text>
          <FlatList
            data={PROVIDER_DATA.services}
            renderItem={renderServiceOption}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            className="mb-6"
          />

          {/* Availability Section */}
          {selectedService && (
            <>
              <Text className="text-lg font-bold text-foreground mb-3">Select Date & Time</Text>
              {PROVIDER_DATA.availability.map((daySlot) => (
                <View key={daySlot.day} className="mb-4">
                  <Text className="text-sm font-semibold text-foreground mb-2">{daySlot.day}</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {daySlot.slots.map((time) => (
                      <Pressable
                        key={time}
                        onPress={() => {
                          setSelectedDay(daySlot.day);
                          setSelectedTime(time);
                        }}
                        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                      >
                        <View
                          className={`px-4 py-2 rounded-lg border ${
                            selectedTime === time && selectedDay === daySlot.day
                              ? "bg-primary border-primary"
                              : "bg-surface border-border"
                          }`}
                        >
                          <Text
                            className={`text-sm font-semibold ${
                              selectedTime === time && selectedDay === daySlot.day
                                ? "text-white"
                                : "text-foreground"
                            }`}
                          >
                            {time}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Reviews Section */}
          <Text className="text-lg font-bold text-foreground mb-3 mt-6">Customer Reviews</Text>
          <FlatList
            data={PROVIDER_DATA.customerReviews}
            renderItem={renderReview}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Booking Button */}
      {selectedService && selectedDay && selectedTime && (
        <View className="px-6 pb-6 pt-3 border-t border-border">
          <TouchableOpacity
            onPress={handleBooking}
            className="bg-primary rounded-lg py-4 items-center"
          >
            <Text className="text-white font-bold text-base">Continue to Booking</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScreenContainer>
  );
}
