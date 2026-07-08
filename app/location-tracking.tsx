import { ScrollView, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
}

interface ProviderLocation {
  name: string;
  currentLocation: LocationData;
  destination: { latitude: number; longitude: number; address: string };
  eta: string;
  distance: number;
  speed: number;
}

export default function LocationTrackingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [providerLocation, setProviderLocation] = useState<ProviderLocation | null>(null);
  const [isTracking, setIsTracking] = useState(true);

  const providerName = params.providerName as string || "Service Provider";
  const bookingId = parseInt(params.bookingId as string) || 1;

  useEffect(() => {
    // Simulate live location updates
    const mockLocation: ProviderLocation = {
      name: providerName,
      currentLocation: {
        latitude: 30.0444,
        longitude: 31.2357,
        accuracy: 5,
        timestamp: new Date().toLocaleTimeString(),
      },
      destination: {
        latitude: 30.0555,
        longitude: 31.2467,
        address: "123 Main St, Cairo, Egypt",
      },
      eta: "8 minutes",
      distance: 2.5,
      speed: 45,
    };
    setProviderLocation(mockLocation);

    // Simulate location updates every 5 seconds
    const interval = setInterval(() => {
      setProviderLocation((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          currentLocation: {
            ...prev.currentLocation,
            latitude: prev.currentLocation.latitude + (Math.random() - 0.5) * 0.001,
            longitude: prev.currentLocation.longitude + (Math.random() - 0.5) * 0.001,
            timestamp: new Date().toLocaleTimeString(),
          },
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [providerName]);

  if (!providerLocation) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">Loading location...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Live Tracking</Text>
        <View className="w-6" />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Map Placeholder */}
        <View className="bg-gray-200 h-80 items-center justify-center border-b border-border">
          <View className="items-center gap-2">
            <MaterialIcons name="map" size={48} color="#9BA1A6" />
            <Text className="text-sm text-muted">Map View</Text>
            <Text className="text-xs text-muted text-center px-4">
              Integration with Google Maps or Mapbox would display live provider location here
            </Text>
          </View>
        </View>

        {/* Provider Info */}
        <View className="px-6 py-6">
          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            <View className="flex-row items-center gap-4 mb-4">
              <View className="w-16 h-16 rounded-full bg-primary items-center justify-center">
                <MaterialIcons name="person" size={32} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-foreground">{providerLocation.name}</Text>
                <Text className="text-sm text-muted">Booking #{bookingId}</Text>
              </View>
              <View className="items-center">
                <View className="w-3 h-3 rounded-full bg-success mb-1" />
                <Text className="text-xs text-success font-semibold">On the Way</Text>
              </View>
            </View>

            <View className="border-t border-border pt-4">
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="schedule" size={20} color="#0a7ea4" />
                  <Text className="text-sm text-muted">ETA</Text>
                </View>
                <Text className="text-base font-bold text-foreground">
                  {providerLocation.eta}
                </Text>
              </View>

              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="straighten" size={20} color="#0a7ea4" />
                  <Text className="text-sm text-muted">Distance</Text>
                </View>
                <Text className="text-base font-bold text-foreground">
                  {providerLocation.distance} km
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="speed" size={20} color="#0a7ea4" />
                  <Text className="text-sm text-muted">Speed</Text>
                </View>
                <Text className="text-base font-bold text-foreground">
                  {providerLocation.speed} km/h
                </Text>
              </View>
            </View>
          </View>

          {/* Destination */}
          <Text className="text-lg font-bold text-foreground mb-3">Destination</Text>
          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            <View className="flex-row items-start gap-3">
              <View className="w-10 h-10 rounded-full bg-error items-center justify-center mt-1">
                <MaterialIcons name="location-on" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-foreground">Your Location</Text>
                <Text className="text-sm text-muted mt-1">
                  {providerLocation.destination.address}
                </Text>
              </View>
            </View>
          </View>

          {/* Current Location */}
          <Text className="text-lg font-bold text-foreground mb-3">Provider Location</Text>
          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            <View className="flex-row items-start gap-3">
              <View className="w-10 h-10 rounded-full bg-success items-center justify-center mt-1">
                <MaterialIcons name="my-location" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-muted">Latitude</Text>
                <Text className="text-base font-bold text-foreground">
                  {providerLocation.currentLocation.latitude.toFixed(4)}
                </Text>
                <Text className="text-sm text-muted mt-2">Longitude</Text>
                <Text className="text-base font-bold text-foreground">
                  {providerLocation.currentLocation.longitude.toFixed(4)}
                </Text>
                <Text className="text-xs text-muted mt-2">
                  Updated: {providerLocation.currentLocation.timestamp}
                </Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View className="gap-3">
            <TouchableOpacity className="bg-primary rounded-lg py-4 items-center flex-row justify-center gap-2">
              <MaterialIcons name="call" size={20} color="white" />
              <Text className="text-white font-bold text-base">Call Provider</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface border border-border rounded-lg py-4 items-center flex-row justify-center gap-2">
              <MaterialIcons name="message" size={20} color="#0a7ea4" />
              <Text className="text-primary font-bold text-base">Send Message</Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-6">
            <View className="flex-row gap-3">
              <MaterialIcons name="info" size={20} color="#3B82F6" />
              <Text className="text-xs text-blue-800 flex-1 leading-relaxed">
                Location updates in real-time. Actual map integration would use Google Maps API or
                Mapbox for production deployment.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
