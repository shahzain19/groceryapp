import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EveryProductSearch } from "../Utils/Data";
import { SafeAreaView } from "react-native-safe-area-context";

const AllProductsScreen = () => {
  const navigation = useNavigation();

  const handleProductClick = (product) => {
    navigation.navigate("Details", { main: product });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => handleProductClick(item)}>
      <Image source={{ uri: item.img }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <View>
      <Text style={styles.productName}>{item.pieces}</Text>
      <Text style={styles.productName}>{item.price} RS</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}>All The Products</Text>
      <FlatList
        data={EveryProductSearch}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderProductItem}
        numColumns={2} // Grid layout
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
};

export default AllProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  grid: {
    justifyContent: "space-between",
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 10,
  },
  productImage: {
    height: 120,
    width: "100%",
    resizeMode:'contain',
  },
  productName: {
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
});
