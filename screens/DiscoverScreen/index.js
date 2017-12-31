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
//GraphQL
import { graphql, compose, withApollo } from "react-apollo";
import { BASIC_USER_QUERY } from "../../api/Queries/User";
//Utils
import Toast from "react-native-root-toast";

const cards = [
  {
    name: "Vitor Amaral",
    job: "CEO na empresa formette",
    work: "Full Stack Developer",
    location: "Portugal Aveiro",
    radar: "20km de distância",
    photo:
      "https://scontent.fpdl1-1.fna.fbcdn.net/v/t31.0-8/25440329_1521972947849794_5674696303839555748_o.jpg?oh=d5a2dfe19f6b390e9789be9120e74d77&oe=5AC4B12F"
  },
  {
    name: "Vasco Silva",
    job: "CTO na empresa Bevolum",
    work: "Full Stack Developer",
    location: "Portugal Aveiro",
    radar: "20km de distância",
    photo:
      "https://scontent.fpdl1-1.fna.fbcdn.net/v/t31.0-8/20901739_1742639349084085_786414273944527815_o.jpg?oh=78c87fd92598b2a0fe3950422be8f3ef&oe=5ACBFC1A"
  },
  {
    name: "Hugo Silva",
    job: "CEO na empresa Farmacia",
    work: "Doentinho do grupo",
    location: "Portugal Aveiro",
    radar: "20km de distância",
    photo:
      "https://scontent.fpdl1-1.fna.fbcdn.net/v/t1.0-9/13627206_1379839418710828_7794737684553008176_n.jpg?oh=c9b0e09abdf973faff3e5d8a598b8a78&oe=5ACF621A"
  },
  {
    name: "Flávio Amaral",
    job: "CEO na empresa Sabenada",
    work: "FullSnack Developer",
    location: "Portugal Aveiro",
    radar: "20km de distância",
    photo:
      "https://scontent.fpdl1-1.fna.fbcdn.net/v/t31.0-8/20247687_1614533195257703_5319395589238559633_o.jpg?oh=09fa9fbd3366b3050279b754fb102128&oe=5ABD10CD"
  }
];

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
    userId: ""
  };

  componentDidMount() {
    this._getBasicUserInfo();
  }

  _goToProfile = () => {
    this.props.navigation.navigate("Profile", { id: this.state.userId });
  };
  _getBasicUserInfo = async () => {
    const res = await this.props.client.query({ query: BASIC_USER_QUERY });
    if (!res.loading) {
      this.props.navigation.setParams({
        goToProfile: this._goToProfile,
        avatar: res.data.user.avatar
      });
      this.setState({
        userId: res.data.user.id
      });
    }
  };

  render() {
    return (
      <Container>
        <GradientContainer>
          <CardsContainer>
            <DeckSwiper
              dataSource={cards}
              renderItem={item => (
                <Card style={{ elevation: 3, padding: 15, borderRadius: 15 }}>
                  <UserContainer>
                    <CardContainer>
                      <CardLeft>
                        <Thumbnail
                          style={{ width: 48, height: 48 }}
                          source={{ uri: item.photo }}
                        />
                      </CardLeft>
                      <CardBody>
                        <H1>{item.name}</H1>
                        <P style={{ paddingTop: 1 }}>{item.job}</P>
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
                      <Row>
                        <Col style={{ width: 40 }}>
                          <MaterialIcons
                            name="work"
                            size={24}
                            color="#757575"
                          />
                        </Col>
                        <Col>
                          <P style={{ marginTop: 4 }}>{item.work}</P>
                        </Col>
                      </Row>
                    </LinkContainer>
                    <LinkContainer>
                      <Row>
                        <Col style={{ width: 40 }}>
                          <MaterialIcons
                            name="location-on"
                            size={24}
                            color="#757575"
                          />
                        </Col>
                        <Col>
                          <P style={{ marginTop: 4 }}>{item.location}</P>
                        </Col>
                      </Row>
                    </LinkContainer>
                    <LinkContainer>
                      <Row>
                        <Col style={{ width: 40 }}>
                          <MaterialCommunityIcons
                            name="radar"
                            size={24}
                            color="#757575"
                          />
                        </Col>
                        <Col>
                          <P style={{ marginTop: 4 }}>{item.radar}</P>
                        </Col>
                      </Row>
                    </LinkContainer>
                  </LinksContainer>
                  <Row>
                    <SkillsContainer>
                      <Span style={{ color: "#000000" }}>
                        {"competências".toUpperCase()}
                      </Span>
                      <LabelsContainer>
                        <LabelContainer>
                          <Label text="Gestão" />
                        </LabelContainer>
                        <LabelContainer>
                          <Label text="Javascript" />
                        </LabelContainer>
                        <LabelContainer>
                          <Label text="Angular.js" />
                        </LabelContainer>
                        <LabelContainer>
                          <Label text="css" />
                        </LabelContainer>
                        <LabelContainer>
                          <Label text="Photoshop" />
                        </LabelContainer>
                        <LabelContainer>
                          <Label text="Premiere" />
                        </LabelContainer>
                        <LabelContainer>
                          <Label text="Sketch" />
                        </LabelContainer>
                        <LabelContainer>
                          <Label text="..." />
                        </LabelContainer>
                      </LabelsContainer>
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
        </GradientContainer>
      </Container>
    );
  }
}

const discoverScreenWithData = compose(
  graphql(BASIC_USER_QUERY, { name: "basicUserQuery" })
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
  padding-bottom: 15px;
`;

//Skills
const SkillsContainer = styled.View`
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 30px;
`;
