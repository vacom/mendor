import React from "react";
import { View, ActivityIndicator } from "react-native";
//Components
import {
  Text,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Fab,
  ListItem,
  CheckBox,
  Body
} from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { GradientHeader } from "../../../components/index";
//GraphQL
import { graphql, compose } from "react-apollo";
import {
  CREATE_USER_MUTATION,
  SIGNIN_USER_MUTATION,
  CREATE_USER_CONFIG_MUTATION
} from "../../../api/Mutations/User";
import { USER_SIGNIN_FUNC } from "../../../api/Functions/User";
//Utils
import Toast from "react-native-root-toast";

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: ""
  };
  state = {
    userId: "",
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    type: "ENTREPRENEUR",
    loading: false
  };

  _onUserSignUp = async () => {
    //this disables double press
    if (this.state.loading) return;
    //get input values
    const { name, email, password, repeatPassword, type } = this.state;
    const { signinUser, createUser } = this.props;

    //Checks if fields are empty
    if (!name || !email || !password) {
      Toast.show("Os campos não podem estar vazios!");
      return;
    }
    //if the passwords are not the same
    if (password !== repeatPassword) {
      Toast.show("As senhas não coincidem!");
      return;
    }

    try {
      this.setState(prevState => ({ loading: !prevState.loading }));
      //Creates a new user on the DB
      await createUser({
        variables: {
          email,
          password,
          name,
          type
        },
        update: async (store, { data: { createUser } }) => {
          try {
            //Saves the userID for the next steps of the registration
            this.setState({ userId: createUser.id });
            const userId = createUser.id;
            //Signins the user and checks in the DB
            const result = await USER_SIGNIN_FUNC(
              email.trim(),
              password.trim(),
              signinUser
            );
            //If it passes goes to the next screen
            if (result.status) {
              //create a configuration for the user
              this._onCreateUserConfig(userId);
            } else {
              this.setState(prevState => ({ loading: !prevState.loading }));
              Toast.show("Erro! Verifique os campos.");
            }
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
  _onCreateUserConfig = async userId => {
    const { createUserConfig, navigation } = this.props;
    try {
      //Creates a new user on the DB
      await createUserConfig({
        variables: {
          userId
        },
        update: async () => {
          try {
            //If it passes goes to the next screen
            navigation.navigate("SignUpProfileStep", { userId });
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
  _onType = value => () => {
    this.setState({
      type: value
    });
  };
  render() {
    return (
      <ScreenContainer>
        <GradientHeader
          title="Registar"
          text="Mendor é conetar as pessoas certas, estabelecer relaçoes de valor e partilhar ideias."
        />
        <Container>
          <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Form style={{ paddingBottom: 60 }}>
              <View style={{ marginTop: 40 }}>
                <Label style={{ color: "#757575" }}>Selecionar perfil:</Label>
                <ListItem style={{ marginLeft: 0 }}>
                  <CheckBox
                    checked={this.state.type === "ENTREPRENEUR" ? true : false}
                    onPress={this._onType("ENTREPRENEUR")}
                  />
                  <Body>
                    <Text style={{ color: "#757575" }}>Empreendedor</Text>
                  </Body>
                </ListItem>
                <ListItem style={{ marginLeft: 0 }}>
                  <CheckBox
                    checked={this.state.type === "MENTOR" ? true : false}
                    onPress={this._onType("MENTOR")}
                  />
                  <Body>
                    <Text style={{ color: "#757575" }}>Mentor</Text>
                  </Body>
                </ListItem>
              </View>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Nome</Label>
                <Input onChangeText={name => this.setState({ name })} />
              </Item>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Email</Label>
                <Input
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Password</Label>
                <Input
                  onChangeText={password => this.setState({ password })}
                  secureTextEntry={true}
                />
              </Item>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Repetir Password</Label>
                <Input
                  onChangeText={repeatPassword =>
                    this.setState({ repeatPassword })
                  }
                  secureTextEntry={true}
                />
              </Item>
            </Form>
          </Content>
        </Container>
        <Fab
          onPress={this._onUserSignUp}
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
  graphql(SIGNIN_USER_MUTATION, { name: "signinUser" }),
  graphql(CREATE_USER_MUTATION, { name: "createUser" }),
  graphql(CREATE_USER_CONFIG_MUTATION, { name: "createUserConfig" })
)(SignupScreen);

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
