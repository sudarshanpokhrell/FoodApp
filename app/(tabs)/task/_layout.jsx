import { Stack } from 'expo-router';

const TaskLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="task/quiz"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="task/guess"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default TaskLayout;
