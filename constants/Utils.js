import { AsyncStorage } from "react-native";

const GRAPHQL_ENDPOINT = "https://api.graph.cool/simple/v1/mendor";
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

//const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

const onSignOut = () => AsyncStorage.removeItem("graphcoolToken");

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

const allFalse = data => {
  for (var i in data) {
    if (data[i] === true) return false;
  }
  return true;
};

const countAllTrue = data => {
  let count = 0
  for (var i in data) {
    if (data[i] === true) {
      count++;
    }
  }
  return count;
};

export {
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_ENDPOINT,
  SOCIAL_ICONS,
  isSignedIn,
  onSignOut,
  allFalse,
  countAllTrue
};
