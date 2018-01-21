import React from "react";
import { TouchableOpacity } from "react-native";
import { Thumbnail } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
//Components
import GradientContainer from "../../components/GradientContainer";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";

import { Loading, Placeholder, Error } from "../../components/index";
//GraphQL
import { withApollo } from "react-apollo";
import {
  BASIC_USER_QUERY,
  ALL_USERS_DISCOVERY_QUERY
} from "../../api/Queries/User";
import { GET_AVATAR_URL } from "../../api/Functions/Upload";
//Utils
import { IMAGE_PLACEHOLDER } from "../../constants/Utils";
//import Toast from "react-native-root-toast";
//Containers
import Cards from "./CardsScreen.js";

class DiscoverScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Descobrir",
      headerStyle: {
        elevation: 0
      },
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <MaterialIcons name="search" size={24} color="#ffffff" />
          </HeaderRightElement>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.goToProfile}>
              <Thumbnail
                style={{ width: 24, height: 24 }}
                source={{
                  uri: params.avatar
                }}
              />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };

  state = {
    userId: "",
    type: "MENTOR",
    location: "aveiro",
    data: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    this._getBasicUserInfo();
    this._onLoadDiscovery();
  }

  _goToProfile = () => {
    this.props.navigation.navigate("Profile", { id: this.state.userId });
  };
  _getBasicUserInfo = async () => {
    const res = await this.props.client.query({ query: BASIC_USER_QUERY });
    if (!res.loading) {
      const { avatar } = res.data.user;

      console.log(GET_AVATAR_URL(avatar.secret, "250x250", avatar.name));

      this.props.navigation.setParams({
        goToProfile: this._goToProfile,
        avatar:
          GET_AVATAR_URL(avatar.secret, "250x250", avatar.name) ||
          IMAGE_PLACEHOLDER
      });
      this.setState({
        userId: res.data.user.id
      });
    }
  };
  _onLoadDiscovery = async () => {
    const { userId, type, location } = this.state;

    const res = await this.props.client.query({
      query: ALL_USERS_DISCOVERY_QUERY,
      variables: { userId, type, location }
    });
    //error handling
    if (res.error) {
      this.setState({
        error: true
      });
      return;
    }
    //if stops loading the data from DB
    if (!res.loading) {
      this.setState({
        data: res.data.allUsers,
        loading: false
      });
      return;
    }
  };

  render() {
    return (
      <Container>
        <GradientContainer>
          {this.state.error ? (
            <Error />
          ) : this.state.loading ? (
            <Loading text="A procurar pessoas..." />
          ) : Object.keys(this.state.data) <= 0 ? (
            <Placeholder IconName="people" text="Não há ninguém perto de si." />
          ) : (
            <Cards data={this.state.data} />
          )}
        </GradientContainer>
      </Container>
    );
  }
}

export default withApollo(DiscoverScreen);

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
