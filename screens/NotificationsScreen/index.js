import React from "react";
import { ScrollView } from "react-native";
import { Thumbnail, Button, Text } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
//Components
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
//GraphQL
import { graphql, compose } from "react-apollo";
import { ALL_NOTIFICATIONS_QUERY } from "../../api/Queries/Notification";
//Utils
//import { SOCIAL_ICONS } from "../../constants/Utils";

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

  _openNotification = data => e => {
    e.preventDefault();
    const route = data.type === "REQUEST" ? "Profile" : "DiscussionView";
    const id =
      data.type === "REQUEST" ? data.userRequest.id : data.discussion.id;
    this.props.navigation.navigate(route, { id });
    console.log(data);
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
          {Object.keys(allNotifications).length <= 0 ? (
            <Placeholder />
          ) : (
            <ScrollView style={{ paddingBottom: 30 }}>
              {allNotifications.map(data => {
                return (
                  <Card key={data.id} onPress={this._openNotification(data)}>
                    <CardContainer>
                      <CardLeft>
                        <Thumbnail
                          style={{ width: 48, height: 48 }}
                          source={{
                            uri:
                              data.type === "REQUEST"
                                ? data.userRequest.avatar
                                : data.discussion.cover
                          }}
                        />
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
                          <MaterialIcons
                            name="more-vert"
                            size={24}
                            color="#757575"
                          />
                        )}
                      </CardRight>
                    </CardContainer>
                  </Card>
                );
              })}
            </ScrollView>
          )}
        </GradientContainer>
      </Container>
    );
  }
}

export default compose(
  graphql(ALL_NOTIFICATIONS_QUERY, { name: "allNotificationsQuery" })
)(NotificationsScreen);

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
