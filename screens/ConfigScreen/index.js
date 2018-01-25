import React from "react";
import { TouchableOpacity, ScrollView, View, Switch, Slider } from "react-native";
import { Text, CheckBox } from "native-base";
import { LinearGradient } from "expo";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Col, Row } from "react-native-easy-grid";
//Components
import {
    HeaderRightContainer,
    HeaderRightElement
} from "../../components/HeaderRight";
import { Card, CardContainer } from "../../components/Card";


//GraphQL
import { graphql, compose } from "react-apollo";
import { UPDATE_USER_CONFIG_MUTATION } from "../../api/Mutations/User";

class ConfigScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Configurações",
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.updateConfigs}>
              <MaterialIcons name="save" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({
      updateConfigs: this._onUpdateConfigs
    });
  }
  _onUpdateConfigs = () => {
    console.log("A guardar configurações");
  };
  render() {
    console.log("Config props: ", this.props.data);
    return (
      <Container>
        <ScrollView>
          <ConfigContainer>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginLeft: 10,
                marginBottom: 5
              }}
            >
              Definições de Descoberta
            </Text>
            <Card>
              <View style={{padding: 20}}>
                <Row>
                  <Col style={{justifyContent: "center"}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "400",
                        color: "#616161"
                      }}
                    >
                      A passar em
                    </Text>
                  </Col>
                  <Col style={{justifyContent: "center"}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        textAlign: "right",
                        color: "#3F51B5"
                      }}
                    >
                      Localização Atual
                    </Text>
                  </Col>
                </Row>
              </View>
            </Card>
            <Text
              style={{
                marginTop: 3,
                fontSize: 14,
                lineHeight: 20,
                fontWeight: "300",
                color: "#757575",
                marginLeft: 14,
                marginRight: 14,
              }}
            >
              Mendor utiliza a localização para mostrar primeiro as pessoas perto de si.
            </Text>

            <View style={{marginTop: 10}}>
              <Card>
                <View style={{padding: 20}}>
                  <Row>
                    <Col>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: "#673AB7"
                        }}
                      >
                        Mostrar
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{marginTop: 15}}>
                    <Col style={{justifyContent: "center"}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "400",
                          color: "#616161"
                        }}
                      >
                        Empreendedores
                      </Text>
                    </Col>
                    <Col>
                      <Switch
                        style={{ alignSelf: 'flex-end'}}
                      />
                    </Col>
                  </Row>
                  <Row style={{marginTop: 15}}>
                    <Col style={{justifyContent: "center"}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "400",
                          color: "#616161"
                        }}
                      >
                        Mentores
                      </Text>
                    </Col>
                    <Col>
                      <Switch
                        style={{ alignSelf: 'flex-end'}}
                      />
                    </Col>
                  </Row>
                </View>
              </Card>
            </View>

            <View style={{marginTop: 10}}>
              <Card>
                <View style={{padding: 20}}>
                  <Row>
                    <Col style={{justifyContent: "center", width: "auto"}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: "#673AB7"
                        }}
                      >
                        Distância máxima
                      </Text>
                    </Col>
                    <Col style={{justifyContent: "center"}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          textAlign: "right",
                          color: "#000000"
                        }}
                      >
                        20km
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{marginTop: 15}}>
                    <Col>
                      <Slider

                      />
                    </Col>
                  </Row>
                </View>
              </Card>
            </View>
            <Text
              style={{
                marginTop: 3,
                fontSize: 14,
                lineHeight: 20,
                fontWeight: "300",
                color: "#757575",
                marginLeft: 14,
                marginRight: 14,
              }}
            >
              Mendor utiliza estas preferências para sugerir correspondências.
            </Text>

            <View style={{marginTop: 10}}>
              <Card>
                <View style={{padding: 20}}>
                  <Row>
                    <Col style={{justifyContent: "center", width: "auto"}}>
                      <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "400",
                            color: "#616161"
                        }}
                      >
                        Mostrar-me no Mendor
                      </Text>
                    </Col>
                    <Col style={{justifyContent: "center"}}>
                      <Switch
                        style={{ alignSelf: 'flex-end'}}
                      />
                    </Col>
                  </Row>
                </View>
              </Card>
            </View>

          </ConfigContainer>
        </ScrollView>
      </Container>
    );
  }
}

export default compose(
  graphql(UPDATE_USER_CONFIG_MUTATION, {
    name: "updateUserConfigs"
  })
)(ConfigScreen);

const Container = styled.View`
  flex: 1;
  background-color: #F5F5F5;
`;

const ConfigContainer = styled.View`
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
