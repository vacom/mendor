import React from "react";
import {
  TouchableOpacity,
  ScrollView,
  View,
  Switch,
  Slider
} from "react-native";
import { Text } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Col, Row } from "react-native-easy-grid";
//Components
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";
import { Card } from "../../components/Card";
//GraphQL
import { graphql, compose } from "react-apollo";
import { USER_PROFILE_QUERY } from "../../api/Queries/User";
import { UPDATE_USER_CONFIG_MUTATION } from "../../api/Mutations/User";
//Utils
import Toast from "react-native-root-toast";
class ConfigScreen extends React.PureComponent {
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
  state = {
    id: "",
    distance: 50,
    interests: "COMMON",
    type: "MENTOR"
  };
  componentWillMount() {
    const {
      id: configId,
      distance,
      interests,
      type
    } = this.props.navigation.state.params.data;
    this.setState({ configId, distance, interests, type });
  }
  componentDidMount() {
    this.props.navigation.setParams({
      updateConfigs: this._onUpdateConfigs
    });
  }
  _onUpdateConfigs = async () => {
    const { configId, distance, interests, type } = this.state;
    const { updateUserConfigs } = this.props;
    try {
      //Updates the configs information of the user
      await updateUserConfigs({
        variables: {
          configId,
          type,
          distance,
          interests
        },
        update: async () => {
          try {
            Toast.show("Alterações guardadas.");
          } catch (e) {
            Toast.show("Erro! Verifique os campos.");
          }
        }
      });
    } catch (e) {
      Toast.show(e);
    }
  };
  _onChangeType = type => () => {
    this.setState({ type });
  };
  _onChangeDistance = value => {
    this.setState({ distance: Math.trunc(value) });
  };

  _onChangeInterests = value => {
    this.setState({ interests: value ? "COMMON" : "ALL" });
  };

  render() {
    const { type, interests, distance } = this.state;
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
              <View style={{ padding: 20 }}>
                <Row>
                  <Col style={{ justifyContent: "center" }}>
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
                  <Col style={{ justifyContent: "center" }}>
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
                marginRight: 14
              }}
            >
              Mendor utiliza a localização para mostrar primeiro as pessoas
              perto de si.
            </Text>

            <View style={{ marginTop: 10 }}>
              <Card>
                <View style={{ padding: 20 }}>
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
                  <Row style={{ marginTop: 15 }}>
                    <Col style={{ justifyContent: "center" }}>
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
                        onTintColor="#3F54AF"
                        onValueChange={this._onChangeType("ENTREPRENEUR")}
                        value={type != "ENTREPRENEUR" ? false : true}
                        style={{ alignSelf: "flex-end" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 15 }}>
                    <Col style={{ justifyContent: "center" }}>
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
                        onTintColor="#3F54AF"
                        onValueChange={this._onChangeType("MENTOR")}
                        value={type != "MENTOR" ? false : true}
                        style={{ alignSelf: "flex-end" }}
                      />
                    </Col>
                  </Row>
                </View>
              </Card>
            </View>

            <View style={{ marginTop: 10 }}>
              <Card>
                <View style={{ padding: 20 }}>
                  <Row>
                    <Col style={{ justifyContent: "center", width: "auto" }}>
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
                    <Col style={{ justifyContent: "center" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          textAlign: "right",
                          color: "#000000"
                        }}
                      >
                        {`${distance} Km`}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 15 }}>
                    <Col>
                      <Slider
                        maximumValue={200}
                        minimumValue={0}
                        value={distance}
                        onValueChange={this._onChangeDistance}
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
                marginRight: 14
              }}
            >
              Mendor utiliza estas preferências para sugerir correspondências.
            </Text>

            <View style={{ marginTop: 10 }}>
              <Card>
                <View style={{ padding: 20 }}>
                  <Row>
                    <Col style={{ justifyContent: "center", width: "auto" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "400",
                          color: "#616161"
                        }}
                      >
                        Mostrar interesses em comum
                      </Text>
                    </Col>
                    <Col style={{ justifyContent: "center" }}>
                      <Switch
                        onTintColor="#3F54AF"
                        onValueChange={this._onChangeInterests}
                        value={interests != "COMMON" ? false : true}
                        style={{ alignSelf: "flex-end" }}
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
    name: "updateUserConfigs",
    options: props => ({
      refetchQueries: [
        {
          query: USER_PROFILE_QUERY,
          variables: { id: props.navigation.state.params.userId }
        }
      ]
    })
  })
)(ConfigScreen);

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const ConfigContainer = styled.View`
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
