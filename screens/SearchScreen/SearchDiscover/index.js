import React from "react";
import { withNavigation } from "react-navigation";
// Components
import { MaterialIcons } from "@expo/vector-icons";
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";
import {
  Card,
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../../components/Card";
import { Thumbnail, Text, Button } from "native-base";
import { Loading, Placeholder } from "../../../components/index";
//GRAPHQL
import { graphql, compose, withApollo } from "react-apollo";
import { SEARCH_USERS } from "../../../api/Queries/Discover";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";
import { CREATE_NOTIFICATION_MUTATION } from "../../../api/Mutations/Notification";
//Utils
import Toast from "react-native-root-toast";

class SearchDiscover extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    search_value: this.props.search_value,
    typing: this.props.typing,
    loading: this.props.loading,
    searched: this.props.searched
  };
  _onConnectUser = async userId => {
    const type = "REQUEST";
    const { userId: userRequestId, createNotification } = this.props;
    try {
      //Creates a new notification of type request
      await createNotification({
        variables: {
          userId,
          type,
          userRequestId
        },
        update: async () => {
          try {
            Toast.show("Pedido Enviado.");
          } catch (e) {
            Toast.show("Erro! Verifique os campos.");
          }
        }
      });
    } catch (e) {
      Toast.show("Erro! Tente novamente.");
    }
  };
  render() {
    if (this.props.typing || this.props.Users.loading) {
      // Se estiver a escrever ou o loading do search ativo
      return <Loading />;
    } else {
      // Se não estiver a escrever nem loading
      if (Object.keys(this.props.Users.allUsers).length > 0) {
        return this.props.Users.allUsers.map((data, index) => {
          return (
            <Card key={index} onPress={() => this.props.onPress(data.id)}>
              <CardContainer>
                <CardLeft>
                  <Thumbnail
                    style={{ width: 48, height: 48 }}
                    source={
                      data.avatar != null
                        ? {
                            uri: GET_AVATAR_URL(
                              data.avatar.secret,
                              "250x250",
                              data.avatar.name
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
                    {data.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#757575" }}>
                    {data.profile
                      ? `${data.profile.role} na ${data.profile.company}`
                      : "Sem informação"}
                  </Text>
                </CardBody>
                {this.props.contactsIds.indexOf(data.id) === -1 ? (
                  <CardRight>
                    <Button
                      onPress={() => this._onConnectUser(data.id)}
                      small
                      style={{
                        backgroundColor: "#3F51B5",
                        borderRadius: 2
                      }}
                    >
                      <Text
                        style={{
                          lineHeight: 12,
                          fontSize: 12,
                          fontWeight: "600"
                        }}
                      >
                        {"Conectar".toUpperCase()}
                      </Text>
                    </Button>
                  </CardRight>
                ) : (
                  <MaterialIcons
                    name="contacts"
                    size={24}
                    color="#3F51B5"
                    style={{ marginTop: 16, marginRight: 5 }}
                  />
                )}
              </CardContainer>
            </Card>
          );
        });
      } else {
        return <Placeholder text="Sem resultados!" IconName="person" />;
      }
    }
  }
}

export default compose(
  withApollo,
  withNavigation,
  graphql(SEARCH_USERS, {
    options: props => ({
      variables: {
        id: props.userId,
        query: props.search_value
      }
    }),
    name: "Users"
  }),
  graphql(CREATE_NOTIFICATION_MUTATION, { name: "createNotification" })
)(SearchDiscover);
