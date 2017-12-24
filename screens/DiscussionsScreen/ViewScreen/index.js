import React from "react";
import { Icon, View, Text } from "native-base";
import { ScrollView, KeyboardAvoidingView, Keyboard } from "react-native";
import styled from "styled-components/native";
import Accordion from "react-native-collapsible/Accordion";

//Components
import InputMessageBar from "../../../components/InputMessageBar";
import Chat from "../../../components/Chat";

class DiscussionViewScreen extends React.Component {
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

  _renderHeader() {
    return (
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
        <Title>
          A dificuldade que os empreendedores enfrentam para obter investimento
        </Title>
        <Desc>2 de Dezembro de 2017 - Atualizado há uma semana</Desc>
      </ContainerDiscussion>
    );
  }

  _renderContent() {
    return (
      <ContentDiscussion>
        <ContentDesc>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          sed dolor mauris. Integer at ornare justo. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras
          vel risus ac enim cursus porttitor. 
          In hac habitasse platea dictumst.
          Quisque in consectetur ante. Donec imperdiet justo nec risus varius,
          ac porttitor mi pellentesque. Nulla tristique sagittis imperdiet.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        </ContentDesc>
      </ContentDiscussion>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Accordion
          duration={600}
          sections={["Section 1"]}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
        <Chat />
        <InputMessageBar />
        <View style={{ height: this.state.height }} />
      </KeyboardAvoidingView>
    );
  }
}

export default DiscussionViewScreen;

const ContainerDiscussion = styled.View`
  background: #fff;
  padding: 15px;
  elevation: 20;
`;

const ContentDiscussion = styled.View`
  background: #fff;
  padding: 5px 15px 15px 15px;
  elevation: 20;
`;

const ContentDesc = styled.Text`
  font-size: 16px;
  color: #757575;
  text-align: justify
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
`;

const InputMessage = styled.TextInput`
  width: 100%;
  font-size: 18px;
  border: 0 !important;
`;

const ViewIcon = styled.View`
  justify-content: center;
`;
