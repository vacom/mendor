import { Notifications } from "expo";
import React from "react";
import { StackNavigator } from "react-navigation";
//Main Tab Navigation
import MainTabNavigator from "./MainTabNavigator";
//Screen Containers
<<<<<<< HEAD
import ProfileScreen from "../screens/ProfileScreen";
import DiscussionScreen from "../screens/DiscussionsScreen/ViewScreen/index";
import SigninScreen from "../screens/SigninScreen/index";
import AddDiscussion from "../screens/DiscussionsScreen/AddScreen/index"
=======
//ProfileScreens
import ProfileScreen from "../screens/ProfileScreen/index";
//DiscussionScreens
import DiscussionViewScreen from "../screens/DiscussionsScreen/ViewScreen/index.js";
//AuthScreens
import AuthScreen from "../screens/AuthScreen/index";
import SigninScreen from "../screens/AuthScreen/SigninScreen/index";
>>>>>>> 66847abef6b87b2ca3d070d2bd3f7952fa66d31b
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
    DiscussionView: {
      screen: DiscussionViewScreen
    },
    AuthScreen: {
      screen: AuthScreen
    },
    SignIn: {
      screen: SigninScreen
    },
    AddDiscussion: {
      screen: AddDiscussion
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
