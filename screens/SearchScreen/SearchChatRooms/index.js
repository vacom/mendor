import React from "react";
import styled from "styled-components/native";
import { Error, Loading, Placeholder } from "../../../components/index";
import { withNavigation } from "react-navigation";
//GRAPHQL
import { graphql, compose, withApollo } from "react-apollo";
import { SEARCH_CONTACTS } from "../../../api/Queries/Contacts";

// Components
import { SearchCard } from "../../../components/SearchComponents";

class SearchChatRooms extends React.Component {
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
          console.log(data.contactID.avatar);
          return (
            <SearchCard
              key={index}
              users={data.users}
              send_avatar={true}
              avatar={data.contactID.avatar}
              name={data.contactID.name}
              type={data.contactID.type == "MENTOR" ? "Mentor" : "Empreendedor"}
              icon="send"
              onPress={this.props.onPress(
                data.contactID.id,
                data.contactID.avatar
              )}
            />
          );
        });
      } else {
        return <Placeholder text="Sem resultados!" IconName="error" />;
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
)(SearchChatRooms);
