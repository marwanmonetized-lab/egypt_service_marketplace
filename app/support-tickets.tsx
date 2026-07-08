import { ScrollView, Text, View, TouchableOpacity, TextInput, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

interface TicketMessage {
  id: string;
  sender: "customer" | "support" | "provider";
  message: string;
  timestamp: string;
  attachments?: string[];
}

export default function SupportTicketsScreen() {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const [tickets] = useState<SupportTicket[]>([
    {
      id: "TKT001",
      title: "Provider did not show up",
      description: "The electrician did not arrive for the scheduled appointment",
      status: "in_progress",
      priority: "high",
      category: "No-show",
      createdAt: "Today 10:30 AM",
      updatedAt: "Today 2:15 PM",
      messages: [
        {
          id: "msg1",
          sender: "customer",
          message: "The provider did not show up for my 10 AM appointment",
          timestamp: "Today 10:35 AM",
        },
        {
          id: "msg2",
          sender: "support",
          message:
            "We apologize for the inconvenience. We are investigating this issue and will contact the provider.",
          timestamp: "Today 10:45 AM",
        },
        {
          id: "msg3",
          sender: "provider",
          message:
            "I apologize for the delay. I had an emergency. Can we reschedule for tomorrow?",
          timestamp: "Today 1:30 PM",
        },
      ],
    },
    {
      id: "TKT002",
      title: "Quality of service issue",
      description: "The work quality did not meet expectations",
      status: "resolved",
      priority: "medium",
      category: "Quality",
      createdAt: "Yesterday 3:20 PM",
      updatedAt: "Today 11:00 AM",
      messages: [
        {
          id: "msg1",
          sender: "customer",
          message: "The plumber did not fix the issue properly",
          timestamp: "Yesterday 3:25 PM",
        },
        {
          id: "msg2",
          sender: "support",
          message: "We will arrange a follow-up visit at no charge",
          timestamp: "Yesterday 4:00 PM",
        },
      ],
    },
    {
      id: "TKT003",
      title: "Payment issue",
      description: "I was charged twice for the same service",
      status: "open",
      priority: "high",
      category: "Payment",
      createdAt: "2 hours ago",
      updatedAt: "2 hours ago",
      messages: [
        {
          id: "msg1",
          sender: "customer",
          message: "I see two charges for the same booking on my account",
          timestamp: "2 hours ago",
        },
      ],
    },
  ]);

  const statusColors: Record<string, string> = {
    open: "#3B82F6",
    in_progress: "#F59E0B",
    resolved: "#22C55E",
    closed: "#9CA3AF",
  };

  const priorityColors: Record<string, string> = {
    low: "#22C55E",
    medium: "#F59E0B",
    high: "#EF4444",
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;

    const updatedTicket = {
      ...selectedTicket,
      messages: [
        ...selectedTicket.messages,
        {
          id: `msg${selectedTicket.messages.length + 1}`,
          sender: "customer" as const,
          message: newMessage,
          timestamp: "Just now",
        },
      ],
    };

    setSelectedTicket(updatedTicket);
    setNewMessage("");
  };

  if (selectedTicket) {
    return (
      <ScreenContainer className="p-0 flex-1">
        {/* Header */}
        <View className="bg-primary px-6 py-4 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => setSelectedTicket(null)}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-1 ml-4">
            <Text className="text-lg font-bold text-white">{selectedTicket.id}</Text>
            <Text className="text-xs text-white opacity-80">{selectedTicket.title}</Text>
          </View>
        </View>

        {/* Ticket Info */}
        <View className="px-6 py-4 bg-surface border-b border-border">
          <View className="flex-row gap-3 mb-3">
            <View
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: statusColors[selectedTicket.status] }}
            >
              <Text className="text-xs font-bold text-white capitalize">
                {selectedTicket.status.replace("_", " ")}
              </Text>
            </View>

            <View
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: priorityColors[selectedTicket.priority] }}
            >
              <Text className="text-xs font-bold text-white capitalize">
                {selectedTicket.priority}
              </Text>
            </View>
          </View>

          <Text className="text-sm text-muted">
            Created: {selectedTicket.createdAt} • Updated: {selectedTicket.updatedAt}
          </Text>
        </View>

        {/* Messages */}
        <ScrollView className="flex-1 px-6 py-4" showsVerticalScrollIndicator={false}>
          <View className="gap-4">
            {selectedTicket.messages.map((msg) => (
              <View
                key={msg.id}
                className={`flex-row ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
              >
                <View
                  className={`max-w-xs px-4 py-3 rounded-2xl ${
                    msg.sender === "customer"
                      ? "bg-primary"
                      : msg.sender === "support"
                        ? "bg-blue-100"
                        : "bg-green-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold mb-1 ${
                      msg.sender === "customer"
                        ? "text-white"
                        : msg.sender === "support"
                          ? "text-blue-900"
                          : "text-green-900"
                    }`}
                  >
                    {msg.sender === "customer" ? "You" : msg.sender === "support" ? "Support" : "Provider"}
                  </Text>
                  <Text
                    className={`text-sm ${
                      msg.sender === "customer"
                        ? "text-white"
                        : msg.sender === "support"
                          ? "text-blue-900"
                          : "text-green-900"
                    }`}
                  >
                    {msg.message}
                  </Text>
                  <Text
                    className={`text-xs mt-2 ${
                      msg.sender === "customer"
                        ? "text-white opacity-70"
                        : msg.sender === "support"
                          ? "text-blue-700"
                          : "text-green-700"
                    }`}
                  >
                    {msg.timestamp}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Message Input */}
        <View className="px-6 py-4 border-t border-border gap-3">
          <View className="flex-row items-end gap-3">
            <TextInput
              placeholder="Type your message..."
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              maxLength={500}
              className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`w-12 h-12 rounded-lg items-center justify-center ${
                newMessage.trim() ? "bg-primary" : "bg-primary opacity-50"
              }`}
            >
              <MaterialIcons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="flex-row items-center justify-center gap-2 border border-border rounded-lg py-3">
            <MaterialIcons name="attach-file" size={20} color="#0a7ea4" />
            <Text className="text-sm font-semibold text-primary">Attach Evidence</Text>
          </TouchableOpacity>
        </View>
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
        <Text className="text-lg font-bold text-white">Support & Disputes</Text>
        <TouchableOpacity className="p-2">
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6">
          {/* Filter Tabs */}
          <View className="flex-row gap-2 mb-6 overflow-x-auto">
            {["All", "Open", "In Progress", "Resolved"].map((filter) => (
              <TouchableOpacity
                key={filter}
                className="px-4 py-2 rounded-full bg-surface border border-border"
              >
                <Text className="text-sm font-semibold text-foreground">{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tickets List */}
          <View className="gap-3">
            {tickets.map((ticket) => (
              <TouchableOpacity
                key={ticket.id}
                onPress={() => setSelectedTicket(ticket)}
                className="bg-surface rounded-2xl border border-border p-4"
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-base font-bold text-foreground">{ticket.title}</Text>
                    <Text className="text-xs text-muted mt-1">{ticket.id}</Text>
                  </View>

                  <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: statusColors[ticket.status] }}
                  >
                    <Text className="text-xs font-bold text-white capitalize">
                      {ticket.status.replace("_", " ")}
                    </Text>
                  </View>
                </View>

                <Text className="text-sm text-muted mb-3">{ticket.description}</Text>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <View
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: priorityColors[ticket.priority] }}
                    />
                    <Text className="text-xs text-muted capitalize">{ticket.priority} Priority</Text>
                  </View>

                  <Text className="text-xs text-muted">{ticket.updatedAt}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
