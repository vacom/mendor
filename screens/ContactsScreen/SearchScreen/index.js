import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import withCurrentUser from "../../../components/HOC/withCurrentUser";
//GRAPHQL
import { compose, withApollo } from "react-apollo";
// Components
import SearchContacts from "../../SearchScreen/SearchContacts/index";
import {
  SearchInput,
  SearchContent
} from "../../../components/SearchComponents";

class ContactsSearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    search_value: "",
    typing: false,
    loading: false,
    searched: false,
    refreshing: false,
    disabled: false
  };

  _setDisabled = () => {
    this.setState({ disabled: true });
    setTimeout(() => {
      this.setState({
        disabled: false
      });
    }, 1000);
  };
  _goToProfile = id => {
    if (!this.state.disabled) {
      this._setDisabled();

      this.props.navigation.navigate("Profile", {
        id
      });
    }
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

  render() {
    return (
      <Container>
        <SearchInput
          goBack={() => this.props.navigation.goBack()}
          handleChange={text => {
            this.handleChange(text);
          }}
          search_value={this.state.search_value}
          placeholder="Pesquisar contactos"
          color="#3f51b5"
        />
        <SearchContent>
          <ScrollView>
            <SearchContacts
              onPress={this._goToProfile}
              search_value={this.state.search_value}
              searched={this.state.searched}
              typing={this.state.typing}
              loading={this.state.loading}
              userId={this.props.currentUserId}
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

export default compose(withApollo, withNavigation, withCurrentUser)(
  ContactsSearchScreen
);

const Container = styled.View`
  flex: 1;
`;
