// TrackingOrderScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native'; // To access passed params
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from "../Utils/Colors";

const OrderTrackingScreen = () => {
  const route = useRoute();
  const { orderId } = route.params; // Retrieve the orderId passed from previous screen

  const [orderDetails, setOrderDetails] = useState(null);

  const nav = useNavigation()

  useEffect(() => {
    // Simulate fetching order details
    const fetchOrderDetails = async () => {
      try {
        // Here you would query your database to get order details using orderId
        // For this example, we assume some mock data
        const fetchedDetails = {
          orderId: orderId,
          status: "Shipped",
          ContactNumber: "0335-8132817",
          carrier: "Shahzain Rasool",
        };
        setOrderDetails(fetchedDetails);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 20,
            alignItems: "center",
            backgroundColor: Colors.secondary,
            paddingVertical: 30,
          }}
        >
          <Ionicons onPress={()=>{nav.navigate('homescreen')}} name="arrow-back-sharp" size={34} color="black" />
        </View>
      <Text style={styles.heading}>Tracking Order: {orderDetails.orderId}</Text>
      <Text style={styles.text}>Status: {orderDetails.status}</Text>
      <Text style={styles.text}>Contact Number: {orderDetails.ContactNumber}</Text>
      <Text style={styles.text}>Carrier: {orderDetails.carrier}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text:{
    fontSize:20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default OrderTrackingScreen;
