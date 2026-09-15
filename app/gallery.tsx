import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";

import {
    deleteThumbnail,
    getThumbnails,
    SavedThumbnail,
} from "../utils/galleryStorage";

export default function GalleryScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const router = useRouter();

    const [thumbnails, setThumbnails] = useState<SavedThumbnail[]>([]);

    const loadThumbnails = async () => {
        const saved = await getThumbnails();
        setThumbnails(saved);
    };

    useFocusEffect(
        useCallback(() => {
            loadThumbnails();
        }, []),
    );

    const removeThumbnail = (id: string) => {
        Alert.alert(
            "Delete thumbnail?",
            "This cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await deleteThumbnail(id);
                        loadThumbnails();
                    },
                },
            ],
        );
    };

    return (
        <View
            style={[styles.container, {
                backgroundColor: isDark ? "#111111" : "#F8F8F8",
            }]}
        >
            <Text
                style={[styles.title, { color: isDark ? "#F8F8F8" : "111111" }]}
            >
                My Gallery
            </Text>

            {thumbnails.length === 0
                ? (
                    <View style={styles.empty}>
                        <Text
                            style={[
                                styles.emptyTitle,
                                {
                                    color: isDark ? "#111111" : "#F8F8F8",
                                },
                            ]}
                        >
                            No thumbnails yet
                        </Text>

                        <Text style={styles.emptyText}>
                            Generate a thumbnail and it will appear here.
                        </Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => router.push("/category")}
                        >
                            <Text style={styles.buttonText}>
                                Create Thumbnail
                            </Text>
                        </Pressable>
                    </View>
                )
                : (
                    <FlatList
                        data={thumbnails}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.list}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Pressable
                                    onPress={() =>
                                        router.push({
                                            pathname: "/result",
                                            params: {
                                                imageUri: item.imageUri,
                                                prompt: item.prompt,
                                                mimeType: item.mimeType,
                                            },
                                        })}
                                >
                                    <Image
                                        source={{
                                            uri: item.imageUri,
                                        }}
                                        style={styles.thumbnail}
                                        resizeMode="cover"
                                    />

                                    <View style={styles.cardContent}>
                                        <Text style={styles.category}>
                                            {item.category}
                                        </Text>
                                        <Text
                                            style={styles.prompt}
                                            numberOfLines={3}
                                        >
                                            {item.prompt}
                                        </Text>
                                    </View>
                                </Pressable>

                                <Pressable
                                    style={styles.deleteButton}
                                    onPress={() => removeThumbnail(item.id)}
                                >
                                    <Text style={styles.deleteText}>
                                        Delete
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                    />
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },
    list: {
        paddingBottom: 30,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 15,
    },
    card: {
        width: "48%",
        backgroundColor: "white",
        borderRadius: 12,
        overflow: "hidden",
    },
    thumbnail: {
        width: "100%",
        height: 120,
    },
    cardContent: {
        padding: 10,
    },
    category: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#3D52D5",
        marginBottom: 5,
    },
    prompt: {
        fontSize: 12,
        color: "#333",
    },
    deleteButton: {
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        alignItems: "center",
    },
    deleteText: {
        color: "#cc3333",
        fontSize: 12,
        fontWeight: "600",
    },
    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    emptyText: {
        color: "#777",
        textAlign: "center",
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
