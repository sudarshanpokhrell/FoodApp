import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RestLayout = () => {


  return (
    <>
      <Stack>
        <Stack.Screen
          name="resturants"
          options={{
            headerShown: false,
          }}
        />

      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default RestLayout;