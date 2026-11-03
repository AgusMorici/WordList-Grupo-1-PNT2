import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, View, Platform, StatusBar, Pressable } from "react-native";
import { router } from "expo-router";
import HomeFlatList from "../components/HomeFlatList";
import { getWords } from "../services/words";

const Index = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWords()
      .then((data) => setWords(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FE6B00" />
        <Text style={styles.loadingText}>Cargando diccionario...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.playButton} onPress={() => router.push("/game")}>
        <Text style={styles.playText}>Jugar</Text>
      </Pressable>
      <HomeFlatList words={words} />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === "android" ? 20 : 0,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F9FB",
  },
  loadingText: {
    marginTop: 10,
    color: "#44474D",
    fontWeight: "600",
  },
  playButton: {
    margin: 16,
    padding: 14,
    backgroundColor: "#FE6B00",
    borderRadius: 12,
    alignItems: "center",
  },
  playText: {
    color: "#fff",
    fontWeight: "700",
  },
});