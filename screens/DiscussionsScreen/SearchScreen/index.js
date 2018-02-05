import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
//GRAPHQL
import { compose } from "react-apollo";
// Components
import {
  SearchInput,
  SearchContent
} from "../../../components/SearchComponents";
import SearchDiscussions from "../../SearchScreen/SearchDiscussions/index";

class SearchDiscussionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    search_value: "",
    typing: false,
    loading: false,
    searched: false
  };

  handleChange(text) {
    if (!this.state.typing) {
      // Só executa se nao estiver a escrever
      const self = this;
      this.setState({
        // Confirma que está a escrever
        typing: true
      });
      clearInterval(timer); // Reinicia eventual timer anterior (porque voltou a escrever)
      const timer = setTimeout(function() {
        self.setState({
          // Passado 5 segundos o user parou de escrever e executa a função (para nao fazer multiplos requests)
          typing: false
        });
        self.setState({ search_value: text });
      }, 500);
    }
  }

  _goToChat = (id, users) => async () => {};

  render() {
    return (
      <Container>
        <SearchInput
          goBack={() => this.props.navigation.goBack()}
          handleChange={text => {
            this.handleChange(text);
          }}
          search_value={this.state.search_value}
          placeholder="Pesquisar discussões"
          color="#3f51b5"
        />
        <SearchContent color="#fff">
          <ScrollView style={{ paddingTop: 20 }}>
            <SearchDiscussions
              onPress={this._goToChat}
              search_value={this.state.search_value}
              searched={this.state.searched}
              typing={this.state.typing}
              loading={this.state.loading}
              userId={this.props.screenProps.userId}
              searchedDone={() => {
                this.setState({
                  searched: true,
                  loading: false
                });
              }}
            />
          </ScrollView>
        </SearchContent>
      </Container>
    );
  }
}

export default compose(withNavigation)(SearchDiscussionScreen);

const Container = styled.View`
  flex: 1;
`;
