import React from "react";
import { Icon, View, Text, Spinner } from "native-base";
import { ScrollView, KeyboardAvoidingView, Keyboard } from "react-native";
import styled from "styled-components/native";
import Accordion from "react-native-collapsible/Accordion";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { graphql, compose, withApollo } from "react-apollo";

//Requests
import { DISCUSSION } from "../../../api/Queries/Discussions";

//Components
import InputMessageBar from "../../../components/InputMessageBar";
import Chat from "../../../components/Chat";
import CategoryGroup from "../../../components/CategoryGroup";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";

class DiscussionViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this._addMessage = this._addMessage.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
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
    //this._getDiscussion();

    // CHANGE TO APOLLO STORE
    this.setState({
      userIdLogged: "cjbjhh0f9lbfz01142sd6tvuv"
    });
  }


  /* _getDiscussion = async () => {
    const result = await this.props.client.query({
      query: DISCUSSION
    });
    
  };
  */

  _keyboardDidShow = () => {
    if (this.refs.marginBar) {
      this.setState({ height: 75 });
    }
  };

  _keyboardDidHide = () => {
    if (this.refs.marginBar) {
      this.setState({ height: 0 });
    }
  };

  _renderHeader() {
    const discussion = this.props.data.Discussion;
    return (
      <ContainerDiscussion>
        <Header>
          <ViewAvatar>
            <Avatar
              source={{
                uri: discussion.author.avatar
              }}
            />
          </ViewAvatar>
          <ViewInput>
            <Username>{discussion.author.name}</Username>
            <Span>{discussion.responses.length} respostas</Span>
          </ViewInput>
          <ViewIcon>
            <Icon name="arrow-dropdown" style={{ fontSize: 20 }} />
          </ViewIcon>
        </Header>
        <Title>{discussion.title}</Title>
        <Desc>2 de Dezembro de 2017 - Atualizado há uma semana</Desc>
      </ContainerDiscussion>
    );
  }

  _renderContent() {
    const discussion = this.props.data.Discussion;
    return (
      <ContentDiscussion>
        <ContentDesc>{discussion.description}</ContentDesc>
      </ContentDiscussion>
    );
  }

  //Adicionar Mensagem
  _addMessage(e) {
    console.log("Added" + e);
  }

  render() {
    if (this.props.data.loading) {
      return <Spinner />;
    } else {
      return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <Accordion
            duration={600}
            sections={["Section1"]}
            renderHeader={this._renderHeader.bind(this)}
            renderContent={this._renderContent.bind(this)}
          />
          <Chat
            userIdLogged={this.state.userIdLogged}
            messages={this.props.data.Discussion.responses}
          />
          <InputMessageBar addMessage={this._addMessage} />
          <View style={{ height: this.state.height }} />
        </KeyboardAvoidingView>
      );
    }
  }
}

const DiscussionViewScreenWithData = compose(
  graphql(DISCUSSION, {
    options: props => ({
      variables: { id: props.navigation.state.params.id }
    })
  })
)(DiscussionViewScreen);

export default withApollo(DiscussionViewScreenWithData);

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
  text-align: justify;
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
