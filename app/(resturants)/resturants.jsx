import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

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
  };

  const data = { ...defaultRestaurant, ...restaurant };

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

        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>View Full Menu</Text>
        </TouchableOpacity>
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
  menuButton: {
    backgroundColor: '#FF5722',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RestaurantDetails;