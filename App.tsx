import * as React from "react";
import { Button, View, Platform, Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { useResponsiveWidth } from "react-native-responsive-dimensions";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: useResponsiveWidth(100) < 768 }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerLeft:
            useResponsiveWidth(100) < 768 && Platform.OS === "web"
              ? () => (
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons
                      name="ios-menu"
                      size={30}
                      color="black"
                      style={{ padding: 20 }}
                    />
                  </TouchableOpacity>
                )
              : undefined,
        })}
      />
    </Stack.Navigator>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function NotificationsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: useResponsiveWidth(100) < 768 }}
    >
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          headerLeft:
            useResponsiveWidth(100) < 768 && Platform.OS === "web"
              ? () => (
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons
                      name="ios-menu"
                      size={30}
                      color="black"
                      style={{ padding: 20 }}
                    />
                  </TouchableOpacity>
                )
              : undefined,
        })}
      />
    </Stack.Navigator>
  );
}

const DrawerNavigation = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerType={useResponsiveWidth(100) >= 768 ? "permanent" : "front"}
  >
    <Drawer.Screen name="Home" component={HomeNavigator} />
    <Drawer.Screen name="Notifications" component={NotificationsNavigator} />
  </Drawer.Navigator>
);

const DrawerStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Drawer"
      component={DrawerNavigation}
      options={{ headerShown: useResponsiveWidth(100) >= 768 }}
    />
  </Stack.Navigator>
);

const TabNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationsNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-notifications" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const linking = {
  prefixes: ["localhost:19006"],
  config: {
    Home: "",
    Notifications: "",
    Drawer: "",
    NotificationsScreen: "notifications",
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      {Platform.OS === "web" || useResponsiveWidth(100) >= 768 ? <DrawerStack /> : <TabNavigation />}
    </NavigationContainer>
  );
}
