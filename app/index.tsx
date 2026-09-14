import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111111" : "#F8F8F8" },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: isDark ? "#F8f8f8" : "#111111" },
        ]}
      >
        Creator Launchpad
      </Text>
      <Pressable
        onPress={() => router.push("/category")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#090C9B",
    borderRadius: 10,
  },
  buttonText: {
    color: "#F8F8F8",
  },
});
