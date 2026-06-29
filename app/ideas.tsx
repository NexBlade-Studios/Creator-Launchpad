import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function GeneratedIdeasScreen() {
    const { ideas, category } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);

    const [ideaList, setIdeaList] = useState<string[]>(
        () =>
            String(ideas)
                .split("\n")
                .map((idea) => idea.replace(/^\d+\.\s*/, "").trim())
                .filter(Boolean)
    )

    const generateMore = async () => {
        if (loading) return;
        
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

            const newIdeas = String(data.ideas)
                .split("\n")
                .map((idea) => idea.replace(/^\d+\.\s*/, "").trim())
                .filter(Boolean)
                
            setIdeaList(newIdeas);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    const useIdea = (idea: string) => {
        Alert.alert(
            "Generate thumbnail?",
            idea,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes",
                    onPress: () => {
                        router.push({
                            pathname: "/thumbnail",
                            params: {
                                idea,
                                category,
                            },
                        });
                    },
                },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Generated Ideas</Text>

            {ideaList.map((idea, index) => (
                <Pressable style={styles.card}
                    key={index}
                    onPress={() => useIdea(idea)}
                >
                    <Text style={styles.card_text}>{idea}</Text>
                </Pressable>
            ))}

            <Pressable style={[
                styles.more_button,
                loading && { opacity: 0.6}
                ]}
                onPress={generateMore}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) :(
                    <Text style={styles.more_text}>Generate more?</Text>
                )}
            </Pressable>
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
    },
    more_text: {
        color: "white",
        fontWeight: 600,
    },
    more_button: {
        marginTop: 20,
        padding: 14,
        backgroundColor: "#090C9B",
        borderRadius: 10,
        width: "100%",
        maxWidth: 320,
        alignItems: "center",
    }
})