import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSettings?: boolean;
  onBack?: () => void;
}

export function Header({ title, showBack = true, showSettings = false, onBack }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.left}>
          {showBack ? (
            <Pressable
              onPress={onBack ?? (() => navigation.goBack())}
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
            >
              <Ionicons name="chevron-back" size={22} color={theme.colors.text} />
            </Pressable>
          ) : (
            <View style={styles.placeholder} />
          )}
          {title ? <Text style={styles.title}>{title}</Text> : null}
        </View>

        {showSettings ? (
          <Pressable
            onPress={() => navigation.navigate("Settings" as never)}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <Ionicons name="settings-outline" size={20} color={theme.colors.text} />
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.surface,
  },
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  left: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 12,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.pill,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  pressed: {
    opacity: 0.9,
  },
  placeholder: {
    height: 40,
    width: 40,
  },
});
