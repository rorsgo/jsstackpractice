import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./pages/Main";
import User from "./pages/User";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: "My home",
            headerTitleAlign: "center",
            headerTitleStyle: {
              marginBottom: 20
            },
            headerStyle: {
              backgroundColor: "#7159c1"
            },
            headerTintColor: "#FFF",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="User"
          component={User}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}