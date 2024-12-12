import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons"; // For cart icon
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import {Colors} from '../Utils/Colors'
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryProductsScreen = ({ route }) => {
  const { category } = route.params; // Get the category from the navigation params
  const [isLoading, setIsLoading] = useState(true); // Loading state for the screen
  const navigation = useNavigation(); // Initialize navigation

  const backtoHome = () => {
    navigation.navigate('homescreen')
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Products...</Text>
        <Animatable.View
          animation="slideInLeft"
          iterationCount="infinite"
          direction="alternate"
        >
          <Ionicons name="cart" size={50} color="#FF6600" />
        </Animatable.View>
      </View>
    );
  }

  const handleProductPress = (product) => {
    // Navigate to Product Details screen and pass the product data
    navigation.navigate("Details", { main: product });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{category.name}</Text>

      <View
          style={{
            flexDirection: "row",
            position: "absolute",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 20,
            alignItems: "center",
            paddingVertical: 30,
          }}
        >
          <Ionicons onPress={backtoHome} name="arrow-back-sharp" size={34} color="black" />
        </View>

      <FlatList
        data={category.pRoducts} // Display the products of the selected category
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.product} 
            onPress={() => handleProductPress(item)} // Navigate on product press
          >
            <Image source={{ uri: item.img }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price} PKR</Text>
              <Text style={styles.productPieces}>{item.pieces}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f8f8", // Light background color for the screen
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#FF6600",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Darker color for the title text
    textAlign: "center",
  },
  product: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff", // White background for each product item
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Add a shadow effect for a card-like appearance
    padding: 12,
  },
  productImage: {
    width: responsiveWidth(18),
    height: responsiveHeight(10),
    borderRadius: 8,
    resizeMode: "contain",
  },
  productDetails: {
    marginLeft: 15,
    justifyContent: "center",
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333", // Dark text color for product name
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginBottom: 5,
  },
  productPieces: {
    fontSize: 14,
    color: "#777", // Light grey color for pieces info
  },
});

export default CategoryProductsScreen;