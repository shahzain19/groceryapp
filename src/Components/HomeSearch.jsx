import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { EveryProductSearch, fruits } from "../Utils/Data";

const HomeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();

  // Filtered data based on search query
  const filteredData = EveryProductSearch.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigateToDetails = (item) => {
    navigation.navigate("Details", { main: item });
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 20 }}>
      {/* Search Bar */}
      <View
        style={{
          height: responsiveHeight(6),
          backgroundColor: "#F2F2F2",
          flexDirection: "row",
          borderRadius: 20,
          alignItems: "center",
          paddingHorizontal: 20,
          gap: 14,
        }}
      >
        <Feather name="search" size={24} color="black" />
        <TextInput
          style={{ flex: 1 }}
          placeholder="Search vegetables"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!searchQuery) setIsFocused(false);
          }}
        />
      </View>

      {/* FlatList for Search Results */}
      {isFocused && searchQuery ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleNavigateToDetails(item)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                marginVertical: 5,
                backgroundColor: "#FFF",
                borderRadius: 10,
              }}
            >
              <Image
                source={{ uri: item.img }}
                style={{
                  width: responsiveWidth(15),
                  height: responsiveHeight(7),
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
                <Text style={{ color: "gray" }}>{item.pieces}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={{ marginTop: 20 }}
        />
      ) : null}
    </View>
  );
};

export default HomeSearch;