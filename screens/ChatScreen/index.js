import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
//Styles
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
//GraphQL
import { graphql, compose, withApollo } from "react-apollo";
import { ALL_CHATS_QUERY } from "../../api/Queries/Chat";
import { ALL_CHATS_SUBSCRIPTION } from "../../api/Subscriptions/Chat";
import { GET_AVATAR_URL } from "../../api/Functions/Upload";
//Components
import { Text, View, Fab, Icon, ActionSheet } from "native-base";
import GradientContainer from "../../components/GradientContainer";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";
import {
  Card,
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../components/Card";
import { Placeholder, Loading } from "../../components/index";
import {
  MessageContent,
  MessageDate,
  MessageAvatar,
  MessageName
} from "../../components/ChatComponents";
//Utils
import { IMAGE_PLACEHOLDER } from "../../constants/Utils";
import moment from "moment/min/moment-with-locales";

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Conversas",
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <MaterialIcons name="search" size={24} color="#ffffff" />
          </HeaderRightElement>
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
    userIdLogged: "cjbjhh0f9lbfz01142sd6tvuv",
    modalVisible: false
  };
  componentDidMount() {
    moment.locale("pt");
    this._subscribeChat();
    this.props.navigation.setParams({
      openModal: this._setModalVisible
    });
  }

  _setModalVisible = () => {
    var BUTTONS = ["Marcar todas como lidas", "Cancelar"];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        title: "Ações"
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            console.log("Marcar");
            break;
        }
      }
    );
  };

  _subscribeChat = () => {
    this.props.AllChatsQuery.subscribeToMore({
      document: ALL_CHATS_SUBSCRIPTION,
      variables: { id: "cjbjhh0f9lbfz01142sd6tvuv" },
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previous;
        }
        const newItems = subscriptionData.data.Chat.node;
        const result = Object.assign({}, previous, {
          allChats: [newItems, ...previous.allChats]
        });
        return result;
      }
    });
  };
  _goToAddChat = () => {
    this.props.navigation.navigate("AddChat", {});
  };
  _goToChatView = (id, users) => {
    let avatar,
      name = "";
    const userlength = Object.keys(users).length;
    if (userlength > 1) {
      avatar = IMAGE_PLACEHOLDER;
      users.map((user, i) => {
        if (userlength === i + 1) {
          name += user.name;
        } else {
          name += user.name + ", ";
        }
      });
    } else {
      avatar =
        users[0].avatar != null
          ? GET_AVATAR_URL(
              users[0].avatar.secret,
              "250x250",
              users[0].avatar.name
            )
          : IMAGE_PLACEHOLDER;

      name = users[0].name;
    }
    this.props.navigation.navigate("ChatView", {
      name: name,
      avatar: avatar,
      id: id
    });
  };
  render() {
    const { AllChatsQuery } = this.props;
    if (AllChatsQuery && AllChatsQuery.loading) {
      return <Loading />;
    }
    if (AllChatsQuery && AllChatsQuery.error) {
      return <Placeholder text="Erro! Tente novamente" IconName="error" />;
    }

    const { allChats } = AllChatsQuery;
    return (
      <ContainerView>
        <GradientContainer>
          <ScrollView contentContainerStyle={{ paddingVertical: 5 }}>
            {Object.keys(AllChatsQuery.allChats).length > 0 ? (
              allChats.map(data => {
                return (
                  <View key={data.id}>
                    <Card
                      onPress={() => this._goToChatView(data.id, data.users)}
                    >
                      <CardContainer>
                        <CardLeft>
                          <MessageAvatar data={data} />
                        </CardLeft>
                        <CardBody>
                          <MessageName users={data.users} />

                          <MessageContent data={data} />
                        </CardBody>
                        <CardRight>
                          <MessageDate data={data} />
                        </CardRight>
                      </CardContainer>
                    </Card>
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text>Ainda não existem conversas.</Text>
              </View>
            )}
          </ScrollView>
        </GradientContainer>
        <View>
          <Fab
            onPress={() => this._goToAddChat()}
            direction="up"
            containerStyle={{ borderRadius: 10 }}
            style={{ backgroundColor: "#3F51B5", elevation: 0 }}
            position="bottomRight"
          >
            <Icon name="add" />
          </Fab>
        </View>
      </ContainerView>
    );
  }
}

export default compose(
  withApollo,
  graphql(
    ALL_CHATS_QUERY,
    { name: "AllChatsQuery" },
    {
      options: () => ({
        variables: {
          id: "cjbjhh0f9lbfz01142sd6tvuv"
        }
      })
    }
  )
)(ChatScreen);

const ContainerView = styled.View`
  flex: 1;
`;
