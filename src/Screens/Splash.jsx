import { View, Text, Image } from "react-native";
import React, {useEffect} from "react";
import { Colors } from "../Utils/Colors";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
    const nav = useNavigation();
    useEffect(() => {
      setTimeout(()=>{
        nav.replace('Signup');
      },2500);
    }, []);
    
  return (
    <View
      style={{
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <StatusBar style="light" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ width: 120, height: 100,}}
          tintColor={Colors.secondary}
          source={require("../assets/mainicon.png")}
        />
        <View>
          <Text
            style={{
              fontSize: 50,
              color: Colors.secondary,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            SwiftCart
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: Colors.secondary,
              textAlign: "center",
              letterSpacing: 6,
              marginRight: 10,
            }}
          >
            Shop Groceries
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Splash;
