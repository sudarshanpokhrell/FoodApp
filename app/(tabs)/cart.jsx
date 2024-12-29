import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Spicy Tuna Roll',
      price: 12.90,
      quantity: 1,
      xpReward: 25,
      category: 'Popular',
      image: 'https://example.com/sushi1.jpg',
    },
    {
      id: '2',
      name: 'Dragon Roll Special',
      price: 16.50,
      quantity: 2,
      xpReward: 35,
      category: 'Special',
      image: 'https://example.com/sushi2.jpg',
    },
    {
      id: '3',
      name: 'Miso Ramen',
      price: 14.90,
      quantity: 1,
      xpReward: 30,
      category: 'Hot',
      image: 'https://example.com/ramen.jpg',
    },
    {
      id: '4',
      name: 'Tempura Udon',
      price: 13.90,
      quantity: 1,
      xpReward: 28,
      category: 'Hot',
      image: 'https://example.com/udon.jpg',
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [userLevel] = useState(5); // Simulated user level
  const [currentXP] = useState(1200); // Simulated current XP

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

  // Calculate order totals and XP
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.00;
  const discount = 0;
  const total = subtotal + deliveryFee - discount;
  
  // XP Calculations
  const baseXP = cartItems.reduce((sum, item) => sum + (item.xpReward * item.quantity), 0);
  const orderSizeBonus = subtotal > 50 ? 50 : subtotal > 30 ? 25 : 0;
  const levelBonus = Math.floor(userLevel * 5); // 5 bonus XP per user level
  const totalXP = baseXP + orderSizeBonus + levelBonus;

  // XP Milestone rewards
  const xpMilestones = [
    { threshold: 1500, reward: "🎉 Silver Status" },
    { threshold: 2000, reward: "🌟 Gold Status" },
    { threshold: 3000, reward: "💎 Diamond Status" }
  ];

  const getNextMilestone = () => {
    const nextMilestone = xpMilestones.find(m => (currentXP + totalXP) < m.threshold);
    return nextMilestone || xpMilestones[xpMilestones.length - 1];
  };

  const handleCheckout = () => {
    const nextMilestone = getNextMilestone();
    const xpAfterOrder = currentXP + totalXP;
    
    let message = `Order Total: $${total.toFixed(2)}\n\nXP Breakdown:\n`;
    message += `Base XP: ${baseXP}\n`;
    message += `Order Size Bonus: +${orderSizeBonus}\n`;
    message += `Level ${userLevel} Bonus: +${levelBonus}\n`;
    message += `Total XP: ${totalXP}\n\n`;
    
    if (nextMilestone && xpAfterOrder < nextMilestone.threshold) {
      message += `${nextMilestone.threshold - xpAfterOrder} XP until ${nextMilestone.reward}!`;
    } else if (nextMilestone) {
      message += `🎊 Congratulations! You'll unlock ${nextMilestone.reward}!`;
    }

    Alert.alert(
      "Confirm Order",
      message,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Place Order", onPress: () => console.log("Order placed!") }
      ]
    );
  };

  const XPProgressBar = ({ currentXP, earnedXP }) => {
    const nextMilestone = getNextMilestone();
    const progress = ((currentXP + earnedXP) / nextMilestone.threshold) * 100;
    
    return (
      <View style={styles.xpProgressContainer}>
        <View style={styles.xpIcon}>
          <MaterialCommunityIcons name="lightning-bolt" size={20} color="#FFD700" />
        </View>
        <View style={styles.xpBarContainer}>
          <View style={[styles.xpBar, { width: `${Math.min(progress, 100)}%` }]} />
        </View>
        <Text style={styles.xpText}>+{earnedXP} XP</Text>
      </View>
    );
  };

  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        defaultSource={{uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}}
      />
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.xpBadge}>
          <MaterialCommunityIcons name="lightning-bolt" size={12} color="#FFD700" />
          <Text style={styles.xpBadgeText}>+{item.xpReward} XP</Text>
        </View>
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
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lvl {userLevel}</Text>
        </View>
      </View>

      <View style={styles.xpCard}>
        <View style={styles.xpCardHeader}>
          <Text style={styles.xpCardTitle}>Order Rewards</Text>
          <View style={styles.bonusBadge}>
            <Text style={styles.bonusText}>+{levelBonus} Level Bonus</Text>
          </View>
        </View>
        <XPProgressBar currentXP={currentXP} earnedXP={totalXP} />
        <Text style={styles.xpCardSubtitle}>
          {getNextMilestone().threshold - (currentXP + totalXP)} XP until {getNextMilestone().reward}
        </Text>
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
        {orderSizeBonus > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Order Size XP Bonus</Text>
            <Text style={[styles.summaryValue, styles.bonusText]}>+{orderSizeBonus} XP</Text>
          </View>
        )}
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <MaterialCommunityIcons name="lightning-bolt" size={20} color="#FFF" />
        <Text style={styles.checkoutButtonText}>
          Checkout & Earn {totalXP} XP
        </Text>
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
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
  },
  levelBadge: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  levelText: {
    color: '#FFF',
    fontWeight: '600',
  },
  xpCard: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  xpCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  xpCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bonusBadge: {
    backgroundColor: '#FFE4B5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bonusText: {
    color: '#FFA500',
    fontWeight: '600',
    fontSize: 12,
  },
  xpProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  xpIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#FFA500',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  xpBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginRight: 10,
  },
  xpBar: {
    height: '100%',
    backgroundColor: '#FFA500',
    borderRadius: 4,
  },
  xpText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  xpCardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
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
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    color: '#FFA500',
    fontWeight: '600',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  xpBadgeText: {
    fontSize: 12,
    color: '#FFA500',
    marginLeft: 4,
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8fc',
    borderRadius: 20,
    padding: 5,
  }
});

export default Cart;