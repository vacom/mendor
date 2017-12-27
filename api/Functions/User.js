// @flow
import { AsyncStorage } from "react-native";

//this functions login in the user
const USER_SIGNIN_FUNC = async (
  email: string,
  password: string,
  queryObject: any
) => {
  try {
    let userId = "";
    await queryObject({
      variables: {
        email,
        password
      },
      update: (store, { data: { signinUser } }) => {
        try {
          //console.log(signinUser.token);
          AsyncStorage.setItem("graphcoolToken", signinUser.token);
          AsyncStorage.setItem("@mendor:userId", signinUser.user.id);
          userId = signinUser.user.id;
        } catch (e) {
          return e;
        }
      }
    });
    return { status: true, userId };
  } catch (e) {
    return { status: false, error: e };
  }
};

export { USER_SIGNIN_FUNC };
