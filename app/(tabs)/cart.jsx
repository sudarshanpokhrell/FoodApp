import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Roll with shrimp',
      price: 2.90,
      quantity: 2,
      image: 'https://int.japanesetaste.com/cdn/shop/articles/how-to-make-makizushi-sushi-rolls-japanese-taste.jpg?v=1707914944&width=5760',
    },
    {
      id: '2',
      name: 'Nigiri special',
      price: 4.20,
      quantity: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuwPJGpLvXKp_rD42RKj1jXYXNGzatHHz3sQ&s',
    },
  ]);

  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.00;
  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        defaultSource={{uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, -1)}
          style={styles.quantityButton}
        >
          <Ionicons name="remove" size={20} color="#666" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, 1)}
          style={styles.quantityButton}
        >
          <Ionicons name="add" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your food cart</Text>
      </View>

      <View style={styles.deliverySection}>
        <View style={styles.deliveryHeader}>
          <Text style={styles.deliveryTitle}>Deliver to</Text>
          <TouchableOpacity>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={24} color="#666" />
          <Text style={styles.addressText}>242 ST Marks Eve, Finland</Text>
        </View>
      </View>

      <ScrollView style={styles.cartItemsContainer}>
        {cartItems.map(renderCartItem)}
      </ScrollView>

      <View style={styles.promoContainer}>
        <View style={styles.promoInputContainer}>
          <Ionicons name="ticket-outline" size={20} color="#666" />
          <TextInput
            style={styles.promoInput}
            placeholder="Promo Code"
            value={promoCode}
            onChangeText={setPromoCode}
          />
        </View>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
        </View>
        {discount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Discount</Text>
            <Text style={[styles.summaryValue, styles.discountText]}>
              -${discount.toFixed(2)}
            </Text>
          </View>
        )}
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8fc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  deliverySection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  changeButton: {
    color: '#7b61ff',
    fontSize: 14,
    fontWeight: '500',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  cartItemsContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 1,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#7b61ff',
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8fc',
    borderRadius: 20,
    padding: 5,
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  promoContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
  },
  promoInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8fc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  promoInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
  },
  applyButton: {
    backgroundColor: '#7b61ff',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  summary: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    color: '#666',
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  discountText: {
    color: '#4CAF50',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7b61ff',
  },
  checkoutButton: {
    backgroundColor: '#7b61ff',
    margin: 20,
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Cart;