import React from "react";
import { Icon, View, Text } from "native-base";
import { ScrollView, KeyboardAvoidingView, Keyboard } from "react-native";
import styled from "styled-components/native";

import { graphql, compose, withApollo } from "react-apollo";
import { ALL_MESSAGES_QUERY } from "../../../api/Queries/Chat";
import { ALL_MESSAGES_SUBSCRIPTION } from "../../../api/Subscriptions/Chat";
import { CREATE_MESSAGE_MUTATION } from "../../../api/Mutations/Chat";

//Components
import InputMessageBar from "../../../components/InputMessageBar";
import Chat from "../../../components/Chat";
import { MaterialIcons } from "@expo/vector-icons";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";
import { Error, Loading } from "../../../components/index";

class ChatViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this._addMessage = this._addMessage.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
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
    height: 0,
    userIdLogged: "cjbjhh0f9lbfz01142sd6tvuv",
    avatar:
      "https://scontent.fopo2-1.fna.fbcdn.net/v/t1.0-9/25498263_1521972947849794_5674696303839555748_n.jpg?oh=0c486e7b1b615efadcfdb3c9f6e08780&oe=5AE5B338"
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
    this._subscribeMessages();
  }

  _addMessage(e) {
    this._createMessageMutation(e);
  }

  _createMessageMutation = async e => {
    const content = e;
    const authorId = this.state.userIdLogged;
    const chatId = this.props.navigation.state.params.id;
    console.log(content, authorId, chatId)
    try {
      await this.props.createMessage({
        variables: {
          content,
          authorId,
          chatId
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
          allMessages: [newItems, ...previous.allMessages]
        });
        return result;
      }
    });
  };

  _keyboardDidShow = () => {
    this.setState({ height: 75 });
  };

  _keyboardDidHide = () => {
    this.setState({ height: 0 });
  };

  render() {
    if (this.props.allMessages && this.props.allMessages.loading) {
      return <Loading />;
    } else if (this.props.allMessages && this.props.allMessages.error) {
      return <Error />;
    } else {
      return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <Chat
            userIdLogged={this.state.userIdLogged}
            messages={this.props.allMessages.allMessages}
            addMessage={this._addMessage}
            avatar={this.state.avatar}
          />
          <View style={{ height: this.state.height }} />
        </KeyboardAvoidingView>
      );
    }
  }
}

const ChatViewScreenWithData = compose(
  graphql(ALL_MESSAGES_QUERY, {
    options: props => ({
      variables: { id: props.navigation.state.params.id }
    }),
    name: "allMessages"
  }),
  graphql(CREATE_MESSAGE_MUTATION, {
    name: "createMessage"
  })
)(ChatViewScreen);
export default withApollo(ChatViewScreenWithData);

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
  margin-left: 10px;
`;

const TextNameHeader = styled.Text`
  color: #fff;
  font-size: 20px;
`;
