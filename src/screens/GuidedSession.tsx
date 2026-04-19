import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { ScreenProps } from "../navigation";
import { recipientService } from "../services/recipientService";
import { Occasion, Recipient } from "../types";
import { theme } from "../theme";

const occasions: Occasion[] = [
  "Compleanno",
  "Natale",
  "Anniversario",
  "San Valentino",
  "Festa della mamma",
  "Festa del papà",
  "Laurea",
  "Nascita",
];

const budgets = [
  { label: "20€ - 50€", min: 20, max: 50 },
  { label: "50€ - 100€", min: 50, max: 100 },
  { label: "100€ - 200€", min: 100, max: 200 },
  { label: "200€ - 500€", min: 200, max: 500 },
];

export default function GuidedSession({ navigation, route }: ScreenProps<"GuidedSession">) {
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState<Occasion | "">("");
  const [budget, setBudget] = useState({ min: 20, max: 100 });
  const [praticoVsEmotivo, setPraticoVsEmotivo] = useState<"pratico" | "emotivo" | null>(null);
  const [esperienzaVsOggetto, setEsperienzaVsOggetto] = useState<"esperienza" | "oggetto" | null>(null);

  useEffect(() => {
    async function loadRecipient() {
      const nextRecipient = await recipientService.getById(route.params.recipientId);

      if (!nextRecipient) {
        navigation.replace("Home");
        return;
      }

      setRecipient(nextRecipient);
    }

    void loadRecipient();
  }, [navigation, route.params.recipientId]);

  if (!recipient) {
    return (
      <View style={styles.screen}>
        <Header title="Prepariamo la ricerca" />
      </View>
    );
  }

  function handleNext() {
    if (!recipient) {
      return;
    }

    if (step < 3) {
      setStep((value) => value + 1);
      return;
    }

    navigation.navigate("Results", {
      recipient,
      session: {
        recipientId: route.params.recipientId,
        occasion: occasion as Occasion,
        budget,
        preferences: {
          praticoVsEmotivo: praticoVsEmotivo ?? undefined,
          esperienzaVsOggetto: esperienzaVsOggetto ?? undefined,
        },
      },
    });
  }

  const isDisabled =
    (step === 1 && !occasion) ||
    (step === 2 && !budget.max) ||
    (step === 3 && (!praticoVsEmotivo || !esperienzaVsOggetto));

  return (
    <View style={styles.screen}>
      <Header title={`Per ${recipient.name}`} />

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 ? (
          <View>
            <Text style={styles.title}>Qual è l'occasione?</Text>
            <Text style={styles.subtitle}>Ci aiuta a dare il giusto tono al regalo.</Text>
            <View style={styles.chipsRow}>
              {occasions.map((item) => (
                <Chip key={item} label={item} selected={occasion === item} onPress={() => setOccasion(item)} />
              ))}
            </View>
          </View>
        ) : null}

        {step === 2 ? (
          <View>
            <Text style={styles.title}>Qual è il tuo budget?</Text>
            <Text style={styles.subtitle}>Scegli una fascia di prezzo indicativa.</Text>
            {budgets.map((item) => {
              const selected = budget.min === item.min && budget.max === item.max;

              return (
                <Pressable
                  key={item.label}
                  onPress={() => setBudget({ min: item.min, max: item.max })}
                  style={[styles.optionCard, selected && styles.optionCardSelected]}
                >
                  <Text style={styles.optionTitle}>{item.label}</Text>
                  <Text style={styles.optionSubtitle}>Una fascia adatta alla tua ricerca attuale.</Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}

        {step === 3 ? (
          <View>
            <Text style={styles.title}>Ultime preferenze</Text>
            <Text style={styles.subtitle}>Queste scelte aiutano a raffinare le idee.</Text>

            <Text style={styles.groupLabel}>Tipo di regalo</Text>
            <View style={styles.dualRow}>
              <Pressable
                onPress={() => setPraticoVsEmotivo("pratico")}
                style={[styles.optionCard, styles.dualCard, praticoVsEmotivo === "pratico" && styles.optionCardSelected]}
              >
                <Text style={styles.optionTitle}>Pratico</Text>
                <Text style={styles.optionSubtitle}>Qualcosa di utile nel quotidiano.</Text>
              </Pressable>
              <Pressable
                onPress={() => setPraticoVsEmotivo("emotivo")}
                style={[styles.optionCard, styles.dualCard, praticoVsEmotivo === "emotivo" && styles.optionCardSelected]}
              >
                <Text style={styles.optionTitle}>Emotivo</Text>
                <Text style={styles.optionSubtitle}>Qualcosa che tocchi il cuore.</Text>
              </Pressable>
            </View>

            <Text style={styles.groupLabel}>Formato</Text>
            <View style={styles.dualRow}>
              <Pressable
                onPress={() => setEsperienzaVsOggetto("oggetto")}
                style={[styles.optionCard, styles.dualCard, esperienzaVsOggetto === "oggetto" && styles.optionCardSelected]}
              >
                <Text style={styles.optionTitle}>Oggetto</Text>
                <Text style={styles.optionSubtitle}>Un prodotto fisico da scartare.</Text>
              </Pressable>
              <Pressable
                onPress={() => setEsperienzaVsOggetto("esperienza")}
                style={[
                  styles.optionCard,
                  styles.dualCard,
                  esperienzaVsOggetto === "esperienza" && styles.optionCardSelected,
                ]}
              >
                <Text style={styles.optionTitle}>Esperienza</Text>
                <Text style={styles.optionSubtitle}>Un momento da vivere.</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <Button fullWidth size="lg" disabled={isDisabled} onPress={handleNext}>
          {step === 3 ? "Genera idee" : "Continua"}
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
  progressTrack: {
    backgroundColor: "#e5e7eb",
    height: 4,
    marginHorizontal: 24,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: theme.colors.text,
    height: 4,
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    marginBottom: 12,
    padding: 18,
  },
  optionCardSelected: {
    backgroundColor: "#f3f4f6",
    borderColor: theme.colors.text,
  },
  optionTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  optionSubtitle: {
    color: theme.colors.muted,
    lineHeight: 20,
  },
  groupLabel: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 12,
    textTransform: "uppercase",
  },
  dualRow: {
    flexDirection: "row",
    gap: 12,
  },
  dualCard: {
    flex: 1,
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
