import React from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { Content, Thumbnail, ActionSheet, Card } from "native-base";
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
import { Placeholder, Loading } from "../../components/index";
//GraphQL
import { graphql, compose, withApollo } from "react-apollo";
import { USER_PROFILE_QUERY } from "../../api/Queries/User";
import { GET_AVATAR_URL } from "../../api/Functions/Upload";
//Utils
import {
  SOCIAL_ICONS,
  onSignOut,
  IMAGE_PLACEHOLDER
} from "../../constants/Utils";

class ProfileScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Profile",
      headerRight: !params.currentUser ? null : (
        <HeaderRightContainer>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.openActions}>
              <MaterialIcons name="more-vert" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };
  state = {
    refreshing: false
  };
  componentDidMount() {
    this.props.navigation.setParams({
      openActions: this._onOpenActions,
      currentUser: this.props.navigation.state.params.currentUser
    });
  }
  _onOpenActions = () => {
    var BUTTONS = [
      "Editar Perfil",
      "Adcionar Tecnologia",
      "Adicionar Projeto",
      "Adicionar Contato Externo",
      "Configurações",
      "Sair",
      "Cancelar"
    ];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 6,
        destructiveButtonIndex: 5,
        title: "Ações"
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this._goToEditProfile();
            break;
          case 1:
            this._goToAddScreen("addTechnology");
            break;
          case 2:
            this._goToAddScreen("addProject");
            break;
          case 3:
            this._goToAddScreen("addSocial");
            break;
          case 4:
            this._gotToConfigs();
            break;
          case 5:
            this._onUserSignOut();
            break;
        }
      }
    );
  };
  _onRefresh = () => {
    this.setState({ refreshing: true });
    //gets new content from the DB
    this.props.userProfileQuery.refetch();
    //clears the loading
    if (!this.props.userProfileQuery.loading) {
      this.setState({ refreshing: false });
    }
  };
  _gotToConfigs = () => {
    const {
      configuration: data,
      id: userId
    } = this.props.userProfileQuery.User;
    this.props.navigation.navigate("Config", { data, userId });
  };
  _goToEditProfile = () => {
    const {
      profile: data,
      avatar,
      id: userId
    } = this.props.userProfileQuery.User;
    const image =
      avatar != null
        ? GET_AVATAR_URL(avatar.secret, "250x250", avatar.name)
        : IMAGE_PLACEHOLDER;

    this.props.navigation.navigate("EditProfile", { data, userId, image });
  };
  _goToAddScreen(screen) {
    const { id: userId } = this.props.userProfileQuery.User;
    this.props.navigation.navigate(screen, { userId });
  }
  _onUserSignOut = async () => {
    //Clears the apollo store;
    await this.props.client.resetStore();
    //clears the user session id and token
    onSignOut();
    //redirects the user to auth screen
    setTimeout(() => {
      this.props.navigation.navigate("AuthScreen");
    }, 250);
  };
  render() {
    if (this.props.userProfileQuery && this.props.userProfileQuery.loading) {
      return <Loading dark />;
    }
    if (this.props.userProfileQuery && this.props.userProfileQuery.error) {
      <Placeholder text="Erro! Tente novamente" IconName="error" />;
    }
    const { navigation, userProfileQuery } = this.props;
    const { User } = userProfileQuery;
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
    } = User;
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              tintColor="black"
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Grid>
            <LinearGradient colors={["#3f51b5", "#B39DDB"]}>
              <AboutContainer>
                <CardContainer>
                  <CardLeft>
                    <Thumbnail
                      style={{ width: 48, height: 48 }}
                      source={
                        User.avatar != null
                          ? {
                              uri: GET_AVATAR_URL(
                                User.avatar.secret,
                                "250x250",
                                User.avatar.name
                              )
                            }
                          : {
                              uri: IMAGE_PLACEHOLDER
                            }
                      }
                    />
                  </CardLeft>
                  <CardBody>
                    <H1>{User.name}</H1>
                    {profile !== null ? (
                      <P>{`${profile.role} na ${profile.company}`}</P>
                    ) : (
                      <P>Sem Empresa</P>
                    )}
                  </CardBody>
                </CardContainer>
                <AboutTextContainer>
                  <Row>
                    <Col>
                      {profile !== null ? (
                        <P style={{ lineHeight: 24 }}>{profile.about}</P>
                      ) : (
                        <P style={{ lineHeight: 24 }}>
                          Comece por escrever algo sobre si e as suas ideias.
                        </P>
                      )}
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
              <PortfolioContainer style={{ marginTop: 30 }}>
                <Span style={{ color: "#757575" }}>
                  {"competências".toUpperCase()}
                </Span>
                {Object.keys(competences).length <= 0 ? (
                  <TouchableOpacity>
                    <Placeholder
                      dark
                      text="Ainda não adicionou competências."
                      IconName="adjust"
                      size={28}
                      fontSize={14}
                    />
                  </TouchableOpacity>
                ) : (
                  <LabelsContainer>
                    {competences.map(data => {
                      return (
                        <LabelContainer key={data.interest.id}>
                          <Label text={data.interest.title} />
                        </LabelContainer>
                      );
                    })}
                    {_competencesMeta.count >
                    Object.keys(competences).length ? (
                      <LabelContainer>
                        <Label text="..." />
                      </LabelContainer>
                    ) : null}
                  </LabelsContainer>
                )}
              </PortfolioContainer>
            </Row>

            <Row>
              <PortfolioContainer style={{ marginTop: 30 }}>
                <Span style={{ color: "#757575" }}>
                  {"tecnologias".toUpperCase()}
                </Span>
                {Object.keys(technologies).length <= 0 ? (
                  navigation.state.params.currentUser ? (
                    <TouchableOpacity
                      onPress={() => this._goToAddScreen("addTechnology")}
                    >
                      <Placeholder
                        dark
                        link
                        linkText="Pressione para adicionar"
                        text="Ainda não adicionou tecnologias."
                        IconName="layers"
                        size={28}
                        fontSize={14}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Placeholder
                      dark
                      text={`${User.name} Ainda não adicionou tecnologias.`}
                      IconName="layers"
                      size={28}
                      fontSize={14}
                    />
                  )
                ) : (
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
                )}
              </PortfolioContainer>
            </Row>

            <PortfolioContainer style={{ marginTop: 30 }}>
              <Span style={{ color: "#757575" }}>
                {"projetos".toUpperCase()}
              </Span>
            </PortfolioContainer>
            <Row>
              {Object.keys(projects).length <= 0 ? (
                <PortfolioContainer>
                  {navigation.state.params.currentUser ? (
                    <TouchableOpacity
                      onPress={() => this._goToAddScreen("addProject")}
                    >
                      <Placeholder
                        dark
                        link
                        linkText="Pressione para adicionar"
                        text="Ainda não adicionou projetos."
                        IconName="apps"
                        size={28}
                        fontSize={14}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Placeholder
                      dark
                      text={`${User.name} Ainda não adicionou projetos.`}
                      IconName="apps"
                      size={28}
                      fontSize={14}
                    />
                  )}
                </PortfolioContainer>
              ) : (
                <ScrollView
                  style={{ paddingTop: 10, paddingBottom: 10 }}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  horizontal
                  decelerationRate={0}
                  snapToInterval={320}
                  snapToAlignment={"center"}
                  showsHorizontalScrollIndicator={false}
                >
                  {projects.map(data => {
                    return (
                      <Card key={data.id} style={{ marginRight: 5 }}>
                        <ProjectContainer>
                          <P style={{ color: "#000000", marginBottom: 4 }}>
                            {data.title}
                          </P>
                          <ProjectControler>
                            <Span style={{ color: "#9E9E9E", lineHeight: 22 }}>
                              {data.description}
                            </Span>
                          </ProjectControler>
                          <LabelsControl>
                            <LabelsContainer>
                              {data.technologies.map(res => {
                                return (
                                  <LabelContainer key={res.id}>
                                    <Label text={res.name} />
                                  </LabelContainer>
                                );
                              })}
                            </LabelsContainer>
                          </LabelsControl>
                        </ProjectContainer>
                      </Card>
                    );
                  })}
                </ScrollView>
              )}
            </Row>

            <ContactContainer>
              <Span style={{ color: "#757575" }}>
                {"contactos".toUpperCase()}
              </Span>
              {Object.keys(socials).length <= 0 ? (
                navigation.state.params.currentUser ? (
                  <TouchableOpacity
                    onPress={() => this._goToAddScreen("addSocial")}
                  >
                    <Placeholder
                      dark
                      link
                      linkText="Pressione para adicionar"
                      text="Ainda não adicionou contatos."
                      IconName="contacts"
                      size={28}
                      fontSize={14}
                    />
                  </TouchableOpacity>
                ) : (
                  <Placeholder
                    dark
                    text={`${User.name} Ainda não adicionou contatos.`}
                    IconName="contacts"
                    size={28}
                    fontSize={14}
                  />
                )
              ) : (
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
              )}
            </ContactContainer>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default compose(
  withNavigation,
  withApollo,
  graphql(USER_PROFILE_QUERY, {
    name: "userProfileQuery",
    options: props => ({
      variables: { id: props.navigation.state.params.id }
    })
  })
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
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
`;

/*
--Projects
*/

const ProjectContainer = styled.View`
  padding: 10px;
  border-radius: 2px;
  width: 300px;
`;

const ProjectControler = styled.View`
  overflow: hidden;
  height: 88px;
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

//Labels
const LabelsControl = styled.View`
  height: 52px;
  overflow: hidden;
  background-color: #ffffff;
`;
