import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/ui/Header";
import { ScreenProps } from "../navigation";
import { storage } from "../services/storageService";
import { theme } from "../theme";

const menuItems = [
  { icon: "person-outline", label: "Profilo", detail: "Gestisci i tuoi dati" },
  { icon: "notifications-outline", label: "Notifiche", detail: "Promemoria compleanni" },
  { icon: "shield-outline", label: "Privacy", detail: "Sicurezza e dati" },
  { icon: "help-circle-outline", label: "Supporto", detail: "Domande frequenti" },
] as const;

export default function Settings({ navigation }: ScreenProps<"Settings">) {
  function handleReset() {
    Alert.alert("Reset dati", "Sei sicuro di voler resettare tutti i dati salvati nell'app?", [
      { text: "Annulla", style: "cancel" },
      {
        text: "Resetta",
        style: "destructive",
        onPress: () => {
          void storage.clearNamespace().then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Onboarding" }],
            });
          });
        },
      },
    ]);
  }

  return (
    <View style={styles.screen}>
      <Header title="Impostazioni" />

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Ionicons name="person-outline" size={32} color={theme.colors.text} />
          </View>
          <View>
            <Text style={styles.profileName}>Utente Demo</Text>
            <Text style={styles.profileEmail}>demo@regaloperfetto.app</Text>
          </View>
        </View>

        <View>
          {menuItems.map((item) => (
            <View key={item.label} style={styles.menuCard}>
              <View style={styles.menuLeft}>
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={20} color={theme.colors.muted} />
                </View>
                <View>
                  <Text style={styles.menuTitle}>{item.label}</Text>
                  <Text style={styles.menuDetail}>{item.detail}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.muted} />
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle-outline" size={18} color={theme.colors.text} />
            <Text style={styles.infoTitle}>Info prototipo</Text>
          </View>
          <Text style={styles.infoText}>
            Questa versione usa dati locali e un motore di raccomandazione simulato per funzionare in Expo Go.
          </Text>
          <Text style={styles.infoVersion}>Versione 1.0.0</Text>
        </View>

        <Pressable onPress={handleReset} style={styles.resetButton}>
          <Ionicons name="trash-outline" size={18} color={theme.colors.danger} />
          <Text style={styles.resetText}>Resetta tutti i dati</Text>
        </Pressable>
      </View>
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
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 24,
    padding: 16,
  },
  profileAvatar: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.pill,
    height: 64,
    justifyContent: "center",
    marginRight: 16,
    width: 64,
  },
  profileName: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  profileEmail: {
    color: theme.colors.muted,
    marginTop: 4,
  },
  menuCard: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: 16,
  },
  menuLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  menuIcon: {
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: theme.radius.md,
    height: 40,
    justifyContent: "center",
    marginRight: 14,
    width: 40,
  },
  menuTitle: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  menuDetail: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 4,
    textTransform: "uppercase",
  },
  infoBox: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.xl,
    marginTop: 8,
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
    letterSpacing: 1,
    marginLeft: 8,
    textTransform: "uppercase",
  },
  infoText: {
    color: theme.colors.muted,
    lineHeight: 22,
  },
  infoVersion: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 12,
  },
  resetButton: {
    alignItems: "center",
    borderColor: "#fecaca",
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    padding: 16,
  },
  resetText: {
    color: theme.colors.danger,
    fontWeight: "800",
    marginLeft: 8,
  },
});
