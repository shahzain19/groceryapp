import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../Utils/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { authentication, database } from "../../Firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import uuid from "react-native-uuid";

const Login = () => {
  const nav = useNavigation();
  const [isVisible, setIsVisible] = useState(true);
  const [loginCrendentials, setLoginCrendentials] = useState({
    email: "",
    password: "",
  });

  const loginUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
    .then((val) => {
      nav.navigate('homescreen')
    }).catch((err)=>{
      Alert.alert(err.message)
    });
  };

  const { email, password } = loginCrendentials;
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
          <Text
            style={{ fontSize: 30, fontWeight: "bold", alignSelf: "center" }}
          >
            Login
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "grey" }}>
            Email aur password idhar enter karen login ke liye
          </Text>
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
              setLoginCrendentials({ ...loginCrendentials, email: val });
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
                setLoginCrendentials({ ...loginCrendentials, password: val });
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
              textAlign: "right",
            }}
          >
            <Text style={{ color: Colors.primary }}>Forget Password?</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              loginUser();
            }}
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
              Login
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
            <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text
                onPress={() => {
                  nav.navigate("Signup");
                }}
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: Colors.primary,
                  marginLeft: 10,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
