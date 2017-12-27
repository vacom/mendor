import React from "react";
import { NavigationActions } from "react-navigation";
//Components
import {
  Text,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Fab
} from "native-base";
import { Row } from "react-native-easy-grid";
import styled from "styled-components/native";
import { LinearGradient } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
//GraphQL
import { graphql, compose } from "react-apollo";
import {
  CREATE_USER_MUTATION,
  SIGNIN_USER_MUTATION
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
    type: "ENTREPRENEUR"
  };
  _onUserSignUp = async () => {
    const { name, email, password, repeatPassword, type } = this.state;
    const { signinUser, createUser } = this.props;

    //Checks if fields are empty
    if (!name || !email || !password) {
      Toast.show("Fields can not be empty!");
      return;
    }
    //if the passwords are not the same
    if (password !== repeatPassword) {
      Toast.show("Passwords do not match!");
      return;
    }

    try {
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
            //Signins the user and checks in the DB
            const result = await USER_SIGNIN_FUNC(email, password, signinUser);
            //If it passes goes to the main screen
            if (result.status) {
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Main" })]
              });
              this.props.navigation.dispatch(resetAction);
            } else {
              console.log("error = ", result.error);
              Toast.show("Erro! Verifique os campos.");
            }
          } catch (e) {
            console.log(e);
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
            <Row
              style={{
                height: "auto",
                marginBottom: 15,
                marginTop: 30,
                backgroundColor: "transparent"
              }}
            >
              <Text style={{ fontSize: 26, fontWeight: "600", color: "#fff" }}>
                Registar
              </Text>
            </Row>
            <Row
              style={{
                height: "auto",
                backgroundColor: "transparent",
                marginBottom: 30
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: "#fff"
                }}
              >
                Mendor é conetar as pessoas certas, estabelecer relaçoes de
                valor e partilhar ideias.
              </Text>
            </Row>
          </ContentContainer>
        </LinearGradient>
        <Container>
          <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Form style={{ paddingBottom: 60 }}>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Nome</Label>
                <Input onChangeText={name => this.setState({ name })} />
              </Item>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Email</Label>
                <Input onChangeText={email => this.setState({ email })} />
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
          <MaterialIcons name="arrow-forward" size={24} color="#ffffff" />
        </Fab>
      </ScreenContainer>
    );
  }
}

export default compose(
  graphql(SIGNIN_USER_MUTATION, { name: "signinUser" }),
  graphql(CREATE_USER_MUTATION, { name: "createUser" })
)(SignupScreen);

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  margin-left: 20px;
  margin-right: 20px;
`;
