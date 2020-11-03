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
            title: "Users",
            headerTitleAlign: "center",
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
          options={{
            title: "Starred Repositories",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#7159c1"
            },
            headerTintColor: "#FFF",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}