import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

const Category = ({ categories }) => {
  const navigation = useNavigation(); // Use navigation here
  const [isNavigating, setIsNavigating] = useState(false);

  const onCategoryPress = (category) => {
    console.log("Selected Category:", category);
    setIsNavigating(true); // Start the animation
    setTimeout(() => {
      setIsNavigating(false); // Stop the animation after navigation
      navigation.navigate("CategoryProductScreen", { category });
    }, 1500); // Wait for animation to finish (adjust timing as needed)
  };

  return (
    <View style={styles.container}>
      {isNavigating && (
        <Animatable.View
          animation="slideInLeft"
          iterationCount="infinite"
          direction="alternate"
        >
          <Ionicons name="cart" size={50} color="#FF6600" />
        </Animatable.View>
      )}
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.category}
            onPress={() => onCategoryPress(item)} // Navigate on press
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  category: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 5,
    resizeMode: "contain",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
});

export default Category;