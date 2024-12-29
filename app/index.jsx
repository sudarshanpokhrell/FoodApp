import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Dimensions,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  primary: "#FF6347", 
  secondary: "#FFA07A", 
  accent: "#FFE4E1",
  text: "#4A4A4A", 
  white: "#FFFFFF",
};

const Welcome = () => {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView 
        contentContainerStyle={{ 
          minHeight: Dimensions.get('window').height,
          backgroundColor: COLORS.white 
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
            backgroundColor: COLORS.white,
          }}
        >
          {/* Decorative Element */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 200,
              height: 200,
              backgroundColor: COLORS.accent,
              borderBottomLeftRadius: 100,
              opacity: 0.5,
            }}
          />
          <Image source={require("../assets/icons/logo.png")} style={{ width: 150, height: 150 }} />

          <View style={{ marginTop: 20, marginBottom: 40 }}>
            <Text
              style={{
                fontSize: 32,
                color: COLORS.text,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Eat Endless
            </Text>
            <Text
              style={{
                fontSize: 32,
                color: COLORS.text,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Possibilities with{" "}
              <Text style={{ color: COLORS.primary }}>Eatmandu</Text>
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins",
              color: COLORS.text,
              marginBottom: 48,
              textAlign: "center",
              lineHeight: 24,
              maxWidth: "80%",
            }}
          >
            Where you can play games, win foods, and have fun snacks with friends and family.
          </Text>

          <Link
            href="/home"
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 16,
              paddingHorizontal: 48,
              borderRadius: 30,
              marginBottom: 16,
              width: "80%",
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18, textAlign: "center", fontWeight: "600" }}>
              Get Started
            </Text>
          </Link>

          <Link
            href="/login"
            style={{
              backgroundColor: COLORS.accent,
              paddingVertical: 16,
              paddingHorizontal: 48,
              borderRadius: 30,
              marginBottom: 16,
              width: "80%",
            }}
          >
            <Text style={{ color: COLORS.primary, fontSize: 18, textAlign: "center", fontWeight: "600" }}>
              Login
            </Text>
          </Link>

          <Link
            href="/register"
            style={{
              backgroundColor: COLORS.white,
              paddingVertical: 16,
              paddingHorizontal: 48,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: COLORS.primary,
              width: "80%",
            }}
          >
            <Text style={{ color: COLORS.primary, fontSize: 18, textAlign: "center", fontWeight: "600" }}>
              Sign Up
            </Text>
          </Link>
        </View>
      </ScrollView>

      <StatusBar backgroundColor={COLORS.white} style="dark" />
    </SafeAreaView>
  );
};

export default Welcome;