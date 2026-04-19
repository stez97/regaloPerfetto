import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ScreenProps } from "../navigation";
import { shortlistService } from "../services/shortlistService";
import { Product } from "../types";
import { theme } from "../theme";

export default function IdeaDetail({ route }: ScreenProps<"IdeaDetail">) {
  const { idea } = route.params;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function syncSavedState() {
      setIsSaved(await shortlistService.isSaved(idea.id));
    }

    void syncSavedState();
  }, [idea.id]);

  async function toggleSave() {
    if (isSaved) {
      await shortlistService.remove(idea.id);
      setIsSaved(false);
      return;
    }

    await shortlistService.add(idea);
    setIsSaved(true);
  }

  return (
    <View style={styles.screen}>
      <Header title="Dettaglio idea" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="gift-outline" size={38} color={theme.colors.surface} />
          </View>
          <Text style={styles.title}>{idea.title}</Text>
          <Text style={styles.summary}>{idea.summary}</Text>
          <View style={styles.tagsRow}>
            {idea.tags.map((tag: string) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle-outline" size={18} color={theme.colors.accent} />
            <Text style={styles.infoTitle}>Perché questo regalo?</Text>
          </View>
          <Text style={styles.reasoning}>{idea.reasoning}</Text>
        </Card>

        <Text style={styles.sectionTitle}>Prodotti consigliati</Text>
        {idea.products.map((product: Product) => (
          <Card key={product.name} style={styles.productCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productMerchant}>{product.merchant}</Text>
            </View>
            <View style={styles.productPriceWrap}>
              <Text style={styles.productPrice}>{product.price}</Text>
              <Text style={styles.productLink}>Compra</Text>
            </View>
          </Card>
        ))}

        <View style={styles.budgetBox}>
          <Ionicons name="checkmark-circle-outline" size={20} color={theme.colors.success} />
          <Text style={styles.budgetText}>Questa idea rispetta il tuo budget di {idea.priceRange}.</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button variant={isSaved ? "secondary" : "primary"} fullWidth size="lg" onPress={() => void toggleSave()}>
          {isSaved ? "Rimuovi dalla shortlist" : "Salva nella shortlist"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.surface,
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  hero: {
    backgroundColor: theme.colors.text,
    borderRadius: theme.radius.xl,
    marginBottom: 20,
    padding: 24,
  },
  heroIcon: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 24,
    height: 68,
    justifyContent: "center",
    marginBottom: 20,
    width: 68,
  },
  title: {
    color: theme.colors.surface,
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
  summary: {
    color: "#d1d5db",
    lineHeight: 22,
    marginBottom: 16,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  infoCard: {
    marginBottom: 20,
    padding: 20,
  },
  infoHeader: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  infoTitle: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.6,
    marginLeft: 8,
    textTransform: "uppercase",
  },
  reasoning: {
    color: theme.colors.muted,
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 22,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  productCard: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
    padding: 16,
  },
  productName: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  productMerchant: {
    color: theme.colors.muted,
  },
  productPriceWrap: {
    alignItems: "flex-end",
    marginLeft: 12,
  },
  productPrice: {
    color: theme.colors.text,
    fontWeight: "800",
    marginBottom: 4,
  },
  productLink: {
    color: theme.colors.accent,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  budgetBox: {
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: theme.radius.lg,
    flexDirection: "row",
    marginTop: 8,
    padding: 16,
  },
  budgetText: {
    color: theme.colors.muted,
    flex: 1,
    marginLeft: 10,
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
