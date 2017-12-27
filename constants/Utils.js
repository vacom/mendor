import { AsyncStorage } from "react-native";

const GRAPHQL_ENDPOINT = "https://api.graph.cool/simple/v1/mendor";
const GRAPHQL_SUBSCRIPTION_ENDPOINT =
  "wss://subscriptions.graph.cool/v1/mendor";

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

export {
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_ENDPOINT,
  isSignedIn,
  onSignOut
};
