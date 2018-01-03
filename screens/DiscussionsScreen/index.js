import React from "react";
import { Container, Icon, Fab, View, Text } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { graphql, compose } from "react-apollo";
import { DISCUSSIONS_BY_CATEGORIES_QUERY } from "../../api/Queries/Discussions";

//Components
import CategoryGroup from "../../components/CategoryGroup";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";
import { Error, Loading } from "../../components/index";

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
  _goToDiscussion = (id, title) => () => {
    this.props.navigation.navigate("DiscussionView", { id: id, title: title });
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
      return <Error />;
    }
    const { allCategories } = this.props.DiscussionsByCategories;
    if (allCategories.length > 0) {
      return (
        <Container>
          <ScrollView>
            <View style={{ marginBottom: 15 }}>
              {allCategories.map(data => {
                return (
                  <CategoryGroup
                    goToDiscussion={this._goToDiscussion}
                    discussions={data.discussions}
                    idCategory={data.id}
                    nameCategory={data.title}
                    key={data.id}
                  />
                );
              })}
            </View>
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
    } else {
      return (
        <Container>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Ainda não existem discussões.</Text>
          </View>
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
}

const DiscussionsScreenWithData = compose(
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

export default DiscussionsScreenWithData;

const ScrollView = styled.ScrollView`
  flex: 1;
  padding-top: 25px;
  background-color: #ffffff;
`;
