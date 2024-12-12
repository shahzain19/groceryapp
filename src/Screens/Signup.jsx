import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../Utils/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { authentication, database } from "../../Firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import uuid from "react-native-uuid";

const Signup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = userCredentials;
  const uid = uuid.v4();
  const nav = useNavigation();

  const userAccount = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(() => {
        nav.navigate("Login");
        setDoc(doc(database, "users", uid), {
          username: name,
          email: email,
          id: authentication.currentUser.uid,
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("That email address is invalid!");
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.secondary }}>
      <StatusBar />
      <ScrollView style={{ flex: 1, paddingTop: 30 }}>
        <Image
          source={require("../assets/mainicon.png")}
          tintColor={"#ff6f00"}
          style={{ alignSelf: "center", marginRight: 20 }}
        />

        <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Sign Up</Text>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "grey" }}>
            apni maloomat idhar dalen
          </Text>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: "grey",
              marginTop: 40,
            }}
          >
            Username
          </Text>
          <TextInput
            value={name}
            onChangeText={(val) => {
              setUserCredentials({ ...userCredentials, name: val });
            }}
            keyboardType="name-phone-pad"
            placeholder="Shahzain Hazel"
            maxLength={10}
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 15,
            }}
          />
          <Text
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: "grey",
              marginTop: 40,
            }}
          >
            Email Address
          </Text>
          <TextInput
            value={email}
            onChangeText={(val) => {
              setUserCredentials({ ...userCredentials, email: val });
            }}
            keyboardType="email-address"
            placeholder="apkaMailService324@gmail.com"
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 15,
            }}
          />
          <Text
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: "grey",
              marginTop: 40,
            }}
          >
            Password
          </Text>
          <View
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              value={password}
              onChangeText={(val) => {
                setUserCredentials({ ...userCredentials, password: val });
              }}
              secureTextEntry={isVisible}
              keyboardType="ascii-capable"
              placeholder="ApkaKaPassWord"
              style={{
                fontSize: 17,
                marginTop: 15,
                flex: 0.8,
              }}
            />
            <Ionicons
              onPress={() => {
                setIsVisible(!isVisible);
              }}
              name={isVisible == true ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="black"
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              marginTop: 20,
              letterSpacing: 1,
              lineHeight: 23,
            }}
          >
            By Continuing you agree to our
            <Text style={{ color: Colors.primary }}>
              Terms of Service and Privacy Policy
            </Text>
          </Text>
          <TouchableOpacity
            onPress={userAccount}
            style={{
              backgroundColor: Colors.primary,
              marginTop: 40,
              borderRadius: 20,
              justifyContent: "center",
              height: 70,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                letterSpacing: 2,
                fontSize: 23,
                color: Colors.secondary,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Text style={{ fontSize: 16 }}>Already have an account?</Text>
            <TouchableOpacity>
              <Text
                onPress={() => {
                  nav.navigate("Login");
                }}
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: Colors.primary,
                  marginLeft: 10,
                }}
              >
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;