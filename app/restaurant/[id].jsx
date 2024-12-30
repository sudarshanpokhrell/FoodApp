import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const RestaurantDetails = () => {
  const { id } = useLocalSearchParams();
  const [items, setItems] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://192.168.16.61:3000/api/v1/restaurant/items/${id}`
        );

        setItems(response.data.data);
        console.log("Hello", response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `http://192.168.16.61:3000/api/v1/restaurant/${id}`
        );
        setRestaurant(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
    fetchRestaurant();
  }, [id]);

  // Extract unique categories from items
  const categories = ["All", ...new Set(items.map((item) => item.category))];

  const filteredItems = items.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item)}
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem,
      ]}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/food/${item._id}`)}
      style={styles.menuItem}
    >
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <View style={styles.menuItemHeader}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <View style={styles.menuItemBadges}>
              {item.tags?.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          <Text style={styles.menuItemPrice}>Rs.{item.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.totalRatings}>({item.ratingCount})</Text>
          </View>
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
        source={{ uri: restaurant.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{restaurant.name}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{restaurant.rating}</Text>
            <Text style={styles.totalRatings}>({restaurant.ratingCount})</Text>
          </View>
        </View>

        <Text style={styles.description}>{restaurant.description}</Text>

        <View style={styles.cuisineContainer}>
          {restaurant.cuisine.map((item, index) => (
            <Text key={index} style={styles.cuisineText}>
              {index > 0 ? " • " : ""}
              {item}
            </Text>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.addressContainer}>
          <MaterialIcons name="place" size={20} color="#666" />
          <Text style={styles.address}>{restaurant.address}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.menuTitle}>Menu</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          style={styles.categoriesList}
        />

        <View style={styles.menuContainer}>
          <FlatList
            data={filteredItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            contentContainerStyle={styles.menuList}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Previous styles remain unchanged
  menuItemBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
  },
  tag: {
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    color: "#E65100",
    fontSize: 10,
    fontWeight: "500",
  },
});

export default RestaurantDetails;
