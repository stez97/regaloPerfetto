import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "../navigation";
import { storage } from "../services/storageService";
import { theme } from "../theme";
import { Button } from "../components/ui/Button";

const slides = [
  {
    title: "Trova regali che contano",
    description: "Dimentica i regali banali. Scopri idee pensate appositamente per chi ami.",
    image: "https://picsum.photos/seed/gift1/900/1600",
  },
  {
    title: "Lasciati guidare",
    description: "Poche domande mirate per capire gusti, budget e occasione.",
    image: "https://picsum.photos/seed/gift2/900/1600",
  },
  {
    title: "Scegli con fiducia",
    description: "Salva le migliori idee e confrontale con calma prima di decidere.",
    image: "https://picsum.photos/seed/gift3/900/1600",
  },
];

export default function Onboarding({ navigation }: ScreenProps<"Onboarding">) {
  const [currentSlide, setCurrentSlide] = useState(0);

  async function handleNext() {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((value) => value + 1);
      return;
    }

    await storage.set("onboarding_completed", true);
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  }

  return (
    <ImageBackground source={{ uri: slides[currentSlide].image }} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{slides[currentSlide].title}</Text>
          <Text style={styles.description}>{slides[currentSlide].description}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {slides.map((slide, index) => (
              <View key={slide.title} style={[styles.dot, index === currentSlide && styles.dotActive]} />
            ))}
          </View>
          <Button fullWidth size="lg" onPress={() => void handleNext()}>
            {currentSlide === slides.length - 1 ? "Inizia ora" : "Continua"}
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    marginTop: "auto",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    color: theme.colors.surface,
    fontSize: 38,
    fontWeight: "800",
    marginBottom: 12,
  },
  description: {
    color: "#f3f4f6",
    fontSize: 18,
    lineHeight: 28,
  },
  footer: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  dots: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    backgroundColor: "#d1d5db",
    borderRadius: theme.radius.pill,
    height: 6,
    marginRight: 8,
    width: 10,
  },
  dotActive: {
    backgroundColor: theme.colors.text,
    width: 28,
  },
});
