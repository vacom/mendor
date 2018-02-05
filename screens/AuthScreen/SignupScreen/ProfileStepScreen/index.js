import React from "react";
import { ActivityIndicator } from "react-native";
//Components
import { Container, Content, Form, Item, Input, Label, Fab } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { GradientHeader } from "../../../../components/index";
//GraphQL
import { graphql, compose } from "react-apollo";
import { CREATE_USER_PROFILE_MUTATION } from "../../../../api/Mutations/User";
//Utils
import Toast from "react-native-root-toast";

class ProfileStepScreen extends React.Component {
  static navigationOptions = {
    title: "",
    headerLeft: null
  };
  state = {
    company: "",
    profession: "",
    role: "",
    about: "",
    location: "",
    loading: false
  };
  _onCreateProfile = async () => {
    //this disables double press
    if (this.state.loading) return;
    //get input values
    const { company, profession, role, about, location } = this.state;
    const { createProfile, navigation } = this.props;
    const userId = navigation.state.params.userId;
    //Checks if fields are empty
    if (!company || !profession || !role || !about || !location) {
      Toast.show("Os campos não podem estar vazios!");
      return;
    }

    try {
      this.setState(prevState => ({ loading: !prevState.loading }));
      //Creates a new user on the DB
      await createProfile({
        variables: {
          userId,
          about,
          company,
          profession,
          role,
          location
        },
        update: async () => {
          try {
            navigation.navigate("SignUpSkillStep", { userId });
          } catch (e) {
            this.setState(prevState => ({ loading: !prevState.loading }));
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
        <GradientHeader
          title="Registar"
          text="Aproveite este espaço para falar um pouco sobre si, ideia ou tecnologia."
        />
        <Container>
          <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Form style={{ paddingBottom: 60 }}>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Empresa</Label>
                <Input onChangeText={company => this.setState({ company })} />
              </Item>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Profissão</Label>
                <Input
                  onChangeText={profession => this.setState({ profession })}
                />
              </Item>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Função</Label>
                <Input onChangeText={role => this.setState({ role })} />
              </Item>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Localização</Label>
                <Input onChangeText={location => this.setState({ location })} />
              </Item>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Sobre mim/Ideia</Label>
                <Input onChangeText={about => this.setState({ about })} />
              </Item>
            </Form>
          </Content>
        </Container>
        <Fab
          onPress={this._onCreateProfile}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#3f51b5" }}
          position="bottomRight"
        >
          {this.state.loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <MaterialIcons name="arrow-forward" size={24} color="#ffffff" />
          )}
        </Fab>
      </ScreenContainer>
    );
  }
}

export default compose(
  graphql(CREATE_USER_PROFILE_MUTATION, { name: "createProfile" })
)(ProfileStepScreen);

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
