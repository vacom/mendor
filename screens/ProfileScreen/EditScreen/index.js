import React from "react";
import { TouchableOpacity } from "react-native";
//Components
import {
  Text,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button
} from "native-base";
import { Row } from "react-native-easy-grid";
import styled from "styled-components/native";
import { LinearGradient } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";
import { Error, Loading } from "../../../components/index";
//GraphQL
import { graphql, compose } from "react-apollo";
import { UPDATE_USER_PROFILE_MUTATION } from "../../../api/Mutations/User";
import { USER_PROFILE_QUERY } from "../../../api/Queries/User";
//Utils
import Toast from "react-native-root-toast";

class ProfileEditScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Editar Perfil",
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.updateProfile}>
              <MaterialIcons name="save" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };
  state = {
    profileId: "",
    company: "",
    profession: "",
    role: "",
    about: "",
    location: "",
    loading: true
  };

  componentDidMount() {
    this._onGetUserProfile();
    this.props.navigation.setParams({
      updateProfile: this._onUpdateProfile
    });
  }
  _onGetUserProfile = () => {
    if (this.props.navigation.state.params.data === null) {
      this.setState({ loading: false });
      return;
    }
    const {
      company,
      profession,
      role,
      about,
      location,
      id: profileId
    } = this.props.navigation.state.params.data;

    this.setState({
      company,
      profession,
      role,
      about,
      location,
      profileId,
      loading: false
    });
  };
  _onUpdateProfile = async () => {
    //@TODO needs tpo verify if the user has or not a profile if not needs to create one and not updated
    const {
      company,
      profession,
      role,
      about,
      location,
      profileId
    } = this.state;
    const { updateProfile, navigation } = this.props;
    //Checks if fields are empty
    if (!company || !profession || !role || !about || !location) {
      Toast.show("Fields can not be empty!");
      return;
    }

    try {
      //Creates a new user on the DB
      await updateProfile({
        variables: {
          profileId,
          about,
          company,
          profession,
          role,
          location
        },
        update: async () => {
          try {
            navigation.goBack();
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

  render() {
    return (
      <ScreenContainer>
        <LinearGradient colors={["#3f51b5", "#B39DDB"]}>
          <ContentContainer>
            <DashedContainer>
              <Row style={{ height: "auto", backgroundColor: "transparent" }}>
                <MaterialIcons name="file-upload" size={42} color="#ffffff" />
              </Row>
              <Row
                style={{
                  height: "auto",
                  marginBottom: 15,
                  marginTop: 6,
                  backgroundColor: "transparent"
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "#fff" }}
                >
                  Carregar foto de perfil
                </Text>
              </Row>
              <Row style={{ height: "auto", backgroundColor: "transparent" }}>
                <Button style={{ backgroundColor: "#3F51B5", borderRadius: 2 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600"
                    }}
                  >
                    {"carregar".toUpperCase()}
                  </Text>
                </Button>
              </Row>
            </DashedContainer>
          </ContentContainer>
        </LinearGradient>
        <Container>
          {this.state.loading ? (
            <Loading dark />
          ) : (
            <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
              <Form style={{ paddingBottom: 60 }}>
                <Item style={{ marginLeft: 0 }} floatingLabel>
                  <Label style={{ color: "#757575" }}>Empresa</Label>
                  <Input
                    value={this.state.company}
                    onChangeText={company => this.setState({ company })}
                  />
                </Item>
                <Item style={{ marginLeft: 0 }} floatingLabel>
                  <Label style={{ color: "#757575" }}>Profissão</Label>
                  <Input
                    value={this.state.profession}
                    onChangeText={profession => this.setState({ profession })}
                  />
                </Item>
                <Item style={{ marginLeft: 0 }} floatingLabel>
                  <Label style={{ color: "#757575" }}>Função</Label>
                  <Input
                    value={this.state.role}
                    onChangeText={role => this.setState({ role })}
                  />
                </Item>
                <Item style={{ marginLeft: 0 }} floatingLabel>
                  <Label style={{ color: "#757575" }}>Localização</Label>
                  <Input
                    value={this.state.location}
                    onChangeText={location => this.setState({ location })}
                  />
                </Item>
                <Item style={{ marginLeft: 0 }} floatingLabel>
                  <Label style={{ color: "#757575" }}>Sobre mim/Ideia</Label>
                  <Input
                    value={this.state.about}
                    onChangeText={about => this.setState({ about })}
                  />
                </Item>
              </Form>
            </Content>
          )}
        </Container>
      </ScreenContainer>
    );
  }
}

export default compose(
  graphql(UPDATE_USER_PROFILE_MUTATION, {
    name: "updateProfile",
    options: props => ({
      refetchQueries: [
        {
          query: USER_PROFILE_QUERY,
          variables: { id: props.navigation.state.params.userId }
        }
      ]
    })
  })
)(ProfileEditScreen);

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  margin: 30px;
`;

const DashedContainer = styled.View`
  padding: 30px;
  border: 1px dashed #ffffff;
  align-items: center;
  border-radius: 6px;
`;
