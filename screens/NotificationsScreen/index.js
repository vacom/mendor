import React from "react";
import { Platform } from "react-native";
import { Notifications, Permissions } from "expo";
import { ScrollView, RefreshControl, TouchableOpacity } from "react-native";
//Components
import { Thumbnail, Button, Text, ActionSheet } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import GradientContainer from "../../components/GradientContainer";
import {
  Card,
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../components/Card";
import { Loading, Placeholder } from "../../components/index";
/**
 * GraphQL
 */
import { graphql, compose } from "react-apollo";
//Notifications
import { ALL_NOTIFICATIONS_QUERY } from "../../api/Queries/Notification";
import { DISABLE_NOTIFICATION_MUTATION } from "../../api/Mutations/Notification";
import { ALL_NOTIFICATIONS_SUBSCRIPTION } from "../../api/Subscriptions/User";
import { GET_AVATAR_URL } from "../../api/Functions/Upload";
import { CREATE_CONTACT_FUNC } from "../../api/Functions/User";
import { IMAGE_PLACEHOLDER } from "../../api/Functions/Upload";
//HOCs
import withCurrentUser from "../../components/HOC/withCurrentUser";
//contacts
import { ALL_CONTACTS_ENTREPENEURS_MENTORS_QUERY } from "../../api/Queries/Contacts";
import { CREATE_CONTACT_MUTATION } from "../../api/Mutations/Contacts";
//Utils
import Toast from "react-native-root-toast";

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

class NotificationsScreen extends React.Component {
  static navigationOptions = {
    title: "Notificações"
  };
  state = {
    refreshing: false
  };
  componentDidMount() {
    getiOSNotificationPermission();
    this.listenForNotifications();

    this._subscribeToNotifications();
  }
  componentWillUnmount() {
    Notifications.cancelAllScheduledNotificationsAsync();
  }
  _subscribeToNotifications = () => {
    const { allNotificationsQuery, currentUserId } = this.props;
    allNotificationsQuery.subscribeToMore({
      document: ALL_NOTIFICATIONS_SUBSCRIPTION,
      variables: { userId: currentUserId },
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previous;
        }
        //gets the new data
        const { node } = subscriptionData.data.Notification;
        //Sets the notification
        const data = {
          title:
            node.type === "REQUEST"
              ? "Novo pedido de utilizador"
              : "Nova resposta à discussão",
          body:
            node.type === "REQUEST"
              ? `${node.userRequest.name} enviou um pedido para conectar`
              : `Nova resposta na discussão ${node.discussion.title}`,
          icon:
            node.type === "REQUEST"
              ? GET_AVATAR_URL(
                  node.userRequest.avatar.secret,
                  "150x150",
                  node.userRequest.avatar.name
                )
              : GET_AVATAR_URL(
                  node.discussion.cover.secret,
                  "150x150",
                  node.discussion.cover.name
                )
        };
        //Creates a new notification
        this._onCreateLocalNotification(data);
        //Shows the result on the UI
        const result = Object.assign({}, previous, {
          allNotifications: [...previous.allNotifications, node]
        });
        return result;
      }
    });
  };
  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === "received" && Platform.OS === "ios") {
        console.log("Enviado");
      }
    });
  };
  _onCreateLocalNotification = ({ title, body, icon }) => {
    const localnotification = {
      title,
      body,
      android: {
        sound: true,
        icon
      },
      ios: {
        sound: true
      }
    };
    let sendAfterFiveSeconds = Date.now();
    sendAfterFiveSeconds += 5000;

    const schedulingOptions = { time: sendAfterFiveSeconds };
    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
  };
  _openNotification(data) {
    //defines the route to go, profile or discussion
    const route = data.type === "REQUEST" ? "Profile" : "DiscussionView";
    //gets the correct id to open the correct content
    const id =
      data.type === "REQUEST" ? data.userRequest.id : data.discussion.id;
    //if is a discussion takes the titles as a params
    const title = data.type === "REQUEST" ? null : data.discussion.title;
    //navigates to the correct screen
    this.props.navigation.navigate(route, { id, title });
  }
  _onOpenActions = data => () => {
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
            Toast.show("Erro! Verifique os campos.");
          }
        }
      });
    } catch (e) {
      Toast.show("Erro! Tente novamente.");
    }
  };
  _onCreateContact = async data => {
    const contactID = data.userRequest.id;
    const { createContact, currentUserId } = this.props;

    //Creates a new contact for the user
    const result = await CREATE_CONTACT_FUNC(
      currentUserId,
      contactID,
      createContact
    );
    //if success creates a new user for the requested user
    if (result.status) {
      //saves the contact
      const request = await CREATE_CONTACT_FUNC(
        contactID,
        currentUserId,
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
  _onPullToRefresh = () => {
    this.setState({ refreshing: true });
    this._onRefresh();
  };
  _onRefresh = () => {
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
      return <Placeholder text="Erro! Tente novamente" IconName="error" />;
    }
  };
  render() {
    if (
      this.props.allNotificationsQuery &&
      this.props.allNotificationsQuery.loading
    ) {
      return (
        <GradientContainer>
          <Loading />
        </GradientContainer>
      );
    }
    if (
      this.props.allNotificationsQuery &&
      this.props.allNotificationsQuery.error
    ) {
      return (
        <GradientContainer>
          <Placeholder text="Erro! Tente novamente" IconName="error" />
        </GradientContainer>
      );
    }
    const { allNotifications } = this.props.allNotificationsQuery;
    return (
      <Container>
        <GradientContainer>
          <ScrollView
            contentContainerStyle={{ paddingVertical: 5 }}
            refreshControl={
              <RefreshControl
                tintColor="white"
                refreshing={this.state.refreshing}
                onRefresh={this._onPullToRefresh}
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
                  <Card
                    key={data.id}
                    onPress={() => this._openNotification(data)}
                  >
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
                            source={
                              data.discussion.cover != null
                                ? {
                                    uri: GET_AVATAR_URL(
                                      data.discussion.cover.secret,
                                      "250x250",
                                      data.discussion.cover.name
                                    )
                                  }
                                : {
                                    uri: IMAGE_PLACEHOLDER
                                  }
                            }
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
  withCurrentUser,
  graphql(ALL_NOTIFICATIONS_QUERY, {
    name: "allNotificationsQuery",
    options: props => ({
      variables: { userId: props.currentUserId }
    })
  }),
  graphql(DISABLE_NOTIFICATION_MUTATION, {
    name: "disableNotification"
  }),
  graphql(CREATE_CONTACT_MUTATION, {
    name: "createContact",
    options: props => ({
      refetchQueries: [
        {
          query: ALL_CONTACTS_ENTREPENEURS_MENTORS_QUERY,
          variables: { id: props.currentUserId }
        }
      ]
    })
  })
)(NotificationsScreen);

//export default withCurrentUser(NotificationsScreenWithData);

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
