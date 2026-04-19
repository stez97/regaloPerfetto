import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { theme } from "../../theme";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.base, selected ? styles.selected : styles.idle, pressed && styles.pressed]}>
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    marginBottom: 10,
    marginRight: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  idle: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  selected: {
    backgroundColor: theme.colors.text,
    borderColor: theme.colors.text,
  },
  pressed: {
    opacity: 0.9,
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  selectedLabel: {
    color: theme.colors.surface,
  },
});
