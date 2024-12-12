import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Homeicon from "../Components/Homeicon";
import HomeSearch from "../Components/HomeSearch";
import Homebanner from "../Components/Homebanner";
import ProdsTitle from "../Components/ProdsTitle";
import Categories from "./Category";
import ProductsCarasoul from "../Components/ProductsCarasoul";
import { categories, fruits, sellers } from "../Utils/Data";
import Footer from "../Components/Footer";

const Homescreen = () => {
  const handleCategoryPress = (category) => {
    console.log("Category Selected:", category);
  };
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
        gap: 10,
        flex: 1
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        <Homeicon />
        <HomeSearch />
        <Homebanner />
        <ProdsTitle title="Exclusive Offers" />
        <ProductsCarasoul data={fruits} />
        <ProdsTitle title="Best Sellers" />
        <ProductsCarasoul data={sellers} />
        <View>

          <Categories categories={categories} onCategoryPress={handleCategoryPress} />
        <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default Homescreen;
