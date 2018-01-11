import { Notifications } from "expo";
import React from "react";
import { StackNavigator } from "react-navigation";
//Main Tab Navigation
import MainTabNavigator from "./MainTabNavigator";
//Screen Containers
//AddDisciussionScreen
import AddDiscussion from "../screens/DiscussionsScreen/AddScreen/index";
/**
 * ProfileScreens
 */
import ProfileScreen from "../screens/ProfileScreen/index";
import EditProfileScreen from "../screens/ProfileScreen/EditScreen/index";
//DiscussionScreens
import DiscussionViewScreen from "../screens/DiscussionsScreen/ViewScreen/index";
//ChatScreens
import ChatViewScreen from "../screens/ChatScreen/ViewScreen/index";
import ChatAddScreen from "../screens/ChatScreen/AddScreen/index";
//SearchScreens
import SearchScreen from "../screens/SearchScreen/index";
/**
 * AuthScreens
 */
import AuthScreen from "../screens/AuthScreen/index";
import SigninScreen from "../screens/AuthScreen/SigninScreen/index";
//SignUp Screens and Steps
import SignupScreen from "../screens/AuthScreen/SignupScreen/index";
import ProfileStepScreen from "../screens/AuthScreen/SignupScreen/ProfileStepScreen/index";
import SkillStepScreen from "../screens/AuthScreen/SignupScreen/SkillStepScreen/index";
//Push Notifications
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";
//Utils
import { isSignedIn, onSignOut } from "../constants/Utils";

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      Main: {
        screen: MainTabNavigator
      },
      Profile: {
        screen: ProfileScreen
      },
      EditProfile: {
        screen: EditProfileScreen
      },
      DiscussionView: {
        screen: DiscussionViewScreen
      },
      ChatView: {
        screen: ChatViewScreen
      },
      AddChat: {
        screen: ChatAddScreen
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
      SignUpProfileStep: {
        screen: ProfileStepScreen
      },
      SignUpSkillStep: {
        screen: SkillStepScreen
      },
      AddDiscussion: {
        screen: AddDiscussion
      },
      Search: {
        screen: SearchScreen
      }
    },
    {
      navigationOptions: () => ({
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: "#3F51B5",
          elevation: 0
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
