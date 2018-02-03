import React from "react";
import { ActivityIndicator } from "react-native";
import { NavigationActions } from "react-navigation";
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
import { SIGNIN_USER_MUTATION } from "../../../api/Mutations/User";
import { USER_SIGNIN_FUNC } from "../../../api/Functions/User";
//Utils
import Toast from "react-native-root-toast";
class SigninScreen extends React.Component {
  static navigationOptions = {
    title: ""
  };
  state = {
    email: "",
    password: "",
    loading: false
  };
  _onUserSignIn = async () => {
    this.setState(prevState => ({ loading: !prevState.loading }));
    const { email, password } = this.state;
    const { signinUser, navigation } = this.props;
    //Signins the user and checks in the DB
    const result = await USER_SIGNIN_FUNC(
      email.trim(),
      password.trim(),
      signinUser
    );
    //If it passes goes to the main screen
    if (result.status) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Main" })]
      });
      navigation.dispatch(resetAction);
    } else {
      this.setState(prevState => ({ loading: !prevState.loading }));
      Toast.show("Erro! Verifique os campos.");
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
                marginBottom: 10,
                marginTop: 30,
                backgroundColor: "transparent"
              }}
            >
              <Text style={{ fontSize: 26, fontWeight: "600", color: "#fff" }}>
                Entrar
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
                Bem vindo de volta, no mendor és sempre recebido com muito amor.
              </Text>
            </Row>
          </ContentContainer>
        </LinearGradient>
        <Container>
          <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Form style={{ paddingBottom: 60 }}>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Email</Label>
                <Input
                  keyboardType="email-address"
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Password</Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
            </Form>
          </Content>
        </Container>

        <Fab
          onPress={this._onUserSignIn}
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

export default compose(graphql(SIGNIN_USER_MUTATION, { name: "signinUser" }))(
  SigninScreen
);

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  margin-left: 20px;
  margin-right: 20px;
`;
