// @flow
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
//Components
import { Thumbnail, Button, DeckSwiper, Card, Text } from "native-base";
import {
  Label,
  LabelContainer,
  LabelsContainer
} from "../../../components/Label";
import { CardContainer, CardLeft, CardBody } from "../../../components/Card";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Loading, Placeholder, Error } from "../../../components/index";
//Styles
import { Col, Row } from "react-native-easy-grid";
import styled from "styled-components/native";
//GraphQL
import { graphql, compose, withApollo } from "react-apollo";
import { CREATE_NOTIFICATION_MUTATION } from "../../../api/Mutations/Notification";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";
import { ALL_USERS_DISCOVERY_QUERY } from "../../../api/Queries/User";
//Utils
import Toast from "react-native-root-toast";
import {
  IMAGE_PLACEHOLDER,
  GET_DISTANCE_FROM_LAT_LON_IN_KM
} from "../../../constants/Utils";

class CardsScreen extends React.Component {
  props: {
    refresh: boolean,
    client: any,
    userLocation: number
  };
  state = {
    notificationType: "REQUEST",
    data: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    this._onLoadDiscovery();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.refresh != this.props.refresh) {
      if (nextProps.refresh) {
        this._onLoadDiscovery();
      }
    }
  }
  _onLoadDiscovery = async () => {
    this.setState({ loading: true });
    const {
      type,
      userId,
      contactsIds,
      competencesIds,
      distance,
      interests
    } = this.props;
    //choose the type of users to discover
    const query = ALL_USERS_DISCOVERY_QUERY(interests);
    //Fetch the data from DB
    const res = await this.props.client.query({
      query,
      variables: { userId, type, contactsIds, competencesIds }
    });
    //error handling
    if (res.error) {
      this.setState({
        error: true
      });
      return;
    }

    //if stops loading the data from DB
    if (!res.loading) {
      this._onFilterDiscovery(distance, res.data);
      return;
    }
  };
  _onFilterDiscovery = (distance, object) => {
    const { latitude, longitude } = this.props.userLocation;
    //get closer users by distance
    const data = object.allUsers.filter(user => {
      return (
        GET_DISTANCE_FROM_LAT_LON_IN_KM(
          latitude,
          longitude,
          user.profile.coordinates.latitude,
          user.profile.coordinates.longitude
        ) <= distance
      );
    });
    //updates the data
    this.setState({
      data,
      loading: false
    });
  };
  _onConnectUser = async userId => {
    const { notificationType: type } = this.state;
    const { userId: userRequestId } = this.props;
    const { createNotification } = this.props;
    try {
      //Creates a new notification of type request
      await createNotification({
        variables: {
          userId,
          type,
          userRequestId
        },
        update: async () => {
          try {
            this._onRemoveUser(userId);
            Toast.show("Pedido Enviado.");
          } catch (e) {
            Toast.show("Erro! Verifique os campos.");
          }
        }
      });
    } catch (e) {
      Toast.show(e);
    }
  };

  _onAddUser(userId) {
    //this._onConnectUser(userId);
  }
  _onRemoveUser(userId) {
    console.log("old cards = ", this.state.data);
    //TODO need a bug fix for the last user, when only has 2 users it removes both
    const data = this.state.data.filter(user => {
      return user.id !== userId;
    });

    this.setState({
      data
    });

    setTimeout(() => {
      console.log("new cards = ", this.state.data);
    }, 3500);
  }
  _goToProfile = id => () => {
    this.props.navigation.navigate("Profile", { id });
  };

  render() {
    return (
      <View>
        {this.state.error ? (
          <Error />
        ) : this.state.loading ? (
          <Loading text="A procurar pessoas..." />
        ) : Object.keys(this.state.data) <= 0 ? (
          <Placeholder IconName="people" text="Não há ninguém perto de si." />
        ) : (
          <CardsContainer style={{ height: 200 }}>
            <DeckSwiper
              onSwipeLeft={data => this._onRemoveUser(data.id)}
              onSwipeRight={data => this._onAddUser(data.id)}
              dataSource={this.state.data}
              renderItem={item => (
                <Card style={{ elevation: 3, padding: 15, borderRadius: 15 }}>
                  <UserContainer>
                    <CardContainer>
                      <CardLeft>
                        <TouchableOpacity onPress={this._goToProfile(item.id)}>
                          <Thumbnail
                            style={{ width: 48, height: 48 }}
                            /*source={{
                            uri: IMAGE_PLACEHOLDER
                          }}*/
                            source={
                              item.avatar != null
                                ? {
                                    uri: GET_AVATAR_URL(
                                      item.avatar.secret,
                                      "250x250",
                                      item.avatar.name
                                    )
                                  }
                                : {
                                    uri: IMAGE_PLACEHOLDER
                                  }
                            }
                          />
                        </TouchableOpacity>
                      </CardLeft>
                      <CardBody>
                        <H1>{item.name}</H1>
                        <P style={{ paddingTop: 1 }}>{`${
                          item.profile.role
                        } na ${item.profile.company}`}</P>
                      </CardBody>
                    </CardContainer>
                  </UserContainer>
                  <LinksContainer>
                    <LinkContainer>
                      <Row style={{ height: 39 }}>
                        <Col style={{ width: 40 }}>
                          <MaterialIcons
                            name="work"
                            size={24}
                            color="#757575"
                          />
                        </Col>
                        <Col>
                          <P style={{ marginTop: 4 }}>
                            {item.profile.profession}
                          </P>
                        </Col>
                      </Row>
                    </LinkContainer>
                    <LinkContainer>
                      <Row style={{ height: 39 }}>
                        <Col style={{ width: 40 }}>
                          <MaterialIcons
                            name="location-on"
                            size={24}
                            color="#757575"
                          />
                        </Col>
                        <Col>
                          <P style={{ marginTop: 4 }}>
                            {item.profile.location}
                          </P>
                        </Col>
                      </Row>
                    </LinkContainer>
                    <LinkContainer>
                      <Row style={{ height: 39 }}>
                        <Col style={{ width: 40 }}>
                          <MaterialCommunityIcons
                            name="radar"
                            size={24}
                            color="#757575"
                          />
                        </Col>
                        <Col>
                          <P style={{ marginTop: 4 }}>
                            {`${GET_DISTANCE_FROM_LAT_LON_IN_KM(
                              this.props.userLocation.latitude,
                              this.props.userLocation.longitude,
                              item.profile.coordinates.latitude,
                              item.profile.coordinates.longitude
                            )} km`}
                          </P>
                        </Col>
                      </Row>
                    </LinkContainer>
                  </LinksContainer>
                  <Row>
                    <SkillsContainer>
                      <Span style={{ color: "#000000" }}>
                        {"competências".toUpperCase()}
                      </Span>
                      <LabelsControl>
                        <LabelsContainer>
                          {item.competences.map(data => {
                            return (
                              <LabelContainer key={data.interest.id}>
                                <Label text={data.interest.title} />
                              </LabelContainer>
                            );
                          })}
                        </LabelsContainer>
                      </LabelsControl>
                    </SkillsContainer>
                  </Row>
                  <Row
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 15
                    }}
                  >
                    <Button
                      onPress={() => this._onConnectUser(item.id)}
                      style={{ backgroundColor: "#3F51B5", borderRadius: 2 }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "600"
                        }}
                      >
                        {"conectar".toUpperCase()}
                      </Text>
                    </Button>
                  </Row>
                </Card>
              )}
            />
          </CardsContainer>
        )}
      </View>
    );
  }
}

export default compose(
  withNavigation,
  withApollo,
  graphql(CREATE_NOTIFICATION_MUTATION, { name: "createNotification" })
)(CardsScreen);

/*
--Globals
*/
const H1 = styled.Text`
  font-size: 18px;
  line-height: 20px;
  color: #000;
  font-weight: 600;
`;

const P = styled.Text`
  font-size: 16px;
  line-height: 19px;
  color: #757575;
  font-weight: 400;
`;

const Span = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #000;
`;

//User
const UserContainer = styled.View`
  padding: 5px;
`;

//Cards
const CardsContainer = styled.View`
  padding: 10px;
`;

//Links
const LinksContainer = styled.View`
  padding: 15px 15px 15px 15px;
`;

//Link
const LinkContainer = styled.View`
  padding-bottom: 0;
`;

//Skills
const SkillsContainer = styled.View`
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 30px;
`;

//Labels
const LabelsControl = styled.View`
  height: 140px;
  overflow: hidden;
`;
