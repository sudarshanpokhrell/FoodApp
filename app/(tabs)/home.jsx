import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [data, setData] = useState([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [rapidFeast, setRapidFeast] = useState([]);

  const recommendedItems = [
    {
      id: "1",
      name: "Momo",
      image:
        "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/shaikh.khalid7-gmail.com/Chicken_Momos_Recipe_Delicious_Steamed_Chicken_Dumplings.jpg",
    },
    {
      id: "2",
      name: "Pizza",
      image:
        "https://www.inspiredtaste.net/wp-content/uploads/2023/08/Cheese-Pizza-2-1200.jpg",
    },
    {
      id: "3",
      name: "Briyani",
      image:
        "https://dww3ueizok6z0.cloudfront.net/food/banner/193-8e6f5c121411ff2b5a54143fa12a5d126973b2f0",
    },
  ];

  const fetchUserData = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      setData(user.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchNearbyRestaurants = async () => {
    try {
      const response = await axios.get(
        "http://192.168.16.61:3000/api/v1/resturant"
      );
      setNearbyRestaurants(response.data.data);
    } catch (error) {
      console.error("Error fetching nearby restaurants:", error);
    }
  };

  const fetchRapidFeast = async () => {
    try {
      const response = await axios.get(
        "http://192.168.16.61:3000/api/v1/food/rapid"
      );
      setRapidFeast(response.data.data);
    } catch (error) {
      console.error("Error fetching rapid feast items:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchNearbyRestaurants();
    fetchRapidFeast();

    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const renderRapidFeast = ({ item }) => (
    <TouchableOpacity style={styles.recommendedCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.recommendedImage}
        defaultSource={{
          uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        }}
      />
      <View style={styles.recommendedContent}>
        <Text style={styles.recommendedName}>{item.name}</Text>
        <View style={styles.recommendedDetails}>
          <Text style={styles.recommendedPrice}>Rs.{item.price}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.restaurantName}>{item.restaurant.name}</Text>{" "}
        {/* Display restaurant name */}
        <Text style={styles.restaurantAddress}>
          {item.restaurant.address}
        </Text>{" "}
        {/* Display restaurant address */}
      </View>
    </TouchableOpacity>
  );

  const renderRecommendedItem = ({ item }) => (
    <TouchableOpacity style={styles.recommendedCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.recommendedImage}
        defaultSource={{
          uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        }}
      />
      <View style={styles.recommendedContent}>
        <Text style={styles.recommendedName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => router.push(`/restaurant/${item._id}`)}
    >
      <View style={styles.restaurantContent}>
        <Image
          source={{ uri: item.image }}
          style={styles.restaurantImage}
          defaultSource={{
            uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          }}
        />
        <View style={styles.restaurantInfo}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantLocation}>{item.address}</Text>
          </View>

          <Text style={styles.restaurantCuisine}>
            {item.cuisine.join(" • ")}
          </Text>
          <View style={styles.restaurantDetails}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 12,
              }}
            >
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.restaurantTime}>
                {item.time || "30-35"} min
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {greeting}, {data.fullName}
        </Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.specialOffer}>
        <Text style={styles.offerTitle}>Special Offers</Text>
        <Text style={styles.offerDescription}>
          Make Rs1000+ order and get 1 plate momo for free!
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          onPress={() => router.push("search")}
          style={styles.searchInput}
          placeholder="I'd like to have..."
          placeholderTextColor="#666"
        />
      </View>

      <Text style={styles.sectionTitle}>Recommended</Text>
      <FlatList
        data={recommendedItems}
        renderItem={renderRecommendedItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendedList}
      />

      <Text style={styles.sectionTitle}>Rapid Feast</Text>
      <FlatList
        data={rapidFeast}
        renderItem={renderRapidFeast}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendedList}
      />

      <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
      <View style={styles.restaurantsContainer}>
        <FlatList
          data={nearbyRestaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8fc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
  },
  profileButton: {
    padding: 8,
  },
  specialOffer: {
    backgroundColor: "#000",
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  offerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  offerDescription: {
    color: "#fff",
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  recommendedList: {
    paddingHorizontal: 15,
  },
  recommendedCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 5,
    width: 200,
    overflow: "hidden",
  },
  recommendedImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  recommendedContent: {
    padding: 12,
  },
  recommendedName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  recommendedDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recommendedPrice: {
    fontSize: 16,
    color: "#7b61ff",
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  restaurantName: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 8,
  },
  restaurantAddress: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  restaurantsContainer: {
    paddingHorizontal: 20,
  },
  restaurantCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  restaurantContent: {
    flexDirection: "row",
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  restaurantDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantTime: {
    marginLeft: 12,
    color: "#666",
    fontSize: 14,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: "#f0f0f0",
  },

  restaurantLocation: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 2,
  },
});

export default Home;
