import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GiftIdea, GuidedSession, Recipient } from "./types";

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  CreateRecipient: undefined;
  GuidedSession: { recipientId: string };
  Results: { recipient: Recipient; session: GuidedSession };
  IdeaDetail: { idea: GiftIdea };
  Shortlist: undefined;
  Settings: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
