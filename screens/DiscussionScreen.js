import React from "react";
import { Icon, View } from "native-base";
import { ScrollView, KeyboardAvoidingView, Keyboard} from "react-native";
import styled from "styled-components/native";
//Components
import InputMessageBar from '../components/InputMessageBar'

class DiscussionScreen extends React.Component {
  static navigationOptions = {
    title: "Discussão"
  };

  state = {
    height: 0
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  _keyboardDidShow = () => {
    this.setState({ height: 75 });
  };

  _keyboardDidHide = () => {
    this.setState({ height: 0 });
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView>
        </ScrollView>
        <InputMessageBar />
        <View style={{ height: this.state.height }} />
      </KeyboardAvoidingView>
    );
  }
}

export default DiscussionScreen;

