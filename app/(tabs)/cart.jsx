import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import CartItem from "../../components/CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Momo",
      price: 5.5,
      quantity: 1,
      description:
        "Steamed dumplings filled with minced chicken and spices, served with spicy achar.",
      image:
        "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/shaikh.khalid7-gmail.com/Chicken_Momos_Recipe_Delicious_Steamed_Chicken_Dumplings.jpg",
    },
    {
      id: "2",
      name: "Dal Bhat Tarkari",
      price: 7.9,
      quantity: 1,
      description:
        "Traditional Nepali meal with steamed rice, lentil soup, and vegetable curry.",
      image:
        "https://www.aroundmanaslutrek.com/wp-content/uploads/2024/07/dal-bhat-tarkari.jpeg",
    },
    {
      id: "3",
      name: "Sekuwa",
      price: 6.5,
      quantity: 1,
      description: "Grilled skewered meat marinated in Nepali spices.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlwkp8SJ7-gORtwhd3RilqkM-k5v_vn1f3KA&s",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [userXP, setUserXP] = useState(100); 
  const [xpDiscount, setXpDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const xpToDiscountRate = 0.01; 

  const handleQuantityChange = (id, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate the total before applying any discount
  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const handleApplyVoucher = () => {
    if (voucherCode === "DISCOUNT10") {
      setTotalAmount((prevAmount) => prevAmount * 0.9); 
      alert("Voucher applied! 10% discount added.");
    } else {
      alert("Invalid voucher code.");
    }
  };

  const handleApplyXP = () => {
    const xpDiscountAmount = userXP * xpToDiscountRate;
    setXpDiscount(xpDiscountAmount); // Set the XP discount
    setTotalAmount(calculateTotal() - xpDiscountAmount); // Subtract XP discount from total
    alert(`XP applied! You get Rs. Rs.${xpDiscountAmount} discount.`);
  };

  const handleApplyDeliveryCharge = () => {
    setTotalAmount(calculateTotal() + deliveryCharge); // Add delivery charge
  };

const openModal = () => {
  setIsModalVisible(true);
};

const closeModal = () => {
  setIsModalVisible(false);
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.header}>Your Cart</Text>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDeleteItem}
            />
          ))}
        </ScrollView>

        {/* Total amount */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalText}>
            Rs: {totalAmount || calculateTotal()}
          </Text>
        </View>

        {/* Proceed to checkout button */}
        <TouchableOpacity style={styles.checkoutButton} onPress={openModal}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>

        {/* Modal for Voucher, Delivery Charge, XP points */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Checkout Details</Text>

              {/* Voucher Code */}
              <TextInput
                style={styles.input}
                placeholder="Enter voucher code"
                value={voucherCode}
                onChangeText={setVoucherCode}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleApplyVoucher}
              >
                <Text style={styles.buttonText}>Apply Voucher</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleApplyXP}>
                  <Text style={styles.buttonText}>Apply XP Discount</Text>
                </TouchableOpacity>
              <View style={styles.totalContainer}> 
                <Text style={styles.totalText}>Total:</Text>
                 <Text style={styles.totalText}> Rs: {totalAmount || calculateTotal()} </Text>
                </View>
             
              <Text style={styles.xpText}>
                You have {userXP} XP points available
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleApplyXP}
              >
                <Text style={styles.buttonText}>Apply XP Discount</Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={closeModal}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={closeModal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    padding: 10,
    paddingTop: 18,
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    paddingTop: 40, 
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  scrollView: {
    flex: 1,
  },
  totalContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: "#FFA500",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  checkoutText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#FFA500",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  xpText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default Cart;
