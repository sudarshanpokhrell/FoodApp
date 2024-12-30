import { Stack } from 'expo-router';

const TaskLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile/credit"
        options={{ headerShown: false }}
      />
      
    </Stack>
  );
};

export default TaskLayout;
