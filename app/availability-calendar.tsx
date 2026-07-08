import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  booked: boolean;
}

interface DayAvailability {
  date: string;
  day: string;
  available: boolean;
  slots: TimeSlot[];
}

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 8; hour < 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      slots.push({
        id: time,
        time,
        available: Math.random() > 0.3,
        booked: Math.random() > 0.7,
      });
    }
  }
  return slots;
};

const generateWeekDays = (): DayAvailability[] => {
  const days: DayAvailability[] = [];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayName = dayNames[date.getDay()];
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    days.push({
      date: dateStr,
      day: dayName,
      available: i > 0 && Math.random() > 0.2,
      slots: generateTimeSlots(),
    });
  }

  return days;
};

export default function AvailabilityCalendarScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [weekDays] = useState(generateWeekDays());
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const providerName = params.providerName as string || "Service Provider";
  const service = params.service as string || "Service";

  const currentDaySlots = weekDays[selectedDate].slots;

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;

    router.push({
      pathname: "/booking",
      params: {
        providerName,
        service,
        date: weekDays[selectedDate].date,
        time: selectedSlot,
      },
    });
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Select Date & Time</Text>
        <View className="w-6" />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Provider Info */}
        <View className="px-6 py-6">
          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            <View className="flex-row items-center gap-3">
              <View className="w-16 h-16 rounded-full bg-primary items-center justify-center">
                <MaterialIcons name="person" size={32} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-foreground">{providerName}</Text>
                <Text className="text-sm text-muted">{service}</Text>
              </View>
            </View>
          </View>

          {/* Date Selection */}
          <Text className="text-lg font-bold text-foreground mb-3">Select Date</Text>
          <FlatList
            horizontal
            data={weekDays}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDate(index);
                  setSelectedSlot(null);
                }}
                className={`mr-2 px-4 py-3 rounded-lg border ${
                  selectedDate === index
                    ? "bg-primary border-primary"
                    : item.available
                      ? "bg-surface border-border"
                      : "bg-gray-100 border-gray-300 opacity-50"
                }`}
                disabled={!item.available}
              >
                <Text
                  className={`text-xs font-semibold ${
                    selectedDate === index ? "text-white" : "text-foreground"
                  }`}
                >
                  {item.day.slice(0, 3)}
                </Text>
                <Text
                  className={`text-sm font-bold ${
                    selectedDate === index ? "text-white" : "text-foreground"
                  }`}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            )}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          />

          {/* Time Slots */}
          <Text className="text-lg font-bold text-foreground mb-3">Select Time</Text>

          <View className="mb-6">
            <View className="flex-row flex-wrap gap-2">
              {currentDaySlots.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  onPress={() => setSelectedSlot(slot.id)}
                  disabled={!slot.available || slot.booked}
                  className={`px-4 py-3 rounded-lg border ${
                    selectedSlot === slot.id
                      ? "bg-primary border-primary"
                      : slot.available && !slot.booked
                        ? "bg-surface border-border"
                        : "bg-gray-100 border-gray-300 opacity-50"
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedSlot === slot.id
                        ? "text-white"
                        : slot.available && !slot.booked
                          ? "text-foreground"
                          : "text-muted"
                    }`}
                  >
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Legend */}
          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            <Text className="text-sm font-bold text-foreground mb-3">Legend</Text>

            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <View className="w-4 h-4 rounded bg-primary" />
                <Text className="text-xs text-foreground">Selected</Text>
              </View>

              <View className="flex-row items-center gap-2">
                <View className="w-4 h-4 rounded bg-surface border border-border" />
                <Text className="text-xs text-foreground">Available</Text>
              </View>

              <View className="flex-row items-center gap-2">
                <View className="w-4 h-4 rounded bg-gray-300" />
                <Text className="text-xs text-muted">Booked</Text>
              </View>
            </View>
          </View>

          {/* Selected Summary */}
          {selectedSlot && (
            <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
              <Text className="text-sm font-bold text-blue-900 mb-2">Booking Summary</Text>
              <View className="gap-1">
                <Text className="text-xs text-blue-800">
                  <Text className="font-semibold">Date:</Text> {weekDays[selectedDate].date}{" "}
                  {weekDays[selectedDate].day}
                </Text>
                <Text className="text-xs text-blue-800">
                  <Text className="font-semibold">Time:</Text> {selectedSlot}
                </Text>
                <Text className="text-xs text-blue-800">
                  <Text className="font-semibold">Provider:</Text> {providerName}
                </Text>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <TouchableOpacity
            onPress={handleConfirmBooking}
            disabled={!selectedSlot}
            className={`${
              selectedSlot ? "bg-primary" : "bg-primary opacity-50"
            } rounded-lg py-4 items-center mb-3`}
          >
            <Text className="text-white font-bold text-base">Continue to Booking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className="border border-border rounded-lg py-4 items-center"
          >
            <Text className="text-foreground font-bold text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
