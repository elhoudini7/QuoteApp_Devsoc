/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Share,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";

const App = () => {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://api.quotable.io/random");
      setQuote(res.data.content);
      setAuthor(res.data.author);
    } catch (err) {
  console.log("Fetch error:", err);
  setQuote("Can't Find Quote, Please try again.");
  setAuthor("");
} finally {
      setLoading(false);
    }
  };

  const shareQuote = async () => {
    try {
      await Share.share({
        message: `"${quote}" — ${author}`,
      });
    } catch (err) {
      console.log("Sharing failed", err);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" color="#6200EE" />
        ) : (
          <>
            <Text style={styles.quote}>"{quote}"</Text>
            <Text style={styles.author}>— {author}</Text>
          </>
        )}
        <View style={styles.buttons}>
          <Button title="New Quote" onPress={fetchQuote} />
          <Button title="Share" onPress={shareQuote} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 16,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
  },
  quote: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 12,
    color: "#333",
  },
  author: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
    color: "#555",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
   
});
