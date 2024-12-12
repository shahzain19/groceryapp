import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { fruits } from "../Utils/Data";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch,useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/CartSlice";

const ProductCarasoul = ({ data }) => {
  const nav = useNavigation();
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const StoreData = useSelector((state) => state.cartSlice);
  const itemStyle = {
    height: responsiveHeight(30),
    width: responsiveWidth(40),
    marginTop: 20,
    marginRight: 15,
    padding: 3,
    borderWidth: 2,
    borderColor: "#E3E3E3",
    borderRadius: 20,
  };

  const imageStyle = {
    height: 125,
    width: 125,
    alignSelf: "center",
    resizeMode: "contain",
  };

  const textStyle = {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  };

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          // Capitalize the first letter of the name
          const capitalizedName =
            item.name.charAt(0).toUpperCase() + item.name.slice(1);

          return (
            <TouchableOpacity
              onPress={() => {
                nav.navigate("Details", { main: item });
              }}
              activeOpacity={0.6}
              style={itemStyle}
            >
              <Image style={imageStyle} source={{ uri: item.img }} />
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={textStyle}>{capitalizedName}</Text>
                <Text style={{ color: "grey", fontSize: 20 }}>
                  {item.pieces}
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 17, fontWeight: "600" }}>
                    {item.price}PKR
                  </Text>
                  {
                    StoreData.some((value)=>value.name==item.name)?
                    <AntDesign
                    name="minussquare"
                    size={30}
                    color={"green"}
                    onPress={() => {dispatch(removeFromCart(item))}}
                  />:
                  <AntDesign
                    name="plussquare"
                    size={30}
                    color={"green"}
                    onPress={() => {dispatch(addToCart(item))}}
                  />
                  }
                  
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ProductCarasoul;
