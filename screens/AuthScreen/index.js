import React from "react";
import { Thumbnail, Text, Button } from "native-base";
import { Row } from "react-native-easy-grid";
import styled from "styled-components/native";

//Components
import GradientContainer from "../../components/GradientContainer";

class AuthScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  _goToSignIn = () => {
    this.props.navigation.navigate("SignIn");
  };
  _goToSignUp = () => {
    this.props.navigation.navigate("SignUp");
  };

  render() {
    return (
      <Container>
        <GradientContainer>
          <ContentContainer>
            <Row style={{ height: "auto", marginBottom: 20 }}>
              <Thumbnail
                style={{ height: 80, width: 80 }}
                square
                source={require("../../assets/images/Logo.png")}
              />
            </Row>
            <Row
              style={{
                height: "auto",
                marginBottom: 15,
                backgroundColor: "transparent"
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  lineHeight: 26,
                  fontWeight: "600",
                  color: "#fff"
                }}
              >
                Bem vindo ao Mendor
              </Text>
            </Row>
            <Row
              style={{
                height: "auto",
                backgroundColor: "transparent",
                marginBottom: 10
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: "#fff",
                  textAlignVertical: "center",
                  textAlign: "center"
                }}
              >
                No mendor és sempre recebido com muito amor. Aqui irás fazer
                conexões de valor, e concretizar sonhos!
              </Text>
            </Row>
            <AuthOptions>
              <OptionContainer>
                <Button
                  onPress={this._goToSignIn}
                  style={{ backgroundColor: "#B39DDB", borderRadius: 2 }}
                  full
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}
                  >
                    {"entrar".toUpperCase()}
                  </Text>
                </Button>
              </OptionContainer>
              <OptionContainer>
                <Button
                  onPress={this._goToSignUp}
                  style={{ backgroundColor: "#3F51B5", borderRadius: 2 }}
                  full
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}
                  >
                    {"criar conta".toUpperCase()}
                  </Text>
                </Button>
              </OptionContainer>
              <OptionContainer>
                <Button
                  style={{ backgroundColor: "#0077B5", borderRadius: 2 }}
                  full
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}
                  >
                    {"entrar com linkedin".toUpperCase()}
                  </Text>
                </Button>
              </OptionContainer>
            </AuthOptions>
          </ContentContainer>
        </GradientContainer>
      </Container>
    );
  }
}

export default AuthScreen;

const Container = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  margin-left: 20px;
  margin-right: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const AuthOptions = styled.View`
  width: 100%;
`;

const OptionContainer = styled.View`
  margin-top: 15px;
`;
