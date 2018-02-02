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
import { ALL_CONTACTS_QUERY } from "../../../api/Queries/Contacts";
import { SEARCH_CONTACTS } from "../../../api/Queries/Contacts";
import { ALL_INDIVIDUAL_CHATS_OF_USERS } from "../../../api/Queries/Chat";
import { CREATE_CHAT_MUTATION } from "../../../api/Mutations/Chat";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";

//Utils
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";

// Components
import {
  SearchInput,
  SearchContent,
  SearchCard
} from "../../../components/SearchComponents";
import SearchChatRooms from "../../SearchScreen/SearchChatRooms/index";

class ChatAddScreen extends React.Component {
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

  _goToChat = (id, avatar) => async () => {
    console.log(id);
    this.props.navigation.setParams({
      id_user2: id
    });
    const res = await this.props.client.query({
      query: ALL_INDIVIDUAL_CHATS_OF_USERS,
      variables: {
        id1: this.props.screenProps.userId, // id1 -> Sempre o id logado!!!
        id2: id
      }
    });
    if (!res.loading) {
      console.log(res);
      if (res.data.allChats.length > 0) {
        this.props.navigation.navigate("ChatView", {
          name: res.data.allChats[0].users[0].name,
          avatar:
            avatar != null
              ? GET_AVATAR_URL(avatar.secret, "250x250", avatar.name)
              : IMAGE_PLACEHOLDER,
          id: res.data.allChats[0].id
        });
      } else {
        try {
          const res_mutation = await this.props.createChat({
            variables: {
              name: "created",
              usersIds: [id, this.props.screenProps.userId],
              authorId: this.props.screenProps.userId,
              isGroup: false
            }
          });
          if (!res_mutation.loading) {
            this.props.navigation.navigate("ChatView", {
              name: res_mutation.data.createChat.users[0].name,
              avatar:
                res_mutation.data.createChat.users[0].avatar != null
                  ? GET_AVATAR_URL(
                      res_mutation.data.createChat.users[0].avatar.secret,
                      "250x250",
                      res_mutation.data.createChat.users[0].avatar.name
                    )
                  : IMAGE_PLACEHOLDER,
              id: res_mutation.data.createChat.id
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
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
          placeholder="Pesquisar contactos"
          color="#3f51b5"
        />
        <SearchContent>
          <ScrollView>
            <SearchChatRooms
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

export default compose(
  withApollo,
  withNavigation,
  graphql(CREATE_CHAT_MUTATION, {
    name: "createChat",
    options: props => ({
      refetchQueries: [
        {
          query: ALL_INDIVIDUAL_CHATS_OF_USERS,
          variables: {
            id1: props.screenProps.userId, // id1 -> Sempre o id logado!!!
            id2: props.navigation.state.params.id_user2
          }
        }
      ]
    })
  })
)(ChatAddScreen);

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
