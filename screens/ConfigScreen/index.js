import React from "react";
import { Text, TouchableOpacity } from "react-native";
//styles
import styled from "styled-components/native";
//Components
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";
import { MaterialIcons } from "@expo/vector-icons";
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
        <Text>Ecrã de configuração</Text>
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
`;
