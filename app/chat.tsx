import { ScrollView, Text, View, TouchableOpacity, TextInput, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderType: "customer" | "provider";
  text: string;
  timestamp: string;
  isRead: boolean;
}

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const providerId = parseInt(params.providerId as string) || 1;
  const providerName = params.providerName as string || "Service Provider";
  const bookingId = parseInt(params.bookingId as string) || 1;

  useEffect(() => {
    // Simulate loading chat messages
    const mockMessages: Message[] = [
      {
        id: 1,
        senderId: providerId,
        senderName: providerName,
        senderType: "provider",
        text: "Hi! I received your booking. I'll be there in about 30 minutes.",
        timestamp: "2:15 PM",
        isRead: true,
      },
      {
        id: 2,
        senderId: user?.id || 1,
        senderName: user?.name || "You",
        senderType: "customer",
        text: "Great! Thanks for confirming. My address is 123 Main St, Cairo.",
        timestamp: "2:16 PM",
        isRead: true,
      },
      {
        id: 3,
        senderId: providerId,
        senderName: providerName,
        senderType: "provider",
        text: "Perfect! I have all the tools I need. See you soon!",
        timestamp: "2:17 PM",
        isRead: true,
      },
    ];
    setMessages(mockMessages);
    setIsLoading(false);
  }, [providerId, providerName, user?.id, user?.name]);

  const handleSendMessage = () => {
    if (newMessage.trim().length === 0) return;

    const message: Message = {
      id: messages.length + 1,
      senderId: user?.id || 1,
      senderName: user?.name || "You",
      senderType: "customer",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isRead: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const renderMessage = (message: Message) => {
    const isCustomer = message.senderType === "customer";

    return (
      <View
        key={message.id}
        className={`flex-row gap-2 mb-3 ${isCustomer ? "justify-end" : "justify-start"}`}
      >
        {!isCustomer && (
          <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
            <MaterialIcons name="person" size={16} color="white" />
          </View>
        )}

        <View
          className={`max-w-xs rounded-2xl px-4 py-2 ${
            isCustomer ? "bg-primary" : "bg-surface border border-border"
          }`}
        >
          <Text className={`text-sm ${isCustomer ? "text-white" : "text-foreground"}`}>
            {message.text}
          </Text>
          <Text
            className={`text-xs mt-1 ${
              isCustomer ? "text-white opacity-70" : "text-muted"
            }`}
          >
            {message.timestamp}
          </Text>
        </View>

        {isCustomer && (
          <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
            <MaterialIcons name="person" size={16} color="white" />
          </View>
        )}
      </View>
    );
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold text-white">{providerName}</Text>
          <Text className="text-xs text-white opacity-80">Booking #{bookingId}</Text>
        </View>

        <TouchableOpacity className="p-2">
          <MaterialIcons name="call" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => renderMessage(message))}
      </ScrollView>

      {/* Input Area */}
      <View className="border-t border-border px-4 py-4 bg-background">
        <View className="flex-row items-center gap-2">
          <View className="flex-1 flex-row items-center gap-2 bg-surface border border-border rounded-full px-4 py-3">
            <TextInput
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              className="flex-1 text-foreground"
              placeholderTextColor="#9BA1A6"
              multiline
              maxLength={500}
            />

            <TouchableOpacity>
              <MaterialIcons name="attach-file" size={20} color="#0a7ea4" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={newMessage.trim().length === 0}
            className={`w-12 h-12 rounded-full items-center justify-center ${
              newMessage.trim().length === 0 ? "bg-primary opacity-50" : "bg-primary"
            }`}
          >
            <MaterialIcons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-xs text-muted mt-2 text-center">
          {newMessage.length}/500
        </Text>
      </View>
    </ScreenContainer>
  );
}
