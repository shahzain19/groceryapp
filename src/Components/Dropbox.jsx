import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { DropDown } from "../Utils/Data";
import AntDesign from "@expo/vector-icons/AntDesign";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const Dropbox = () => {
  const [myIndex, setMyIndex] = useState();
  const [Toggle, setToggle] = useState(false);
  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={DropDown}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                setMyIndex(index);
                setToggle(!Toggle);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomColor: "grey",
                borderBottomWidth: 0.8,
                marginBottom: 10,
                opacity: 0.7,
                paddingVertical: 20,
              }}
            >
              <Text style={{fontSize:responsiveFontSize(2), fontWeight:'800',color:'#000'}}>{item.Prod}</Text>
              <AntDesign name={myIndex == index && Toggle ? "down" : "right"} size={30} color="black" />
            </TouchableOpacity>
            {myIndex == index && Toggle ? <Text style={{fontSize:20}}>{item.content}</Text>:null}
          </View>
        )}
      />
    </View>
  );
};

export default Dropbox;
