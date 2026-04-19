import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ScreenProps } from "../navigation";
import { shortlistService } from "../services/shortlistService";
import { GiftIdea } from "../types";
import { theme } from "../theme";

export default function Shortlist({ navigation }: ScreenProps<"Shortlist">) {
  const isFocused = useIsFocused();
  const [items, setItems] = useState<GiftIdea[]>([]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    async function loadItems() {
      setItems(await shortlistService.getAll());
    }

    void loadItems();
  }, [isFocused]);

  async function handleRemove(id: string) {
    await shortlistService.remove(id);
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <View style={styles.screen}>
      <Header title="La tua shortlist" />
      <ScrollView contentContainerStyle={styles.content}>
        {items.length === 0 ? (
          <View style={styles.emptyWrap}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="heart-outline" size={28} color={theme.colors.muted} />
            </View>
            <Text style={styles.emptyTitle}>Ancora nulla qui</Text>
            <Text style={styles.emptyText}>
              Salva le idee che ti piacciono di più per confrontarle e scegliere con calma.
            </Text>
            <Button variant="outline" onPress={() => navigation.navigate("Home")}>
              Inizia a cercare
            </Button>
          </View>
        ) : (
          <View>
            <Text style={styles.countText}>
              Hai salvato {items.length} {items.length === 1 ? "idea" : "idee"}.
            </Text>
            {items.map((idea) => (
              <Card
                key={idea.id}
                style={styles.ideaCard}
                onPress={() => navigation.navigate("IdeaDetail", { idea })}
              >
                <View style={styles.ideaIcon}>
                  <Ionicons name="gift-outline" size={22} color={theme.colors.text} />
                </View>
                <View style={styles.ideaBody}>
                  <Text style={styles.ideaTitle}>{idea.title}</Text>
                  <Text style={styles.ideaSummary}>{idea.summary}</Text>
                  <Text style={styles.ideaPrice}>{idea.priceRange}</Text>
                </View>
                <Pressable onPress={() => void handleRemove(idea.id)} style={styles.removeButton}>
                  <Ionicons name="trash-outline" size={20} color={theme.colors.muted} />
                </Pressable>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  emptyWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyIconWrap: {
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: theme.radius.pill,
    height: 72,
    justifyContent: "center",
    marginBottom: 20,
    width: 72,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
  },
  emptyText: {
    color: theme.colors.muted,
    lineHeight: 22,
    marginBottom: 24,
    maxWidth: 260,
    textAlign: "center",
  },
  countText: {
    color: theme.colors.muted,
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
    height: 56,
    justifyContent: "center",
    marginRight: 14,
    width: 56,
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
    marginBottom: 8,
  },
  ideaPrice: {
    color: theme.colors.text,
    fontWeight: "700",
  },
  removeButton: {
    paddingLeft: 12,
    paddingTop: 4,
  },
});
