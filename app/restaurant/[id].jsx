import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Switch,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const FoodDetailPage = () => {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customMode, setCustomMode] = useState(false);
  const [selectedBase, setSelectedBase] = useState('classic');
  const [selectedSauce, setSelectedSauce] = useState('tomato');
  const [selectedCheese, setSelectedCheese] = useState('mozzarella');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedFinishes, setSelectedFinishes] = useState([]);
  const [foodData, setFoodData] = useState(null);

  const customizationOptions = {
    bases: [
      { id: 'classic', name: 'Classic Crust', price: 0 },
      { id: 'thin', name: 'Thin & Crispy', price: 0 },
      { id: 'gluten_free', name: 'Gluten-Free', price: 2.50 },
      { id: 'cauliflower', name: 'Cauliflower', price: 3.00 }
    ],
    sauces: [
      { id: 'tomato', name: 'Classic Tomato', price: 0 },
      { id: 'bbq', name: 'BBQ Sauce', price: 0 },
      { id: 'white', name: 'White Sauce', price: 0 },
      { id: 'garlic_olive', name: 'Garlic Olive Oil', price: 0 }
    ],
    cheeses: [
      { id: 'mozzarella', name: 'Mozzarella', price: 0 },
      { id: 'dairy_free', name: 'Dairy-Free', price: 1.50 },
      { id: 'extra_cheese', name: 'Extra Cheese', price: 2.00 }
    ],
    toppings: [
      { id: 'pepperoni', name: 'Pepperoni', price: 1.00, category: 'meat' },
      { id: 'sausage', name: 'Italian Sausage', price: 1.00, category: 'meat' },
      { id: 'chicken', name: 'Grilled Chicken', price: 1.50, category: 'meat' },
      { id: 'mushrooms', name: 'Mushrooms', price: 0.75, category: 'veggie' },
      { id: 'onions', name: 'Red Onions', price: 0.50, category: 'veggie' },
      { id: 'peppers', name: 'Bell Peppers', price: 0.75, category: 'veggie' },
      { id: 'olives', name: 'Black Olives', price: 0.75, category: 'veggie' },
      { id: 'spinach', name: 'Fresh Spinach', price: 0.75, category: 'veggie' },
      { id: 'tomatoes', name: 'Sliced Tomatoes', price: 0.75, category: 'veggie' },
      { id: 'pineapple', name: 'Pineapple', price: 0.75, category: 'veggie' }
    ],
    finishes: [
      { id: 'basil', name: 'Fresh Basil', price: 0.50 },
      { id: 'arugula', name: 'Arugula', price: 0.75 },
      { id: 'ranch', name: 'Ranch Drizzle', price: 0.50 },
      { id: 'balsamic', name: 'Balsamic Glaze', price: 0.50 },
      { id: 'red_pepper', name: 'Red Pepper Flakes', price: 0 },
      { id: 'oregano', name: 'Oregano', price: 0 }
    ]
  };

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/foods/${id}`);
        const data = await response.json();
        setFoodData(data);
        setTotalPrice(data.basePrice);
      } catch (err) {
        console.error('Error fetching food data:', err);
      }
    };

    fetchFoodData();
  }, [id]);

  const calculateTotal = useCallback(() => {
    let total = foodData.basePrice;

    if (customMode) {
      const basePrice = customizationOptions.bases.find(b => b.id === selectedBase)?.price || 0;
      total += basePrice;

      // Add cheese price
      const cheesePrice = customizationOptions.cheeses.find(c => c.id === selectedCheese)?.price || 0;
      total += cheesePrice;

      // Add toppings
      const toppingsTotal = selectedToppings.reduce((sum, toppingId) => {
        const topping = customizationOptions.toppings.find(t => t.id === toppingId);
        return sum + (topping?.price || 0);
      }, 0);
      total += toppingsTotal;

      // Add finishes
      const finishesTotal = selectedFinishes.reduce((sum, finishId) => {
        const finish = customizationOptions.finishes.find(f => f.id === finishId);
        return sum + (finish?.price || 0);
      }, 0);
      total += finishesTotal;
    }

    const sizeModifier = foodData.sizes.find(size => size.id === selectedSize).priceModifier;
    const extrasTotal = selectedExtras.reduce((total, extraId) => {
      const extra = foodData.extras.find(e => e.id === extraId);
      return total + extra.price;
    }, 0);

    return (total + sizeModifier + extrasTotal) * quantity;
  }, [customMode, selectedBase, selectedCheese, selectedToppings, selectedFinishes, quantity, selectedSize, foodData, selectedExtras]);

  useEffect(() => {
    setTotalPrice(calculateTotal());
  }, [calculateTotal]);

  const CustomizationSection = ({ title, options, selected, onSelect, multiple = false }) => (
    <View style={styles.customizationSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsGrid}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              multiple
                ? selectedToppings.includes(option.id) && styles.selectedOption
                : selected === option.id && styles.selectedOption
            ]}
            onPress={() => {
              if (multiple) {
                setSelectedToppings(prev =>
                  prev.includes(option.id)
                    ? prev.filter(id => id !== option.id)
                    : [...prev, option.id]
                );
              } else {
                onSelect(option.id);
              }
            }}
          >
            <Text style={[
              styles.optionText,
              (multiple ? selectedToppings.includes(option.id) : selected === option.id)
                && styles.selectedOptionText
            ]}>
              {option.name}
            </Text>
            {option.price > 0 && (
              <Text style={styles.optionPrice}>+${option.price.toFixed(2)}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const toggleExtra = (extraId) => {
    setSelectedExtras(prev => {
      if (prev.includes(extraId)) {
        return prev.filter(id => id !== extraId);
      }
      return [...prev, extraId];
    });
  };

  const renderTags = () => {
    return foodData.tags.map((tag, index) => (
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
      onPress={() => router.push(`/food/${item.id}`)}
      style={styles.menuItem}
    >
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

  if (!foodData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: foodData.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{foodData.title}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.rating}>{foodData.rating}</Text>
              <Text style={styles.totalRatings}>({foodData.totalRatings})</Text>
            </View>
          </View>

          <View style={styles.tagsRow}>{renderTags()}</View>

          <Text style={styles.description}>{foodData.description}</Text>

          <View style={styles.cuisineContainer}>
            {foodData.cuisine.map((item, index) => (
              <Text key={index} style={styles.cuisineText}>
                {index > 0 ? " • " : ""}
                {item}
              </Text>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.addressContainer}>
            <MaterialIcons name="place" size={20} color="#666" />
            <Text style={styles.address}>{foodData.address}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <MaterialIcons name="delivery-dining" size={24} color="#666" />
              <Text style={styles.infoText}>{foodData.deliveryTime} mins</Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialIcons name="location-on" size={24} color="#666" />
              <Text style={styles.infoText}>{foodData.distance} km</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Menu Section */}
          <Text style={styles.menuTitle}>Customize Your Food</Text>

          {/* Categories */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={foodData.menu.categories}
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

          <View style={styles.header}>
            <Text style={styles.title}>Build Your Perfect Food</Text>
            <View style={styles.customModeToggle}>
              <Text style={styles.customModeText}>Custom Mode</Text>
              <Switch
                value={customMode}
                onValueChange={setCustomMode}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={customMode ? '#007AFF' : '#f4f3f4'}
              />
            </View>
          </View>

          {customMode ? (
            <View style={styles.buildSection}>
              <CustomizationSection
                title="1. Choose Your Base"
                options={customizationOptions.bases}
                selected={selectedBase}
                onSelect={setSelectedBase}
              />

              <CustomizationSection
                title="2. Select Your Sauce"
                options={customizationOptions.sauces}
                selected={selectedSauce}
                onSelect={setSelectedSauce}
              />

              <CustomizationSection
                title="3. Pick Your Cheese"
                options={customizationOptions.cheeses}
                selected={selectedCheese}
                onSelect={setSelectedCheese}
              />

              <View style={styles.customizationSection}>
                <Text style={styles.sectionTitle}>4. Add Your Toppings</Text>
                <Text style={styles.subsectionTitle}>Meats</Text>
                <View style={styles.optionsGrid}>
                  {customizationOptions.toppings
                    .filter(t => t.category === 'meat')
                    .map((topping) => (
                      <TouchableOpacity
                        key={topping.id}
                        style={[
                          styles.optionButton,
                          selectedToppings.includes(topping.id) && styles.selectedOption
                        ]}
                        onPress={() => {
                          setSelectedToppings(prev =>
                            prev.includes(topping.id)
                              ? prev.filter(id => id !== topping.id)
                              : [...prev, topping.id]
                          );
                        }}
                      >
                        <Text style={[
                          styles.optionText,
                          selectedToppings.includes(topping.id) && styles.selectedOptionText
                        ]}>
                          {topping.name}
                        </Text>
                        <Text style={styles.optionPrice}>+${topping.price.toFixed(2)}</Text>
                      </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.subsectionTitle}>Veggies</Text>
                <View style={styles.optionsGrid}>
                  {customizationOptions.toppings
                    .filter(t => t.category === 'veggie')
                    .map((topping) => (
                      <TouchableOpacity
                        key={topping.id}
                        style={[
                          styles.optionButton,
                          selectedToppings.includes(topping.id) && styles.selectedOption
                        ]}
                        onPress={() => {
                          setSelectedToppings(prev =>
                            prev.includes(topping.id)
                              ? prev.filter(id => id !== topping.id)
                              : [...prev, topping.id]
                          );
                        }}
                      >
                        <Text style={[
                          styles.optionText,
                          selectedToppings.includes(topping.id) && styles.selectedOptionText
                        ]}>
                          {topping.name}
                        </Text>
                        <Text style={styles.optionPrice}>+${topping.price.toFixed(2)}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>

              <CustomizationSection
                title="5. Finishing Touches"
                options={customizationOptions.finishes}
                selected={selectedFinishes}
                onSelect={setSelectedFinishes}
                multiple={true}
              />
            </View>
          ) : (
            <View style={styles.presetSection}>
              {/* Your existing preset food content */}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            onPress={() => quantity > 1 && setQuantity(q => q - 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(q => q + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => console.log('Add to cart')}
        >
          <Text style={styles.addToCartText}>
            Add to Cart - ${totalPrice.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    alignItems: 'space-evenly',
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
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  customModeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customModeText: {
    fontSize: 16,
    color: '#666',
  },
  buildSection: {
    padding: 16,
  },
  customizationSection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginTop: 12,
    marginBottom: 8,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    width: '48%',
    margin: '1%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  selectedOptionText: {
    color: 'white',
  },
  optionPrice: {
    fontSize: 12,
    color: '#666',
  },
});

export default FoodDetailPage;
