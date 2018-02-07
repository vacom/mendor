import React from "react";
import { TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker
} from "native-base";
import styled from "styled-components/native";
import { GradientHeader } from "../../../components/index";
import { MaterialIcons } from "@expo/vector-icons";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";
//GraphQL
import { graphql, compose } from "react-apollo";
import { CREATE_USER_SOCIAL_MUTATION } from "../../../api/Mutations/User";
import { USER_PROFILE_QUERY } from "../../../api/Queries/User";
//Utils
import Toast from "react-native-root-toast";
import { SOCIAL_TYPES } from "../../../constants/Utils";

class SocialScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Adicionar Contato",
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.addSocial}>
              <MaterialIcons name="save" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };
  state = {
    content: "",
    type: "empty"
  };
  componentDidMount() {
    this.props.navigation.setParams({
      addSocial: this._onAddSocial
    });
  }
  _onAddSocial = async () => {
    const { content, type } = this.state;
    const { addSocial, navigation } = this.props;
    const { userId } = navigation.state.params;
   
    //Checks if fields are empty
    if (!content) {
      Toast.show("O campo conteúdo não pode estar vazio!");
      return;
    }
    //checks if a type is selected
    if (type === "empty") {
      Toast.show("É necessário escolher um tipo de contato!");
      return;
    }

    try {
      //Creates a new technology
      await addSocial({
        variables: {
          userId,
          content,
          type
        },
        update: async () => {
          //show the success msg
          Toast.show("Contato externo adicionado.");
          //clears the inputs
          this.setState({ content: "" });
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
          title="Novo contato externo"
          text="Adicione contas sociais e outras formas de comunicação para que as pessoas possam comunicar com você"
        />
        <Container>
          <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Form style={{ paddingBottom: 60 }}>
              <StyledPickerView>
                <Label style={{ color: "#757575" }}>Tipo</Label>
                <Picker
                  mode="dropdown"
                  onValueChange={type => this.setState({ type })}
                  selectedValue={this.state.type}
                >
                  {SOCIAL_TYPES.map((data, index) => {
                    return (
                      <Item
                        key={index}
                        style={{ fontSize: 20 }}
                        label={data.name}
                        value={data.typename}
                      />
                    );
                  })}
                </Picker>
              </StyledPickerView>

              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Conteúdo</Label>
                <Input
                  value={this.state.content}
                  onChangeText={content => this.setState({ content })}
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
  graphql(CREATE_USER_SOCIAL_MUTATION, {
    name: "addSocial",
    options: props => ({
      refetchQueries: [
        {
          query: USER_PROFILE_QUERY,
          variables: { id: props.navigation.state.params.userId }
        }
      ]
    })
  })
)(SocialScreen);

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const StyledPickerView = styled.View`
  padding: 0;
  margin: 30px 0 15px 0;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #dedde3;
`;
