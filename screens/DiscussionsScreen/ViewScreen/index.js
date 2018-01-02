import React from "react";
import { Icon, View, Text, Spinner } from "native-base";
import { ScrollView, KeyboardAvoidingView, Keyboard } from "react-native";
import styled from "styled-components/native";
import Accordion from "react-native-collapsible/Accordion";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { graphql, compose, withApollo } from "react-apollo";

//Requests
import { DISCUSSION } from "../../../api/Queries/Discussions";
import { CREATE_RESPONSE_MUTATION } from "../../../api/Mutations/Discussions";

//Components
import Chat from "../../../components/Chat";
import CategoryGroup from "../../../components/CategoryGroup";
import { Error, Loading } from "../../../components/index";
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
    // CHANGE TO APOLLO STORE
    this.setState({
      userIdLogged: "cjbjhh0f9lbfz01142sd6tvuv"
    });
  }

  //Quando o teclado abre
  _keyboardDidShow = () => {
    if (this.refs.marginBar) {
      this.setState({ height: 75 });
    }
  };

  //Quando o teclado fecha
  _keyboardDidHide = () => {
    if (this.refs.marginBar) {
      this.setState({ height: 0 });
    }
  };

  //Adicionar Mensagem/Response
  _addMessage(e) {
    this._createResponseMutation(e);
  }

  _createResponseMutation = async e => {
    const content = e;
    const userId = this.state.userIdLogged;
    const discussionId = this.props.Discussion.Discussion.id;
    console.log(
      "content " +
        content +
        " userId " +
        userId +
        " discussionId " +
        discussionId
    );
    try {
      await this.props.createResponse({
        variables: {
          content,
          userId,
          discussionId
        },
        update: (proxy, { data: { createResponse } }) => {
          // Read the data from our cache for this query.
          const data = proxy.readQuery({
            query: DISCUSSION,
            variables: { id: discussionId }
          });
          data.Discussion.responses.push(createResponse);
          proxy.writeQuery({ query: DISCUSSION, data });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.props.Discussion && this.props.Discussion.loading) {
      return <Loading />;
    } else if (this.props.Discussion && this.props.Discussion.error) {
      return <Error />;
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
            messages={this.props.Discussion.Discussion.responses}
            addMessage={this._addMessage}
          />
          <View ref="marginBar" style={{ height: this.state.height }} />
        </KeyboardAvoidingView>
      );
    }
  }

  //Cabeçalho Accordion
  _renderHeader() {
    const discussion = this.props.Discussion.Discussion;
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

  //Conteudo Accordion
  _renderContent() {
    const discussion = this.props.Discussion.Discussion;
    return (
      <ContentDiscussion>
        <ContentDesc>{discussion.description}</ContentDesc>
      </ContentDiscussion>
    );
  }
}

const DiscussionViewScreenWithData = compose(
  graphql(DISCUSSION, {
    options: props => ({
      variables: { id: props.navigation.state.params.id }
    }),
    name: "Discussion"
  }),
  graphql(CREATE_RESPONSE_MUTATION, {
    name: "createResponse"
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

const ViewIcon = styled.View`
  justify-content: center;
`;
