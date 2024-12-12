import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../Utils/Colors'

const OrderPlaced = () => {
  const nav = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      nav.navigate('homescreen')
    }, 5000)
  }, [])
  return (
    <SafeAreaView style={{
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      alignContent: "center"
    }}>
      <MaterialIcons name="verified" size={104} color={Colors.primary
      } />
      <Text style={{
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 60
      }}>Your Order has been placed! 😊</Text>
    </SafeAreaView>
  );
};

export default OrderPlaced;
