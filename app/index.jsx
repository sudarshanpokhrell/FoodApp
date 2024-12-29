import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#161622", flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 24,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Discover Endless
            </Text>
            <Text
              style={{
                fontSize: 24,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Possibilities with <Text style={{ color: "#FF6347" }}>Aora</Text>
            </Text>
          </View>

          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins",
              color: "#D1D5DB",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <Link href="/home" style={{ marginTop: 20 }}>
            <Text style={{ color: "#FF6347", fontSize: 16 }}>Get Started</Text>
          </Link>
          <Link href="/login" style={{ marginTop: 20 }}>
            <Text style={{ color: "#D1D5DB", fontSize: 16 }}>Login</Text>
          </Link>
          <Link href="/register" style={{ marginTop: 20 }}>
            <Text style={{ color: "#D1D5DB", fontSize: 16 }}>Sign Up</Text>
          </Link>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};



export default Welcome;
