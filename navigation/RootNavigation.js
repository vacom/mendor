import { Notifications } from "expo";
import React from "react";
import { StackNavigator } from "react-navigation";
//Main Tab Navigation
import MainTabNavigator from "./MainTabNavigator";
//Screen Containers
import ProfileScreen from "../screens/ProfileScreen";
import DiscussionScreen from "../screens/DiscussionScreen";
import SigninScreen from "../screens/SigninScreen/index";
//Push Notifications
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator
    },
    Profile: {
      screen: ProfileScreen
    },
    Discussion: {
      screen: DiscussionScreen
    },
    SignIn: {
      screen: SigninScreen
    }
  },
  {
    navigationOptions: () => ({
      headerTintColor: "#ffffff",
      headerStyle: {
        backgroundColor: "#3F51B5"
      },
      headerTitleStyle: {
        fontWeight: "normal"
      }
    }),
    initialRouteName: "Main"
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}
