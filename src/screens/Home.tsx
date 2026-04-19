import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "../navigation";
import { recipientService } from "../services/recipientService";
import { shortlistService } from "../services/shortlistService";
import { GiftIdea, Recipient } from "../types";
import { theme } from "../theme";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Home({ navigation }: ScreenProps<"Home">) {
  const isFocused = useIsFocused();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [shortlist, setShortlist] = useState<GiftIdea[]>([]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    async function load() {
      const [nextRecipients, nextShortlist] = await Promise.all([
        recipientService.getAll(),
        shortlistService.getAll(),
      ]);

      setRecipients(nextRecipients);
      setShortlist(nextShortlist);
    }

    void load();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.brandBox}>
            <Ionicons name="gift-outline" size={20} color={theme.colors.accent} />
          </View>
          <Pressable onPress={() => navigation.navigate("Settings")} style={styles.profileButton}>
            <Ionicons name="person-outline" size={20} color={theme.colors.text} />
          </Pressable>
        </View>

        <Text style={styles.greeting}>
          Ciao,{"\n"}
          <Text style={styles.greetingMuted}>troviamo il regalo perfetto.</Text>
        </Text>

        <Card style={styles.heroCard}>
          <Text style={styles.heroTitle}>Nuova ricerca</Text>
          <Text style={styles.heroDescription}>
            Inizia una sessione guidata per trovare idee uniche per la persona giusta.
          </Text>
          <Button
            variant="secondary"
            style={styles.heroButton}
            onPress={() => navigation.navigate("CreateRecipient")}
          >
            Trova un regalo
          </Button>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Destinatari recenti</Text>
        </View>

        {recipients.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Ionicons name="people-outline" size={28} color={theme.colors.muted} />
            <Text style={styles.emptyText}>Non hai ancora aggiunto nessun destinatario.</Text>
          </Card>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recipientRow}>
            {recipients.map((recipient) => (
              <Pressable
                key={recipient.id}
                onPress={() => navigation.navigate("GuidedSession", { recipientId: recipient.id })}
                style={styles.recipientCard}
              >
                <View style={styles.recipientAvatar}>
                  <Text style={styles.recipientAvatarText}>{recipient.name.charAt(0).toUpperCase()}</Text>
                </View>
                <Text style={styles.recipientName}>{recipient.name}</Text>
                <Text style={styles.recipientMeta}>{recipient.relationship}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => navigation.navigate("CreateRecipient")} style={styles.recipientCard}>
              <View style={styles.addAvatar}>
                <Ionicons name="add" size={24} color={theme.colors.muted} />
              </View>
              <Text style={styles.recipientName}>Aggiungi</Text>
            </Pressable>
          </ScrollView>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>La tua shortlist</Text>
          <Pressable onPress={() => navigation.navigate("Shortlist")}>
            <Text style={styles.link}>Vedi tutti</Text>
          </Pressable>
        </View>

        {shortlist.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Ionicons name="heart-outline" size={28} color={theme.colors.muted} />
            <Text style={styles.emptyText}>Salva le tue idee preferite per ritrovarle qui.</Text>
          </Card>
        ) : (
          shortlist.slice(0, 2).map((idea) => (
            <Card
              key={idea.id}
              style={styles.shortlistCard}
              onPress={() => navigation.navigate("IdeaDetail", { idea })}
            >
              <View style={styles.ideaIcon}>
                <Ionicons name="gift-outline" size={22} color={theme.colors.text} />
              </View>
              <View style={styles.ideaContent}>
                <Text style={styles.ideaTitle}>{idea.title}</Text>
                <Text style={styles.ideaMeta}>{idea.priceRange}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.muted} />
            </Card>
          ))
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color={theme.colors.text} />
        <Pressable onPress={() => navigation.navigate("Shortlist")}>
          <Ionicons name="heart-outline" size={24} color={theme.colors.muted} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={24} color={theme.colors.muted} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 120,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  brandBox: {
    alignItems: "center",
    backgroundColor: theme.colors.text,
    borderRadius: theme.radius.md,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  profileButton: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  greeting: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 40,
    marginBottom: 24,
  },
  greetingMuted: {
    color: "#9ca3af",
  },
  heroCard: {
    backgroundColor: theme.colors.text,
    borderWidth: 0,
    marginBottom: 28,
    padding: 24,
  },
  heroTitle: {
    color: theme.colors.surface,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  heroDescription: {
    color: "#d1d5db",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    maxWidth: 240,
  },
  heroButton: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.accent,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    marginTop: 6,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "700",
  },
  link: {
    color: theme.colors.muted,
    fontWeight: "600",
  },
  emptyCard: {
    alignItems: "center",
    borderStyle: "dashed",
    padding: 28,
  },
  emptyText: {
    color: theme.colors.muted,
    marginTop: 12,
    textAlign: "center",
  },
  recipientRow: {
    paddingBottom: 8,
  },
  recipientCard: {
    alignItems: "center",
    marginRight: 18,
    width: 104,
  },
  recipientAvatar: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceAlt,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    height: 76,
    justifyContent: "center",
    marginBottom: 10,
    width: 76,
  },
  recipientAvatarText: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "800",
  },
  addAvatar: {
    alignItems: "center",
    borderColor: theme.colors.border,
    borderRadius: theme.radius.pill,
    borderStyle: "dashed",
    borderWidth: 2,
    height: 76,
    justifyContent: "center",
    marginBottom: 10,
    width: 76,
  },
  recipientName: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  recipientMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  shortlistCard: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 14,
    padding: 16,
  },
  ideaIcon: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    height: 56,
    justifyContent: "center",
    marginRight: 14,
    width: 56,
  },
  ideaContent: {
    flex: 1,
  },
  ideaTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  ideaMeta: {
    color: theme.colors.muted,
  },
  bottomNav: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.96)",
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    left: 0,
    paddingVertical: 16,
    position: "absolute",
    right: 0,
  },
});
