import React, { useState, useEffect } from "react";
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

const Home = () => {
  const [greeting, setGreeting] = useState("");

  const [recommendedItems, setRecommendedItems] = useState([
    {
      id: "1",
      name: "Roll with shrimp",
      price: "2.90",
      rating: "4.5",
      image:
        "https://int.japanesetaste.com/cdn/shop/articles/how-to-make-makizushi-sushi-rolls-japanese-taste.jpg?v=1707914944&width=5760",
    },
    {
      id: "2",
      name: "Smoked salmon",
      price: "3.50",
      rating: "4.8",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl10M_H1nzIBs_50Hp5WKSv0OG_bNoMM-Jg&s",
    },
    {
      id: "3",
      name: "Mero special",
      price: "4.20",
      rating: "4.6",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuwPJGpLvXKp_rD42RKj1jXYXNGzatHHz3sQ&s",
    },
  ]);

  const [nearbyRestaurants, setNearbyRestaurants] = useState([
    {
      id: "1",
      name: "The Gardens",
      cuisine: "Nepali • Indian • Asian",
      rating: "4.7",
      time: "20-30 min",
      image:
        "https://lh3.googleusercontent.com/p/AF1QipP1CO-JHVhWcVzuMKa7YWbhXbSDnw4xpnL__fd7=s1360-w1360-h1020",
    },
    {
      id: "2",
      name: "Mero Kitchen",
      cuisine: "Japanese • Ramen • Sushi",
      rating: "4.5",
      time: "25-35 min",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrlfFG67yF4BVNVzp448a-u7tIPK5kAij5dw&s",
    },
  ]);

  const [rapidFeast, setRapidFeast] = useState([
    {
      id: "1",
      name: "Momo",
      price: "2.90",
      rating: "4.5",
      image:
        "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/shaikh.khalid7-gmail.com/Chicken_Momos_Recipe_Delicious_Steamed_Chicken_Dumplings.jpg",
    },
    {
      id: "2",
      name: "Chicken Leg Piece",
      price: "3.50",
      rating: "4.8",
      image:
        "https://www.thespruceeats.com/thmb/Ce9JRCp8CRy0TvjpOMG1_zzhrWE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/terris-crispy-fried-chicken-legs-3056879-hero-01-db3cd6bfead040e6ad07528a162db843.jpg",
    },
    {
      id: "3",
      name: "Chicken Pizza",
      price: "4.20",
      rating: "4.6",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Lj3_8eh0xYQLDhyh1pYwOF6l00mL7hIfww&s",
    },
  ]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  
  const renderRecommendedItem = ({ item }) => (
    <TouchableOpacity style={styles.recommendedCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.recommendedImage}
        defaultSource={{
          uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        }} // Add a local placeholder image
      />
      <View style={styles.recommendedContent}>
        <Text style={styles.recommendedName}>{item.name}</Text>
        <View style={styles.recommendedDetails}>
          <Text style={styles.recommendedPrice}>${item.price}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity style={styles.restaurantCard}>
      <View style={styles.restaurantContent}>
        <Image
          source={{ uri: item.image }}
          style={styles.restaurantImage}
          defaultSource={{
            uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          }}
        />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
          <View style={styles.restaurantDetails}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.restaurantTime}>
              <Ionicons name="time-outline" size={16} color="#666" />{" "}
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{greeting}, Sanjay!</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.specialOffer}>
        <Text style={styles.offerTitle}>Special Offers</Text>
        <Text style={styles.offerDescription}>
          Make $77+ order and get Caviar Roll for free!
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
          style={styles.searchInput}
          placeholder="I'd like to have..."
          placeholderTextColor="#666"
        />
      </View>

      <Text style={styles.sectionTitle}>Recommended</Text>
      <FlatList
        data={recommendedItems}
        renderItem={renderRecommendedItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendedList}
      />
      <Text style={styles.sectionTitle}>Rapid Feast</Text>
      <FlatList
        data={rapidFeast}
        renderItem={renderRecommendedItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendedList}
      />

      <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
      <View style={styles.restaurantsContainer}>
        <FlatList
          data={nearbyRestaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item.id}
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
    width: 80, // Set a fixed width for the image
    height: 80, // Set a fixed height for the image
    borderRadius: 40, // Optional: to make the image round
    marginRight: 15, // Add some spacing between the image and text
    backgroundColor: "#f0f0f0", // Optional: background color for loading placeholder
  },

  restaurantContent: {
    flexDirection: "row",
    alignItems: "center", // Align image and text horizontally
  },

  restaurantInfo: {
    flex: 1, // Ensures that the text takes up remaining space
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
});

export default Home;
