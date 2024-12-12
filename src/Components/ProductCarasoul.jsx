import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";

const ProductsCarasoul = ({ products }) => {
  const nav = useNavigation();
  // Styles for the product item
  const itemStyle = {
    height: responsiveHeight(16),
    width: responsiveWidth(40),
    marginTop: 15,
    marginRight: 15,
    padding: 3,
    borderWidth: 2,
    borderColor: "#E3E3E3",
    borderRadius: 20,
  };

  const imageStyle = {
    height: 125,
    resizeMode: "contain",
  };

  const textStyle = {
    fontSize: 20,
    fontWeight: "bold",
  };

  return (
    <View>
      <FlatList
        horizontal
        data={products}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const capitalizedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
          return (
            <TouchableOpacity style={itemStyle}>
              <Image style={imageStyle} source={{ uri: item.img }} />
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={textStyle}>{capitalizedName}</Text>
                <Text style={{ color: 'grey', fontSize: 20 }}>{item.pieces}</Text>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                  <Text style={{ fontSize: 17, fontWeight: '600' }}>{item.price}PKR</Text>
                  <AntDesign name="plussquareo" size={30} color={"green"} />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ProductsCarasoul;
