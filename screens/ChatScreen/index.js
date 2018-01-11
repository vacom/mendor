import React from "react";
import { ScrollView } from "react-native";
import { Modal, TouchableHighlight, TouchableOpacity } from "react-native";
import { Thumbnail, Button, Text, View, Fab, Icon } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { graphql, compose, withApollo } from "react-apollo";
import moment from "moment/min/moment-with-locales";

//Requests
import { ALL_CHATS_QUERY } from "../../api/Queries/Chat";
import { ALL_CHATS_SUBSCRIPTION } from "../../api/Subscriptions/Chat";

//Components
import GradientContainer from "../../components/GradientContainer";
import { ModalBottom } from "../../components/ModalBottom";
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
import { Error, Loading } from "../../components/index";

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
      openModal: this._setModalVisible(true)
    });
  }

  _setModalVisible = visible => () => {
    this.setState({ modalVisible: visible });
  };

  _subscribeChat = () => {
    this.props.AllChats.subscribeToMore({
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
  _goToChatView = (id, name, users) => {
    let avatar = "";
    if (users.length > 2) {
      avatar =
        "https://www.pinnaclepeople.com.au/media/pinnacle-people/images/image7.jpg";
    } else {
      users.map(user => {
        if (user.id != this.state.userIdLogged) {
          avatar = user.avatar;
        }
      });
    }
    this.props.navigation.navigate("ChatView", {
      name: name,
      avatar: avatar,
      id: id
    });
  };
  render() {
    const _renderMessageContent = data => {
      if (data.messages.length > 0) {
        return (
          <Text numberOfLines={1} style={{ fontSize: 14, color: "#757575" }}>
            {data.messages[0].content}
          </Text>
        );
      } else {
        return (
          <Text numberOfLines={1} style={{ fontSize: 14, color: "#757575" }}>
            Sem mensagens.
          </Text>
        );
      }
    };
    const _renderMessageDate = data => {
      if (data.messages.length > 0) {
        return (
          <Text style={{ fontSize: 14, color: "#757575" }}>
            {moment(data.messages[0].createdAt).fromNow()}
          </Text>
        );
      } else {
        return <Text style={{ fontSize: 14, color: "#757575" }}> </Text>;
      }
    };
    const _renderMessageAvatar = data => {
      let avatar = "";
      if (data.users.length > 2) {
        avatar =
          "https://www.pinnaclepeople.com.au/media/pinnacle-people/images/image7.jpg";
      } else {
        data.users.map(user => {
          if (user.id != this.state.userIdLogged) {
            avatar = user.avatar;
          }
        });
      }
      return (
        <Thumbnail
          style={{ width: 48, height: 48 }}
          source={{
            uri: avatar
          }}
        />
      );
    };

    const { AllChats } = this.props;
    if (AllChats && AllChats.loading) {
      return <Loading />;
    }
    if (AllChats && AllChats.error) {
      return <Error />;
    } else {
      if (AllChats.allChats.length > 0) {
        const chats = AllChats.allChats;
        return (
          <ContainerView>
            <GradientContainer>
              <View>
                <ScrollView style={{ paddingBottom: 30 }}>
                  {chats.map(data => {
                    return (
                      <View key={data.id}>
                        <Card
                          onPress={() =>
                            this._goToChatView(data.id, data.name, data.users)
                          }
                        >
                          <CardContainer>
                            <CardLeft>{_renderMessageAvatar(data)}</CardLeft>
                            <CardBody>
                              <Text
                                numberOfLines={1}
                                style={{
                                  fontSize: 16,
                                  color: "#000",
                                  fontWeight: "600"
                                }}
                              >
                                {data.name}
                              </Text>
                              {_renderMessageContent(data)}
                            </CardBody>
                            <CardRight>{_renderMessageDate(data)}</CardRight>
                          </CardContainer>
                        </Card>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
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
            <ModalBottom
              visible={this.state.modalVisible}
              close={this._setModalVisible(!this.state.modalVisible)}
              content={[
                { icon: "edit", text: "Editar perfil" },
                { icon: "settings", text: "Configurações" }
              ]}
            />
          </ContainerView>
        );
      } else {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Ainda não existem conversas.</Text>
            <Fab
              onPress={this.setModalVisible(true)}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: "#3F51B5" }}
              position="bottomRight"
            >
              <Icon name="add" />
            </Fab>
          </View>
        );
      }
    }
  }
}

const ChatScreenWithData = compose(
  graphql(
    ALL_CHATS_QUERY,
    { name: "AllChats" },
    {
      options: () => ({
        variables: {
          id: "cjbjhh0f9lbfz01142sd6tvuv"
        }
      })
    }
  )
)(ChatScreen);

export default withApollo(ChatScreenWithData);

const ContainerView = styled.View`
  flex: 1;
`;
