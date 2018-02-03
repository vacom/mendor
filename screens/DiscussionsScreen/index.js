import React from "react";
import { Container, Icon, Fab, View, Text, Content } from "native-base";
import { RefreshControl, TouchableOpacity } from "react-native";
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
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Discussões",
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.openSearch}>
              <MaterialIcons name="search" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };
  state = {
    avatar: IMAGE_PLACEHOLDER,
    userIdLogged: this.props.screenProps.userId,
    refreshing: false
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

  componentDidMount() {
    this.props.navigation.setParams({
      openSearch: this._goToSearch
    });
  }

  _goToSearch = () => {
    this.props.navigation.navigate("SearchDiscussion", {});
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    //gets new content from the DB
    this.props.DiscussionsByCategories.refetch();
    //clears the loading
    if (!this.props.DiscussionsByCategories.loading) {
      this.setState({ refreshing: false });
    }
  };

  _goToAddDiscussion = () => {
    233336;
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
      <Container style={{ backgroundColor: "#fff" }}>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {Object.keys(allCategories).length > 0 ? (
            <ScrollView>
              <View style={{ marginBottom: 15, backgroundColor: "#fff" }}>
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
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1
              }}
            >
              <Placeholder
                dark
                text="Ainda não foram criadas discussões!"
                IconName="clear-all"
              />
            </View>
          )}
        </Content>
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
