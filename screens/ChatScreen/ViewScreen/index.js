import React from "react";
import { View, Container } from "native-base";
import { KeyboardAvoidingView, Keyboard, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { withNavigation } from "react-navigation";
//GraphQL
import { graphql, compose, withApollo } from "react-apollo";
import { ALL_MESSAGES_QUERY } from "../../../api/Queries/Chat";
import { ALL_MESSAGES_SUBSCRIPTION } from "../../../api/Subscriptions/Chat";
import { CREATE_MESSAGE_MUTATION } from "../../../api/Mutations/Chat";
import { ALL_CHATS_QUERY } from "../../../api/Queries/Chat";
import Chat from "../../../components/Chat";
import { Placeholder, Loading } from "../../../components/index";
import ProjectsList from "../../../components/ProjectsList";
//Utils
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";

class ChatViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this._addMessage = this._addMessage.bind(this);
    this._addProjectMessage = this._addProjectMessage.bind(this);
    this._openShareCards = this._openShareCards.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <TouchableOpacity onPress={params.id_user && params.goToProfile}>
          <StyledHeader>
            <View>
              <ImageUser
                source={{
                  uri: params.avatar
                }}
              />
            </View>
            <ViewNameHeader>
              <TextNameHeader numberOfLines={1}>{params.name}</TextNameHeader>
            </ViewNameHeader>
          </StyledHeader>
        </TouchableOpacity>
      )
    };
  };

  state = {
    height: 0,
    heightViewShareCards: 0,
    modalVisible: false,
    userIdLogged: this.props.screenProps.userId,
    avatar: IMAGE_PLACEHOLDER,
    scrollBottomChat: false,
    icon: "add",
    disabled: false
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
    this.props.navigation.setParams({
      goToProfile: this._goToProfileByParams
    });
    this._subscribeMessages();
    this.setState({
      icon: "add"
    });
  }
  _setDisabled = () => {
    this.setState({ disabled: true });
    setTimeout(() => {
      this.setState({
        disabled: false
      });
    }, 1000);
  };

  _goToProfileByParams = () => {
    if (!this.state.disabled) {
      this._setDisabled();
      this.props.navigation.navigate("Profile", {
        id: this.props.navigation.state.params.id_user
      });
    }
  };
  _goToProfile = id => {
    if (!this.state.disabled) {
      this._setDisabled();
      this.props.navigation.navigate("Profile", {
        id
      });
    }
  };

  _addProjectMessage(projectId) {
    this.setState({ scrollBottomChat: true });
    this._createMessageMutation("", "PROJECT", projectId);
  }
  _addMessage(e) {
    this._createMessageMutation(e, "MESSAGE", null);
  }

  _createMessageMutation = async (content, type, projectId) => {
    const authorId = this.state.userIdLogged;
    const chatId = this.props.navigation.state.params.id;
    try {
      await this.props.createMessage({
        variables: {
          content,
          authorId,
          chatId,
          type,
          projectId
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  _subscribeMessages = () => {
    this.props.allMessages.subscribeToMore({
      document: ALL_MESSAGES_SUBSCRIPTION,
      variables: { id: this.props.navigation.state.params.id },
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previous;
        }
        const newItems = subscriptionData.data.Message.node;
        const result = Object.assign({}, previous, {
          allMessages: [...previous.allMessages, newItems]
        });
        return result;
      }
    });
  };

  _keyboardDidShow = () => {
    if (this.refs.viewMargin) this.setState({ height: 75 });
    if (this.refs.viewShareCards) this.setState({ heightViewShareCards: 0 });
  };

  _keyboardDidHide = () => {
    if (this.refs.viewMargin) this.setState({ height: 0 });
  };

  _openShareCards = () => {
    if (this.state.heightViewShareCards == 200 && this.refs.viewShareCards) {
      this.setState({ heightViewShareCards: 0, icon: "add" });
    } else if (
      this.state.heightViewShareCards == 0 &&
      this.refs.viewShareCards
    ) {
      this.setState({ heightViewShareCards: 200, icon: "cancel" });
    }
  };

  render() {
    if (this.props.allMessages && this.props.allMessages.loading) {
      return <Loading />;
    }
    if (this.props.allMessages && this.props.allMessages.error) {
      return <Placeholder text="Erro! Tente novamente" IconName="error" />;
    }
    return (
      <Container>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View style={{ flex: 1 }}>
            <Chat
              share_cards={true}
              stopScroll={() => {
                this.setState({ scrollBottomChat: false });
              }}
              scrollBottom={this.state.scrollBottomChat}
              style={{ flex: 0.8 }}
              userIdLogged={this.state.userIdLogged}
              messages={this.props.allMessages.allMessages}
              addMessage={this._addMessage}
              openShareCards={this._openShareCards}
              avatar={this.state.avatar}
              icon={this.state.icon}
              goToProfile={this._goToProfile}
            />
          </View>
          <View
            ref="viewShareCards"
            style={{ height: this.state.heightViewShareCards }}
          >
            <ProjectsList
              addProjectMessage={this._addProjectMessage}
              userId={this.props.screenProps.userId}
            />
          </View>
        </KeyboardAvoidingView>
        <View ref="viewMargin" style={{ height: this.state.height }} />
      </Container>
    );
  }
}

export default compose(
  withApollo,
  withNavigation,
  graphql(ALL_MESSAGES_QUERY, {
    options: props => ({
      variables: { id: props.navigation.state.params.id }
    }),
    name: "allMessages"
  }),
  graphql(CREATE_MESSAGE_MUTATION, {
    name: "createMessage",
    options: props => ({
      refetchQueries: [
        {
          query: ALL_CHATS_QUERY,
          variables: {
            id: props.screenProps.userId
          }
        }
      ]
    })
  })
)(ChatViewScreen);

const ImageUser = styled.Image`
  border-radius: 50px;
  height: 40px;
  width: 40px;
`;

const ViewNameHeader = styled.View`
  margin-left: 10px;
  max-width: 87%;
`;

const TextNameHeader = styled.Text`
  color: #fff;
  font-size: 20px;
`;

const StyledHeader = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
