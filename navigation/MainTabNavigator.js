import React from "react";
import { Platform } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Colors from "../constants/Colors";

import DiscoverScreen from "../screens/DiscoverScreen";
import DiscussionsScreen from "../screens/DiscussionsScreen";
import ContactsScreen from "../screens/ContactsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ChatScreen from "../screens/ChatScreen";

export default TabNavigator(
  {
    Discussions: {
      screen: DiscussionsScreen
    },
    Contacts: {
      screen: ContactsScreen
    },
    Discover: {
      screen: DiscoverScreen
    },
    Notifications: {
      screen: NotificationsScreen
    },
    Chat: {
      screen: ChatScreen
    },

  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Discover":
            iconName = "map";
            break;
          case "Discussions":
            iconName = "chat";
            break;
          case "Notifications":
            iconName = "notifications";
            break;
          case "Contacts":
            iconName = "contacts";
            break;
          case "Chat":
            iconName = "forum";
            break;
        }
        return (
          <MaterialIcons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: "Discover"
  }
);
