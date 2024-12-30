import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = ({ item, onQuantityChange, onDelete }) => {
  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Ionicons name="trash-outline" size={24} color="#e03131" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.itemBottom}>
          <Text style={styles.itemPrice}>Rs.{item.price.toFixed(2)}</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={() => onQuantityChange(item.id, "decrease")}
              style={styles.quantityButton}
            >
              <Ionicons name="remove-circle-outline" size={24} color="#495057" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => onQuantityChange(item.id, "increase")}
              style={styles.quantityButton}
            >
              <Ionicons name="add-circle-outline" size={24} color="#495057" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    flex: 1,
  },
  itemDescription: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#495057",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: "center",
  },
});

export default CartItem;
