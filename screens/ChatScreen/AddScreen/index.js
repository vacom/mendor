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
import {
  Card,
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../../components/Card";

//GRAPHQL
import { graphql, compose, withApollo } from "react-apollo";
import { ALL_CONTACTS_QUERY } from "../../../api/Queries/Contacts";
import { SEARCH_CONTACTS } from "../../../api/Queries/Contacts";
import { ALL_INDIVIDUAL_CHATS_OF_USERS } from "../../../api/Queries/Chat";
import { CREATE_CHAT_MUTATION } from "../../../api/Mutations/Chat";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";

//Utils
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";

class ChatAddScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
  }

  state = {
    search_value: "",
    typing: false,
    loading: false,
    searched: false,
    refreshing: false
  };

  handleChange() {
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
        self._searchValue();
      }, 500);
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    //gets new content from the DB
    this.props.allContacts.refetch();
    //clears the loading
    if (!this.props.allContacts.loading) {
      this.setState({ refreshing: false });
    }
  };

  _searchValue() {
    if (!this.state.typing) {
      // Se não estiver a escrever
      if (this.state.search_value != "") {
        // Se o input não estiver vazio
        this._searchQuery(); // Faz o pedido
        this.setState({
          // Ativa o loading
          loading: true
        });
      } else {
        this.setState({
          // Se for vazio, não realiza o search (mostra todos os contactos)
          searched: false
        });
      }
    }
  }

  _goToChat = async (id, avatar) => {
    const res = await this.props.client.query({
      query: ALL_INDIVIDUAL_CHATS_OF_USERS,
      variables: {
        id1: this.props.screenProps.userId, // id1 -> Sempre o id logado!!!
        id2: id
      }
    });
    if (!res.loading) {
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

  _searchQuery = async () => {
    const res = await this.props.client.query({
      query: SEARCH_CONTACTS,
      variables: {
        id: this.props.screenProps.userId,
        query: this.state.search_value
      }
    });
    if (!res.loading) {
      console.log(res.data);
      this.setState({
        searched: true,
        loading: false,
        searched_data: res.data.allContacts
      });
    }
  };
  render() {
    const _renderContacts = () => {
      if (this.state.typing || this.state.loading) {
        // Se estiver a escrever ou o loading do search ativo
        return <Loading />;
      } else {
        // Se não estiver a escrever nem loading
        if (this.state.searched) {
          // Se houver pesquisa mostra os dados da pesquisa
          if (this.state.searched_data.length > 0) {
            return this.state.searched_data.map((data, index) => {
              return (
                <Card key={index}>
                  <CardContainer>
                    <CardLeft>
                      <Thumbnail
                        style={{ width: 48, height: 48 }}
                        source={
                          data.contactID[0].avatar != null
                            ? {
                                uri: GET_AVATAR_URL(
                                  data.contactID[0].avatar.secret,
                                  "250x250",
                                  data.contactID[0].avatar.name
                                )
                              }
                            : {
                                uri: IMAGE_PLACEHOLDER
                              }
                        }
                      />
                    </CardLeft>
                    <CardBody>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#000"
                        }}
                      >
                        {data.contactID[0].name}
                      </Text>
                      <Text style={{ fontSize: 14, color: "#757575" }}>
                        {data.contactID[0].type == "MENTOR"
                          ? "Mentor"
                          : "Empreendedor"}
                      </Text>
                    </CardBody>
                    <CardRight>
                      <TouchableOpacity>
                        <MaterialIcons name="send" size={22} color="#3F51B5" />
                      </TouchableOpacity>
                    </CardRight>
                  </CardContainer>
                </Card>
              );
            });
          } else {
            return <Placeholder text="Sem resultados!" IconName="error" />;
          }
        } else {
          // Se não houver pesquisa mostra os dados dos contactos todos
          if (this.props.allContacts && this.props.allContacts.loading) {
            return <Loading />;
          } else if (this.props.allContacts && this.props.allContacts.error) {
            return <Placeholder text="Erro! Tente novamente" IconName="error" />;
          } else {
            if (this.props.allContacts.allContacts.length > 0) {
              return this.props.allContacts.allContacts.map((data, index) => {
                return (
                  <Card key={index}>
                    <CardContainer>
                      <CardLeft>
                        <Thumbnail
                          style={{ width: 48, height: 48 }}
                          source={
                            data.contactID[0].avatar != null
                              ? {
                                  uri: GET_AVATAR_URL(
                                    data.contactID[0].avatar.secret,
                                    "250x250",
                                    data.contactID[0].avatar.name
                                  )
                                }
                              : {
                                  uri: IMAGE_PLACEHOLDER
                                }
                          }
                        />
                      </CardLeft>
                      <CardBody>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#000"
                          }}
                        >
                          {data.contactID[0].name}
                        </Text>
                        <Text style={{ fontSize: 14, color: "#757575" }}>
                          {data.contactID[0].type == "MENTOR"
                            ? "Mentor"
                            : "Empreendedor"}
                        </Text>
                      </CardBody>
                      <CardRight>
                        <TouchableOpacity
                          onPress={() =>
                            this._goToChat(
                              data.contactID[0].id,
                              data.contactID[0].avatar
                            )
                          }
                        >
                          <MaterialIcons
                            name="send"
                            size={22}
                            color="#3F51B5"
                          />
                        </TouchableOpacity>
                      </CardRight>
                    </CardContainer>
                  </Card>
                );
              });
            } else {
              return <Placeholder text="Sem resultados!" IconName="error" />;
            }
          }
        }
      }
    };
    return (
      <Container>
        <Header>
          <SearchView>
            <IconBackView>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <MaterialIcons name="arrow-back" size={23} color="#757575" />
              </TouchableOpacity>
            </IconBackView>
            <ViewInput>
              <Input
                type="text"
                placeholder="Pesquisar contactos"
                value={this.state.search_value}
                onChangeText={text => {
                  this.handleChange();
                  this.setState({ search_value: text });
                }}
              />
            </ViewInput>
          </SearchView>
        </Header>
        <View style={{ flex: 1 }}>
          <GradientContainer>
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            >
              <ScrollView>{_renderContacts()}</ScrollView>
            </Content>
          </GradientContainer>
        </View>
      </Container>
    );
  }
}

export default compose(
  withApollo,
  withNavigation,
  graphql(ALL_CONTACTS_QUERY, {
    options: props => ({
      variables: { id: props.screenProps.userId }
    }),
    name: "allContacts"
  }),
  graphql(CREATE_CHAT_MUTATION, { name: "createChat" })
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

const IconBackView = styled.View`
  padding: 0px 5px 0px 0px;
`;

const ViewInput = styled.View`
  width: 80%;
`;
