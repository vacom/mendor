import React from "react";
import styled from "styled-components/native";
import { Error, Loading, Placeholder } from "../../../components/index";
import { withNavigation } from "react-navigation";
import { Thumbnail, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

//GRAPHQL
import { graphql, compose, withApollo } from "react-apollo";
import { SEARCH_USERS } from "../../../api/Queries/Discover";
// Components
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";
import { SearchCard } from "../../../components/SearchComponents";
import {
  Card,
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../../components/Card";
import { GET_AVATAR_URL } from "../../../api/Functions/Upload";

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
                    {data.profile ?`${data.profile.role} na ${data.profile.company}`: "Sem informação"}
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
  graphql(SEARCH_USERS, {
    options: props => ({
      variables: {
        id: props.userId,
        query: props.search_value
      }
    }),
    name: "Users"
  })
)(SearchDiscover);