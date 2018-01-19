import React from "react";
import { TouchableOpacity } from "react-native";
import { Thumbnail, Button, DeckSwiper, Card, Text } from "native-base";
import { Col, Row } from "react-native-easy-grid";
import styled from "styled-components/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
//Components
import GradientContainer from "../../components/GradientContainer";
import { Label, LabelContainer, LabelsContainer } from "../../components/Label";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";
import {
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../components/Card";
import { Loading, Placeholder } from "../../components/index";
//GraphQL
import { graphql, compose, withApollo } from "react-apollo";
import {
  BASIC_USER_QUERY,
  ALL_USERS_DISCOVERY_QUERY
} from "../../api/Queries/User";
import { CREATE_NOTIFICATION_MUTATION } from "../../api/Mutations/Notification";
//Utils
import Toast from "react-native-root-toast";

class DiscoverScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Descobrir",
      headerStyle: {
        elevation: 0
      },
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <MaterialIcons name="search" size={24} color="#ffffff" />
          </HeaderRightElement>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.goToProfile}>
              <Thumbnail
                style={{ width: 24, height: 24 }}
                source={{
                  uri: params.avatar
                }}
              />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };

  state = {
    userId: "",
    type: "MENTOR",
    location: "aveiro",
    data: [],
    notificationType: "REQUEST",
    loading: true
  };

  componentDidMount() {
    this._getBasicUserInfo();
    this._onLoadDiscovery();
  }

  _goToProfile = () => {
    this.props.navigation.navigate("Profile", { id: this.state.userId });
  };
  _getBasicUserInfo = async () => {
    const res = await this.props.client.query({ query: BASIC_USER_QUERY });
    if (!res.loading) {
      this.props.navigation.setParams({
        goToProfile: this._goToProfile,
        avatar:
          res.data.user.avatar ||
          "https://ui-avatars.com/api/?size=128&name=mendor"
      });
      this.setState({
        userId: res.data.user.id
      });
    }
  };
  _onLoadDiscovery = async () => {
    const { userId, type, location } = this.state;

    const res = await this.props.client.query({
      query: ALL_USERS_DISCOVERY_QUERY,
      variables: { userId, type, location }
    });

    if (!res.loading) {
      this.setState({
        data: res.data.allUsers,
        loading: false
      });
    }
  };
  _onConnectUser = async userId => {
    const { notificationType: type, userId: userRequestId } = this.state;
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
            Toast.show("Pedido Enviado.");
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
  _onAddUser = data => {
    this._onConnectUser(data.id);
  };
  _onRemoveUser = data => {
    console.log(data.id);
    /*const previous = this.state.data;
    const items = [];
    for (var i in previous) {
      if (previous[i].id !== data.id) {
        items.push(previous);
      }
    }
    console.log(items);
    this.setState({
      data: items
    });*/
  };
  render() {
    return (
      <Container>
        <GradientContainer>
          {this.state.loading ? (
            <Loading text="A procurar pessoas..." />
          ) : Object.keys(this.state.data) <= 0 ? (
            <Placeholder IconName="people" text="Não há ninguém perto de si." />
          ) : (
            <CardsContainer>
              <DeckSwiper
                onSwipeLeft={data => this._onRemoveUser(data)}
                onSwipeRight={data => this._onAddUser(data)}
                dataSource={this.state.data}
                renderItem={item => (
                  <Card style={{ elevation: 3, padding: 15, borderRadius: 15 }}>
                    <UserContainer>
                      <CardContainer>
                        <CardLeft>
                          <Thumbnail
                            style={{ width: 48, height: 48 }}
                            source={{ uri: item.avatar }}
                          />
                        </CardLeft>
                        <CardBody>
                          <H1>{item.name}</H1>
                          <P style={{ paddingTop: 1 }}>{`${
                            item.profile.role
                          } na ${item.profile.company}`}</P>
                        </CardBody>
                        <CardRight>
                          <MaterialIcons
                            name="arrow-drop-down"
                            size={24}
                            color="#000000"
                          />
                        </CardRight>
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
                            <P style={{ marginTop: 4 }}>{"20"}</P>
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
        </GradientContainer>
      </Container>
    );
  }
}

const discoverScreenWithData = compose(
  graphql(CREATE_NOTIFICATION_MUTATION, { name: "createNotification" })
)(DiscoverScreen);

export default withApollo(discoverScreenWithData);

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

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
  line-height: 18px;
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
