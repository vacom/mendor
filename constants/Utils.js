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
const IMAGE_GROUP_CHAT = "https://ui-avatars.com/api/?size=128&name=group";
const IMAGE_DISCUSSIONS_PLACEHOLDER =
  "https://i.ytimg.com/vi/LqonKhRZAyE/maxresdefault.jpg";

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

/**
 * LOCATIONS UTILS
 */

const GET_DISTANCE_FROM_LAT_LON_IN_KM = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return Math.trunc(d);
};

const deg2rad = deg => {
  return deg * (Math.PI / 180);
};

export {
  GRAPHCOOL_PROJECT_ID,
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_ENDPOINT,
  GRAPHQL_IMAGE_ENDPOINT,
  SOCIAL_ICONS,
  IMAGE_PLACEHOLDER,
  IMAGE_GROUP_CHAT,
  isSignedIn,
  onSignOut,
  allFalse,
  countAllTrue,
  GRAPHQL_FILE_ENDPOINT,
  guid,
  GET_DISTANCE_FROM_LAT_LON_IN_KM,
  IMAGE_DISCUSSIONS_PLACEHOLDER
};
