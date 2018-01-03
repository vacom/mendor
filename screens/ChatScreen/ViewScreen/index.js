import React from "react";
import { Icon, View, Text } from "native-base";
import { ScrollView, KeyboardAvoidingView, Keyboard } from "react-native";
import styled from "styled-components/native";

//Components
import InputMessageBar from "../../../components/InputMessageBar";
import Chat from "../../../components/Chat";
import { MaterialIcons } from "@expo/vector-icons";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";

class ChatViewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View style={{ flex: 1, flexDirection: "row", alignItems:'center', justifyContent:'center' }}>
          <View>
            <ImageUser
              source={{
                uri: params.avatar
              }}
            />
          </View>
          <ViewNameHeader>
            <TextNameHeader>{params.name}</TextNameHeader>
          </ViewNameHeader>
        </View>
      ),
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <MaterialIcons name="more-vert" size={24} color="#ffffff" />
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
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
        <View style={{ height: this.state.height }} />
      </KeyboardAvoidingView>
    );
  }
}

export default ChatViewScreen;

const Avatar = styled.Image`
  border-radius: 50px;
  width: 45px;
  height: 45px;
`;

const ViewAvatar = styled.View`
  padding-right: 15px;
  justify-content: center;
`;
const ViewInput = styled.View`
  flex: 1;
  justify-content: center;
  padding-right: 15px;
`;

const Username = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const Span = styled.Text`
  font-size: 16px;
  color: #757575;
`;

const InputMessage = styled.TextInput`
  width: 100%;
  font-size: 18px;
  border: 0 !important;
`;

const ViewIcon = styled.View`
  justify-content: center;
`;

const ImageUser = styled.Image`
  border-radius: 50px;
  height: 40px;
  width: 40px;
`;

const ViewNameHeader = styled.View`
margin-left:10px;`

const TextNameHeader = styled.Text`
color: #fff;
font-size:20px;`
