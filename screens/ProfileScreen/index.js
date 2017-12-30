import React from "react";
import { Content, Thumbnail, Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { LinearGradient } from "expo";
import styled from "styled-components/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
//Components
import { Label, LabelContainer, LabelsContainer } from "../../components/Label";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";
import { CardContainer, CardLeft, CardBody } from "../../components/Card";
import { Error, Loading } from "../../components/index";
//GraphQL
import { graphql, compose } from "react-apollo";
import { USER_PROFILE_QUERY } from "../../api/Queries/User";
//Utils
import { SOCIAL_ICONS } from "../../constants/Utils";

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile",
    headerRight: (
      <HeaderRightContainer>
        <HeaderRightElement>
          <MaterialIcons name="more-vert" size={24} color="#ffffff" />
        </HeaderRightElement>
      </HeaderRightContainer>
    )
  };
  render() {
    if (this.props.userProfileQuery && this.props.userProfileQuery.loading) {
      return <Loading />;
    }
    if (this.props.userProfileQuery && this.props.userProfileQuery.error) {
      return <Error />;
    }
    const { user } = this.props.userProfileQuery;
    const {
      profile,
      competences,
      technologies,
      projects,
      socials,
      _contactsMeta,
      _competencesMeta,
      _projectsMeta,
      _technologiesMeta
    } = user;
    return (
      <Container>
        <Content>
          <Grid>
            <LinearGradient colors={["#3f51b5", "#B39DDB"]}>
              <AboutContainer>
                <CardContainer>
                  <CardLeft>
                    <Thumbnail
                      style={{ width: 48, height: 48 }}
                      source={{ uri: user.avatar }}
                    />
                  </CardLeft>
                  <CardBody>
                    <H1>{user.name}</H1>
                    <P>{`${profile.role} na ${profile.company}`}</P>
                  </CardBody>
                </CardContainer>
                <AboutTextContainer>
                  <Row>
                    <Col>
                      <P style={{ lineHeight: 24 }}>{profile.about}</P>
                    </Col>
                  </Row>
                </AboutTextContainer>
              </AboutContainer>
            </LinearGradient>

            <LinearGradient colors={["#3f51b5", "#B39DDB"]}>
              <Row style={{ marginBottom: 1 }}>
                <Col>
                  <NumberContainer>
                    <P style={{ color: "#000000" }}>{_contactsMeta.count}</P>
                    <Span style={{ color: "#757575" }}>Conexões</Span>
                  </NumberContainer>
                </Col>
                <Col style={{ marginRight: 1, marginLeft: 1 }}>
                  <NumberContainer>
                    <P style={{ color: "#000000" }}>{_competencesMeta.count}</P>
                    <Span style={{ color: "#757575" }}>Competências</Span>
                  </NumberContainer>
                </Col>
                <Col>
                  <NumberContainer>
                    <P style={{ color: "#000000" }}>{_projectsMeta.count}</P>
                    <Span style={{ color: "#757575" }}>Projetos</Span>
                  </NumberContainer>
                </Col>
              </Row>
            </LinearGradient>

            <Row>
              <PortfolioContainer>
                <Span style={{ color: "#757575" }}>
                  {"competências".toUpperCase()}
                </Span>

                <LabelsContainer>
                  {competences.map(data => {
                    return (
                      <LabelContainer key={data.interest.id}>
                        <Label text={data.interest.title} />
                      </LabelContainer>
                    );
                  })}
                  {_competencesMeta.count > Object.keys(competences).length ? (
                    <LabelContainer>
                      <Label text="..." />
                    </LabelContainer>
                  ) : null}
                </LabelsContainer>
              </PortfolioContainer>
            </Row>

            <Row>
              <PortfolioContainer>
                <Span style={{ color: "#757575" }}>
                  {"tecnologias".toUpperCase()}
                </Span>
                <LabelsContainer>
                  <LabelsContainer>
                    {technologies.map(data => {
                      return (
                        <LabelContainer key={data.id}>
                          <Label text={data.name} />
                        </LabelContainer>
                      );
                    })}
                    {_technologiesMeta.count >
                    Object.keys(technologies).length ? (
                      <LabelContainer>
                        <Label text="..." />
                      </LabelContainer>
                    ) : null}
                  </LabelsContainer>
                </LabelsContainer>
              </PortfolioContainer>
            </Row>

            <Row>
              <PortfolioContainer>
                <Span style={{ color: "#757575" }}>
                  {"projetos".toUpperCase()}
                </Span>

                {projects.map(data => {
                  return (
                    <ProjectContainer key={data.id}>
                      <P style={{ color: "#000000", marginBottom: 4 }}>
                        {data.title}
                      </P>
                      <Span style={{ color: "#9E9E9E", lineHeight: 22 }}>
                        {data.description}
                      </Span>
                      <LabelsContainer>
                        {data.technologies.map(res => {
                          return (
                            <LabelContainer key={res.id}>
                              <Label text={res.name} />
                            </LabelContainer>
                          );
                        })}
                      </LabelsContainer>
                    </ProjectContainer>
                  );
                })}
              </PortfolioContainer>
            </Row>

            <ContactContainer>
              <Span style={{ color: "#757575" }}>
                {"contactos".toUpperCase()}
              </Span>
              <LinksContainer>
                {socials.map(data => {
                  return (
                    <LinkContainer key={data.id}>
                      <Row>
                        <Col style={{ width: 40 }}>
                          <MaterialCommunityIcons
                            name={SOCIAL_ICONS[data.type]}
                            size={24}
                            color="#757575"
                          />
                        </Col>
                        <Col>
                          <P style={{ color: "#757575", marginTop: 4 }}>
                            {data.content}
                          </P>
                        </Col>
                      </Row>
                    </LinkContainer>
                  );
                })}
              </LinksContainer>
            </ContactContainer>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default compose(
  graphql(USER_PROFILE_QUERY, { name: "userProfileQuery" })
)(ProfileScreen);

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
  font-weight: 600;
  color: #ffffff;
`;

const P = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  font-weight: 400;
`;

const Span = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
`;

/*
--User Information Styles
*/
const AboutContainer = styled.View`
  padding: 20px 10px 20px 10px;
`;

const AboutTextContainer = styled.View`
  padding: 20px 10px 10px 10px;
`;

/*
--Numbers
*/
const NumberContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 14px;
  padding-bottom: 14px;
  background-color: #fff;
`;

/*
--Skills Styles
*/
const PortfolioContainer = styled.View`
  margin-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
`;

/*
--Projects
*/

const ProjectContainer = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
`;

/*
--Contact
*/
const ContactContainer = styled.View`
  margin-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 18px;
`;

const LinksContainer = styled.View`
  margin-top: 15px;
`;

const LinkContainer = styled.View`
  margin-bottom: 12px;
`;
