import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For back and share icons
import { authentication, database } from "../../Firebaseconfig";  // Import your Firebase instance
import { collection, query, where, getDocs } from "firebase/firestore";  // Firestore methods for querying orders

const RewardsScreen = () => {
  const [totalCoins, setTotalCoins] = useState(0);  // State to store the total coins
  const [loading, setLoading] = useState(true);  // To handle loading state

  // Fetch the user's total reward coins when the component mounts
  useEffect(() => {
    const fetchUserCoins = async () => {
      try {
        const userUID = authentication.currentUser?.uid;  // Get current user's UID
        if (!userUID) {
          console.log("No user logged in");
          return;
        }

        // Fetch the orders for the current user using the UID
        const ordersCollection = collection(database, "orders");
        const ordersQuery = query(ordersCollection, where("userId", "==", userUID)); // Filter orders by userId
        const ordersSnapshot = await getDocs(ordersQuery);

        let totalCoins = 0;

        // Iterate over each order to calculate the total reward coins
        ordersSnapshot.forEach((orderDoc) => {
          const orderData = orderDoc.data();
          orderData.products.forEach((product) => {
            totalCoins += product.rewardCoins * product.quantity;  // Add product rewardCoins to total
          });
        });

        setTotalCoins(totalCoins);  // Update state with the calculated total reward coins
      } catch (error) {
        console.error("Error fetching user reward coins:", error);
      } finally {
        setLoading(false);  // Stop loading once data is fetched
      }
    };

    fetchUserCoins();  // Call the function to fetch the coins when the component mounts
  }, []);  // Empty dependency array ensures it runs only once when the component mounts

  // Display loading indicator if the data is still being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E53E3E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.headerText}>Rewards</Text>
        <Ionicons name="share-social-outline" size={24} color="white" />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, 👋</Text>
        <View style={styles.coinsContainer}>
          <Text style={styles.availableCoinsText}>Your Available Coins</Text>
          <Text style={styles.coinCount}>{totalCoins}</Text>  {/* Display the total coins */}
          <Text style={styles.notice}>
            SwiftCart Kisi bhi waqt coins expire krne ka haq rakhta hai
          </Text>
        </View>

        <TouchableOpacity style={styles.historyButton}>
          <Text style={styles.historyButtonText}>History →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "orange",
    padding: 15,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  welcomeContainer: {
    backgroundColor: "orange",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  welcomeText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  coinsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    alignItems: "center",
  },
  availableCoinsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  coinCount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#E53E3E",
    marginVertical: 5,
  },
  notice: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginVertical: 5,
  },
  historyButton: {
    marginTop: 10,
  },
  historyButtonText: {
    color: "#5A67D8",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RewardsScreen;