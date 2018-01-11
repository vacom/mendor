import React from "react";
//Components
import { Container, Content, Form, Item, Input, Label, Fab } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { SignUpHeader } from "../../../../components/index";
//GraphQL
import { graphql, compose } from "react-apollo";
import { CREATE_USER_PROFILE_MUTATION } from "../../../../api/Mutations/User";
//Utils
import Toast from "react-native-root-toast";

class ProfileStepScreen extends React.Component {
  static navigationOptions = {
    title: ""
  };
  state = {
    company: "",
    profession: "",
    role: "",
    about: "",
    location: ""
  };
  _onCreateProfile = async () => {
    const { company, profession, role, about, location } = this.state;
    const { createProfile, navigation } = this.props;
    const userId = navigation.state.params.userId;
    //Checks if fields are empty
    if (!company || !profession || !role || !about || !location) {
      Toast.show("Fields can not be empty!");
      return;
    }

    try {
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
        <SignUpHeader text="Aproveite este espaço para falar um pouco sobre si, ideia ou tecnologia." />
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
          <MaterialIcons name="arrow-forward" size={24} color="#ffffff" />
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
