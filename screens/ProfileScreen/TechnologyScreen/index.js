import React from "react";
import { TouchableOpacity } from "react-native";
import { Container, Content, Form, Item, Input, Label } from "native-base";
import styled from "styled-components/native";
import { GradientHeader } from "../../../components/index";
import { MaterialIcons } from "@expo/vector-icons";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";
//GraphQL
import { graphql, compose } from "react-apollo";
import { CREATE_USER_TECHNOLOGY_MUTATION } from "../../../api/Mutations/User";
import { USER_PROFILE_QUERY } from "../../../api/Queries/User";
//Utils
import Toast from "react-native-root-toast";

class TechnologyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Adicionar tecnologia",
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.addTechnology}>
              <MaterialIcons name="save" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };
  state = {
    name: ""
  };
  componentDidMount() {
    this.props.navigation.setParams({
      addTechnology: this._onAddTechnology
    });
  }
  _onAddTechnology = async () => {
    const { name } = this.state;
    const { addTechnology, navigation } = this.props;
    const { userId } = navigation.state.params;
    //Checks if fields are empty
    if (!name) {
      Toast.show("O campo nome não pode estar vazio!");
      return;
    }
    try {
      //Creates a new technology
      await addTechnology({
        variables: {
          userId,
          name
        },
        update: async () => {
          //show the success msg
          Toast.show("Tecnologia adicionada.");
          //clears the inputs
          this.setState({ name: "" });
        }
      });
    } catch (e) {
      Toast.show("Erro! Verifique os campos.");
    }
  };
  render() {
    return (
      <ScreenContainer>
        <GradientHeader
          title="Nova Tecnologia"
          text="Mostre a comunidade suas próprias tecnologias e depois adicione aos seus projetos."
        />
        <Container>
          <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Form style={{ paddingBottom: 60 }}>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Nome da tecnologia</Label>
                <Input
                  value={this.state.name}
                  onChangeText={name => this.setState({ name })}
                />
              </Item>
            </Form>
          </Content>
        </Container>
      </ScreenContainer>
    );
  }
}

export default compose(
  graphql(CREATE_USER_TECHNOLOGY_MUTATION, {
    name: "addTechnology",
    options: props => ({
      refetchQueries: [
        {
          query: USER_PROFILE_QUERY,
          variables: { id: props.navigation.state.params.userId }
        }
      ]
    })
  })
)(TechnologyScreen);

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
