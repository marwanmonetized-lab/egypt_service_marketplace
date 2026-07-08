import { ScrollView, Text, View, TouchableOpacity, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";

interface NotificationPreferences {
  bookingUpdates: boolean;
  providerMessages: boolean;
  reviewReminders: boolean;
  loyaltyRewards: boolean;
  specialOffers: boolean;
  promotions: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    bookingUpdates: true,
    providerMessages: true,
    reviewReminders: true,
    loyaltyRewards: true,
    specialOffers: true,
    promotions: false,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHoursEnabled: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
  });

  const togglePreference = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    // Save preferences to backend
    console.log("Saving preferences:", preferences);
    router.back();
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Notification Settings</Text>
        <View className="w-6" />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6">
          {/* Notification Types */}
          <Text className="text-lg font-bold text-foreground mb-4">Notification Types</Text>

          <View className="bg-surface rounded-2xl border border-border overflow-hidden mb-6">
            {/* Booking Updates */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">Booking Updates</Text>
                <Text className="text-xs text-muted mt-1">
                  Get notified about booking confirmations and status changes
                </Text>
              </View>
              <Switch
                value={preferences.bookingUpdates}
                onValueChange={() => togglePreference("bookingUpdates")}
              />
            </View>

            {/* Provider Messages */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">Provider Messages</Text>
                <Text className="text-xs text-muted mt-1">
                  Receive messages from service providers
                </Text>
              </View>
              <Switch
                value={preferences.providerMessages}
                onValueChange={() => togglePreference("providerMessages")}
              />
            </View>

            {/* Review Reminders */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">Review Reminders</Text>
                <Text className="text-xs text-muted mt-1">
                  Reminders to leave reviews after services
                </Text>
              </View>
              <Switch
                value={preferences.reviewReminders}
                onValueChange={() => togglePreference("reviewReminders")}
              />
            </View>

            {/* Loyalty Rewards */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">Loyalty Rewards</Text>
                <Text className="text-xs text-muted mt-1">
                  Notifications about loyalty points and tier upgrades
                </Text>
              </View>
              <Switch
                value={preferences.loyaltyRewards}
                onValueChange={() => togglePreference("loyaltyRewards")}
              />
            </View>

            {/* Special Offers */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">Special Offers</Text>
                <Text className="text-xs text-muted mt-1">
                  Exclusive deals and discounts for you
                </Text>
              </View>
              <Switch
                value={preferences.specialOffers}
                onValueChange={() => togglePreference("specialOffers")}
              />
            </View>

            {/* Promotions */}
            <View className="flex-row items-center justify-between px-4 py-4">
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">Promotions</Text>
                <Text className="text-xs text-muted mt-1">
                  General promotions and app announcements
                </Text>
              </View>
              <Switch
                value={preferences.promotions}
                onValueChange={() => togglePreference("promotions")}
              />
            </View>
          </View>

          {/* Sound & Vibration */}
          <Text className="text-lg font-bold text-foreground mb-4">Sound & Vibration</Text>

          <View className="bg-surface rounded-2xl border border-border overflow-hidden mb-6">
            {/* Sound */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="volume-up" size={24} color="#0a7ea4" />
                <Text className="text-base font-semibold text-foreground">Sound</Text>
              </View>
              <Switch
                value={preferences.soundEnabled}
                onValueChange={() => togglePreference("soundEnabled")}
              />
            </View>

            {/* Vibration */}
            <View className="flex-row items-center justify-between px-4 py-4">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="vibration" size={24} color="#0a7ea4" />
                <Text className="text-base font-semibold text-foreground">Vibration</Text>
              </View>
              <Switch
                value={preferences.vibrationEnabled}
                onValueChange={() => togglePreference("vibrationEnabled")}
              />
            </View>
          </View>

          {/* Quiet Hours */}
          <Text className="text-lg font-bold text-foreground mb-4">Quiet Hours</Text>

          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="schedule" size={24} color="#0a7ea4" />
                <Text className="text-base font-semibold text-foreground">Enable Quiet Hours</Text>
              </View>
              <Switch
                value={preferences.quietHoursEnabled}
                onValueChange={() => togglePreference("quietHoursEnabled")}
              />
            </View>

            {preferences.quietHoursEnabled && (
              <View className="border-t border-border pt-4 gap-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-foreground">Start Time</Text>
                  <TouchableOpacity className="bg-background rounded-lg px-4 py-2">
                    <Text className="text-sm font-semibold text-primary">
                      {preferences.quietHoursStart}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-foreground">End Time</Text>
                  <TouchableOpacity className="bg-background rounded-lg px-4 py-2">
                    <Text className="text-sm font-semibold text-primary">
                      {preferences.quietHoursEnd}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text className="text-xs text-muted mt-2">
                  During quiet hours, only important notifications will be delivered
                </Text>
              </View>
            )}
          </View>

          {/* Info */}
          <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
            <View className="flex-row gap-3">
              <MaterialIcons name="info" size={20} color="#3B82F6" />
              <Text className="text-xs text-blue-800 flex-1 leading-relaxed">
                Changes are saved automatically. You can always update these settings from your
                profile.
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-primary rounded-lg py-4 items-center mb-3"
          >
            <Text className="text-white font-bold text-base">Save Settings</Text>
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
