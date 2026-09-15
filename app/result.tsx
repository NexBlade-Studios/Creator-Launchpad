import { useLocalSearchParams } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

export default function ThumbnailResult() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const { image, imageUri, mimeType, prompt } = useLocalSearchParams<{
    image?: string;
    imageUri?: string;
    mimeType?: string;
    prompt?: string;
  }>();

  const uri = imageUri ? imageUri : `data:${mimeType};base64,${image}`;

  const downloadImage = async () => {
    try {
      let fileUri = imageUri;

      if (!fileUri && image) {
        fileUri = `${FileSystem.cacheDirectory}thumbnail.png`;

        await FileSystem.writeAsStringAsync(
          fileUri,
          image,
          {
            encoding: "base64",
          },
        );
      }

      if (!fileUri) {
        alert("Image not found");
        return;
      }

      const available = await Sharing.isAvailableAsync();

      if (!available) {
        alert("Sharing not available on this device");
        return;
      }

      await Sharing.shareAsync(fileUri);
    } catch (e) {
      console.error(e);
      alert("Export failed");
    }
  };

  return (
    <View
      style={[styles.container, {
        backgroundColor: isDark ? "#111111" : "#F8F8F8",
      }]}
    >
      <Text style={[styles.title, { color: isDark ? "#F8F8F8" : "#111111" }]}>
        Your Thumbnail
      </Text>

      <Image source={{ uri }} style={styles.image} resizeMode="contain" />

      {prompt
        ? (
          <View style={styles.promptBox}>
            <Text style={styles.promptTitle}>Prompt</Text>

            <Text style={styles.promptText}>{prompt}</Text>
          </View>
        )
        : null}

      <Pressable style={styles.button} onPress={downloadImage}>
        <Text style={styles.buttonText}>Export Thumbnail</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  button: {
    padding: 12,
    backgroundColor: "#090C9B",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  promptBox: {
    width: "100%",
    maxWidth: 400,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  promptTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  promptText: {
    fontSize: 12,
    color: "#333",
  },
});
