import { ScrollView, Text, View, TouchableOpacity, FlatList, Pressable } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Service categories data
const SERVICE_CATEGORIES = [
  { id: "1", name: "Electrician", icon: "electrical-services", color: "#FFB800" },
  { id: "2", name: "Plumber", icon: "plumbing", color: "#2196F3" },
  { id: "3", name: "Barber", icon: "content-cut", color: "#FF6B6B" },
  { id: "4", name: "Chef", icon: "restaurant", color: "#FF9800" },
  { id: "5", name: "Cleaner", icon: "cleaning-services", color: "#4CAF50" },
  { id: "6", name: "Pest Control", icon: "bug-report", color: "#9C27B0" },
  { id: "7", name: "Car Wash", icon: "local-car-wash", color: "#00BCD4" },
  { id: "8", name: "More", icon: "more-horiz", color: "#9E9E9E" },
];

// Featured providers data
const FEATURED_PROVIDERS = [
  {
    id: "1",
    name: "Ahmed's Electrical",
    service: "Electrician",
    rating: 4.8,
    reviews: 245,
    price: "EGP 150/hr",
    distance: "2.5 km",
    image: "👨‍🔧",
  },
  {
    id: "2",
    name: "Professional Plumbing",
    service: "Plumber",
    rating: 4.9,
    reviews: 189,
    price: "EGP 200/hr",
    distance: "1.8 km",
    image: "🔧",
  },
  {
    id: "3",
    name: "Style Barber Shop",
    service: "Barber",
    rating: 4.7,
    reviews: 312,
    price: "EGP 50/cut",
    distance: "0.9 km",
    image: "💈",
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const renderServiceCategory = ({ item }: { item: (typeof SERVICE_CATEGORIES)[0] }) => (
    <Pressable
      onPress={() => setSelectedCategory(item.id)}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View className="items-center gap-2">
        <View
          className="w-16 h-16 rounded-2xl items-center justify-center"
          style={{ backgroundColor: item.color + "20" }}
        >
          <MaterialIcons name={item.icon as any} size={32} color={item.color} />
        </View>
        <Text className="text-xs font-semibold text-foreground text-center">{item.name}</Text>
      </View>
    </Pressable>
  );

  const renderFeaturedProvider = ({ item }: { item: (typeof FEATURED_PROVIDERS)[0] }) => (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View className="bg-surface rounded-2xl p-4 mr-4 w-72 border border-border">
        {/* Provider Header */}
        <View className="flex-row items-center gap-3 mb-3">
          <View className="w-14 h-14 rounded-full bg-primary items-center justify-center">
            <Text className="text-2xl">{item.image}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-foreground">{item.name}</Text>
            <Text className="text-xs text-muted">{item.service}</Text>
          </View>
        </View>

        {/* Rating and Reviews */}
        <View className="flex-row items-center gap-2 mb-3">
          <MaterialIcons name="star" size={16} color="#FFB800" />
          <Text className="text-sm font-semibold text-foreground">
            {item.rating}
            <Text className="text-xs text-muted"> ({item.reviews})</Text>
          </Text>
        </View>

        {/* Price and Distance */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm font-semibold text-primary">{item.price}</Text>
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="location-on" size={14} color="#687076" />
            <Text className="text-xs text-muted">{item.distance}</Text>
          </View>
        </View>

        {/* Book Button */}
        <TouchableOpacity className="bg-primary rounded-lg py-2 items-center">
          <Text className="text-white font-semibold text-sm">Book Now</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="bg-primary px-6 pt-4 pb-6">
          <Text className="text-white text-2xl font-bold mb-1">ServiceHub Egypt</Text>
          <Text className="text-white text-sm opacity-90">Find services near you</Text>
        </View>

        {/* Search Bar */}
        <View className="px-6 pt-4 pb-2">
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <View className="flex-row items-center bg-surface border border-border rounded-lg px-4 py-3 gap-2">
              <MaterialIcons name="search" size={20} color="#687076" />
              <Text className="text-muted text-sm flex-1">Search services...</Text>
            </View>
          </Pressable>
        </View>

        {/* Service Categories */}
        <View className="px-6 py-4">
          <Text className="text-lg font-bold text-foreground mb-4">Services</Text>
          <FlatList
            data={SERVICE_CATEGORIES}
            renderItem={renderServiceCategory}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
          />
        </View>

        {/* Featured Providers Section */}
        <View className="pt-2 pb-6">
          <View className="px-6 mb-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-foreground">Featured Providers</Text>
              <Pressable>
                <Text className="text-primary text-sm font-semibold">See All</Text>
              </Pressable>
            </View>
          </View>

          <FlatList
            data={FEATURED_PROVIDERS}
            renderItem={renderFeaturedProvider}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
        </View>

        {/* How It Works Section */}
        <View className="px-6 py-6 bg-surface mx-6 rounded-2xl mb-6">
          <Text className="text-lg font-bold text-foreground mb-4">How It Works</Text>
          <View className="gap-3">
            <View className="flex-row gap-3">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                <Text className="text-white font-bold text-sm">1</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-foreground text-sm">Browse Services</Text>
                <Text className="text-xs text-muted">Choose from various service categories</Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                <Text className="text-white font-bold text-sm">2</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-foreground text-sm">Select Provider</Text>
                <Text className="text-xs text-muted">Pick the best provider for your needs</Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                <Text className="text-white font-bold text-sm">3</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-foreground text-sm">Book & Pay</Text>
                <Text className="text-xs text-muted">Schedule and pay securely</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
