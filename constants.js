const defaultRestaurant = {
  name: "The Gardens",
  rating: 0,
  ratingCount: 0,
  cuisine: ["Brunch", "Drinks", "Snacks", "Pizza"],
  deliveryTime: "20-30",
  minimumOrder: 250,
  distance: 1.5,
  priceLevel: 2,
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4alJZO_6KCd12mE6INQqNmQAk1Bt4WOEQQA&s",
  isOpen: true,
  tags: ["New", "Popular"],
  description:
    "A charming restaurant offering a delightful brunch experience, along with a variety of drinks, snacks, and pizzas. Known for its serene ambiance and free parking facilities.",
  address: "Panipokhari, Lazimpat, Kathmandu",
  menu: {
    categories: ["All", "Appetizer", "Beverage", "Main Course", "Soup"],
    items: [
      {
        id: "6772adabd2fd9664341e910a",
        name: "Momo",
        description:
          "Traditional Nepali dumplings filled with your choice of minced meat or vegetables, served with a side of spicy dipping sauce.",
        price: 350,
        category: "Appetizer",
        image:
          "https://img.taste.com.au/mdKxKxoR/taste/2016/11/chicken-momos-with-tomato-achar-46671-1.jpeg",
        rating: 0,
        ratingCount: 120,
        tags: ["Dumpling", "Nepali", "Vegetarian Options"],
        prepareTime: 10,
      },
      {
        id: "6772adabd2fd9664341e910f",
        name: "Mushroom Sofrito",
        description:
          "A savory dish made with sautéed mushrooms in a flavorful sofrito sauce, suitable for a light meal or appetizer.",
        price: 350,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4kgMuxYe9TfMaaTUQ6VpFfX8e4WoJaiY4_g&s",
        rating: 4.5,
        ratingCount: 70,
        category: "Appetizer",
        prepareTime: 20,
        tags: ["Appetizer", "Vegetarian", "Gluten-Free"],
      },
      {
        id: "6772adabd2fd9664341e910c",
        name: "Cinnamon Honey Latte",
        description:
          "A warm latte infused with cinnamon and honey, offering a sweet and spicy flavor profile.",
        price: 300,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq4hQJIXxXcs4wBRC30dOO4g1_8Ea8Kif2Kg&s",
        rating: 4.6,
        ratingCount: 90,
        category: "Beverage",
        prepareTime: 12,
        tags: ["Hot Drink", "Coffee", "Vegetarian"],
      },
      {
        id: "6772adabd2fd9664341e910d",
        name: "Matcha Latte",
        description:
          "A creamy latte made with high-quality matcha, providing a healthy and energizing beverage option.",
        price: 320,
        image:
          "https://www.thegardengrazer.com/wp-content/uploads/2015/08/vanilla-matcha-latte-75.jpg",
        rating: 4.4,
        ratingCount: 75,
        category: "Beverage",
        prepareTime: 11,
        tags: ["Hot Drink", "Tea", "Vegetarian"],
      },
      {
        id: "6772adabd2fd9664341e910b",
        name: "The Gardens Special Hot Chocolate",
        description:
          "A rich and creamy hot chocolate, perfect for warming up on chilly days.",
        price: 250,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw987v_w8dqap7C7t5Mw2SUAe2H0IqmV0ynw&s",
        rating: 4.7,
        ratingCount: 85,
        category: "Beverage",
        prepareTime: 15,
        tags: ["Hot Drink", "Chocolate", "Vegetarian"],
      },
      {
        id: "6772adabd2fd9664341e9111",
        name: "Assorted Pizzas",
        description:
          "A variety of pizzas available during special promotions, such as the opening week offer with pizzas priced at Rs.300/-.",
        price: 300,
        image:
          "https://c8.alamy.com/comp/2Y4PFEB/tasty-assorted-pizzas-on-a-wooden-background-2Y4PFEB.jpg",
        rating: 4.8,
        ratingCount: 100,
        category: "Main Course",
        prepareTime: 20,
        tags: ["Pizza", "Italian"],
      },
      {
        id: "6772adabd2fd9664341e9110",
        name: "Chicken Sofrito",
        description:
          "Tender chicken pieces cooked in a traditional sofrito sauce, offering a rich and satisfying taste.",
        price: 400,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSamgvg-ZsxBayKH5JaJADEH6B2V0QwmJm8yw&s",
        rating: 4.7,
        ratingCount: 80,
        category: "Main Course",
        prepareTime: 25,
        tags: ["Main Course", "Gluten-Free"],
      },
      {
        id: "6772adabd2fd9664341e910e",
        name: "Trio Corn Soup",
        description:
          "A comforting soup featuring a blend of sweet corn, baby corn, and popcorn, delivering a unique and hearty flavor.",
        price: 280,
        image:
          "https://www.davidlebovitz.com/wp-content/uploads/2014/08/corn-soup-recipe-10.jpg",
        rating: 4.3,
        ratingCount: 65,
        category: "Soup",
        prepareTime: 15,
        tags: ["Soup", "Vegetarian", "Gluten-Free"],
      },
    ],
  },
};

export { defaultRestaurant };
