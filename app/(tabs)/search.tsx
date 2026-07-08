import { ScrollView, Text, View, TouchableOpacity, FlatList, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PROVIDERS = [
  {
    id: "1",
    name: "Ahmed's Electrical",
    service: "Electrician",
    rating: 4.8,
    reviews: 245,
    price: "EGP 150/hr",
    distance: "2.5 km",
  },
  {
    id: "2",
    name: "Professional Plumbing",
    service: "Plumber",
    rating: 4.9,
    reviews: 189,
    price: "EGP 200/hr",
    distance: "1.8 km",
  },
  {
    id: "3",
    name: "Style Barber Shop",
    service: "Barber",
    rating: 4.7,
    reviews: 312,
    price: "EGP 50/cut",
    distance: "0.9 km",
  },
  {
    id: "4",
    name: "Chef Mohamed",
    service: "Chef",
    rating: 4.9,
    reviews: 156,
    price: "EGP 300/meal",
    distance: "3.2 km",
  },
  {
    id: "5",
    name: "Clean Home Services",
    service: "Cleaner",
    rating: 4.6,
    reviews: 198,
    price: "EGP 100/hr",
    distance: "1.5 km",
  },
];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(PROVIDERS);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredProviders(PROVIDERS);
    } else {
      const filtered = PROVIDERS.filter(
        (provider) =>
          provider.name.toLowerCase().includes(text.toLowerCase()) ||
          provider.service.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProviders(filtered);
    }
  };

  const renderProviderCard = ({ item }: { item: (typeof PROVIDERS)[0] }) => (
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
            <Text className="text-base font-bold text-foreground">{item.name}</Text>
            <Text className="text-sm text-muted">{item.service}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="star" size={16} color="#FFB800" />
            <Text className="text-sm font-semibold text-foreground">{item.rating}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-primary">{item.price}</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <MaterialIcons name="location-on" size={14} color="#687076" />
              <Text className="text-xs text-muted">{item.distance}</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-primary rounded-lg px-4 py-2">
            <Text className="text-white font-semibold text-sm">Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text className="text-2xl font-bold text-foreground mb-4">Search Services</Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-surface border border-border rounded-lg px-4 py-3 gap-2 mb-6">
          <MaterialIcons name="search" size={20} color="#687076" />
          <TextInput
            className="flex-1 text-foreground"
            placeholder="Search by service or provider..."
            placeholderTextColor="#9BA1A6"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        {/* Results */}
        {filteredProviders.length > 0 ? (
          <>
            <Text className="text-sm text-muted mb-3">
              Found {filteredProviders.length} provider{filteredProviders.length !== 1 ? "s" : ""}
            </Text>
            <FlatList
              data={filteredProviders}
              renderItem={renderProviderCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </>
        ) : (
          <View className="flex-1 items-center justify-center py-12">
            <MaterialIcons name="search-off" size={48} color="#9BA1A6" />
            <Text className="text-lg font-semibold text-foreground mt-4">No Results Found</Text>
            <Text className="text-sm text-muted text-center mt-2">
              Try searching for a different service or provider
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
