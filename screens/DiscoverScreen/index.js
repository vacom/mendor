import React from "react";
import { TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { Location, Permissions } from "expo";
import { Thumbnail } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
//Components
import GradientContainer from "../../components/GradientContainer";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";

import { Loading, Placeholder } from "../../components/index";
//GraphQL
import { withApollo, compose, graphql } from "react-apollo";
import { BASIC_USER_QUERY } from "../../api/Queries/User";
import { UPDATE_USER_COORDINATES_MUTATION } from "../../api/Mutations/User";
import { GET_AVATAR_URL } from "../../api/Functions/Upload";
//Utils
import { IMAGE_PLACEHOLDER } from "../../constants/Utils";
import Toast from "react-native-root-toast";
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
            <TouchableOpacity onPress={params.goToSearch}>
              <MaterialIcons name="search" size={24} color="#ffffff" />
            </TouchableOpacity>
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
    profileId: "",
    loading: true,
    error: false,
    msg: "Erro! Tente novamente",
    location: null,
    contactsIds: [],
    competencesIds: [],
    distance: 20,
    type: "MENTOR",
    interests: "COMMON",
    refreshing: false
  };
  componentDidMount() {
    this._getBasicUserInfo();
  }
  _goToProfile = () => {
    this.props.navigation.navigate("Profile", { id: this.state.userId });
  };
  _goToSearch = () => {
    this.props.navigation.navigate("SearchDiscover");
  };
  _onRefresh = () => {
    this.setState({ refreshing: true });
    //gets new content from the DB
    this._getBasicUserInfo();
  };
  _getBasicUserInfo = async () => {
    //Gets the user basic information from the DB
    const res = await this.props.client.query({ query: BASIC_USER_QUERY });
    if (!res.loading) {
      const {
        avatar,
        profile,
        contacts,
        competences,
        configuration
      } = res.data.user;
      const { distance, interests, type } = configuration;
      //Sets the navigation params to navigate to profile
      this.props.navigation.setParams({
        goToProfile: this._goToProfile,
        goToSearch: this._goToSearch,
        avatar:
          avatar != null
            ? GET_AVATAR_URL(avatar.secret, "250x250", avatar.name)
            : IMAGE_PLACEHOLDER
      });
      //Updates the state with the user and profile ID
      this.setState({
        userId: res.data.user.id,
        profileId: profile.id,
        distance,
        type,
        interests
      });
      //Groups all of his contacts
      if (this._onGroupIds(contacts, "contactsIds")) {
        //Groups all of his competences
        if (this._onGroupIds(competences, "competencesIds")) {
          //Gets the user current location;
          this._getUserLocation();
        }
      }
    } else {
      //If a something wrong shows the error
      this.setState({
        loading: false,
        error: true,
        refreshing: false
      });
    }
  };
  _getUserLocation = async () => {
    try {
      const { profileId } = this.state;
      //Gets the user permission to access is location
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          error: true,
          msg: "Precisa ativar o serviço de localização para continuar."
        });
      }

      //Check if the locations services are enabled
      let LocationProvider = await Location.getProviderStatusAsync();
      //let the user know
      if (!LocationProvider.locationServicesEnabled) {
        this.setState({
          error: true,
          msg: "Por favor, ative sua localização."
        });
        return;
      }

      //get the current location position
      let location = await Location.getCurrentPositionAsync({});

      if (Object.keys(location).length <= 0) {
        this.setState({
          error: true,
          msg: "Não foi possivel recolher a sua localização."
        });
        return;
      }

      //Saves the location and stops the loading state
      this.setState({
        location: location.coords,
        loading: false,
        error: false,
        refreshing: false
      });
      //Updates the user location on the DB
      this._onUpdateUserCoords(profileId, location.coords);
    } catch (e) {
      Toast.show(e);
    }
  };

  _onUpdateUserCoords = async (profileId, coordinates, distance) => {
    try {
      const { updateUserCoords } = this.props;
      //updates the user location
      await updateUserCoords({
        variables: {
          profileId,
          coordinates,
          distance
        },
        update: async () => {
          try {
            console.log("Guardou localização");
          } catch (e) {
            Toast.show("Erro! Em encontrar a sua localização.");
          }
        }
      });
    } catch (e) {
      Toast.show(e);
    }
  };
  _onGroupIds = (object, type) => {
    const data = [];
    //grupos all of the ids of user contacts and their interests
    object.map(res => {
      data.push(type === "competencesIds" ? res.interest.id : res.contactID.id);
    });
    this.setState({
      [type]: data
    });
    return true;
  };
  render() {
    const {
      userId,
      type,
      location,
      contactsIds,
      competencesIds,
      distance,
      interests,
      refreshing,
      msg
    } = this.state;
    return (
      <GradientContainer>
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor="white"
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {this.state.error ? (
            <Placeholder text={msg} IconName="error" />
          ) : this.state.loading ? (
            <Loading text="A obter a sua localização..." />
          ) : (
            <Cards
              userId={userId}
              type={type}
              userLocation={location}
              contactsIds={contactsIds}
              competencesIds={competencesIds}
              distance={distance}
              interests={interests}
              refresh={refreshing}
            />
          )}
        </ScrollView>
      </GradientContainer>
    );
  }
}

export default compose(
  withApollo,
  graphql(UPDATE_USER_COORDINATES_MUTATION, { name: "updateUserCoords" })
)(DiscoverScreen);
