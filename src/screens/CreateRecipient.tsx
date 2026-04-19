import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { ScreenProps } from "../navigation";
import { recipientService } from "../services/recipientService";
import { AgeRange, Relationship } from "../types";
import { theme } from "../theme";

const relationships: Relationship[] = [
  "Partner",
  "Amico / Amica",
  "Fratello / Sorella",
  "Mamma / Papà",
  "Collega",
  "Altro",
];

const ageRanges: AgeRange[] = ["18-24", "25-34", "35-44", "45-60", "60+"];

const suggestedInterests = [
  "Tecnologia",
  "Cucina",
  "Viaggi",
  "Sport",
  "Musica",
  "Arte",
  "Lettura",
  "Giardinaggio",
  "Moda",
  "Gaming",
  "Cinema",
  "Benessere",
  "Fai da te",
  "Fotografia",
];

export default function CreateRecipient({ navigation }: ScreenProps<"CreateRecipient">) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState<Relationship | "">("");
  const [ageRange, setAgeRange] = useState<AgeRange | "">("");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");

  function toggleInterest(interest: string) {
    if (interests.includes(interest)) {
      setInterests((current) => current.filter((value) => value !== interest));
      return;
    }

    if (interests.length < 7) {
      setInterests((current) => [...current, interest]);
    }
  }

  function addCustomInterest() {
    const normalized = customInterest.trim();

    if (!normalized || interests.includes(normalized) || interests.length >= 7) {
      return;
    }

    setInterests((current) => [...current, normalized]);
    setCustomInterest("");
  }

  async function handleSave() {
    if (!name || !relationship || !ageRange || interests.length < 3) {
      Alert.alert("Completa i campi", "Inserisci nome, relazione, fascia d'età e almeno 3 interessi.");
      return;
    }

    const newRecipient = await recipientService.create({
      name,
      relationship: relationship as Relationship,
      ageRange: ageRange as AgeRange,
      interests,
    });

    navigation.replace("GuidedSession", { recipientId: newRecipient.id });
  }

  const isValid = Boolean(name && relationship && ageRange && interests.length >= 3);

  return (
    <View style={styles.screen}>
      <Header title="Nuovo destinatario" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Come si chiama?</Text>
          <TextInput
            placeholder="Esempio: Giulia"
            placeholderTextColor="#9ca3af"
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Che rapporto avete?</Text>
          <View style={styles.chipsRow}>
            {relationships.map((item) => (
              <Chip key={item} label={item} selected={relationship === item} onPress={() => setRelationship(item)} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Quanti anni ha?</Text>
          <View style={styles.chipsRow}>
            {ageRanges.map((item) => (
              <Chip key={item} label={item} selected={ageRange === item} onPress={() => setAgeRange(item)} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.interestHeader}>
            <Text style={styles.label}>Cosa le piace?</Text>
            <Text style={styles.counter}>{interests.length}/7</Text>
          </View>
          <Text style={styles.helper}>Seleziona almeno 3 interessi per continuare.</Text>
          <View style={styles.chipsRow}>
            {suggestedInterests.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                selected={interests.includes(interest)}
                onPress={() => toggleInterest(interest)}
              />
            ))}
          </View>

          <View style={styles.customRow}>
            <TextInput
              placeholder="Aggiungi altro..."
              placeholderTextColor="#9ca3af"
              style={styles.customInput}
              value={customInterest}
              onChangeText={setCustomInterest}
              onSubmitEditing={addCustomInterest}
            />
            <Button size="sm" variant="outline" onPress={addCustomInterest}>
              Aggiungi
            </Button>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button fullWidth size="lg" disabled={!isValid} onPress={() => void handleSave()}>
          Continua
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
  section: {
    marginBottom: 28,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  nameInput: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 2,
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "800",
    paddingVertical: 10,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  counter: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  helper: {
    color: theme.colors.muted,
    marginBottom: 12,
  },
  customRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  customInput: {
    backgroundColor: "#f3f4f6",
    borderRadius: theme.radius.pill,
    color: theme.colors.text,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
