import React from "react";
import styled from "styled-components/native";
import { Error, Loading, Placeholder } from "../../../components/index";
import { withNavigation } from "react-navigation";
import { View, Text } from "react-native";
//GRAPHQL
import { graphql, compose, withApollo } from "react-apollo";
import { SEARCH_DISCUSSIONS_BY_CATEGORIES } from "../../../api/Queries/Discussions";

// Components
import { SearchCard } from "../../../components/SearchComponents";
import CategoryGroup from "../../../components/CategoryGroup";
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";

class SearchDiscussions extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    search_value: this.props.search_value,
    typing: this.props.typing,
    loading: this.props.loading,
    searched: this.props.searched
  };

  _goToDiscussion = (
    id,
    title,
    avatar = IMAGE_PLACEHOLDER,
    userIdLogged
  ) => () => {
    this.props.navigation.navigate("DiscussionView", {
      id: id,
      title: title,
      avatar: avatar,
      userIdLogged: userIdLogged
    });
  };

  render() {
    if (this.props.typing || this.props.Discussions.loading) {
      // Se estiver a escrever ou o loading do search ativo
      return <Loading />;
    } else {
      // Se não estiver a escrever nem loading
      if (Object.keys(this.props.Discussions.allCategories).length > 0) {
        return (
          <View style={{ marginBottom: 15 }}>
            {this.props.Discussions.allCategories.map((data, key) => {
              return (
                <CategoryGroup
                  goToDiscussion={this._goToDiscussion}
                  discussions={data.discussions}
                  idCategory={data.id}
                  nameCategory={data.title}
                  key={key}
                  avatar={this.state.avatar}
                  userIdLogged={this.props.userId}
                />
              );
            })}
          </View>
        );
      } else {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>Ainda não existem discussões.</Text>
          </View>
        );
      }
    }
  }
}

export default compose(
  withApollo,
  withNavigation,
  graphql(SEARCH_DISCUSSIONS_BY_CATEGORIES, {
    options: props => ({
      variables: {
        id: null,
        query: props.search_value
      }
    }),
    name: "Discussions"
  })
)(SearchDiscussions);
