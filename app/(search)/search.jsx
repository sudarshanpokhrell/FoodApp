import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('trending'); // trending or offers
  const [filteredItems, setFilteredItems] = useState([]);

  const trendingItems = [
    {
      id: '1',
      title: 'Burger King',
      category: 'Fast Food',
      rating: 4.5,
      deliveryTime: '20-30 min',
      imageUrl: 'https://placeholder.com/restaurant1.jpg',
      popular: 'Whopper, Chicken Royale'
    },
    {
      id: '2',
      title: 'Pizza Express',
      category: 'Italian',
      rating: 4.7,
      deliveryTime: '25-35 min',
      imageUrl: 'https://placeholder.com/restaurant2.jpg',
      popular: 'Margherita, Pepperoni'
    },
    {
      id: '3',
      title: 'Sushi Hub',
      category: 'Japanese',
      rating: 4.8,
      deliveryTime: '30-40 min',
      imageUrl: 'https://placeholder.com/restaurant3.jpg',
      popular: 'California Roll, Salmon Nigiri'
    },
  ];

  const offerItems = [
    {
      id: '1',
      title: '50% Off First Order',
      restaurant: 'Burger King',
      category: 'Fast Food',
      validUntil: '24h remaining',
      imageUrl: 'https://placeholder.com/offer1.jpg',
    },
    {
      id: '2',
      title: 'Free Delivery',
      restaurant: 'Pizza Express',
      category: 'Italian',
      validUntil: '2d remaining',
      imageUrl: 'https://placeholder.com/offer2.jpg',
    },
    {
      id: '3',
      title: '20% Off Sushi Platters',
      restaurant: 'Sushi Hub',
      category: 'Japanese',
      validUntil: '5h remaining',
      imageUrl: 'https://placeholder.com/offer3.jpg',
    },
  ];

  // Popular search keywords
  const popularSearches = ['Pizza', 'Burger', 'Sushi', 'Chinese', 'Indian', 'Italian'];

  useEffect(() => {
    const items = activeTab === 'trending' ? trendingItems : offerItems;
    if (searchText) {
      const filtered = items.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(searchText.toLowerCase()) ||
        (item.popular && item.popular.toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchText, activeTab]);

  const renderTrendingItem = ({ item }) => (
    <TouchableOpacity style={styles.restaurantContainer}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.restaurantImage}
      />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.title}</Text>
        <Text style={styles.categoryText}>{item.category}</Text>
        <View style={styles.restaurantMeta}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Icon name="time-outline" size={16} color="#666" style={styles.timeIcon} />
          <Text style={styles.deliveryTimeText}>{item.deliveryTime}</Text>
        </View>
        <Text style={styles.popularDishesText}>Popular: {item.popular}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderOfferItem = ({ item }) => (
    <TouchableOpacity style={styles.offerContainer}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.offerImage}
       
      />
      <View style={styles.offerInfo}>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerRestaurant}>{item.restaurant}</Text>
        <View style={styles.offerMeta}>
          <Text style={styles.validityText}>{item.validUntil}</Text>
          <TouchableOpacity style={styles.claimButton}>
            <Text style={styles.claimButtonText}>Claim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants, dishes..."
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
        />
        {searchText ? (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Icon name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Popular Searches */}
      {!searchText && (
        <View style={styles.popularSearchesContainer}>
          <Text style={styles.popularSearchesTitle}>Popular Searches</Text>
          <View style={styles.popularSearchesWrapper}>
            {popularSearches.map((term, index) => (
              <TouchableOpacity
                key={index}
                style={styles.popularSearchTag}
                onPress={() => setSearchText(term)}
              >
                <Text style={styles.popularSearchText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'trending' && styles.activeTab]}
          onPress={() => setActiveTab('trending')}
        >
          <Text style={[styles.tabText, activeTab === 'trending' && styles.activeTabText]}>
            Restaurants
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'offers' && styles.activeTab]}
          onPress={() => setActiveTab('offers')}
        >
          <Text style={[styles.tabText, activeTab === 'offers' && styles.activeTabText]}>
            Offers
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results List */}
      <FlatList
        data={filteredItems}
        renderItem={activeTab === 'trending' ? renderTrendingItem : renderOfferItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    margin: 16,
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  popularSearchesContainer: {
    padding: 16,
    paddingTop: 8,
  },
  popularSearchesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  popularSearchesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  popularSearchTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  popularSearchText: {
    fontSize: 14,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#000',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  restaurantContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  restaurantInfo: {
    flex: 1,
    padding: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
    marginRight: 12,
  },
  timeIcon: {
    marginRight: 4,
  },
  deliveryTimeText: {
    fontSize: 14,
    color: '#666',
  },
  popularDishesText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  offerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  offerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  offerInfo: {
    flex: 1,
    padding: 12,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  offerRestaurant: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  offerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  validityText: {
    fontSize: 13,
    color: '#666',
  },
  claimButton: {
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SearchPage;