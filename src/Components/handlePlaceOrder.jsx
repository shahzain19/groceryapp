import { collection, addDoc } from "firebase/firestore";
import { database, serverTimestamp } from "./firebaseConfig";

const handlePlaceOrder = async (address, StoreData, amount, dispatch) => {
  // Validate input fields
  if (!address.trim()) {
    alert("Please enter a delivery address!");
    return;
  }

  if (amount <= 0) {
    alert("Your cart is empty!");
    return;
  }

  // Prepare order details
  const orderDetails = {
    products: StoreData.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
    })),
    address: address,
    totalAmount: amount,
    timestamp: serverTimestamp(),
  };

  try {
    // Add the order to Firestore
    const orderRef = await addDoc(collection(database, "orders"), orderDetails);

    console.log("Order placed successfully:", orderRef.id);
    console.log(orderRef)
    // Dispatch action to clear the cart
    dispatch({ type: "cartSlice/clearCart" });

    // Display a confirmation message
    alert(`Order placed successfully! Your order ID is ${orderRef.id}.`);
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Something went wrong while placing the order. Please try again.");
  }
};
