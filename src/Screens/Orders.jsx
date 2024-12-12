import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { database } from "../../Firebaseconfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { EveryProductSearch } from "../Utils/Data";
import { Colors } from "../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigation();

  const eligibleUserId = "55cIAx83kCWZkpTcGKN5LGmeutA3";

  const handleTrackOrder = (orderId) => {
    nav.navigate('OrderTrackingScreen', { orderId });
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const auth = getAuth();
        const userUID = auth.currentUser?.uid;

        if (!userUID) {
          console.log("No user logged in.");
          setLoading(false);
          return;
        }

        const ordersCollection = collection(database, "orders");

        // Check if the user is eligible
        let ordersQuery;

        if (eligibleUserId === userUID) {
          // If eligible, fetch all orders (no userId filter)
          ordersQuery = query(ordersCollection);
        } else {
          // Otherwise, fetch orders for the current user
          ordersQuery = query(ordersCollection, where("userId", "==", userUID));
        }

        const ordersSnapshot = await getDocs(ordersQuery);

        if (ordersSnapshot.empty) {
          setOrders([]);
          return;
        }

        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    const auth = getAuth();
    const userUID = auth.currentUser?.uid;

    if (userUID !== eligibleUserId) {
      console.log("User is not eligible to complete this order.");
      return;
    }

    try {
      const orderDocRef = doc(database, "orders", orderId);

      await updateDoc(orderDocRef, {
        status: "Completed", // Change this to the desired status
      });

      // Update the orders state to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Completed" } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const renderOrderCard = ({ item }) => {
    const orderDate = new Date(item.timestamp?.seconds * 1000);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 1);

    const formattedOrderDate = orderDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const auth = getAuth();
    const userUID = auth.currentUser?.uid;
    const isEligibleUser = eligibleUserId === userUID;

    return (
      <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.orderNumber}>Order ID: {item.id}</Text>
          <Text style={styles.status}>{item.status || "Accepted"}</Text>
        </View>
        <Text style={styles.orderDate}>Order Placed: {formattedOrderDate}</Text>
        <Text>Reward Coins: {item.rewardCoins}</Text>

        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery Date</Text>
            <Text style={styles.detailValue}>{formattedDeliveryDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Payment</Text>
            <Text style={styles.detailValue}>Rs. {item.totalAmount}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Paid via</Text>
            <Text style={styles.detailValue}>Cash</Text>
          </View>
          <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Address</Text>
                <Text style={styles.detailValue}>{item.address || "N/A"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Products</Text>
              </View>
              {Array.isArray(item.products) ? (
                item.products.map((product, index) => {
                  // Find the corresponding image from EveryProductSearch
                  const productData = EveryProductSearch.find((p) => p.name === product.name);
                  return productData ? (
                    <View key={index} style={styles.productRow}>
                      <Image
                        source={{ uri: productData.img }} // Use the image from EveryProductSearch
                        style={styles.productImage}
                      />
                      <View style={styles.productDetails}>
                        <Text style={styles.productName}>{product.name || "Unnamed Product"}</Text>
                        <Text style={styles.productQuantity}>
                          Qty: {product.quantity || 1}
                        </Text>
                      </View>
                    </View>
                  ) : null; // If product image is not found, return null
                })
              ) : (
                <Text style={styles.detailValue}>No products listed</Text>
              )}
              
          {isEligibleUser && (
            <>
            </>
          )}
        </View>
        <TouchableOpacity
          style={[styles.completeButton, { backgroundColor: isEligibleUser ? "#28a745" : "#ff9900" }]}
          onPress={() => isEligibleUser ? handleCompleteOrder(item.id) : handleTrackOrder(item.id)}
        >
          <Text style={styles.completeButtonText}>
            {isEligibleUser ? "Complete It" : "Order Track Karein"}
          </Text>
        </TouchableOpacity>
      </View>
      </>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.noOrdersContainer}>
        <Text>No orders found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}>ORDERS</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderCard}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;

// Styles for the component
const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" },
  noOrdersContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { margin: 10, padding: 15, backgroundColor: "#fff", borderRadius: 20, borderWidth: 2, borderColor: "#E3E3E3" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  orderNumber: { fontWeight: "bold" },
  status: { color: "green" },
  orderDate: { marginTop: 5, color: "#555" },
  cardDetails: { marginTop: 10 },
  detailRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 5 },
  detailLabel: { fontWeight: "bold" },
  detailValue: { color: "#555" },
  completeButton: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  completeButtonText: { color: "#fff", fontWeight: "bold" },
  productRow: { flexDirection: "row", marginVertical: 5, alignItems: "center" },
  productImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10, resizeMode: "contain"},
  productDetails: { flex: 1 },
  productName: { fontWeight: "bold" },
  productQuantity: { color: "#555" },
});