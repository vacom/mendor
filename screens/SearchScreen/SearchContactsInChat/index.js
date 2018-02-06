import React from "react";
import { Loading, Placeholder } from "../../../components/index";
import { withNavigation } from "react-navigation";
import { Thumbnail, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
//GRAPHQL
import { graphql, compose, withApollo } from "react-apollo";
import { SEARCH_CONTACTS_TO_ADD } from "../../../api/Queries/Chat";
// Components
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";
import {
  Card,
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../../components/Card";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";

class SearchContactsInChat extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    search_value: this.props.search_value,
    typing: this.props.typing,
    loading: this.props.loading,
    searched: this.props.searched
  };

  render() {
    if (this.props.typing || this.props.Contacts.loading) {
      // Se estiver a escrever ou o loading do search ativo
      return <Loading />;
    } else {
      // Se não estiver a escrever nem loading
      if (
        this.props.Contacts.allContacts &&
        Object.keys(this.props.Contacts.allContacts).length > 0
      ) {
        // IF USER HAS CONTACTS
        return this.props.Contacts.allContacts.map((data, index) => {
          return (
            <Card key={index}>
              <CardContainer>
                <CardLeft>
                  <Thumbnail
                    style={{ width: 48, height: 48 }}
                    source={
                      data.contactID.avatar != null
                        ? {
                            uri: GET_AVATAR_URL(
                              data.contactID.avatar.secret,
                              "250x250",
                              data.contactID.avatar.name
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
                    {data.contactID.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#757575" }}>
                    {`${data.contactID.profile.role} na ${
                      data.contactID.profile.company
                    }`}
                  </Text>
                </CardBody>
                <CardRight>
                  <TouchableOpacity
                    onPress={this.props.updateChat(
                      data.contactID.id,
                      data.contactID.name
                    )}
                  >
                    <MaterialIcons name="add" size={22} color="#3F51B5" />
                  </TouchableOpacity>
                </CardRight>
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
  graphql(SEARCH_CONTACTS_TO_ADD, {
    options: props => ({
      variables: {
        id_user: props.userId,
        query: props.search_value,
        id_chat: props.id_chat
      }
    }),
    name: "Contacts"
  })
)(SearchContactsInChat);
