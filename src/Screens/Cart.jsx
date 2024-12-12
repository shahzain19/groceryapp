import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../Utils/Colors";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/CartSlice";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; // Ensure proper imports
import { database } from "../../Firebaseconfig"; // Adjust with your actual Firebase config import

const Cart = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const StoreData = useSelector((state) => state.cartSlice);
  const [address, setAddress] = useState(""); // State for Address Input

  // Calculate total amount based on cart items
  let amount = 0;
  StoreData.forEach(element => {
    amount += element.price * element.quantity;
  });

  // Handle placing the order
  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter a delivery address!");
      return;
    }

    if (amount <= 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Fetch the current user from Firebase Auth
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("No user is currently logged in!");
        return;
      }

      const userId = user.uid; // Get the logged-in user's UID
      console.log("Current User ID:", userId); // Log the current user ID

      // Calculate total reward coins
      const totalCoins = StoreData.reduce(
        (sum, item) => sum + item.quantity * item.rewardCoins,
        0
      );

      // Construct the order details with user ID
      const orderDetails = {
        products: StoreData.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          rewardCoins: item.rewardCoins * item.quantity, // Coins for this product
        })),
        address: address,
        totalAmount: amount,
        rewardCoins: totalCoins, // Total coins for the order
        timestamp: serverTimestamp(),
        userId: userId, // Dynamically attach the user ID to the order object
      };

      // Add the order details to Firestore
      const orderRef = await addDoc(collection(database, "orders"), orderDetails);

      console.log("Order placed successfully with ID:", orderRef.id);

      dispatch({ type: "cartSlice/clearCart" }); // Clear cart after placing order

      // Navigate to the OrderPlaced screen
      nav.navigate("OrderPlaced", {
        orderId: orderRef.id,
        products: orderDetails.products,
        address: orderDetails.address,
        totalAmount: orderDetails.totalAmount,
        rewardCoins: orderDetails.rewardCoins, // Pass coins to the OrderPlaced screen
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing the order. Please try again.");
    }
  };

  const handleCompleteOrder = async (orderId, orderItems) => {
    try {
      // Get the current user's UID (make sure to use authentication to get this)
      const userUID = authentication.currentUser?.uid;
      if (!userUID) {
        console.log("User is not logged in.");
        return;
      }

      // Calculate the total reward coins for this order
      const totalRewardCoins = orderItems.reduce((sum, item) => sum + item.rewardCoins, 0);

      // 1. Update the order status to "Completed" in Firestore
      const orderRef = doc(database, "orders", orderId);
      await updateDoc(orderRef, { status: "Completed" });

      console.log("Order marked as completed:", orderId);

      // 2. Get the user's current reward balance
      const userRef = doc(database, "users", userUID);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const currentCoins = userData.rewardCoins || 0;

        // 3. Update the user's total reward coins
        await updateDoc(userRef, {
          rewardCoins: currentCoins + totalRewardCoins,
        });

        console.log("User's total reward coins updated:", currentCoins + totalRewardCoins);
      } else {
        console.log("User data not found.");
      }
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };
  const backtoHome = () => {
    nav.goBack();
  }

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 14,
        backgroundColor: Colors.secondary,
        flex: 1,
        gap: 20,
        paddingVertical: 15,
      }}
    >

      <Text style={{ textAlign: "center", fontSize: 26, fontWeight: "bold" }}>
        <Feather name="shopping-cart" size={30} color="black" />
        &nbsp;&nbsp;My Cart
      </Text>

      {/* Address Input */}
      <TextInput
        placeholder="Enter your delivery address"
        value={address}
        onChangeText={setAddress}
        style={{
          height: responsiveHeight(6),
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 30,
          paddingHorizontal: 40,
          marginBottom: 10,
          fontSize: responsiveFontSize(2),
          backgroundColor: "white",
        }}
      />

      {/* Cart Items */}
      <View style={{ flex: 0.9 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={StoreData}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: responsiveHeight(18),
                borderBottomColor: "#E3E3E3",
                borderBottomWidth: 2,
                borderRadius: 20,
                flexDirection: "row",
              }}
            >
              {/* Child 1 - Product Image */}
              <View style={{ flex: 0.36 }}>
                <Image
                  style={{ height: 130, width: 130, resizeMode: "contain" }}
                  source={{ uri: item.img }}
                />
              </View>
              {/* Child 2 - Product Details */}
              <View
                style={{
                  flex: 0.8,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  justifyContent: "space-evenly",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.6),
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                  <AntDesign
                    name="close"
                    size={30}
                    color="grey"
                    onPress={() => dispatch(removeFromCart(item))}
                  />
                </View>
                <Text
                  style={{
                    fontWeight: "1000",
                    fontSize: responsiveFontSize(1.9),
                    color: Colors.third,
                  }}
                >
                  {item.pieces}
                </Text>
                <View
                  style={{
                    alignContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      marginTop: 10,
                      alignSelf: "center",
                    }}
                  >
                    <AntDesign
                      name="minussquareo"
                      size={30}
                      color="black"
                      onPress={() => {
                        dispatch(decrementQuantity(item));
                      }}
                    />
                    <Text style={{ fontSize: 24 }}>{item.quantity}</Text>
                    <AntDesign
                      name="plussquareo"
                      size={30}
                      color="black"
                      onPress={() => {
                        if (item.quantity < 6) {
                          dispatch(incrementQuantity(item));
                        } else {
                          alert("Maximum quantity reached!");
                        }
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: responsiveFontSize(3),
                    }}
                  >
                    {item.quantity * item.price} RS
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      {/* Place Order Button */}
      <TouchableOpacity
        onPress={handlePlaceOrder}
        style={{
          borderColor: "grey",
          height: responsiveHeight(8),
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          borderWidth: 1,
          borderRadius: 40,
        }}
      >
        <Feather name="shopping-cart" size={40} color="black" />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 30,
              paddingHorizontal: 20,
            }}
          >
            Place Order
          </Text>
          <Text style={{ fontSize: 24 }}>{amount} RS</Text>
        </View>
      </TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default Cart;
