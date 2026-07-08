import { ScrollView, Text, View, TouchableOpacity, FlatList, Pressable } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ACTIVE_BOOKINGS = [
  {
    id: "1",
    service: "Electrical Repair",
    provider: "Ahmed's Electrical",
    date: "Today",
    time: "2:00 PM",
    status: "confirmed",
    price: "EGP 300",
  },
];

const PAST_BOOKINGS = [
  {
    id: "2",
    service: "Haircut",
    provider: "Style Barber Shop",
    date: "Jul 5, 2026",
    time: "10:00 AM",
    status: "completed",
    price: "EGP 50",
    rating: 5,
  },
  {
    id: "3",
    service: "Plumbing Fix",
    provider: "Professional Plumbing",
    date: "Jul 1, 2026",
    time: "3:00 PM",
    status: "completed",
    price: "EGP 200",
    rating: 4,
  },
];

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "#22C55E";
      case "completed":
        return "#0a7ea4";
      case "cancelled":
        return "#EF4444";
      default:
        return "#F59E0B";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return "Pending";
    }
  };

  const renderActiveBooking = ({ item }: { item: (typeof ACTIVE_BOOKINGS)[0] }) => (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View className="bg-surface rounded-2xl p-4 mb-3 border border-border">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-base font-bold text-foreground">{item.service}</Text>
            <Text className="text-sm text-muted">{item.provider}</Text>
          </View>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: getStatusColor(item.status) + "20" }}
          >
            <Text className="text-xs font-semibold" style={{ color: getStatusColor(item.status) }}>
              {getStatusLabel(item.status)}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-4 mb-3">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="calendar-today" size={16} color="#687076" />
            <Text className="text-sm text-muted">{item.date}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="access-time" size={16} color="#687076" />
            <Text className="text-sm text-muted">{item.time}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-base font-bold text-primary">{item.price}</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity className="flex-1 border border-primary rounded-lg py-2 px-3">
              <Text className="text-primary font-semibold text-sm text-center">Track</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-primary rounded-lg py-2 px-3">
              <Text className="text-white font-semibold text-sm text-center">Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const renderPastBooking = ({ item }: { item: (typeof PAST_BOOKINGS)[0] }) => (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View className="bg-surface rounded-2xl p-4 mb-3 border border-border">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-base font-bold text-foreground">{item.service}</Text>
            <Text className="text-sm text-muted">{item.provider}</Text>
          </View>
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

        <View className="flex-row items-center gap-4 mb-3">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="calendar-today" size={16} color="#687076" />
            <Text className="text-sm text-muted">{item.date}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="access-time" size={16} color="#687076" />
            <Text className="text-sm text-muted">{item.time}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-base font-bold text-primary">{item.price}</Text>
          <TouchableOpacity className="bg-primary rounded-lg py-2 px-4">
            <Text className="text-white font-semibold text-sm">Rebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text className="text-2xl font-bold text-foreground mb-4">My Bookings</Text>

        {/* Tabs */}
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            onPress={() => setActiveTab("active")}
            className={`flex-1 py-3 rounded-lg border ${
              activeTab === "active"
                ? "bg-primary border-primary"
                : "bg-surface border-border"
            }`}
          >
            <Text
              className={`font-semibold text-center text-sm ${
                activeTab === "active" ? "text-white" : "text-foreground"
              }`}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("past")}
            className={`flex-1 py-3 rounded-lg border ${
              activeTab === "past"
                ? "bg-primary border-primary"
                : "bg-surface border-border"
            }`}
          >
            <Text
              className={`font-semibold text-center text-sm ${
                activeTab === "past" ? "text-white" : "text-foreground"
              }`}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bookings List */}
        {activeTab === "active" ? (
          ACTIVE_BOOKINGS.length > 0 ? (
            <FlatList
              data={ACTIVE_BOOKINGS}
              renderItem={renderActiveBooking}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View className="flex-1 items-center justify-center py-12">
              <MaterialIcons name="event-busy" size={48} color="#9BA1A6" />
              <Text className="text-lg font-semibold text-foreground mt-4">No Active Bookings</Text>
              <Text className="text-sm text-muted text-center mt-2">
                Book a service to get started
              </Text>
            </View>
          )
        ) : PAST_BOOKINGS.length > 0 ? (
          <FlatList
            data={PAST_BOOKINGS}
            renderItem={renderPastBooking}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View className="flex-1 items-center justify-center py-12">
            <MaterialIcons name="history" size={48} color="#9BA1A6" />
            <Text className="text-lg font-semibold text-foreground mt-4">No Past Bookings</Text>
            <Text className="text-sm text-muted text-center mt-2">
              Your booking history will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
