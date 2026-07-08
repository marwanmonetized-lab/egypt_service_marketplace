import { ScrollView, Text, View, TouchableOpacity, TextInput, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  icon: string;
}

interface ProviderData {
  fullName: string;
  email: string;
  phone: string;
  serviceCategory: string;
  experience: string;
  nationalId: string;
  businessLicense: string;
  bankAccount: string;
  bankName: string;
}

export default function ProviderOnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [providerData, setProviderData] = useState<ProviderData>({
    fullName: "",
    email: "",
    phone: "",
    serviceCategory: "",
    experience: "",
    nationalId: "",
    businessLicense: "",
    bankAccount: "",
    bankName: "",
  });

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Personal Information",
      description: "Enter your basic details",
      completed: currentStep > 0,
      icon: "person",
    },
    {
      id: 2,
      title: "Service Details",
      description: "Select your service category",
      completed: currentStep > 1,
      icon: "build",
    },
    {
      id: 3,
      title: "Document Verification",
      description: "Upload required documents",
      completed: currentStep > 2,
      icon: "description",
    },
    {
      id: 4,
      title: "Bank Information",
      description: "Add payment details",
      completed: currentStep > 3,
      icon: "account-balance",
    },
    {
      id: 5,
      title: "Review & Submit",
      description: "Confirm your information",
      completed: currentStep > 4,
      icon: "check-circle",
    },
  ];

  const serviceCategories = [
    "Electrician",
    "Plumber",
    "Barber",
    "Chef",
    "Cleaner",
    "Pest Control",
    "Car Wash",
  ];

  const experienceLevels = ["Beginner (0-2 years)", "Intermediate (2-5 years)", "Expert (5+ years)"];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Provider data submitted:", providerData);
    router.push("/(tabs)");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View className="gap-4">
            <Text className="text-lg font-bold text-foreground mb-2">Personal Information</Text>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Full Name</Text>
              <TextInput
                placeholder="Enter your full name"
                value={providerData.fullName}
                onChangeText={(text) =>
                  setProviderData({ ...providerData, fullName: text })
                }
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              />
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Email</Text>
              <TextInput
                placeholder="Enter your email"
                value={providerData.email}
                onChangeText={(text) => setProviderData({ ...providerData, email: text })}
                keyboardType="email-address"
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              />
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Phone Number</Text>
              <TextInput
                placeholder="Enter your phone number"
                value={providerData.phone}
                onChangeText={(text) => setProviderData({ ...providerData, phone: text })}
                keyboardType="phone-pad"
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              />
            </View>
          </View>
        );

      case 1:
        return (
          <View className="gap-4">
            <Text className="text-lg font-bold text-foreground mb-2">Service Details</Text>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-3">Service Category</Text>
              <View className="gap-2">
                {serviceCategories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() =>
                      setProviderData({ ...providerData, serviceCategory: category })
                    }
                    className={`px-4 py-3 rounded-lg border ${
                      providerData.serviceCategory === category
                        ? "bg-primary border-primary"
                        : "bg-surface border-border"
                    }`}
                  >
                    <Text
                      className={`text-base font-semibold ${
                        providerData.serviceCategory === category
                          ? "text-white"
                          : "text-foreground"
                      }`}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-3">Experience Level</Text>
              <View className="gap-2">
                {experienceLevels.map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setProviderData({ ...providerData, experience: level })}
                    className={`px-4 py-3 rounded-lg border ${
                      providerData.experience === level
                        ? "bg-primary border-primary"
                        : "bg-surface border-border"
                    }`}
                  >
                    <Text
                      className={`text-base font-semibold ${
                        providerData.experience === level ? "text-white" : "text-foreground"
                      }`}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View className="gap-4">
            <Text className="text-lg font-bold text-foreground mb-2">Document Verification</Text>

            <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
              <View className="flex-row gap-2">
                <MaterialIcons name="info" size={20} color="#3B82F6" />
                <Text className="text-xs text-blue-800 flex-1 leading-relaxed">
                  Upload clear photos of your documents for verification. This helps us maintain
                  quality standards.
                </Text>
              </View>
            </View>

            <TouchableOpacity className="bg-surface border-2 border-dashed border-border rounded-2xl p-6 items-center">
              <MaterialIcons name="cloud-upload" size={40} color="#0a7ea4" />
              <Text className="text-base font-semibold text-foreground mt-3">
                Upload National ID
              </Text>
              <Text className="text-xs text-muted mt-1">PNG, JPG up to 5MB</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface border-2 border-dashed border-border rounded-2xl p-6 items-center">
              <MaterialIcons name="cloud-upload" size={40} color="#0a7ea4" />
              <Text className="text-base font-semibold text-foreground mt-3">
                Upload Business License
              </Text>
              <Text className="text-xs text-muted mt-1">PNG, JPG up to 5MB</Text>
            </TouchableOpacity>

            <View className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="check-circle" size={20} color="#22C55E" />
                <Text className="text-xs text-green-800 flex-1">
                  Verification typically takes 24-48 hours
                </Text>
              </View>
            </View>
          </View>
        );

      case 3:
        return (
          <View className="gap-4">
            <Text className="text-lg font-bold text-foreground mb-2">Bank Information</Text>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Bank Name</Text>
              <TextInput
                placeholder="Enter your bank name"
                value={providerData.bankName}
                onChangeText={(text) =>
                  setProviderData({ ...providerData, bankName: text })
                }
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              />
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Account Number</Text>
              <TextInput
                placeholder="Enter your account number"
                value={providerData.bankAccount}
                onChangeText={(text) =>
                  setProviderData({ ...providerData, bankAccount: text })
                }
                keyboardType="number-pad"
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              />
            </View>

            <View className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
              <View className="flex-row gap-2">
                <MaterialIcons name="security" size={20} color="#F59E0B" />
                <Text className="text-xs text-yellow-800 flex-1 leading-relaxed">
                  Your bank information is encrypted and secure. We only use it for payments.
                </Text>
              </View>
            </View>
          </View>
        );

      case 4:
        return (
          <View className="gap-4">
            <Text className="text-lg font-bold text-foreground mb-2">Review Your Information</Text>

            <View className="bg-surface rounded-2xl border border-border p-4 gap-3">
              <View className="flex-row justify-between items-center pb-3 border-b border-border">
                <Text className="text-sm text-muted">Full Name</Text>
                <Text className="text-sm font-semibold text-foreground">{providerData.fullName}</Text>
              </View>

              <View className="flex-row justify-between items-center pb-3 border-b border-border">
                <Text className="text-sm text-muted">Service Category</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {providerData.serviceCategory}
                </Text>
              </View>

              <View className="flex-row justify-between items-center pb-3 border-b border-border">
                <Text className="text-sm text-muted">Experience</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {providerData.experience}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted">Bank</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {providerData.bankName}
                </Text>
              </View>
            </View>

            <View className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <View className="flex-row items-start gap-2">
                <MaterialIcons name="check-circle" size={20} color="#22C55E" />
                <Text className="text-xs text-green-800 flex-1 leading-relaxed">
                  By submitting, you agree to our Terms of Service and confirm all information is
                  accurate.
                </Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4">
        <Text className="text-lg font-bold text-white">Become a Service Provider</Text>
        <Text className="text-xs text-white opacity-80 mt-1">
          Step {currentStep + 1} of {steps.length}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="px-6 py-4">
        <View className="bg-background rounded-full h-2 overflow-hidden">
          <View
            className="bg-primary h-full"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4 flex-1">{renderStepContent()}</View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="px-6 py-6 gap-3 border-t border-border">
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentStep === 0}
            className={`flex-1 border rounded-lg py-3 items-center ${
              currentStep === 0 ? "border-border opacity-50" : "border-border"
            }`}
          >
            <Text className="text-foreground font-bold">Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            className="flex-1 bg-primary rounded-lg py-3 items-center"
          >
            <Text className="text-white font-bold">
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          className="border border-border rounded-lg py-3 items-center"
        >
          <Text className="text-foreground font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
