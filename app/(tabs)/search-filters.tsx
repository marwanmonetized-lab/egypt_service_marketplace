import { ScrollView, Text, View, TouchableOpacity, Pressable, TextInput } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { useRouter } from "expo-router";

interface Provider {
  id: number;
  name: string;
  service: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  distance: number;
  image?: string;
}

const mockProviders: Provider[] = [
  {
    id: 1,
    name: "Ahmed's Electrical",
    service: "Electrician",
    rating: 4.8,
    reviewCount: 245,
    pricePerHour: 150,
    distance: 2.5,
  },
  {
    id: 2,
    name: "Professional Plumbing",
    service: "Plumber",
    rating: 4.9,
    reviewCount: 189,
    pricePerHour: 200,
    distance: 1.8,
  },
  {
    id: 3,
    name: "Style Barber Shop",
    service: "Barber",
    rating: 4.7,
    reviewCount: 312,
    pricePerHour: 50,
    distance: 0.9,
  },
  {
    id: 4,
    name: "Chef Mohamed",
    service: "Chef",
    rating: 4.6,
    reviewCount: 156,
    pricePerHour: 300,
    distance: 3.2,
  },
  {
    id: 5,
    name: "Clean Home Services",
    service: "Cleaner",
    rating: 4.5,
    reviewCount: 98,
    pricePerHour: 80,
    distance: 1.5,
  },
];

export default function SearchFiltersScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [maxDistance, setMaxDistance] = useState(10);
  const [sortBy, setSortBy] = useState<"rating" | "price" | "distance">("rating");

  const filteredProviders = mockProviders
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.service.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = p.rating >= minRating;
      const matchesPrice = p.pricePerHour <= maxPrice;
      const matchesDistance = p.distance <= maxDistance;
      return matchesSearch && matchesRating && matchesPrice && matchesDistance;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.pricePerHour - b.pricePerHour;
      if (sortBy === "distance") return a.distance - b.distance;
      return 0;
    });

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-white">Search & Filter</Text>
            <View className="w-6" />
          </View>

          {/* Search Input */}
          <View className="bg-white rounded-lg flex-row items-center px-4 gap-2">
            <MaterialIcons name="search" size={20} color="#9BA1A6" />
            <TextInput
              placeholder="Search services or providers..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 py-3 text-foreground"
              placeholderTextColor="#9BA1A6"
            />
            {searchQuery && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <MaterialIcons name="close" size={20} color="#9BA1A6" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters Section */}
        <View className="px-6 py-6">
          {/* Minimum Rating Filter */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-base font-bold text-foreground">Minimum Rating</Text>
              <View className="flex-row items-center gap-1">
                <MaterialIcons name="star" size={16} color="#F59E0B" />
                <Text className="text-sm font-semibold text-foreground">{minRating.toFixed(1)}</Text>
              </View>
            </View>

            <View className="flex-row gap-2">
              {[0, 3.5, 4.0, 4.5, 5.0].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  onPress={() => setMinRating(rating)}
                  className={`flex-1 py-2 rounded-lg border ${
                    minRating === rating
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`text-center text-sm font-semibold ${
                      minRating === rating ? "text-white" : "text-foreground"
                    }`}
                  >
                    {rating === 0 ? "All" : rating}+
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Maximum Price Filter */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-base font-bold text-foreground">Max Price per Hour</Text>
              <Text className="text-sm font-semibold text-primary">EGP {maxPrice}</Text>
            </View>

            <View className="bg-surface rounded-lg p-4">
              <View className="flex-row justify-between mb-3">
                {[50, 150, 250, 350, 500].map((price) => (
                  <TouchableOpacity
                    key={price}
                    onPress={() => setMaxPrice(price)}
                    className={`px-3 py-2 rounded-lg ${
                      maxPrice === price ? "bg-primary" : "bg-background"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        maxPrice === price ? "text-white" : "text-muted"
                      }`}
                    >
                      {price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Maximum Distance Filter */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-base font-bold text-foreground">Max Distance</Text>
              <Text className="text-sm font-semibold text-primary">{maxDistance} km</Text>
            </View>

            <View className="bg-surface rounded-lg p-4">
              <View className="flex-row justify-between">
                {[1, 3, 5, 7, 10].map((distance) => (
                  <TouchableOpacity
                    key={distance}
                    onPress={() => setMaxDistance(distance)}
                    className={`px-3 py-2 rounded-lg ${
                      maxDistance === distance ? "bg-primary" : "bg-background"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        maxDistance === distance ? "text-white" : "text-muted"
                      }`}
                    >
                      {distance}km
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Sort By */}
          <View className="mb-6">
            <Text className="text-base font-bold text-foreground mb-3">Sort By</Text>

            <View className="bg-surface rounded-2xl overflow-hidden border border-border">
              {(["rating", "price", "distance"] as const).map((option, index) => (
                <Pressable
                  key={option}
                  onPress={() => setSortBy(option)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <View
                    className={`flex-row items-center justify-between px-4 py-4 ${
                      index < 2 ? "border-b border-border" : ""
                    }`}
                  >
                    <Text className="text-base text-foreground font-semibold capitalize">
                      {option === "rating" && "Highest Rated"}
                      {option === "price" && "Lowest Price"}
                      {option === "distance" && "Closest"}
                    </Text>
                    {sortBy === option && (
                      <MaterialIcons name="check" size={20} color="#0a7ea4" />
                    )}
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Results Count */}
          <View className="mb-4">
            <Text className="text-sm text-muted">
              Found {filteredProviders.length} provider{filteredProviders.length !== 1 ? "s" : ""}
            </Text>
          </View>

          {/* Providers List */}
          <View className="gap-3">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <TouchableOpacity
                  key={provider.id}
                  onPress={() => {
                    router.push({
                      pathname: "/(tabs)/provider-detail",
                      params: {
                        providerId: provider.id,
                        name: provider.name,
                        service: provider.service,
                        rating: provider.rating,
                        reviewCount: provider.reviewCount,
                        pricePerHour: provider.pricePerHour,
                        distance: provider.distance,
                      },
                    });
                  }}
                  className="bg-surface rounded-2xl border border-border p-4"
                >
                  <View className="flex-row items-start gap-3">
                    <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
                      <MaterialIcons name="person" size={24} color="white" />
                    </View>

                    <View className="flex-1">
                      <Text className="text-base font-bold text-foreground">{provider.name}</Text>
                      <Text className="text-xs text-muted">{provider.service}</Text>

                      <View className="flex-row items-center gap-3 mt-2">
                        <View className="flex-row items-center gap-1">
                          <MaterialIcons name="star" size={14} color="#F59E0B" />
                          <Text className="text-xs font-semibold text-foreground">
                            {provider.rating} ({provider.reviewCount})
                          </Text>
                        </View>

                        <View className="flex-row items-center gap-1">
                          <MaterialIcons name="location-on" size={14} color="#0a7ea4" />
                          <Text className="text-xs text-muted">{provider.distance} km</Text>
                        </View>
                      </View>
                    </View>

                    <View className="items-end">
                      <Text className="text-base font-bold text-primary">
                        EGP {provider.pricePerHour}/hr
                      </Text>
                      <TouchableOpacity className="mt-2 bg-primary rounded-lg px-3 py-1">
                        <Text className="text-xs font-bold text-white">Book</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="items-center justify-center py-12">
                <MaterialIcons name="search-off" size={48} color="#9BA1A6" />
                <Text className="text-base text-muted font-semibold mt-3">No providers found</Text>
                <Text className="text-sm text-muted text-center mt-1">
                  Try adjusting your filters
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
