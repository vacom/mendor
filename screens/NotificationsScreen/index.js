import React from "react";
import { withNavigation } from "react-navigation";
import { ScrollView, RefreshControl, TouchableOpacity } from "react-native";
//Components
import { Thumbnail, Button, Text, ActionSheet } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
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
import { Error, Loading, Placeholder } from "../../components/index";
/**
 * GraphQL
 */
import { graphql, compose } from "react-apollo";
//Notifications
import { ALL_NOTIFICATIONS_QUERY } from "../../api/Queries/Notification";
import { DISABLE_NOTIFICATION_MUTATION } from "../../api/Mutations/Notification";
import { GET_AVATAR_URL } from "../../api/Functions/Upload";
import { CREATE_CONTACT_FUNC } from "../../api/Functions/User";
//contacts
import { CREATE_CONTACT_MUTATION } from "../../api/Mutations/Contacts";
//Utils
import { IMAGE_PLACEHOLDER } from "../../constants/Utils";
import Toast from "react-native-root-toast";

class NotificationsScreen extends React.Component {
  static navigationOptions = {
    title: "Notificações",
    headerRight: (
      <HeaderRightContainer>
        <HeaderRightElement>
          <MaterialIcons name="search" size={24} color="#ffffff" />
        </HeaderRightElement>
      </HeaderRightContainer>
    )
  };
  state = {
    refreshing: false
  };
  _openNotification = data => e => {
    e.preventDefault();
    const route = data.type === "REQUEST" ? "Profile" : "DiscussionView";
    const id =
      data.type === "REQUEST" ? data.userRequest.id : data.discussion.id;
    this.props.navigation.navigate(route, { id });
  };
  _onOpenActions = data => () => {
    console.log(data);
    var BUTTONS = ["Ocultar Notificação", "Ver Discussão", "Cancelar"];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 0,
        title: "Ações"
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this._onDisableNotification(data.id);
            break;
          case 1:
            this._openNotification(data);
            break;
        }
      }
    );
  };
  _onDisableNotification = async (
    notificationId,
    msg = "Notificação ocultada."
  ) => {
    const { disableNotification } = this.props;
    try {
      //disables notification on the DB
      await disableNotification({
        variables: {
          notificationId
        },
        update: async () => {
          try {
            this._onRefresh();
            Toast.show(msg);
          } catch (e) {
            console.log(e);
            Toast.show("Erro! Verifique os campos.");
          }
        }
      });
    } catch (e) {
      Toast.show(e);
    }
  };
  _onCreateContact = async data => {
    const contactID = data.userRequest.id;
    const { createContact, screenProps } = this.props;
    //Creates a new contact for the user
    const result = await CREATE_CONTACT_FUNC(
      screenProps.userId,
      contactID,
      createContact
    );
    //if success creates a new user for the requested user
    if (result.status) {
      //saves the contact
      const request = await CREATE_CONTACT_FUNC(
        contactID,
        screenProps.userId,
        createContact
      );
      //Both users accounts are created and disables the notification
      if (request.status) {
        this._onDisableNotification(data.id, "Pedido aceito!");
      } else {
        Toast.show("Erro! Tente Novamente.");
      }
    } else {
      Toast.show("Erro! Tente Novamente.");
    }
  };
  _onRefresh = () => {
    this.setState({ refreshing: true });
    //gets new content from the DB
    this.props.allNotificationsQuery.refetch();
    //clears the loading
    if (!this.props.allNotificationsQuery.loading) {
      this.setState({ refreshing: false });
    }
    if (
      this.props.allNotificationsQuery &&
      this.props.allNotificationsQuery.error
    ) {
      return <Error />;
    }
  };
  render() {
    if (
      this.props.allNotificationsQuery &&
      this.props.allNotificationsQuery.loading
    ) {
      return <Loading />;
    }
    if (
      this.props.allNotificationsQuery &&
      this.props.allNotificationsQuery.error
    ) {
      return <Error />;
    }
    const { allNotifications } = this.props.allNotificationsQuery;
    return (
      <Container>
        <GradientContainer>
          <ScrollView
            contentContainerStyle={{ paddingVertical: 5 }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            {Object.keys(allNotifications).length <= 0 ? (
              <Placeholder
                text="Sem Notificações"
                IconName="notifications-none"
              />
            ) : (
              allNotifications.map(data => {
                return (
                  <Card key={data.id} onPress={this._openNotification(data)}>
                    <CardContainer>
                      <CardLeft>
                        {data.type === "REQUEST" ? (
                          <Thumbnail
                            style={{ width: 48, height: 48 }}
                            source={
                              data.userRequest.avatar != null
                                ? {
                                    uri: GET_AVATAR_URL(
                                      data.userRequest.avatar.secret,
                                      "250x250",
                                      data.userRequest.avatar.name
                                    )
                                  }
                                : {
                                    uri: IMAGE_PLACEHOLDER
                                  }
                            }
                          />
                        ) : (
                          <Thumbnail
                            style={{ width: 48, height: 48 }}
                            source={{
                              uri: data.discussion.cover || IMAGE_PLACEHOLDER
                            }}
                          />
                        )}
                      </CardLeft>
                      <CardBody>
                        <Text style={{ fontSize: 14, color: "#000" }}>
                          {data.type === "REQUEST"
                            ? `${
                                data.userRequest.name
                              } enviou um pedido para conectar`
                            : `Nova resposta na discussão ${
                                data.discussion.title
                              }`}
                        </Text>
                      </CardBody>
                      <CardRight>
                        {data.type === "REQUEST" ? (
                          <Button
                            onPress={() => this._onCreateContact(data)}
                            small
                            style={{
                              backgroundColor: "#3F51B5",
                              borderRadius: 2
                            }}
                          >
                            <Text
                              style={{
                                lineHeight: 12,
                                fontSize: 12,
                                fontWeight: "600"
                              }}
                            >
                              {"aceitar".toUpperCase()}
                            </Text>
                          </Button>
                        ) : (
                          <TouchableOpacity onPress={this._onOpenActions(data)}>
                            <MaterialIcons
                              name="more-vert"
                              size={24}
                              color="#757575"
                            />
                          </TouchableOpacity>
                        )}
                      </CardRight>
                    </CardContainer>
                  </Card>
                );
              })
            )}
          </ScrollView>
        </GradientContainer>
      </Container>
    );
  }
}

export default compose(
  withNavigation,
  graphql(ALL_NOTIFICATIONS_QUERY, {
    name: "allNotificationsQuery",
    options: props => ({
      variables: { userId: props.screenProps.userId }
    })
  }),
  graphql(DISABLE_NOTIFICATION_MUTATION, {
    name: "disableNotification"
  }),
  graphql(CREATE_CONTACT_MUTATION, {
    name: "createContact"
  })
)(NotificationsScreen);

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
