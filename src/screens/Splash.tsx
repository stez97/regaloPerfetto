import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export default function Splash() {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons name="gift-outline" size={38} color={theme.colors.text} />
      </View>
      <Text style={styles.title}>RegaloPerfetto</Text>
      <Text style={styles.subtitle}>L'arte di sorprendere</Text>
      <ActivityIndicator style={styles.loader} color={theme.colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.text,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  iconBox: {
    alignItems: "center",
    backgroundColor: theme.colors.accent,
    borderRadius: 28,
    height: 88,
    justifyContent: "center",
    marginBottom: 24,
    width: 88,
  },
  title: {
    color: theme.colors.surface,
    fontSize: 34,
    fontWeight: "800",
  },
  subtitle: {
    color: "#d6d3d1",
    letterSpacing: 2,
    marginTop: 8,
    textTransform: "uppercase",
  },
  loader: {
    marginTop: 40,
  },
});
