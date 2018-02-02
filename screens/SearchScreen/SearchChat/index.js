import React from "react";
import styled from "styled-components/native";
import { Error, Loading, Placeholder } from "../../../components/index";
import { withNavigation } from "react-navigation";
//GRAPHQL
import { graphql, compose, withApollo } from "react-apollo";
import { SEARCH_CHAT_QUERY } from "../../../api/Queries/Chat";

// Components
import { SearchCard } from "../../../components/SearchComponents";

class SearchChat extends React.Component {
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
    if (this.props.typing || this.props.Chats.loading) {
      // Se estiver a escrever ou o loading do search ativo
      return <Loading />;
    } else {
      console.log(this.props.Chats);
      // Se não estiver a escrever nem loading
      if (Object.keys(this.props.Chats.allChats).length > 0) {
        return this.props.Chats.allChats.map((data, index) => {
          return (
            <SearchCard
              typeSearch="search"
              key={index}
              users={data.users}
              data={data}
              message={data}
              onPress={this.props.onPress(data.id, data.users)}
              userId={this.props.userId}
            />
          );
        });
      } else {
        return <Placeholder text="Sem resultados!" IconName="speaker-notes-off" />;
      }
    }
  }
}

export default compose(
  withApollo,
  withNavigation,
  graphql(SEARCH_CHAT_QUERY, {
    options: props => ({
      variables: {
        id: props.userId,
        query: props.search_value
      }
    }),
    name: "Chats"
  })
)(SearchChat);
