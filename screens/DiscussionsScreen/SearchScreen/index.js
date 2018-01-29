import React from "react";
import { View, Text, Input, Thumbnail, Content } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import GradientContainer from "../../../components/GradientContainer";
import {
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl
} from "react-native";
import { Error, Loading, Placeholder } from "../../../components/index";
import { withNavigation } from "react-navigation";

//GRAPHQL
import { graphql, compose, withApollo } from "react-apollo";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";

//Utils
import { IMAGE_PLACEHOLDER, IMAGE_GROUP_CHAT } from "../../../constants/Utils";

// Components
import {
  SearchInput,
  SearchContent,
  SearchCard
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
          color="transparent"
        />
        <SearchContent transparent={true}>
          <ScrollView>
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
