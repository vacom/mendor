import React from "react";
import { AsyncStorage } from "react-native";
import { isSignedIn } from "../../constants/Utils";

const CurrentUser = (WrappedComponent, navigationOptions) => {
  return class extends React.Component {
    static navigationOptions = WrappedComponent.navigationOptions;
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
      const {navigation: {state: {params}}} = this.props;
      return (
        <WrappedComponent {...params} {...this.props} currentUserId={this.state.userId} />
      );
    }
  };
};

export default CurrentUser;
