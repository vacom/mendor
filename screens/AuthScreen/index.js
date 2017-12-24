import React from "react";
import { StyleSheet, View } from "react-native";
//Components
import { Thumbnail, H1, Text, Button, Content, Container } from "native-base";
import { GradientContainer } from "../../components/index";
import { Col, Row, Grid } from "react-native-easy-grid";

class AuthScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <GradientContainer>
        <Container style={styles.container}>
          <Grid>
            <Row style={{ backgroundColor: "red" }}>
              <View style={styles.center}>
                <Thumbnail square source={{ uri: "https://goo.gl/ucHFSC" }} />
                <H1>Bem vindo ao Mendor</H1>
                <Text>
                  No Mendor podes descobrir e conectar com empreendedores ou
                  mentores.
                </Text>
              </View>
            </Row>
            <Row style={{ backgroundColor: "green" }}>
              <Content>
                <Button block>
                  <Text>Primary</Text>
                </Button>
              </Content>
            </Row>
          </Grid>
        </Container>
      </GradientContainer>
    );
  }
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16
  },
  center: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
