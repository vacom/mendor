import React from "react";
import { Icon, View, Text } from "native-base";
import { ScrollView, KeyboardAvoidingView, Keyboard } from "react-native";
import styled from "styled-components/native";
//Components
import InputMessageBar from "../components/InputMessageBar";
import Chat from "../components/Chat";

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
        <ContainerDiscussion>
          <Header>
            <ViewAvatar>
              <Avatar
                source={{
                  uri:
                    "https://www.thewrap.com/wp-content/uploads/2015/11/Donald-Trump.jpg"
                }}
              />
            </ViewAvatar>
            <ViewInput>
              <Username>Travis Zuckberg</Username>
              <Span>230 respostas</Span>
            </ViewInput>
            <ViewIcon>
              <Icon name="arrow-dropdown" style={{ fontSize: 20 }} />
            </ViewIcon>
          </Header>
          <Title>A dificuldade que os empreendedores enfrentam para obter investimento</Title>
          <Desc>2 de Dezembro de 2017 - Atualizado há uma semana</Desc>
        </ContainerDiscussion>
        <Chat />
        <InputMessageBar />
        <View style={{ height: this.state.height }} />
      </KeyboardAvoidingView>
    );
  }
}

export default DiscussionScreen;

const ContainerDiscussion = styled.View`
  background: #fff;
  padding: 15px;
  elevation: 2;
`;

const Header = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

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

const Desc = styled.Text`
  font-size: 14px;
  color: #757575;
`;

const Title = styled.Text`
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
`

const InputMessage = styled.TextInput`
  width: 100%;
  font-size: 18px;
  border: 0 !important;
`;

const ViewIcon = styled.View`
  justify-content: center;
`;
