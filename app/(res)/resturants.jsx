import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const RestaurantDetails = ({ restaurant }) => {
  const defaultRestaurant = {
    name: "Sample Restaurant",
    rating: 4.5,
    totalRatings: 2453,
    cuisine: ["Italian", "Pizza", "Pasta"],
    deliveryTime: "25-35",
    minimumOrder: 15,
    distance: 1.2,
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    isOpen: true,
    tags: ["Bestseller", "Promoted"],
    description: "Authentic Italian cuisine in a modern setting",
    address: "123 Food Street, Cuisine City",
    menu: {
      categories: [
        "All",
        "Starters",
        "Main Course",
        "Pizza",
        "Pasta",
        "Desserts",
        "Beverages"
      ],
      items: [
        {
          id: '1',
          name: 'Margherita Pizza',
          description: 'Fresh tomatoes, mozzarella, basil, olive oil',
          price: 12.99,
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=60&w=2000',
          isVegetarian: true,
          isSpicy: false,
          isBestseller: true,
        },
        {
          id: '2',
          name: 'Spaghetti Carbonara',
          description: 'Eggs, Pecorino Romano, pancetta, black pepper',
          price: 14.99,
          category: 'Pasta',
          image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=60&w=2000',
          isVegetarian: false,
          isSpicy: false,
          isBestseller: true,
        },
        {
          id: '3',
          name: 'Tiramisu',
          description: 'Coffee-soaked ladyfingers, mascarpone, cocoa',
          price: 6.99,
          category: 'Desserts',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBGuQyHc1vkv7YCkXdvEQ9UC7cyAl0cRXxaA&s',
          isVegetarian: true,
          isSpicy: false,
          isBestseller: true,
        },
        {
          id: '4',
          name: 'Bruschetta',
          description: 'Toasted bread, garlic, tomatoes, basil, olive oil',
          price: 8.99,
          category: 'Starters',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMhRaXSIbW-KSpPBLQ8Az4uc6W_xLk0bVRGw&s',
          isVegetarian: true,
          isSpicy: false,
          isBestseller: false,
        },
        {
          id: '5',
          name: 'Penne Arrabiata',
          description: 'Penne, garlic, tomatoes, chili flakes, olive oil',
          price: 11.99,
          category: 'Main Course',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZjVrIvcUCvl63CaYa5d-HT70QCiNkue1TLA&s',
          isVegetarian: true,

          isSpicy: true,
          isBestseller: false,
        },

        {
          id: '6',
          name: 'Coca-Cola',
          description: 'Carbonated soft drink',
          price: 2.99,
          category: 'Beverages',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxDaINrIyoDnnR9Ika2vrEfn9RntZBd3slMA&s',
          isVegetarian: true,
          isSpicy: false,
          isBestseller: false,
        }
        
      ]
    }
  };

  const data = { ...defaultRestaurant, ...restaurant };
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = data.menu.items.filter(item =>
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const renderPriceLevel = () => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <Text
          key={index}
          style={[
            styles.dollarSign,
            { color: index < data.priceLevel ? '#000' : '#ccc' }
          ]}
        >
          $
        </Text>
      ));
  };

  const renderTags = () => {
    return data.tags.map((tag, index) => (
      <View key={index} style={styles.tag}>
        <Text style={styles.tagText}>{tag}</Text>
      </View>
    ));
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item)}
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem
      ]}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity  onPress={() => router.push('food', { food: item })}  style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <View style={styles.menuItemHeader}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <View style={styles.menuItemBadges}>
              {item.isVegetarian && (
                <MaterialIcons name="eco" size={16} color="green" />
              )}
              {item.isSpicy && (
                <MaterialIcons name="whatshot" size={16} color="red" />
              )}
              {item.isBestseller && (
                <View style={styles.bestsellerBadge}>
                  <Text style={styles.bestsellerText}>★ Bestseller</Text>
                </View>
              )}
            </View>
          </View>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <Image
          source={{ uri: item.image }}
          style={styles.menuItemImage}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: data.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{data.name}</Text>
            {data.isOpen ? (
              <View style={styles.openBadge}>
                <Text style={styles.openText}>Open</Text>
              </View>
            ) : (
              <View style={[styles.openBadge, styles.closedBadge]}>
                <Text style={styles.closedText}>Closed</Text>
              </View>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{data.rating}</Text>
            <Text style={styles.totalRatings}>({data.totalRatings})</Text>
          </View>
        </View>

        <View style={styles.tagsRow}>
          {renderTags()}
        </View>

        <Text style={styles.description}>{data.description}</Text>

        <View style={styles.cuisineContainer}>
          {data.cuisine.map((item, index) => (
            <Text key={index} style={styles.cuisineText}>
              {index > 0 ? ' • ' : ''}{item}
            </Text>
          ))}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialIcons name="delivery-dining" size={24} color="#666" />
            <Text style={styles.infoText}>{data.deliveryTime} mins</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="location-on" size={24} color="#666" />
            <Text style={styles.infoText}>{data.distance} km</Text>
          </View>
          <View style={styles.infoItem}>
            {renderPriceLevel()}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.addressContainer}>
          <MaterialIcons name="place" size={20} color="#666" />
          <Text style={styles.address}>{data.address}</Text>
        </View>

        <View style={styles.divider} />

        {/* Menu Section */}
        <Text style={styles.menuTitle}>Menu</Text>

        {/* Categories */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data.menu.categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          style={styles.categoriesList}
        />

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <FlatList
            data={filteredItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.menuList}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  openBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  openText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
  closedBadge: {
    backgroundColor: '#FFEBEE',
  },
  closedText: {
    color: '#C62828',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  totalRatings: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#E65100',
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  cuisineText: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  dollarSign: {
    fontSize: 16,
    marginHorizontal: 1,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  // Menu Styles
  menuContainer: {
    flex: 1,
  },
  categoriesList: {
    marginBottom: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  selectedCategoryItem: {
    backgroundColor: '#FF5722',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  menuList: {
    paddingBottom: 16,
  },
  menuItem: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemContent: {
    flexDirection: 'row',
    padding: 12,
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 12,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  menuItemBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  bestsellerBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  bestsellerText: {
    color: '#E65100',
    fontSize: 10,
    fontWeight: '500',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5722',
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default RestaurantDetails;