import React from "react";
import { Container, Icon, Fab, View, Text } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
//GraphQL
import { graphql, compose, withApollo } from "react-apollo";
import { DISCUSSIONS_BY_CATEGORIES_QUERY } from "../../api/Queries/Discussions";
//Components
import CategoryGroup from "../../components/CategoryGroup";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";
import { Placeholder, Loading } from "../../components/index";
//Utils
import { IMAGE_PLACEHOLDER } from "../../constants/Utils";

class DiscussionsScreen extends React.Component {
  static navigationOptions = {
    title: "Discussões",
    headerRight: (
      <HeaderRightContainer>
        <HeaderRightElement>
          <MaterialIcons name="search" size={24} color="#ffffff" />
        </HeaderRightElement>
      </HeaderRightContainer>
    )
  };
  state = {
    avatar: IMAGE_PLACEHOLDER,
    userIdLogged: "cjbjhh0f9lbfz01142sd6tvuv"
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

  _goToAddDiscussion = () => {
    this.props.navigation.navigate("AddDiscussion");
  };

  render() {
    if (
      this.props.DiscussionsByCategories &&
      this.props.DiscussionsByCategories.loading
    ) {
      return <Loading />;
    }
    if (
      this.props.DiscussionsByCategories &&
      this.props.DiscussionsByCategories.error
    ) {
      return <Placeholder text="Erro! Tente novamente" IconName="error" />;
    }
    const { allCategories } = this.props.DiscussionsByCategories;
    return (
      <Container>
        <ScrollView>
          {Object.keys(allCategories).length > 0 ? (
            <View style={{ marginBottom: 15 }}>
              {allCategories.map(data => {
                return (
                  <CategoryGroup
                    goToDiscussion={this._goToDiscussion}
                    discussions={data.discussions}
                    idCategory={data.id}
                    nameCategory={data.title}
                    key={data.id}
                    avatar={this.state.avatar}
                    userIdLogged={this.state.userIdLogged}
                  />
                );
              })}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>Ainda não existem discussões.</Text>
            </View>
          )}
        </ScrollView>
        <Fab
          onPress={this._goToAddDiscussion}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#3F51B5" }}
          position="bottomRight"
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}

export default compose(
  withApollo,
  graphql(
    DISCUSSIONS_BY_CATEGORIES_QUERY,
    { name: "DiscussionsByCategories" },
    {
      options: () => ({
        variables: {
          id: null
        }
      })
    }
  )
)(DiscussionsScreen);

const ScrollView = styled.ScrollView`
  flex: 1;
  padding-top: 25px;
  background-color: #ffffff;
`;
