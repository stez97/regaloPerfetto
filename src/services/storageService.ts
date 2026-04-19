import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "regaloperfetto_";

export const storage = {
  async get<T>(key: string): Promise<T | null> {
    const data = await AsyncStorage.getItem(`${PREFIX}${key}`);
    return data ? JSON.parse(data) as T : null;
  },

  async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(`${PREFIX}${key}`);
  },

  async clearNamespace(): Promise<void> {
    const keys = await AsyncStorage.getAllKeys();
    const namespacedKeys = keys.filter((key: string) => key.startsWith(PREFIX));

    if (namespacedKeys.length > 0) {
      await AsyncStorage.multiRemove(namespacedKeys);
    }
  },
};
