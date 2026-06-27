import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function IdeaScreen() {
    const { category} = useLocalSearchParams();
    const [input, setInput] = useState("");

    const useAI = async () => {
        try {
            const res = await fetch(
                "https://hvvnyldeapmgnmgqaedp.supabase.co/functions/v1/generate-ideas",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        category,
                    }),
                }
            );

            const data = await res.json();

            router.push({
                pathname: "/ideas",
                params: {
                    ideas: data.ideas,
                    category,
                },
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    const ownIdea = () => {
        if (!input) return;

        router.push({
            pathname: "/thumbnail",
            params: {
                idea: input,
                category,
            }
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Category : { category }
            </Text>

            <Pressable onPress={useAI} style={styles.button}>
                <Text style={styles.buttonText}>Generate AI Ideas</Text>
            </Pressable>

            <Text style={{ textAlign: "center", fontSize: 20 }}>
                OR
            </Text>

            <TextInput
                placeholder="Write your own video idea..."
                value={input}
                multiline
                numberOfLines={4}
                maxLength={200}
                textAlignVertical="top"
                onChangeText={setInput}
                style={styles.input}
            />

            <Text style={{ alignSelf: "flex-end", paddingRight: 20, color: "#666" }}>
                {input.length}/200
            </Text>

            <Pressable onPress={ownIdea} style={styles.button}>
                <Text style={styles.buttonText}>Use my own idea</Text>
            </Pressable>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8"
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
        padding: 16,
        backgroundColor: "#3D52D5",
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#090C9B",
        textAlign: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "#F8F8F8"
  },
  input: {
    borderWidth: 1,
    borderColor: "#090C9B",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    maxWidth: 320,

    height: 100,
    maxHeight: 160,
  }
})
