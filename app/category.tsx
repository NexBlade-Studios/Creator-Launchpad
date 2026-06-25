import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const categories =["Gaming", "Tech", "Education", "Finance", "Travel", "Fitness", "Comedy"];

export default function CategoryScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Choose your niche</Text>
            <View style={styles.grid}>
                {categories.map((c) => (
                    <Pressable
                        key={c}
                        onPress={() => 
                            router.push({
                                pathname: "/idea",
                                params: { category: c}
                            })
                        }
                        style={styles.button}
                    >
                        <Text style={{ color: "white"}}>{c}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8F8F8",
        padding: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: 320,
        gap: 12,
    },
    text: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,  
    },
    button: {
        padding: 16,
        backgroundColor: "#3D52D5",
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#090C9B",
        textAlign: "center",
    }
})