import React from "react";
import { View, ActionSheet } from "native-base";
import { KeyboardAvoidingView, Keyboard, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

//GraphQL
import { graphql, compose, withApollo } from "react-apollo";
import { ALL_MESSAGES_QUERY } from "../../../api/Queries/Chat";
import { ALL_MESSAGES_SUBSCRIPTION } from "../../../api/Subscriptions/Chat";
import { CREATE_MESSAGE_MUTATION } from "../../../api/Mutations/Chat";

//Components
//import InputMessageBar from "../../../components/InputMessageBar";
import Chat from "../../../components/Chat";
import { MaterialIcons } from "@expo/vector-icons";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";
import { Placeholder, Loading } from "../../../components/index";

//Utils
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";

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
            <TouchableOpacity onPress={params.openModal}>
              <MaterialIcons name="more-vert" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };

  state = {
    height: 0,
    modalVisible: false,
    userIdLogged: "cjbjhh0f9lbfz01142sd6tvuv",
    avatar: IMAGE_PLACEHOLDER
  };

  componentDidMount() {
    console.log(this.props.navigation.state.params);
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
    this._subscribeMessages();
    this.props.navigation.setParams({
      openModal: this._setModalVisible
    });
  }

  _setModalVisible = () => {
    var BUTTONS = [
      "Editar nome da conversa",
      "Adicionar pessoas à conversa",
      "Silenciar conversa",
      "Sugestões de parceiros",
      "Cancelar"
    ];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 4,
        destructiveButtonIndex: 2,
        title: "Ações"
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            console.log("Editar nome da conversa");
            break;
        }
      }
    );
  };

  _addMessage(e) {
    this._createMessageMutation(e);
  }

  _createMessageMutation = async content => {
    const authorId = this.state.userIdLogged;
    const chatId = this.props.navigation.state.params.id;
    console.log(content, authorId, chatId);
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
          allMessages: [...previous.allMessages, newItems]
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
    }
    if (this.props.allMessages && this.props.allMessages.error) {
      return <Placeholder text="Erro! Tente novamente" IconName="error" />;
    }
    //console.log(this.props.allMessages.allMessages);
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

export default compose(
  withApollo,
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
