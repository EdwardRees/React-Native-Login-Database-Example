// Import important aspects from React
import React, { useState, useEffect } from "react";

// Import necessary components
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

// Import SQLite to use throughout application
import * as SQLite from "expo-sqlite";

// Simple encryption function written in api
import { encrypt } from "../api/utilities";

// Variable instantiated to database called "db.db"
const db = SQLite.openDatabase("db.db");

/**
 * Login component to handle the view of logging in
 * @param {*} navigation navigation property to allow a simple navigation between screens
 */
function Login({ navigation }) {
  // Username state to handle in memory state storage
  const [username, setUsername] = useState("");

  // Password state to handle in memory state storage
  const [password, setPassword] = useState("");

  // Use effect; should run on first load to create the table if no table exists with columns of an id, username, and password
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists credentials (id integer primary key not null, username text, password text);"
      );
    });
  }, []);
  /**
   * Set function, used to set the values in the relational database table
   */
  const set = () => {
    // Return false and break the function if the username or password are invalid values - could also use a password validator if creating a true signup / login system
    if (
      username === null ||
      username === "" ||
      password === null ||
      password === ""
    ) {
      return false;
    }

    // if no problems, go to database / sql actions
    db.transaction(
      (tx) => {
        // Only keep one account and don't add to infinity
        tx.executeSql("delete from credentials");

        // insert new credential into the table called "credentials" with the new username and the encrypted password
        tx.executeSql(
          "insert into credentials (username, password) values (?,?)",
          [username, encrypt(password)]
        );

        // Debug only: print out the values in the table
        tx.executeSql("select * from credentials", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      // error callback - null
      null,
      // successful callback - null
      null
    );
    // Return true if successful update
    return true;
  };

  // Deconstructed styles
  const { container, label, button, input, formGroup } = styles;

  // Views to return
  return (
    <View style={container}>
      <Text style={[label, { paddingBottom: 20 }]}>Login</Text>
      <View style={formGroup}>
        <Text style={label}>Username: </Text>
        <TextInput
          style={input}
          onChangeText={(username) => setUsername(username)}
          placeholder="Username"
          value={username}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>Password: </Text>
        <TextInput
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          value={password}
          style={input}
        />
      </View>
      <TouchableOpacity
      // onPress, set the values: If successful, go to Authenticated screen, if failed, alert user saying invalid login
        onPress={() => {
          if(set()){
            navigation.replace("Authenticated");
          } else {
            Alert.alert("Invalid login! Try again!")
          }
        }}
        style={button}
      >
        <Text style={{ color: "#3C6074" }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

// Export component
export { Login };

// Styles
const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    color: "#3C6074",
    borderRadius: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#3C6074",
    padding: 10,
  },
  input: {
    textAlign: "center",
    fontSize: 15,
  },
  formGroup: {
    padding: 10,
  },
};
