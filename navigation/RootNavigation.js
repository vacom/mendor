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
import addTechnologyScreen from "../screens/ProfileScreen/TechnologyScreen/index";
import addSocialScreen from "../screens/ProfileScreen/SocialScreen/index";
import addProjectScreen from "../screens/ProfileScreen/ProjectScreen/index";
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
import AddPersonScreen from "../screens/ChatScreen/ViewScreen/AddPerson/index"
/**
 *  ContactsScreen
 */
import ContactsSearchScreen from "../screens/ContactsScreen/SearchScreen/index";
/**
 * AuthScreens
 */
import AuthScreen from "../screens/AuthScreen/index";
import SigninScreen from "../screens/AuthScreen/SigninScreen/index";
import SignupScreen from "../screens/AuthScreen/SignupScreen/index";
import ProfileStepScreen from "../screens/AuthScreen/SignupScreen/ProfileStepScreen/index";
import SkillStepScreen from "../screens/AuthScreen/SignupScreen/SkillStepScreen/index";
/**
 * DiscoverScreen
 */
import DiscoverSearchScreen from "../screens/DiscoverScreen/SearchScreen/index";
/**
 * Configuration Screen
 */
import ConfigScreen from "../screens/ConfigScreen/index";
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
      addTechnology: {
        screen: addTechnologyScreen
      },
      addSocial: {
        screen: addSocialScreen
      },
      addProject: {
        screen: addProjectScreen
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
      AddPerson: {
        screen: AddPersonScreen
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
      SearchContacts: {
        screen: ContactsSearchScreen
      },
      SearchDiscover: {
        screen: DiscoverSearchScreen
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
      .catch(err => console.log("An error occurred: ", err));
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
}
