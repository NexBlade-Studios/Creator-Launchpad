import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
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
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#090C9B",
    borderRadius: 10,
  }
})
