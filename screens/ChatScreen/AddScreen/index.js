import React from "react";
import { View, Text, Input, Thumbnail } from "native-base";
import styled from "styled-components/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import GradientContainer from "../../../components/GradientContainer";
import { ScrollView, TouchableOpacity } from "react-native";
import { Error, Loading } from "../../../components/index";
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
import { ALL_INDIVIDUAL_CHATS_OF_USERS } from "../../../api/Queries/Contacts";
import { CREATE_CHAT_MUTATION } from "../../../api/Mutations/Chat";
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
    searched: false
  };

  handleChange() {
    if (!this.state.typing) { // Só executa se nao estiver a escrever
      const self = this;
      this.setState({ // Confirma que está a escrever
        typing: true
      });
      clearInterval(timer); // Reinicia eventual timer anterior (porque voltou a escrever)
      const timer = setTimeout(function() {
        self.setState({ // Passado 5 segundos o user parou de escrever e executa a função (para nao fazer multiplos requests)
          typing: false
        });
        self._searchValue();
      }, 500);
    }
  }

  _searchValue() {
    if (!this.state.typing) { // Se não estiver a escrever
      if (this.state.search_value != "") { // Se o input não estiver vazio
        this._searchQuery(); // Faz o pedido
        this.setState({ // Ativa o loading
          loading: true
        });
      } else {
        this.setState({ // Se for vazio, não realiza o search (mostra todos os contactos)
          searched: false 
        });
      }
    }
  }

  _searchQuery = async () => {
    const res = await this.props.client.query({
      query: SEARCH_CONTACTS,
      variables: {
        id: "cjbjhh0f9lbfz01142sd6tvuv",
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
      if (this.state.typing || this.state.loading) { // Se estiver a escrever ou o loading do search ativo
        return <Loading />;
      } else { // Se não estiver a escrever nem loading
        if (this.state.searched) { // Se houver pesquisa mostra os dados da pesquisa
          if (this.state.searched_data.length > 0) {
            return this.state.searched_data.map((data, index) => {
              return (
                <Card key={index}>
                  <CardContainer>
                    <CardLeft>
                      <Thumbnail
                        style={{ width: 48, height: 48 }}
                        source={{
                          uri: data.contactID.avatar
                        }}
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
                        {data.contactID.name}
                      </Text>
                      <Text style={{ fontSize: 14, color: "#757575" }}>
                        {data.contactID.type == "MENTOR"
                          ? "Mentor"
                          : "Empreendedor"}
                      </Text>
                    </CardBody>
                    <CardRight>
                      <MaterialIcons name="message" size={22} color="#3F51B5" />
                    </CardRight>
                  </CardContainer>
                </Card>
              );
            });
          } else {
            return (
              <View>
                <Text>Sem resultados.</Text>
              </View>
            );
          }
        } else { // Se não houver pesquisa mostra os dados dos contactos todos
          if (this.props.allContacts && this.props.allContacts.loading) {
            return <Loading />;
          } else if (this.props.allContacts && this.props.allContacts.error) {
            return <Error />;
          } else {
            if (this.props.allContacts.allContacts.length > 0) {
              return this.props.allContacts.allContacts.map((data, index) => {
                return (
                  <Card key={index}>
                    <CardContainer>
                      <CardLeft>
                        <Thumbnail
                          style={{ width: 48, height: 48 }}
                          source={{
                            uri: data.contactID.avatar
                          }}
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
                          {data.contactID.name}
                        </Text>
                        <Text style={{ fontSize: 14, color: "#757575" }}>
                          {data.contactID.type == "MENTOR"
                            ? "Mentor"
                            : "Empreendedor"}
                        </Text>
                      </CardBody>
                      <CardRight>
                        <MaterialIcons
                          name="message"
                          size={22}
                          color="#3F51B5"
                        />
                      </CardRight>
                    </CardContainer>
                  </Card>
                );
              });
            } else {
              return (
                <View>
                  <Text>Sem resultados.</Text>
                </View>
              );
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
            <ScrollView>{_renderContacts()}</ScrollView>
          </GradientContainer>
        </View>
      </Container>
    );
  }
}

const ChatAddScreenWithData = compose(
  graphql(ALL_CONTACTS_QUERY, {
    options: props => ({
      variables: { id: "cjbjhh0f9lbfz01142sd6tvuv" }
    }),
    name: "allContacts"
  })
)(ChatAddScreen);
export default withApollo(ChatAddScreenWithData);

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
