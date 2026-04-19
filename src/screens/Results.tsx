import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ScreenProps } from "../navigation";
import { recommendationService } from "../services/recommendationService";
import { shortlistService } from "../services/shortlistService";
import { GiftIdea } from "../types";
import { theme } from "../theme";

export default function Results({ navigation, route }: ScreenProps<"Results">) {
  const [loading, setLoading] = useState(true);
  const [ideas, setIdeas] = useState<GiftIdea[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadResults() {
      setLoading(true);

      try {
        const [nextIdeas, shortlist] = await Promise.all([
          recommendationService.getRecommendations(route.params.session, route.params.recipient),
          shortlistService.getAll(),
        ]);

        setIdeas(nextIdeas);
        setSavedIds(shortlist.map((item) => item.id));
      } finally {
        setLoading(false);
      }
    }

    void loadResults();
  }, [route.params.recipient, route.params.session]);

  async function toggleSave(idea: GiftIdea) {
    if (savedIds.includes(idea.id)) {
      await shortlistService.remove(idea.id);
      setSavedIds((current) => current.filter((id) => id !== idea.id));
      return;
    }

    await shortlistService.add(idea);
    setSavedIds((current) => [...current, idea.id]);
  }

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <View style={styles.loadingIcon}>
          <Ionicons name="sparkles-outline" size={34} color={theme.colors.accent} />
        </View>
        <Text style={styles.loadingTitle}>Analizziamo i gusti di {route.params.recipient.name}...</Text>
        <Text style={styles.loadingText}>
          Stiamo cercando le idee più adatte alla tua occasione e al budget selezionato.
        </Text>
        <ActivityIndicator color={theme.colors.text} style={{ marginTop: 20 }} />
      </View>
    );
  }

  const topPick = ideas[0];
  const otherIdeas = ideas.slice(1);

  return (
    <View style={styles.screen}>
      <Header title="Idee per te" />
      <ScrollView contentContainerStyle={styles.content}>
        {topPick ? (
          <View style={styles.section}>
            <Text style={styles.badge}>La nostra scelta</Text>
            <Card onPress={() => navigation.navigate("IdeaDetail", { idea: topPick })} style={styles.topPickCard}>
              <View style={styles.topPickHeader}>
                <View style={styles.topPickIcon}>
                  <Ionicons name="gift-outline" size={28} color={theme.colors.surface} />
                </View>
                <Pressable onPress={() => void toggleSave(topPick)} style={styles.saveButton}>
                  <Ionicons
                    name={savedIds.includes(topPick.id) ? "heart" : "heart-outline"}
                    size={22}
                    color={savedIds.includes(topPick.id) ? theme.colors.danger : theme.colors.surface}
                  />
                </Pressable>
              </View>
              <Text style={styles.topPickTitle}>{topPick.title}</Text>
              <Text style={styles.topPickSummary}>{topPick.summary}</Text>
              <View style={styles.tagsRow}>
                {topPick.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.topPickPrice}>{topPick.priceRange}</Text>
            </Card>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Altre proposte</Text>
          {otherIdeas.map((idea) => (
            <Card key={idea.id} onPress={() => navigation.navigate("IdeaDetail", { idea })} style={styles.ideaCard}>
              <View style={styles.ideaIcon}>
                <Ionicons name="gift-outline" size={22} color={theme.colors.text} />
              </View>
              <View style={styles.ideaBody}>
                <Text style={styles.ideaTitle}>{idea.title}</Text>
                <Text style={styles.ideaSummary}>{idea.summary}</Text>
                <Text style={styles.ideaPrice}>{idea.priceRange}</Text>
              </View>
              <Pressable onPress={() => void toggleSave(idea)} style={styles.ideaSaveButton}>
                <Ionicons
                  name={savedIds.includes(idea.id) ? "heart" : "heart-outline"}
                  size={20}
                  color={savedIds.includes(idea.id) ? theme.colors.danger : theme.colors.muted}
                />
              </Pressable>
            </Card>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button variant="outline" fullWidth onPress={() => navigation.navigate("CreateRecipient")}>
          Nuova ricerca
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  loadingScreen: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    flex: 1,
    justifyContent: "center",
    padding: 32,
  },
  loadingIcon: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: 24,
    height: 72,
    justifyContent: "center",
    marginBottom: 24,
    width: 72,
  },
  loadingTitle: {
    color: theme.colors.text,
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  loadingText: {
    color: theme.colors.muted,
    lineHeight: 22,
    textAlign: "center",
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 24,
  },
  badge: {
    color: theme.colors.accent,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  topPickCard: {
    backgroundColor: theme.colors.text,
    borderWidth: 0,
    padding: 22,
  },
  topPickHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  topPickIcon: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 18,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: theme.radius.pill,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  topPickTitle: {
    color: theme.colors.surface,
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 8,
  },
  topPickSummary: {
    color: "#d1d5db",
    lineHeight: 22,
    marginBottom: 18,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: theme.radius.pill,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    color: theme.colors.surface,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  topPickPrice: {
    color: theme.colors.surface,
    fontSize: 16,
    fontWeight: "700",
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  ideaCard: {
    flexDirection: "row",
    marginBottom: 14,
    padding: 16,
  },
  ideaIcon: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    height: 52,
    justifyContent: "center",
    marginRight: 14,
    width: 52,
  },
  ideaBody: {
    flex: 1,
  },
  ideaTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  ideaSummary: {
    color: theme.colors.muted,
    lineHeight: 20,
    marginBottom: 10,
  },
  ideaPrice: {
    color: theme.colors.text,
    fontWeight: "700",
  },
  ideaSaveButton: {
    paddingLeft: 12,
    paddingTop: 4,
  },
  footer: {
    backgroundColor: theme.colors.surface,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    bottom: 0,
    left: 0,
    padding: 24,
    position: "absolute",
    right: 0,
  },
});
