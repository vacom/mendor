import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text
} from "native-base";
import styled from "styled-components/native";
import { GradientHeader } from "../../../components/index";
import { MaterialIcons } from "@expo/vector-icons";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";
//Containers
import TechnologiesContainer from "./TechnologiesContainer";
//GraphQL
import { graphql, compose } from "react-apollo";
import { CREATE_USER_PROJECT_MUTATION } from "../../../api/Mutations/User";
import { USER_PROFILE_QUERY } from "../../../api/Queries/User";
//Utils
import Toast from "react-native-root-toast";
import { countAllTrue, allFalse } from "../../../constants/Utils";

class ProjectScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Adicionar projeto",
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.addProject}>
              <MaterialIcons name="save" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };
  state = {
    title: "",
    description: "",
    technologiesIds: [],
    technologies: [],
  };
  componentDidMount() {
    this.props.navigation.setParams({
      addProject: this._onAddProject
    });
  }
  _onAddProject = async () => {
    const { title, description, technologiesIds, technologies } = this.state;
    const { addProject, navigation } = this.props;
    const { userId } = navigation.state.params;
    //Checks if fields are empty
    if (!title || !description) {
      Toast.show("Os campos não podem estar vazios!");
      return;
    }
    //checks if any technology is selected
    if (countAllTrue(technologies) <= 0 || allFalse(technologies)) {
      Toast.show("É necessário escolher pelo menos uma tecnologia.");
      return;
    }

    try {
      //Creates a new technology
      await addProject({
        variables: {
          userId,
          title,
          description,
          technologiesIds
        },
        update: async () => {
          //show the success msg
          Toast.show("Projeto adicionado.");
          //clears the inputs
          this.setState({
            title: "",
            description: "",
            technologiesIds: [],
            refresh: true
          });
        }
      });
    } catch (e) {
      Toast.show("Erro! Verifique os campos.");
    }
  };
  _onGetTechnologies(technologies) {
    this.setState({ technologies });
    setTimeout(() => {
      this._onGroupTechnologies();
    }, 250);
  }
  _onGroupTechnologies = () => {
    const technologiesIds = [];
    for (var key in this.state.technologies) {
      if (this.state.technologies[key]) {
        technologiesIds.push(key);
      }
    }
    this.setState({ technologiesIds });
  };
  render() {
    const { title, description, technologies } = this.state;
    const { params } = this.props.navigation.state;
    return (
      <ScreenContainer>
        <GradientHeader
          title="Novo projeto"
          text="Mostre o que está trabalhando, adicionando seus projetos atuais, compartilhe e obtenha novas oportunidades de negócios"
        />
        <Container>
          <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Form style={{ paddingBottom: 60 }}>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Titulo</Label>
                <Input
                  value={title}
                  onChangeText={title => this.setState({ title })}
                />
              </Item>
              <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label style={{ color: "#757575" }}>Descrição</Label>
                <Input
                  value={description}
                  onChangeText={description => this.setState({ description })}
                />
              </Item>
              <Text
                style={{
                  fontSize: 14,
                  color: "gray",
                  marginBottom: 6,
                  marginTop: 40
                }}
              >
                {countAllTrue(technologies)} Tecnologias Selecionados
              </Text>
              <TechnologiesContainer
                userId={params.userId}
                tecnologies={items => this._onGetTechnologies(items)}
              />
            </Form>
          </Content>
        </Container>
      </ScreenContainer>
    );
  }
}

export default compose(
  graphql(CREATE_USER_PROJECT_MUTATION, {
    name: "addProject",
    options: props => ({
      refetchQueries: [
        {
          query: USER_PROFILE_QUERY,
          variables: { id: props.navigation.state.params.userId }
        }
      ]
    })
  })
)(ProjectScreen);

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
