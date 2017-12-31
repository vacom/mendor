import React from "react";
import { Container, Icon, Fab, Text, View } from "native-base";
import styled from "styled-components/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { graphql, compose, withApollo } from "react-apollo";
import { DISCUSSIONS_BY_CATEGORIES_QUERY } from "../../api/Queries/Discussions";

//Components
import CategoryGroup from "../../components/CategoryGroup";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";

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

  componentDidMount() {
    this._getDiscussions();
  }
  _getDiscussions = async () => {
    const res = await this.props.client.query({
      query: DISCUSSIONS_BY_CATEGORIES_QUERY
    });
  };
  render() {
    const { navigate } = this.props.navigation;


    const _goToDiscussion = (id, title) => () => {
      navigate("DiscussionView", { id: id, title: title });
    };

    const _goToAddDiscussion = () => {
      navigate("AddDiscussion");
    };

    if (this.props.data.loading) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    } else {
      return (
        <Container>
          <ScrollView>
            {this.props.data.allCategories.map((data, index) => {
              return (
                <CategoryGroup
                  goToDiscussion={_goToDiscussion}
                  discussions={data.discussions}
                  idCategory={data.id}
                  nameCategory={data.title}
                  key={data.id}
                />
              );
            })}
          </ScrollView>
          <Fab
            onPress={_goToAddDiscussion}
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
  graphql(DISCUSSIONS_BY_CATEGORIES_QUERY)
)(DiscussionsScreen);

export default withApollo(DiscussionsScreenWithData);

const ScrollView = styled.ScrollView`
  flex: 1;
  padding-top: 25px;
  background-color: #ffffff;
`;
