import React from "react";
import { ActionSheet, View, Text, Input } from "native-base";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { Error, Loading, Placeholder } from "../../../components/index";
import { withNavigation } from "react-navigation";

//GRAPHQL
import { graphql, compose, withApollo } from "react-apollo";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";

//Utils
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";

// Components
import SearchDiscover from "../../SearchScreen/SearchDiscover/index";
import {
  SearchInput,
  SearchContent,
  SearchCard
} from "../../../components/SearchComponents";

class DiscoverSearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    search_value: "",
    typing: false,
    loading: false,
    searched: false,
    refreshing: false
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

  _goToProfile = id => {
    this.props.navigation.navigate("Profile", { id: id });
  };

  render() {
    return (
      <Container>
        <SearchInput
          goBack={() => this.props.navigation.goBack()}
          handleChange={text => {
            this.handleChange(text);
          }}
          search_value={this.state.search_value}
          placeholder="Pesquisar pessoas"
          color="#3f51b5"
        />
        <SearchContent>
          <ScrollView>
            <SearchDiscover
              onPress={this._goToProfile}
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

export default compose(withApollo, withNavigation)(DiscoverSearchScreen);

const Container = styled.View`
  flex: 1;
`;
const Header = styled.View`
  padding: 10px;
  background-color: #3f51b5;
  height: 65px;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
`;

const SearchView = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 10px;
  background-color: white;
  border-radius: 2px;
  elevation: 10;
`;

const ViewInput = styled.View`
  width: 80%;
`;
