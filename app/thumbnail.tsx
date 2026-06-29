import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

export default function ThumbnailScreen() {
  const router = useRouter();
  const { idea, category } = useLocalSearchParams();

  const [aspect, setAspect] = useState<"16:9" | "9:16">("16:9");
  const [style, setStyle] = useState<"minimalist" | "striking">("striking");
  const [prompt, setPrompt] = useState<string>("");
  const [loadingImage, setLoadingImage] = useState(false);

  const aspectMap = {
    "16:9": "16:9 Youtube thumbnail",
    "9:16": "9:16 TikTok thumbnail",
  };

  const styleMap ={
    minimalist: "simple composition, clear focal point",
    striking: "eye-catching, bold colors, contrast",
  };

  const generatePrompt = () => {
    const finalPrompt = `Create a ${aspectMap[aspect]} on the title "${idea}" with ${styleMap[style]}. No unnecessary text, clickable.`.trim();

    setPrompt(finalPrompt);
  }

  const generateImage = async () => {
  try {
    setLoadingImage(true);

    const res = await fetch(
      "https://hvvnyldeapmgnmgqaedp.supabase.co/functions/v1/generate-thumbnail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return;
    }

    router.push({
      pathname: "/result",
      params: {
        image: data.imageBase64,
        mimeType: data.mimeType,
      },
    });
  } finally {
    setLoadingImage(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thumbnail Generator</Text>

      <Text style={styles.label}>Aspect Ratio</Text>
      <View style={styles.row}>
        <Pressable
          style={[
            styles.option,
            aspect === "16:9" && styles.selected,
            loadingImage && { opacity: 0.5 }
          ]}
          onPress={() => setAspect("16:9")}
          disabled={loadingImage}
        >
          <Text>16:9</Text>
        </Pressable>

        <Pressable
        style={[
          styles.option,
          aspect === "9:16" && styles.selected,
          loadingImage && { opacity: 0.5 }
        ]}
        onPress={() => setAspect("9:16")}
        disabled={loadingImage}
        >
          <Text>9:16</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Style</Text>
      <View style={styles.row}>
        <Pressable
          style={[
            styles.option,
            style === "minimalist" && styles.selected,
            loadingImage && {opacity: 0.5}
          ]}
          onPress={() => setStyle("minimalist")}
          disabled={loadingImage}
        >
          <Text>Minimalist</Text>
        </Pressable>

          <Pressable
            style={[
              styles.option,
              style === "striking" && styles.selected,
              loadingImage && { opacity: 0.5 }
            ]}
            onPress={() => setStyle("striking")}
            disabled={loadingImage}
          >
            <Text>Striking</Text>
          </Pressable>
      </View>

      <Pressable style={[
        styles.button,
        loadingImage && { opacity: 0.5 }
        ]}
        onPress={generatePrompt}
        disabled={loadingImage}
        >
          <Text style={styles.buttonText}>Generate Prompt</Text>
        </Pressable>

        {prompt ? (
          <View style={styles.output}>
            <Text style={styles.outputTitle}>Generated Prompt:</Text>
            <Text style={styles.promptText}>{prompt}</Text>
          </View>
        ) : null}

        {prompt ? (
          <Pressable
            style={[
              styles.button,
              loadingImage && { opacity: 0.6 }
            ]}
            onPress={generateImage}
            disabled={loadingImage}
          >
            {loadingImage ? (
              <ActivityIndicator color="white"/>
            ) : (
                <Text style={styles.buttonText}>Generate Thumbnail</Text>
            )}

          </Pressable>
        ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#090C9B",
    borderRadius: 8,
    backgroundColor: "white",
  },
  selected: {
    backgroundColor: "#3D52D5",
    borderColor: "#090C9B",
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#090C9B",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  output: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  outputTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  promptText: {
    fontSize: 12,
    color: "#333",
  },
})
