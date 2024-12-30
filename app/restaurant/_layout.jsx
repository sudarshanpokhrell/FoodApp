import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false, // Hide the header for the [id] route
        }}
      />


    </Stack>
  );
};

export default Layout;
