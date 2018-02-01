import React from "react";
import { Icon, View } from "native-base";
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import styled from "styled-components/native";
import Accordion from "react-native-collapsible/Accordion";
import Collapsible from "react-native-collapsible";
import { MaterialIcons } from "@expo/vector-icons";
import { graphql, compose, withApollo } from "react-apollo";

//GraphQL
import { DISCUSSION } from "../../../api/Queries/Discussions";
import { CREATE_RESPONSE_MUTATION } from "../../../api/Mutations/Discussions";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";

//Components
import Chat from "../../../components/Chat";
import CategoryGroup from "../../../components/CategoryGroup";
import { Placeholder, Loading } from "../../../components/index";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";
//utils
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";
import moment from "moment/min/moment-with-locales";

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
    height: 0,
    userIdLogged: "",
    avatar: "",
    scroll: false
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
    const { userIdLogged, avatar } = this.props.navigation.state.params;
    this.setState({
      userIdLogged,
      avatar
    });
  }

  //Quando o teclado abre
  _keyboardDidShow = () => {
    if (this.refs.marginBar) {
      this.setState({ height: 75, scroll: true });
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
    const authorId = this.state.userIdLogged;
    const discussionId = this.props.Discussion.Discussion.id;
    const createdAt = new Date().toLocaleString();
    try {
      await this.props.createResponse({
        variables: {
          content,
          authorId,
          discussionId
        },
        update: (proxy, { data: { createResponse } }) => {
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
      return <Loading dark />;
    }
    if (this.props.Discussion && this.props.Discussion.error) {
      return <Placeholder text="Erro! Tente novamente" IconName="error" />;
    }
    console.log(this.props.Discussion);
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Accordion
          underlayColor="#fff"
          duration={600}
          sections={["Section1"]}
          renderHeader={this._renderHeader.bind(this)}
          renderContent={this._renderContent.bind(this)}
        />
        <Chat
          share_cards={false}
          userIdLogged={this.state.userIdLogged}
          messages={this.props.Discussion.Discussion.responses}
          addMessage={this._addMessage}
          avatar={this.state.avatar}
          scrollBottom={this.state.scroll}
          stopScroll={() => {
            this.setState({ scroll: false });
          }}
        />
        <View ref="marginBar" style={{ height: this.state.height }} />
      </KeyboardAvoidingView>
    );
  }

  //Cabeçalho Accordion
  _renderHeader() {
    const {
      user,
      responses,
      title,
      createdAt
    } = this.props.Discussion.Discussion;
    return (
      <ContainerDiscussion>
        <Header>
          <ViewAvatar>
            <Avatar
              source={
                user.avatar != null
                  ? {
                      uri: GET_AVATAR_URL(
                        user.avatar.secret,
                        "250x250",
                        user.avatar.name
                      )
                    }
                  : {
                      uri: IMAGE_PLACEHOLDER
                    }
              }
            />
          </ViewAvatar>
          <ViewInput>
            <Username>{user.name}</Username>
            <Span>{Object.keys(responses).length} respostas</Span>
          </ViewInput>
          <ViewIcon>
            <Icon name="arrow-dropdown" style={{ fontSize: 20 }} />
          </ViewIcon>
        </Header>
        <Title>{title}</Title>
        <Desc>Criado {moment(createdAt).fromNow()}</Desc>
      </ContainerDiscussion>
    );
  }

  //Conteudo Accordion
  _renderContent() {
    const { description } = this.props.Discussion.Discussion;
    return (
      <ContentDiscussion>
        <ContentDesc>{description}</ContentDesc>
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
