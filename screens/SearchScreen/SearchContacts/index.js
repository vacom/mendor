import React from "react";
import { Loading, Placeholder } from "../../../components/index";
import { withNavigation } from "react-navigation";
import { Thumbnail, Text } from "native-base";

//GRAPHQL
import { graphql, compose, withApollo } from "react-apollo";
import { SEARCH_CONTACTS } from "../../../api/Queries/Contacts";
// Components
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";
import {
  Card,
  CardContainer,
  CardLeft,
  CardBody
} from "../../../components/Card";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";

class SearchContacts extends React.Component {
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
      if (Object.keys(this.props.Contacts.allContacts).length > 0) {
        return this.props.Contacts.allContacts.map((data, index) => {
          return (
            <Card
              key={index}
              onPress={() => this.props.onPress(data.contactID.id)}
            >
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
  graphql(SEARCH_CONTACTS, {
    options: props => ({
      variables: {
        id: props.userId,
        query: props.search_value
      }
    }),
    name: "Contacts"
  })
)(SearchContacts);
