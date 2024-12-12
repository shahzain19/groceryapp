import React from "react";
import { View, Text, StyleSheet, Image, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Footer = () => {
  return (
    <SafeAreaView style={styles.footer}>
     
      <Text style={styles.footerText}>MADE WITH LOVE IN PAKISTAN ❤️ 🇵🇰</Text>
      <Image
        source={require("../assets/mainicon.png")} // Replace with your actual logo path
        style={styles.logo}
        tintColor={'orange'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  footerText: {
    fontSize: 20,
    color: "#6c757d",
    marginTop: 5,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
});

export default Footer;