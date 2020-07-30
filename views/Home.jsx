// Import important aspects from React
import React, { useState, useEffect } from "react";

// Import necessary components from React Native
import { View, Text, TouchableOpacity } from "react-native";

// Import SQLite to use throughout application
import * as SQLite from "expo-sqlite";

// Import decrypt function for debugging 
import { decrypt } from "../api/utilities";

// Create a variable called db to handle database functions
const db = SQLite.openDatabase("db.db");

/**
 * Home screen / Authenticated screen
 * @param {*} navigation navigation property to handle navigating between screens
 */
const Home = ({ navigation }) => {
  // Username state to handle in memory state storage
  const [username, setUsername] = useState("");

  // Password state to handle in memory state storage
  const [password, setPassword] = useState("");

  // useEffect; select all from credentials, update username and password state storage to later show to user
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from credentials", [], (_, { rows }) => {
        setUsername(rows["_array"][0]["username"]);
        setPassword(rows["_array"][0]["password"]);
      });
    });
  });

  // deconstruct styles
  const { container, button, data } = styles;

  // Component View
  return (
    <View style={container}>
      <Text style={{ fontSize: 18 }}>
        Hello <Text style={data}>{username}</Text>
      </Text>

      <Text style={{ fontSize: 18 }}>
        Your encrypted password is: <Text style={data}>{password}</Text>
      </Text>

      <Text style={{ fontSize: 18 }}>
        Your decrypted password is:{" "}
        <Text style={data}>{decrypt(password)}</Text>
      </Text>

      <TouchableOpacity
        style={button}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={{ color: "#3C6074" }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 16,
    padding: 10,
    borderStyle: "solid",
    borderColor: "#3C6074",
    color: "#3C6074",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 10,
  },
  data: {
    color: "#3C6074",
  },
};

export { Home };
