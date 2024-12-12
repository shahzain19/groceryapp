import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { Colors } from "../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Dropbox from "../Components/Dropbox";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartSlice";

const Details = ({ route }) => {
  const Dispatch = useDispatch();
  const StoreData = useSelector((state) => state.cartSlice);

  // Check for route parameters
  if (!route.params || !route.params.main) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Product details are unavailable.</Text>
      </View>
    );
  }

  // Destructure data with fallback
  const { name = "Unknown", pieces = "N/A", price = "N/A", img = "" } = route.params.main;

  const [isVisible, setIsVisible] = useState(true);
  const nav = useNavigation();

  // Check if the item is already in the cart
  const isAlreadyInCart = StoreData.some((value) => value.name === name);

  // Navigation back function
  const backtoHome = () => {
    if (nav.canGoBack()) {
      nav.goBack();
    } else {
      nav.navigate("HomeSearch");
    }
  };

  console.log("Details Component - Received Data:", route.params.main);

  return (
    <SafeAreaView style={{ flex: 1, gap: 30, backgroundColor: "#E3E3E3" }}>
      <StatusBar backgroundColor="white" />
      <View>
        <Image
          style={{
            height: responsiveHeight(40),
            marginTop: 20,
            borderBottomLeftRadius: 60,
            borderBottomRightRadius: 60,
          }}
          source={img ? { uri: img } : require("../assets/mainicon.png")}
        />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 20,
            alignItems: "center",
            backgroundColor: Colors.secondary,
            paddingVertical: 10,
          }}
        >
          <Ionicons onPress={backtoHome} name="arrow-back-sharp" size={34} color="black" />
          <Entypo name="share-alternative" size={34} color="black" />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, flex: 1, backgroundColor: Colors.secondary }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: responsiveFontSize(3),
              color: "black",
              fontWeight: "800",
            }}
          >
            {name.charAt(0).toUpperCase() + name.slice(1).toUpperCase()}
          </Text>
          <AntDesign
            onPress={() => setIsVisible(!isVisible)}
            name={isVisible ? "hearto" : "heart"}
            size={35}
            color="red"
          />
        </View>
        <Text style={{ color: "grey", marginTop: 7, fontSize: responsiveFontSize(2) }}>
          {pieces}
        </Text>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: responsiveFontSize(3.2),
            marginTop: 20,
          }}
        >
          {price} RS
        </Text>
        <Dropbox />
        <View style={{ flex: 0.8, justifyContent: "flex-end" }}>
          {isAlreadyInCart ? (
            <TouchableOpacity
              disabled={true}
              style={{
                borderColor: "#E3E3E3",
                borderWidth: 3,
                height: responsiveHeight(8),
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "orange",
                flexDirection: "row",
                borderRadius: 24,
              }}
            >
              <Feather name="shopping-cart" size={40} color="black" />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 30,
                  paddingHorizontal: 20,
                }}
              >
                Added To Cart
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                Dispatch(addToCart(route.params.main));
                nav.navigate("Cart");
              }}
              style={{
                borderColor: "#E3E3E3",
                borderWidth: 3,
                height: responsiveHeight(8),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: 24,
              }}
            >
              <Feather name="shopping-cart" size={40} color="black" />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 30,
                  paddingHorizontal: 20,
                }}
              >
                Add To Cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;