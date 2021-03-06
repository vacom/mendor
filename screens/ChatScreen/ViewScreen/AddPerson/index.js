import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import withCurrentUser from "../../../../components/HOC/withCurrentUser";
//GRAPHQL
import {
  UPDATE_CHAT_MUTATION,
  CREATE_MESSAGE_MUTATION
} from "../../../../api/Mutations/Chat";
import {
  ALL_CHATS_QUERY,
  ALL_MESSAGES_QUERY,
  SEARCH_CONTACTS_TO_ADD
} from "../../../../api/Queries/Chat";
import { withApollo, compose, graphql } from "react-apollo";
// Components
import Toast from "react-native-root-toast";
import {
  SearchInput,
  SearchContent
} from "../../../../components/SearchComponents";
import SearchContactsInChat from "../../../SearchScreen/SearchContactsInChat";
import {
  IMAGE_PLACEHOLDER,
  IMAGE_GROUP_CHAT
} from "../../../../constants/Utils";
import { SEARCH_CONTACTS } from "../../../../api/Queries/Contacts";

class AddPersonScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    search_value: "",
    typing: false,
    loading: false,
    searched: false,
    users: this.props.navigation.state.params.users,
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

  _updateChat = (id, name) => async () => {
    if (!this.state.disabled) {
      this.setState({ disabled: true });
      let users = [id, this.props.currentUserId];
      for (i = 0; i < this.state.users.length; i++) {
        users.push(this.state.users[i].id);
      }
      try {
        const res_mutation = await this.props.updateChat({
          variables: {
            id: this.props.navigation.state.params.id,
            usersIds: users,
            isGroup: true
          }
        });

        if (!res_mutation.loading) {
          this._createMessage(res_mutation.data.updateChat.id, name);
          Toast.show(name + " foi adicionado/a à conversa.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  _createMessage = async (id, name) => {
    const authorId = null;
    const chatId = id;
    const content = name + " foi adicionado/a à conversa.";
    const type = "NOTIFICATION";
    try {
      const res_mutation_message = await this.props.createMessage({
        variables: {
          content,
          authorId,
          chatId,
          type
        }
      });
    } catch (e) {
      console.log(e);
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
            <SearchContactsInChat
              id_chat={this.props.navigation.state.params.id}
              updateChat={this._updateChat}
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

export default compose(
  withNavigation,
  withApollo,
  withCurrentUser,
  graphql(UPDATE_CHAT_MUTATION, {
    name: "updateChat",
    options: props => ({
      refetchQueries: [
        {
          query: SEARCH_CONTACTS_TO_ADD,
          variables: {
            id: props.navigation.state.params.id,
            id_user: props.currentUserId,
            query: "",
            id_chat: props.navigation.state.params.id
          },
          query: ALL_CHATS_QUERY,
          variables: {
            id: props.currentUserId
          },
          query: ALL_MESSAGES_QUERY,
          variables: {
            id: props.navigation.state.params.id
          }
        }
      ]
    })
  }),
  graphql(CREATE_MESSAGE_MUTATION, {
    name: "createMessage",
    options: props => ({
      refetchQueries: [
        {
          query: ALL_CHATS_QUERY,
          variables: {
            id: props.currentUserId
          },
          query: ALL_MESSAGES_QUERY,
          variables: {
            id: props.navigation.state.params.id
          }
        }
      ]
    })
  })
)(AddPersonScreen);

const Container = styled.View`
  flex: 1;
`;
