import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProdsTitle = ({ title }) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        paddingVertical: -20,
        marginTop: 20,
      }}
    >
      <Text
        style={{ fontSize: 22, fontWeight: "bold", justifyContent: "center", textAlign:'center' }}
      >
        {title}
      </Text>
      <Text
        style={{ fontSize: 22, color: "#ff6f00", justifyContent: "center" }}
      >
        See All
      </Text>
    </SafeAreaView>
  );
};

export default ProdsTitle;
