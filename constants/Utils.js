import { AsyncStorage } from "react-native";

const GRAPHCOOL_PROJECT_ID = "ciz8v8u9te5130123ovajklml";
const GRAPHQL_ENDPOINT = "https://api.graph.cool/simple/v1/mendor";
const GRAPHQL_FILE_ENDPOINT = "https://api.graph.cool/file/v1/mendor";
const GRAPHQL_IMAGE_ENDPOINT = "https://images.graph.cool/v1";
const GRAPHQL_SUBSCRIPTION_ENDPOINT =
  "wss://subscriptions.graph.cool/v1/mendor";

const SOCIAL_ICONS = {
  FACEBOOK: "facebook-box",
  TWITTER: "twitter-box",
  LINKEDIN: "linkedin-box",
  PHONE: "cellphone",
  EMAIL: "email",
  GITHUB: "github-box",
  OTHER: "information",
  TRELLO: "trello"
};

const IMAGE_PLACEHOLDER = "https://ui-avatars.com/api/?size=128&name=mendor";

//const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

const onSignOut = () => {
  AsyncStorage.removeItem("graphcoolToken");
  AsyncStorage.removeItem("@mendor:userId");
};

const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("graphcoolToken")
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

/*const getUserId = async () => {
  return await AsyncStorage.getItem("@mendor:userId");
};*/

const allFalse = data => {
  for (var i in data) {
    if (data[i] === true) return false;
  }
  return true;
};

const countAllTrue = data => {
  let count = 0;
  for (var i in data) {
    if (data[i] === true) {
      count++;
    }
  }
  return count;
};

const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + "" + s4() + "" + s4() + "" + s4();
};

export {
  GRAPHCOOL_PROJECT_ID,
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_ENDPOINT,
  GRAPHQL_IMAGE_ENDPOINT,
  SOCIAL_ICONS,
  IMAGE_PLACEHOLDER,
  isSignedIn,
  onSignOut,
  allFalse,
  countAllTrue,
  GRAPHQL_FILE_ENDPOINT,
  guid
};
