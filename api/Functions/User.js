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
          AsyncStorage.setItem("graphcoolToken", signinUser.token);
          userId = signinUser.user.id;
        } catch (e) {
          return e;
        }
      }
    });
    return { status: true, userId };
  } catch (e) {
    return { status: false };
  }
};

export { USER_SIGNIN_FUNC };
