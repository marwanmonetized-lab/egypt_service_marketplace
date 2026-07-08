import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

export default function ReviewRatingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const providerName = params.providerName as string || "Service Provider";
  const service = params.service as string || "Service";

  const handleSubmitReview = async () => {
    if (rating === 0) {
      Alert.alert("Error", "Please select a rating");
      return;
    }

    if (reviewText.trim().length < 10) {
      Alert.alert("Error", "Please write at least 10 characters in your review");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Success", "Thank you for your review!", [
        {
          text: "OK",
          onPress: () => {
            router.replace("/(tabs)/bookings");
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            <Text className="text-lg font-bold text-white">Leave a Review</Text>
            <View className="w-6" />
          </View>
        </View>

        {/* Content */}
        <View className="px-6 py-6">
          {/* Provider Info */}
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

          {/* Rating Section */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-foreground mb-4">How would you rate this service?</Text>

            <View className="flex-row justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  onLongPress={() => setHoverRating(star)}
                  onPressOut={() => setHoverRating(0)}
                >
                  <MaterialIcons
                    name={star <= (hoverRating || rating) ? "star" : "star-outline"}
                    size={48}
                    color={star <= (hoverRating || rating) ? "#F59E0B" : "#D1D5DB"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {rating > 0 && (
              <View className="text-center">
                <Text className="text-center text-sm text-muted">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </Text>
              </View>
            )}
          </View>

          {/* Review Text */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-foreground mb-3">Tell us more (optional)</Text>

            <View className="bg-surface border border-border rounded-2xl overflow-hidden">
              <TextInput
                placeholder="Share your experience with this service provider..."
                value={reviewText}
                onChangeText={setReviewText}
                multiline
                numberOfLines={6}
                className="px-4 py-4 text-foreground"
                placeholderTextColor="#9BA1A6"
                textAlignVertical="top"
              />
            </View>

            <Text className="text-xs text-muted mt-2">
              {reviewText.length}/500 characters
            </Text>
          </View>

          {/* Tips */}
          <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
            <View className="flex-row gap-3">
              <MaterialIcons name="info" size={20} color="#3B82F6" />
              <View className="flex-1">
                <Text className="text-sm font-bold text-blue-900 mb-2">Helpful tips:</Text>
                <Text className="text-xs text-blue-800 leading-relaxed">
                  • Be specific about what you liked or didn't like{"\n"}
                  • Mention punctuality, professionalism, and quality{"\n"}
                  • Be honest and fair in your assessment
                </Text>
              </View>
            </View>
          </View>

          {/* Aspects */}
          <View className="mb-6">
            <Text className="text-base font-bold text-foreground mb-3">Rate these aspects</Text>

            <View className="gap-3">
              {[
                { label: "Professionalism", icon: "work" },
                { label: "Punctuality", icon: "schedule" },
                { label: "Quality of Work", icon: "check-circle" },
                { label: "Communication", icon: "message" },
              ].map((aspect) => (
                <View key={aspect.label} className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons name={aspect.icon as any} size={20} color="#0a7ea4" />
                    <Text className="text-sm text-foreground">{aspect.label}</Text>
                  </View>
                  <View className="flex-row gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity key={star}>
                        <MaterialIcons name="star-outline" size={16} color="#D1D5DB" />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmitReview}
            disabled={isSubmitting || rating === 0}
            className={`${
              isSubmitting || rating === 0 ? "bg-primary opacity-50" : "bg-primary"
            } rounded-lg py-4 items-center mb-4`}
          >
            <Text className="text-white font-bold text-base">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Text>
          </TouchableOpacity>

          {/* Skip Button */}
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)/bookings")}
            className="border border-border rounded-lg py-4 items-center"
          >
            <Text className="text-foreground font-bold text-base">Skip for Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
