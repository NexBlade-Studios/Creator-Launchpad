import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GeneratedIdeasScreen() {
    const { ideas, category } = useLocalSearchParams();

    // const parsedIdeas = String(ideas)
    // .split("\n")
    // .map((idea) => idea.replace(/^\d+\.\s*/, "").trim())
    // .filter(Boolean);

    const parsedIdeas = [
    "I built a gaming PC with AI",
    "Can AI predict viral videos?",
    "I tried becoming pro in 7 days",
    "AI decides my next YouTube video",
    ];

    const [selected, setSelected] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Generated Ideas</Text>

            {parsedIdeas.map((idea, index) => (
                <Pressable style={styles.card}
                key={index}
                onPress={() => {
                    setSelected(idea);
                    router.push({
                        pathname: "/thumbnail",
                        params: {
                            idea,
                            category,
                        },
                    });
                }}
            >
                <Text style={styles.card_text}>{idea}</Text>
            </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 12,
        flex: 1,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#3D52D5",
        borderColor: "#090C9B",
        borderWidth: 2,
        width: "100%",
        maxWidth : 320,
    },
    card_text: {
        fontSize: 16,
        fontWeight: "500",
        color: "#ffff",
    },
    text: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,  
    }
})