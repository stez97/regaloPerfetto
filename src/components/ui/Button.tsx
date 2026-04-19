import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { theme } from "../../theme";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  children,
  onPress,
  disabled = false,
  fullWidth = false,
  variant = "primary",
  size = "md",
  isLoading = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === "primary" ? theme.colors.surface : theme.colors.text} />
      ) : (
        <Text style={[styles.label, variant === "primary" ? styles.labelPrimary : styles.labelDefault]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: theme.radius.pill,
    flexDirection: "row",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: theme.colors.text,
  },
  secondary: {
    backgroundColor: theme.colors.surfaceAlt,
  },
  outline: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.text,
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  sm: {
    minHeight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  md: {
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  lg: {
    minHeight: 56,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
  },
  labelPrimary: {
    color: theme.colors.surface,
  },
  labelDefault: {
    color: theme.colors.text,
  },
});
