import React from "react";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { withNavigation } from "react-navigation";
//Styles
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
//GraphQL
import { graphql, compose, withApollo } from "react-apollo";
import { ALL_CHATS_QUERY } from "../../api/Queries/Chat";
import { ALL_CHATS_SUBSCRIPTION } from "../../api/Subscriptions/Chat";
import { GET_AVATAR_URL } from "../../api/Functions/Upload";
//Components
import { Text, View, Icon, Content } from "native-base";
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
import { IMAGE_PLACEHOLDER, IMAGE_GROUP_CHAT } from "../../constants/Utils";
import moment from "moment/min/moment-with-locales";

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Conversas",
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.openSearch}>
              <MaterialIcons name="search" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.openAddChat}>
              <MaterialIcons name="add" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };
  state = {
    modalVisible: false,
    refreshing: false
  };

  componentDidMount() {
    moment.locale("pt");
    this._subscribeChat();
    this.props.navigation.setParams({
      openAddChat: this._goToAddChat,
      openSearch: this._goToSearch
    });
    this.setState({
      userIdLogged: this.props.screenProps.userId
    });
  }

  _onScroll = () => {
    console.log("scroll");
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    //gets new content from the DB
    this.props.AllChatsQuery.refetch();
    //clears the loading
    if (!this.props.AllChatsQuery.loading) {
      this.setState({ refreshing: false });
    }
  };

  _subscribeChat = () => {
    this.props.AllChatsQuery.subscribeToMore({
      document: ALL_CHATS_SUBSCRIPTION,
      variables: { id: this.state.userIdLogged },
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
  _goToSearch = () => {
    console.log("hey");
  };
  _goToProfile = id => () => {
    this.props.navigation.navigate("Profile", { id: id });
  };
  _goToAddChat = () => {
    this.props.navigation.navigate("AddChat", {});
  };
  _goToChatView = (id, users) => {
    const userlength = Object.keys(users).length;
    console.log(userlength);
    let name = "";
    let avatar = "";
    if (userlength > 1) {
      avatar = IMAGE_GROUP_CHAT;
      users.map((user, i) => {
        if (userlength === i + 1) {
          name += user.name;
        } else {
          name += user.name + ", ";
        }
      });
    } else {
      name = users[0].name;
      avatar =
        users[0].avatar != null
          ? GET_AVATAR_URL(
              users[0].avatar.secret,
              "250x250",
              users[0].avatar.name
            )
          : IMAGE_PLACEHOLDER;
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
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
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
                            <TouchableOpacity
                              onPress={
                                Object.keys(data.users).length < 2
                                  ? this._goToProfile(data.users[0].id)
                                  : () =>
                                      this._goToChatView(data.id, data.users)
                              }
                            >
                              <MessageAvatar data={data.users} />
                            </TouchableOpacity>
                          </CardLeft>
                          <CardBody>
                            <MessageName users={data.users} />

                            <MessageContent
                              data={data}
                              userId={this.props.screenProps.userId}
                            />
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
                <Placeholder text="Não existem conversas." IconName="error" />
              )}
            </ScrollView>
          </Content>
        </GradientContainer>
      </ContainerView>
    );
  }
}

export default compose(
  withNavigation,
  withApollo,
  graphql(ALL_CHATS_QUERY, {
    options: props => ({
      variables: {
        id: props.screenProps.userId
      },
      pollInterval: 2000
    }),
    name: "AllChatsQuery"
  })
)(ChatScreen);

const ContainerView = styled.View`
  flex: 1;
`;
