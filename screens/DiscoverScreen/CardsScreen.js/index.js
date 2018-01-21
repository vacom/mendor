import React from "react";
//Components
import { Thumbnail, Button, DeckSwiper, Card, Text } from "native-base";
import {
  Label,
  LabelContainer,
  LabelsContainer
} from "../../../components/Label";
import {
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../../components/Card";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
//Styles
import { Col, Row } from "react-native-easy-grid";
import styled from "styled-components/native";
//GraphQL
import { graphql, compose } from "react-apollo";
import { CREATE_NOTIFICATION_MUTATION } from "../../../api/Mutations/Notification";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";
//Utils
import Toast from "react-native-root-toast";
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";

class CardsScreen extends React.Component {
  state = {
    notificationType: "REQUEST"
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
    console.log(data);
  };
  render() {
    console.log(this.props.data);
    return (
      <CardsContainer style={{ height: 200 }}>
        <DeckSwiper
          onSwipeLeft={data => this._onRemoveUser(data)}
          onSwipeRight={data => this._onAddUser(data)}
          dataSource={this.props.data}
          renderItem={item => (
            <Card style={{ elevation: 3, padding: 15, borderRadius: 15 }}>
              <UserContainer>
                <CardContainer>
                  <CardLeft>
                    <Thumbnail
                      style={{ width: 48, height: 48 }}
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
                  </CardLeft>
                  <CardBody>
                    <H1>{item.name}</H1>
                    <P style={{ paddingTop: 1 }}>{`${item.profile.role} na ${
                      item.profile.company
                    }`}</P>
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
                      <MaterialIcons name="work" size={24} color="#757575" />
                    </Col>
                    <Col>
                      <P style={{ marginTop: 4 }}>{item.profile.profession}</P>
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
                      <P style={{ marginTop: 4 }}>{item.profile.location}</P>
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
    );
  }
}

export default compose(
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
  flex-direction: column;
  justify-content: center;
  background-color: red;
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
