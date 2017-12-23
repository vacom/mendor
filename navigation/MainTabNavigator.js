import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Colors from "../constants/Colors";

import DiscoverScreen from "../screens/DiscoverScreen";
import DiscussionsScreen from "../screens/DiscussionsScreen/index";
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
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Discover":
            iconName = "explore";
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
            size={24}
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
    initialRouteName: "Discover",
    headerTintColor: "#ffffff",
    tabBarOptions: {
      style: {
        backgroundColor: '#ffffff',
      },
    }
    
  }
);
