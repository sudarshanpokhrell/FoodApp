import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  Switch,
} from 'react-native';

const { width } = Dimensions.get('window');

const FoodDetailPage = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [totalPrice, setTotalPrice] = useState(12.99);

  const [customMode, setCustomMode] = useState(false);
  const [selectedBase, setSelectedBase] = useState('classic');
  const [selectedSauce, setSelectedSauce] = useState('tomato');
  const [selectedCheese, setSelectedCheese] = useState('mozzarella');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedFinishes, setSelectedFinishes] = useState([]);


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

  const calculateTotal = useCallback(() => {
    let total = 10.99; 
    
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

      const finishesTotal = selectedFinishes.reduce((sum, finishId) => {
        const finish = customizationOptions.finishes.find(f => f.id === finishId);
        return sum + (finish?.price || 0);
      }, 0);
      total += finishesTotal;
    }

    return (total * quantity).toFixed(2);
  }, [customMode, selectedBase, selectedCheese, selectedToppings, selectedFinishes, quantity]);

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
              <Text style={styles.optionPrice}>+Rs.{option.price.toFixed(2)}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  
  const foodData = {
    title: "Classic Margherita Pizza",
    description: "Traditional Italian pizza with fresh ingredients and a perfectly crispy crust",
    basePrice: 12.99,
    preparationTime: "20-25 mins",
    calories: "850 kcal",
    rating: 4.8,
    reviews: 245,
    ingredients: [
      { name: "Pizza Dough", amount: "250g", isCustomizable: false },
      { name: "Mozzarella", amount: "200g", isCustomizable: true },
      { name: "Fresh Basil", amount: "10-12 leaves", isCustomizable: true },
      { name: "Tomato Sauce", amount: "120ml", isCustomizable: false },
      { name: "Olive Oil", amount: "2 tbsp", isCustomizable: false },
      { name: "Salt", amount: "to taste", isCustomizable: false }
    ],
    sizes: [
      { id: 'small', label: 'Small (8")', priceModifier: -2 },
      { id: 'medium', label: 'Medium (10")', priceModifier: 0 },
      { id: 'large', label: 'Large (12")', priceModifier: 3 }
    ],
    extras: [
      { id: 'extra_cheese', label: 'Extra Cheese', price: 1.50 },
      { id: 'mushrooms', label: 'Mushrooms', price: 1.00 },
      { id: 'olives', label: 'Black Olives', price: 1.00 },
      { id: 'pepperoni', label: 'Pepperoni', price: 2.00 }
    ],
    nutritionFacts: {
      protein: "34g",
      carbs: "88g",
      fats: "42g",
      fiber: "4g"
    }
  };

  const updateTotalPrice = () => {
    const sizeModifier = foodData.sizes.find(size => size.id === selectedSize).priceModifier;
    const extrasTotal = selectedExtras.reduce((total, extraId) => {
      const extra = foodData.extras.find(e => e.id === extraId);
      return total + extra.price;
    }, 0);
    const newTotal = (foodData.basePrice + sizeModifier + extrasTotal) * quantity;
    setTotalPrice(newTotal);
  };

  const toggleExtra = (extraId) => {
    setSelectedExtras(prev => {
      if (prev.includes(extraId)) {
        return prev.filter(id => id !== extraId);
      }
      return [...prev, extraId];
    });
  };

  // Section Components
  const IngredientsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Ingredients</Text>
      {foodData.ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientRow}>
          <Text style={styles.ingredientName}>{ingredient.name}</Text>
          <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
        </View>
      ))}
    </View>
  );

  const SizeSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Choose Size</Text>
      <View style={styles.sizeOptions}>
        {foodData.sizes.map((size) => (
          <TouchableOpacity
            key={size.id}
            style={[
              styles.sizeButton,
              selectedSize === size.id && styles.selectedSizeButton
            ]}
            onPress={() => setSelectedSize(size.id)}
          >
            <Text style={[
              styles.sizeButtonText,
              selectedSize === size.id && styles.selectedSizeButtonText
            ]}>
              {size.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const ExtrasSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Extras</Text>
      <View style={styles.extrasGrid}>
        {foodData.extras.map((extra) => (
          <TouchableOpacity
            key={extra.id}
            style={[
              styles.extraButton,
              selectedExtras.includes(extra.id) && styles.selectedExtraButton
            ]}
            onPress={() => toggleExtra(extra.id)}
          >
            <Text style={[
              styles.extraButtonText,
              selectedExtras.includes(extra.id) && styles.selectedExtraButtonText
            ]}>
              {extra.label}
            </Text>
            <Text style={styles.extraPrice}>+Rs.{extra.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const NutritionSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Nutrition Facts</Text>
      <View style={styles.nutritionGrid}>
        {Object.entries(foodData.nutritionFacts).map(([key, value]) => (
          <View key={key} style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{value}</Text>
            <Text style={styles.nutritionLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStRNhekmhYIi4X64AgCIgaLZbZqH72BJT5lw&s' }}
          style={styles.foodImage}
          defaultSource={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxDaINrIyoDnnR9Ika2vrEfn9RntZBd3slMA&s`}
        />
        
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{foodData.title}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {foodData.rating}</Text>
              <Text style={styles.reviews}>({foodData.reviews} reviews)</Text>
            </View>
            <Text style={styles.description}>{foodData.description}</Text>
            <View style={styles.metaInfo}>
              <Text style={styles.prepTime}>🕒 {foodData.preparationTime}</Text>
              <Text style={styles.calories}>🔥 {foodData.calories}</Text>
            </View>
          </View>
          <NutritionSection />
          <IngredientsSection />
          <SizeSelector />
          <ExtrasSelector />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Build Your Perfect Pizza</Text>
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
                      <Text style={styles.optionPrice}>+Rs.{topping.price.toFixed(2)}</Text>
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
                      <Text style={styles.optionPrice}>+Rs.{topping.price.toFixed(2)}</Text>
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
            {/* Your existing preset pizza content */}
          </View>
        )}



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
            Add to Cart - Rs.{totalPrice.toFixed(2)}
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  foodImage: {
    width: width,
    height: width * 0.8,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#FFB800',
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  prepTime: {
    marginRight: 16,
    color: '#666',
  },
  calories: {
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ingredientName: {
    fontSize: 16,
    color: '#333',
  },
  ingredientAmount: {
    fontSize: 16,
    color: '#666',
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeButton: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  selectedSizeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  sizeButtonText: {
    color: '#333',
    fontSize: 14,
  },
  selectedSizeButtonText: {
    color: 'white',
  },
  extrasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  extraButton: {
    width: '48%',
    margin: '1%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedExtraButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  extraButtonText: {
    color: '#333',
    fontSize: 14,
    marginBottom: 4,
  },
  selectedExtraButtonText: {
    color: 'white',
  },
  extraPrice: {
    fontSize: 12,
    color: '#666',
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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
});

export default FoodDetailPage;