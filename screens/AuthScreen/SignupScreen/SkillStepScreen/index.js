import React from "react";
import { ActivityIndicator } from "react-native";
import { NavigationActions } from "react-navigation";
//Components
import { Container, Content, Form, Item, Input, Fab, Text } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { GradientHeader } from "../../../../components/index";
//Containers
import InterestsContainer from "./InterestsContainer/index";
//GraphQL
import { graphql, compose } from "react-apollo";
import { CREATE_USER_COMPETENCE_MUTATION } from "../../../../api/Mutations/Competence";
//Utils
import Toast from "react-native-root-toast";
import { allFalse, countAllTrue } from "../../../../constants/Utils";

class SkillStepScreen extends React.Component {
  static navigationOptions = {
    title: "",
    headerLeft: null
  };
  state = {
    timeoutSearch: 0,
    interests: [],
    query: "programaçao",
    loading: false
  };
  _onSearch(query) {
    clearTimeout(this.state.timeoutSearch);
    this.setState({
      timeoutSearch: setTimeout(() => {
        //searches for interests based on category on the BD
        this.setState({ query: query.trim() });
      }, 500)
    });
  }
  _onGetInterests(interests) {
    this.setState({ interests });
  }
  _onSaveSkills = async () => {
    //this disables double press
    if (this.state.loading) return;
    //get input values
    const { interests } = this.state;
    //Checks if fields are empty
    if (countAllTrue(interests) <= 0 || allFalse(interests)) {
      Toast.show("Ainda não selecionou nenhum interesse!");
      return;
    }
    try {
      this.setState(prevState => ({ loading: !prevState.loading }));
      for (var key in this.state.interests) {
        if (this.state.interests[key]) {
          this._onCreateCompetence(key);
        }
      }
      //If it passes goes to the main screen
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Main" })]
      });
      this.props.navigation.dispatch(resetAction);
    } catch (e) {
      Toast.show(e);
    }
  };
  _onCreateCompetence = async interestId => {
    const { createCompetence, navigation } = this.props;
    const userId = navigation.state.params.userId;
    await createCompetence({
      variables: {
        interestId,
        userId
      },
      update: async (store, { data: { createCompetence } }) => {
        try {
          console.log(createCompetence.id);
        } catch (e) {
          this.setState(prevState => ({ loading: !prevState.loading }));
          Toast.show("Erro! Verifique os campos.");
          return;
        }
      }
    });
  };
  render() {
    const { interests } = this.state;
    return (
      <ScreenContainer>
        <GradientHeader title="Registar" text="Está quase, para terminar, selecione as areas de interesse que pretende." />
        <Container>
          <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Form style={{ paddingBottom: 60, paddingTop: 30 }}>
              <Item style={{ marginLeft: 0, marginBottom: 10 }}>
                <MaterialIcons name="search" size={24} color="#757575" />
                <Input
                  onChangeText={query => this._onSearch(query)}
                  placeholderTextColor="#757575"
                  placeholder="Pesquisar areas de interesse"
                />
              </Item>
              <Text style={{ fontSize: 14, color: "gray", marginBottom: 6 }}>
                {countAllTrue(interests)} Interesses Selecionados
              </Text>
              <InterestsContainer
                query={this.state.query}
                interests={items => this._onGetInterests(items)}
              />
            </Form>
          </Content>
        </Container>
        <Fab
          onPress={this._onSaveSkills}
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

export default compose(
  graphql(CREATE_USER_COMPETENCE_MUTATION, { name: "createCompetence" })
)(SkillStepScreen);

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
