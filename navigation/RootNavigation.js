import { Notifications } from "expo";
import React from "react";
import { StackNavigator } from "react-navigation";
//Main Tab Navigation
import MainTabNavigator from "./MainTabNavigator";
//Screen Containers
//AddDisciussionScreen
import AddDiscussion from "../screens/DiscussionsScreen/AddScreen/index";
//ProfileScreens
import ProfileScreen from "../screens/ProfileScreen/index";
//DiscussionScreens
import DiscussionViewScreen from "../screens/DiscussionsScreen/ViewScreen/index";
//ChatScreens
import ChatViewScreen from "../screens/ChatScreen/ViewScreen/index";
//AuthScreens
import AuthScreen from "../screens/AuthScreen/index";
import SigninScreen from "../screens/AuthScreen/SigninScreen/index";
import SignupScreen from "../screens/AuthScreen/SignupScreen/index";
//Push Notifications
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";
//Utils
import { isSignedIn } from "../constants/Utils";

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
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
      ChatView: {
        screen: ChatViewScreen
      },
      AuthScreen: {
        screen: AuthScreen
      },
      SignIn: {
        screen: SigninScreen
      },
      SignUp: {
        screen: SignupScreen
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
      initialRouteName: signedIn ? "Main" : "AuthScreen"
    }
  );
};

export default class RootNavigator extends React.Component {
  state = {
    signedIn: false,
    checkedSignIn: false
  };
  componentWillMount() {
    isSignedIn()
      .then(res => {
        this.setState({ signedIn: res, checkedSignIn: true });
      })
      .catch(err => alert("An error occurred: ", err));
  }
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    console.log("root signedIn = ", signedIn);

    if (!checkedSignIn) {
      return null;
    }

    const RootStackNavigator = createRootNavigator(signedIn);
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
