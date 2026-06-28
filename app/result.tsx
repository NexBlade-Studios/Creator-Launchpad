import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

export default function ThumbnailResult() {
  const { image, mimeType } = useLocalSearchParams<{
    image: string;
    mimeType: string;
  }>();

  const uri = `data:${mimeType};base64,${image}`;

  const downloadImage = async () => {
  try {
    const fileUri = FileSystem.cacheDirectory + "thumbnail.png";

    await FileSystem.writeAsStringAsync(fileUri, image, {
      encoding: "base64",
    });

    const available = await Sharing.isAvailableAsync();

    if (!available) {
      alert("Sharing not available");
      return;
    }

    await Sharing.shareAsync(fileUri);
  } catch (e) {
    console.error(e);
    alert("Export failed");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Thumbnail</Text>

      <Image source={{ uri }} style={styles.image} resizeMode="contain" />

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
});