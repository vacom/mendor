import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
//GRAPHQL
import { compose } from "react-apollo";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";
//Utils
import { IMAGE_PLACEHOLDER, IMAGE_GROUP_CHAT } from "../../../constants/Utils";
// Components
import {
  SearchInput,
  SearchContent
} from "../../../components/SearchComponents";
import SearchChat from "../../SearchScreen/SearchChat/index";

class SearchChatScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    search_value: "",
    typing: false,
    loading: false,
    searched: false,
    disabled: false
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

  _goToChat = (id, users) => async () => {
    const userlength = Object.keys(users).length;
    let name = "";
    let avatar = "";
    if (userlength > 1) {
      avatar = IMAGE_GROUP_CHAT;
      users.map((user, i) => {
        if (userlength === i + 1) {
          name += user.name;
        } else {
          name += user.name + ", ";
        }
      });
    } else {
      name = users[0].name;
      avatar =
        users[0].avatar != null
          ? GET_AVATAR_URL(
              users[0].avatar.secret,
              "250x250",
              users[0].avatar.name
            )
          : IMAGE_PLACEHOLDER;
    }
    this.props.navigation.navigate("ChatView", {
      name: name,
      avatar: avatar,
      id: id
    });
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

  render() {
    return (
      <Container>
        <SearchInput
          goBack={() => this.props.navigation.goBack()}
          handleChange={text => {
            this.handleChange(text);
          }}
          search_value={this.state.search_value}
          placeholder="Pesquisar conversas"
          color="#3f51b5"
        />
        <SearchContent>
          <ScrollView>
            <SearchChat
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
              goToProfile={this._goToProfile}
            />
          </ScrollView>
        </SearchContent>
      </Container>
    );
  }
}

export default compose(withNavigation)(SearchChatScreen);

const Container = styled.View`
  flex: 1;
`;
