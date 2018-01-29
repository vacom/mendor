import { Notifications } from "expo";
import { AsyncStorage } from "react-native";
import React from "react";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
//Main Tab Navigation
import MainTabNavigator from "./MainTabNavigator";
//Screen Containers
/**
 * ProfileScreens
 */
import ProfileScreen from "../screens/ProfileScreen/index";
import EditProfileScreen from "../screens/ProfileScreen/EditScreen/index";
/**
 *  DiscussionScreens
 */
import DiscussionViewScreen from "../screens/DiscussionsScreen/ViewScreen/index";
import AddDiscussion from "../screens/DiscussionsScreen/AddScreen/index";
import SearchDiscussionScreen from "../screens/DiscussionsScreen/SearchScreen/index";

/**
 * ChatScreens
 */
import ChatViewScreen from "../screens/ChatScreen/ViewScreen/index";
import ChatAddScreen from "../screens/ChatScreen/AddScreen/index";
import SearchChatScreen from "../screens/ChatScreen/SearchScreen/index";

/**
 * SearchScreens
 */
import SearchScreen from "../screens/SearchScreen/index";
/**
 * AuthScreens
 */
import AuthScreen from "../screens/AuthScreen/index";
import SigninScreen from "../screens/AuthScreen/SigninScreen/index";
import SignupScreen from "../screens/AuthScreen/SignupScreen/index";
import ProfileStepScreen from "../screens/AuthScreen/SignupScreen/ProfileStepScreen/index";
import SkillStepScreen from "../screens/AuthScreen/SignupScreen/SkillStepScreen/index";
/**
 * Configuration Screen
 */
import ConfigScreen from "../screens/ConfigScreen/index";

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
      EditProfile: {
        screen: EditProfileScreen
      },
      DiscussionView: {
        screen: DiscussionViewScreen
      },
      SearchDiscussion: {
        screen: SearchDiscussionScreen
      },
      ChatView: {
        screen: ChatViewScreen
      },
      AddChat: {
        screen: ChatAddScreen
      },
      SearchChat: {
        screen: SearchChatScreen
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
      },
      Config: {
        screen: ConfigScreen
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
    checkedSignIn: false,
    userId: ""
  };
  componentWillMount() {
    isSignedIn()
      .then(res => {
        AsyncStorage.getItem("@mendor:userId").then(userId => {
          this.setState({ signedIn: res, userId, checkedSignIn: true });
        });
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
    return (
      <Root>
        <RootStackNavigator screenProps={{ userId: this.state.userId }} />
      </Root>
    );
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
