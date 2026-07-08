import { ScrollView, Text, View, TouchableOpacity, ProgressBarAndroid } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

interface LoyaltyData {
  totalPoints: number;
  pointsToNextTier: number;
  currentTier: "Bronze" | "Silver" | "Gold" | "Platinum";
  totalSpent: number;
  totalBookings: number;
  memberSince: string;
  rewards: Reward[];
  transactions: Transaction[];
}

interface Reward {
  id: number;
  title: string;
  description: string;
  pointsRequired: number;
  discount: number;
  expiresIn: string;
  icon: string;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  pointsEarned: number;
  type: "booking" | "review" | "referral";
}

export default function LoyaltyRewardsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyData | null>(null);

  useEffect(() => {
    // Simulate loading loyalty data
    const mockData: LoyaltyData = {
      totalPoints: 2850,
      pointsToNextTier: 150,
      currentTier: "Silver",
      totalSpent: 4250,
      totalBookings: 18,
      memberSince: "January 2024",
      rewards: [
        {
          id: 1,
          title: "20% Off Next Booking",
          description: "Get 20% discount on your next service",
          pointsRequired: 500,
          discount: 20,
          expiresIn: "30 days",
          icon: "discount",
        },
        {
          id: 2,
          title: "Free Service",
          description: "Get one free service up to EGP 200",
          pointsRequired: 1000,
          discount: 100,
          expiresIn: "60 days",
          icon: "card-giftcard",
        },
        {
          id: 3,
          title: "Priority Booking",
          description: "Get priority access to top providers",
          pointsRequired: 750,
          discount: 0,
          expiresIn: "90 days",
          icon: "star",
        },
      ],
      transactions: [
        {
          id: 1,
          date: "Today",
          description: "Electrical service booking",
          pointsEarned: 150,
          type: "booking",
        },
        {
          id: 2,
          date: "Yesterday",
          description: "Left a 5-star review",
          pointsEarned: 50,
          type: "review",
        },
        {
          id: 3,
          date: "3 days ago",
          description: "Referred a friend",
          pointsEarned: 200,
          type: "referral",
        },
        {
          id: 4,
          date: "1 week ago",
          description: "Plumbing service booking",
          pointsEarned: 120,
          type: "booking",
        },
      ],
    };
    setLoyaltyData(mockData);
  }, []);

  if (!loyaltyData) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">Loading rewards...</Text>
      </ScreenContainer>
    );
  }

  const tierColors: Record<string, string> = {
    Bronze: "#CD7F32",
    Silver: "#C0C0C0",
    Gold: "#FFD700",
    Platinum: "#E5E4E2",
  };

  const tierBenefits: Record<string, string[]> = {
    Bronze: ["1x points per booking", "Birthday bonus"],
    Silver: ["1.5x points per booking", "Birthday bonus", "Priority support"],
    Gold: ["2x points per booking", "Birthday bonus", "Priority support", "Exclusive offers"],
    Platinum: ["3x points per booking", "Birthday bonus", "VIP support", "Exclusive events"],
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary px-6 pt-4 pb-8">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-white">Loyalty & Rewards</Text>
            <View className="w-6" />
          </View>
        </View>

        {/* Points Card */}
        <View className="px-6 py-6">
          <View
            className="rounded-2xl p-6 mb-6 border-2"
            style={{ borderColor: tierColors[loyaltyData.currentTier] }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-sm text-white opacity-80">Your Points</Text>
                <Text className="text-4xl font-bold text-white">{loyaltyData.totalPoints}</Text>
              </View>
              <View
                className="w-20 h-20 rounded-full items-center justify-center border-4"
                style={{ borderColor: tierColors[loyaltyData.currentTier] }}
              >
                <MaterialIcons name="star" size={40} color="white" />
              </View>
            </View>

            <View className="bg-white bg-opacity-20 rounded-lg px-3 py-2">
              <Text className="text-xs text-white opacity-80">Current Tier</Text>
              <Text className="text-lg font-bold text-white">{loyaltyData.currentTier}</Text>
            </View>
          </View>

          {/* Tier Progress */}
          <Text className="text-lg font-bold text-foreground mb-3">Progress to Next Tier</Text>
          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-sm text-muted">
                {loyaltyData.pointsToNextTier} points to Gold
              </Text>
              <Text className="text-sm font-bold text-foreground">
                {Math.round((1 - loyaltyData.pointsToNextTier / 1000) * 100)}%
              </Text>
            </View>

            <View className="bg-background rounded-full h-2 overflow-hidden">
              <View
                className="bg-primary h-full"
                style={{
                  width: `${Math.round((1 - loyaltyData.pointsToNextTier / 1000) * 100)}%`,
                }}
              />
            </View>
          </View>

          {/* Tier Benefits */}
          <Text className="text-lg font-bold text-foreground mb-3">Your Benefits</Text>
          <View className="bg-surface rounded-2xl border border-border p-4 mb-6">
            {tierBenefits[loyaltyData.currentTier].map((benefit, index) => (
              <View
                key={index}
                className={`flex-row items-center gap-3 py-2 ${
                  index < tierBenefits[loyaltyData.currentTier].length - 1
                    ? "border-b border-border pb-3"
                    : ""
                }`}
              >
                <MaterialIcons name="check-circle" size={20} color="#22C55E" />
                <Text className="text-sm text-foreground">{benefit}</Text>
              </View>
            ))}
          </View>

          {/* Stats */}
          <View className="grid grid-cols-2 gap-3 mb-6">
            <View className="bg-surface rounded-2xl border border-border p-4">
              <Text className="text-xs text-muted mb-1">Total Spent</Text>
              <Text className="text-2xl font-bold text-primary">EGP {loyaltyData.totalSpent}</Text>
            </View>

            <View className="bg-surface rounded-2xl border border-border p-4">
              <Text className="text-xs text-muted mb-1">Total Bookings</Text>
              <Text className="text-2xl font-bold text-primary">{loyaltyData.totalBookings}</Text>
            </View>
          </View>

          {/* Available Rewards */}
          <Text className="text-lg font-bold text-foreground mb-3">Available Rewards</Text>
          <View className="gap-3 mb-6">
            {loyaltyData.rewards.map((reward) => (
              <View
                key={reward.id}
                className="bg-surface rounded-2xl border border-border p-4 flex-row items-start gap-3"
              >
                <View className="w-12 h-12 rounded-lg bg-primary items-center justify-center">
                  <MaterialIcons name={reward.icon as any} size={24} color="white" />
                </View>

                <View className="flex-1">
                  <Text className="text-base font-bold text-foreground">{reward.title}</Text>
                  <Text className="text-xs text-muted mt-1">{reward.description}</Text>

                  <View className="flex-row items-center justify-between mt-3">
                    <View className="flex-row items-center gap-1">
                      <MaterialIcons name="star" size={14} color="#F59E0B" />
                      <Text className="text-xs font-semibold text-foreground">
                        {reward.pointsRequired} pts
                      </Text>
                    </View>

                    <TouchableOpacity
                      disabled={loyaltyData.totalPoints < reward.pointsRequired}
                      className={`px-3 py-1 rounded-lg ${
                        loyaltyData.totalPoints >= reward.pointsRequired
                          ? "bg-primary"
                          : "bg-primary opacity-50"
                      }`}
                    >
                      <Text className="text-xs font-bold text-white">Redeem</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Recent Transactions */}
          <Text className="text-lg font-bold text-foreground mb-3">Recent Activity</Text>
          <View className="bg-surface rounded-2xl border border-border overflow-hidden">
            {loyaltyData.transactions.map((transaction, index) => (
              <View
                key={transaction.id}
                className={`flex-row items-center justify-between px-4 py-3 ${
                  index < loyaltyData.transactions.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">
                    {transaction.description}
                  </Text>
                  <Text className="text-xs text-muted mt-1">{transaction.date}</Text>
                </View>

                <View className="items-end">
                  <Text className="text-sm font-bold text-success">+{transaction.pointsEarned}</Text>
                  <View className="flex-row items-center gap-1 mt-1">
                    <MaterialIcons name="star" size={12} color="#F59E0B" />
                    <Text className="text-xs text-muted">pts</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Referral Program */}
          <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-6 mb-6">
            <View className="flex-row items-start gap-3">
              <MaterialIcons name="people" size={24} color="#3B82F6" />
              <View className="flex-1">
                <Text className="text-base font-bold text-blue-900 mb-1">Refer a Friend</Text>
                <Text className="text-xs text-blue-800 leading-relaxed mb-3">
                  Earn 200 points for every friend you refer who completes their first booking.
                </Text>
                <TouchableOpacity className="bg-blue-600 rounded-lg px-4 py-2">
                  <Text className="text-white text-xs font-bold">Share Referral Link</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
