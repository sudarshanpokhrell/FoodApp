import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";
import { icons } from "../../constants";

const TAB_CONFIG = [
  {
    name: "home",
    title: "Home",
    icon: icons.home,
  },
  {
    name: "task",
    title: "Task",
    icon: icons.bookmark,
  },
  {
    name: "Credit",
    title: "Credit",
    icon: icons.start,
  },
  {
    name: "cart",
    title: "Cart",
    icon: icons.cart,
  },
  {
    name: "profile",
    title: "Profile",
    icon: icons.profile,
  },
];

const TabIcon = ({ icon, color, name, focused }) => (
  <View style={[
    styles.tabIconContainer,
    focused && styles.tabIconContainerActive
  ]}>
    <Image
      source={icon}
      resizeMode="contain"
      style={[
        styles.tabIcon,
        { tintColor: focused ? '#FFA001' : '#9999AA' }
      ]}
    />
    <Text
      style={[
        styles.tabText,
        { color: focused ? '#FFA001' : '#9999AA' }
      ]}
    >
      {name}
    </Text>
  </View>
);

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#9999AA",
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        {TAB_CONFIG.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  icon={tab.icon}
                  name={tab.title}
                  focused={focused}
                />
              ),
            }}
          />
        ))}
      </Tabs>
      
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    width: 60,
  },
  tabIconContainerActive: {
    backgroundColor: 'rgba(255, 160, 1, 0.1)',
    borderRadius: 8,
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    fontFamily: "PRegular",
  },
  tabBarStyle: {
    backgroundColor: "#161622",
    borderTopWidth: 0,
    height: 70,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default TabLayout;