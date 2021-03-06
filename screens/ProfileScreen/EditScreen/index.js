import React from "react";
import { TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Thumbnail } from "native-base";
import { ImagePicker } from "expo";
//Components
import {
  Text,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button
} from "native-base";
import { Row } from "react-native-easy-grid";
import styled from "styled-components/native";
import { LinearGradient } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";
import { Loading } from "../../../components/index";
//GraphQL
import { graphql, compose } from "react-apollo";
import {
  UPDATE_USER_PROFILE_MUTATION,
  UPDATE_USER_AVATAR_MUTATION
} from "../../../api/Mutations/User";
import { USER_PROFILE_QUERY } from "../../../api/Queries/User";
import { UPLOAD_PHOTO_FUNC } from "../../../api/Functions/Upload";
//Utils
import Toast from "react-native-root-toast";
import { guid, IMAGE_PLACEHOLDER } from "../../../constants/Utils";

class ProfileEditScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Editar Perfil",
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.updateProfile}>
              <MaterialIcons name="save" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };
  state = {
    userId: "",
    profileId: "",
    company: "",
    profession: "",
    role: "",
    about: "",
    location: "",
    loading: true,
    fileId: "",
    image: IMAGE_PLACEHOLDER
  };

  componentDidMount() {
    this._onGetUserProfile();
    this.props.navigation.setParams({
      updateProfile: this._onUpdateProfile
    });
  }
  _onGetUserProfile = () => {
    if (this.props.navigation.state.params.data === null) {
      this.setState({ loading: false });
      return;
    }
    const { data, userId, image } = this.props.navigation.state.params;
    const { company, profession, role, about, location, id: profileId } = data;
    this.setState({
      userId,
      company,
      profession,
      role,
      about,
      location,
      profileId,
      image,
      loading: false
    });
  };
  _onUpdateProfile = async () => {
    //@TODO needs tpo verify if the user has or not a profile if not needs to create one and not updated
    const {
      company,
      profession,
      role,
      about,
      location,
      profileId
    } = this.state;
    const { updateProfile, navigation } = this.props;
    //Checks if fields are empty
    if (!company || !profession || !role || !about || !location) {
      Toast.show("Os campos não podem estar vazios!");
      return;
    }
    try {
      //Updates the information of the user and executes the upload function for avatar
      await updateProfile({
        variables: {
          profileId,
          about,
          company,
          profession,
          role,
          location
        },
        update: async () => {
          try {
            //if the user only updates the information and not the avatar
            if (!this.state.fileId) {
              navigation.goBack();
              return;
            }
            //update user avatar
            this._onUpdateAvatar();
          } catch (e) {
            Toast.show("Erro! Verifique os campos.");
          }
        }
      });
    } catch (e) {
      Toast.show("Erro! Tente novamente.");
    }
  };
  _onUpdateAvatar = async () => {
    const { fileId, userId } = this.state;
    const { updateUserAvatar, navigation } = this.props;
    try {
      //Updates the user avatar and goes back
      await updateUserAvatar({
        variables: {
          userId,
          fileId
        },
        update: async () => {
          try {
            navigation.goBack();
          } catch (e) {
            Toast.show("Erro! Verifique os campos.");
          }
        }
      });
    } catch (e) {
      Toast.show("Erro! Tente novamente.");
    }
  };
  _onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      UPLOAD_PHOTO_FUNC(result.uri, guid()).then(file => {
        this.setState({
          fileId: file.id
        });
      });
    }
  };
  render() {
    return (
      <ScreenContainer>
        <LinearGradient colors={["#3f51b5", "#B39DDB"]}>
          <ContentContainer>
            <DashedContainer>
              <Row
                style={{
                  height: "auto",
                  backgroundColor: "transparent",
                  marginBottom: 15
                }}
              >
                {this.state.image && (
                  <Thumbnail
                    source={{ uri: this.state.image }}
                    style={{ width: 64, height: 64 }}
                  />
                )}
              </Row>
              <Row style={{ height: "auto", backgroundColor: "transparent" }}>
                <Button
                  onPress={this._onPickImage}
                  style={{ backgroundColor: "#3F51B5", borderRadius: 2 }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600"
                    }}
                  >
                    {"carregar".toUpperCase()}
                  </Text>
                </Button>
              </Row>
            </DashedContainer>
          </ContentContainer>
        </LinearGradient>
        <Container>
          {this.state.loading ? (
            <Loading dark />
          ) : (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
              <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Form style={{ paddingBottom: 60 }}>
                  <Item style={{ marginLeft: 0 }} floatingLabel>
                    <Label style={{ color: "#757575" }}>Empresa</Label>
                    <Input
                      value={this.state.company}
                      onChangeText={company => this.setState({ company })}
                    />
                  </Item>
                  <Item style={{ marginLeft: 0 }} floatingLabel>
                    <Label style={{ color: "#757575" }}>Profissão</Label>
                    <Input
                      value={this.state.profession}
                      onChangeText={profession => this.setState({ profession })}
                    />
                  </Item>
                  <Item style={{ marginLeft: 0 }} floatingLabel>
                    <Label style={{ color: "#757575" }}>Função</Label>
                    <Input
                      value={this.state.role}
                      onChangeText={role => this.setState({ role })}
                    />
                  </Item>
                  <Item style={{ marginLeft: 0 }} floatingLabel>
                    <Label style={{ color: "#757575" }}>Localização</Label>
                    <Input
                      value={this.state.location}
                      onChangeText={location => this.setState({ location })}
                    />
                  </Item>
                  <Item style={{ marginLeft: 0 }} floatingLabel>
                    <Label style={{ color: "#757575" }}>Sobre mim/Ideia</Label>
                    <Input
                      value={this.state.about}
                      onChangeText={about => this.setState({ about })}
                    />
                  </Item>
                </Form>
              </Content>
            </KeyboardAvoidingView>
          )}
        </Container>
      </ScreenContainer>
    );
  }
}

export default compose(
  graphql(UPDATE_USER_PROFILE_MUTATION, {
    name: "updateProfile",
    options: props => ({
      refetchQueries: [
        {
          query: USER_PROFILE_QUERY,
          variables: { id: props.navigation.state.params.userId }
        }
      ]
    })
  }),
  graphql(UPDATE_USER_AVATAR_MUTATION, {
    name: "updateUserAvatar",
    options: props => ({
      refetchQueries: [
        {
          query: USER_PROFILE_QUERY,
          variables: { id: props.navigation.state.params.userId }
        }
      ]
    })
  })
)(ProfileEditScreen);

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  margin: 30px;
`;

const DashedContainer = styled.View`
  padding: 30px;
  border: 1px dashed #ffffff;
  align-items: center;
  border-radius: 6px;
`;
