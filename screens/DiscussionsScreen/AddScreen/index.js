import React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient } from "expo";
import { Row } from "react-native-easy-grid";
import { ImagePicker } from "expo";
import styled from "styled-components/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { graphql, compose, withApollo } from "react-apollo";
import {
  Text,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Picker
} from "native-base";
//REQUESTS
import { CREATE_DISCUSSION_MUTATION } from "../../../api/Mutations/Discussions";
import { ALL_CATEGORIES_QUERY } from "../../../api/Queries/Discussions";
import {
  DISCUSSIONS_BY_CATEGORIES_QUERY,
  CATEGORY_QUERY
} from "../../../api/Queries/Discussions";

//COMPONENTS
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";
import { Error, Loading } from "../../../components/index";

class AddDiscussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "0",
      cover: null,
      description: "",
      title: "",
      userId: "cjbjhh0f9lbfz01142sd6tvuv"
    };
  }
  onPickerChange(value) {
    this.setState({
      categoryId: value
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Adicionar discussão",
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <TouchableOpacity
              onPress={() => {
                params.submitDiscussion();
              }}
            >
              <MaterialIcons name="check" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      submitDiscussion: this.submitDiscussion
    });
  }

  submitDiscussion = () => {
    const { title, description, categoryId, cover } = this.state;
    if (!title || !description || categoryId == 0) {
      Toast.show("Todos os campos são obrigatórios!");
      return;
    } else {
      if (!cover) {
        Alert.alert(
          "Imagem de fundo não definida",
          "Tem a certeza que deseja criar uma nova discussão sem imagem de fundo definida?",
          [
            {
              text: "Cancelar",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "Sim",
              onPress: () => {
                this.setState({
                  cover: "https://i.ytimg.com/vi/YmIlsUKEjaA/maxresdefault.jpg"
                });
                this._submitMutation();
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        this._submitMutation();
      }
    }
  };

  _submitMutation = async () => {
    const { title, description, categoryId, cover, userId } = this.state;
    try {
      await this.props.createDiscussion({
        variables: {
          title,
          description,
          categoryId,
          cover,
          userId
        },
        update: (proxy, { data: { createDiscussion } }) => {
          const data = proxy.readQuery({
            query: DISCUSSIONS_BY_CATEGORIES_QUERY,
            variables: { id: null }
          });
          data.allCategories.unshift({
            id: categoryId,
            title: "Adicionadas recentemente",
            __typename: "Category",
            discussions: [createDiscussion]
          });
          proxy.writeQuery({
            query: DISCUSSIONS_BY_CATEGORIES_QUERY,
            data,
            variables: { id: null }
          });
        }
      });
      Toast.show("Discussão inserida com sucesso");
      this.props.navigation.goBack();
    } catch (e) {
      console.log(e);
      Toast.show("Ocorreu um erro a inserir a discussão");
    }
  };
  render() {
    if (this.props.Categories && this.props.Categories.loading) {
      return <Loading />;
    } else if (this.props.Categories && this.props.Categories.error) {
      return <Error />;
    } else {
      let { cover } = this.state;
      const resizeMode = "cover";
      return (
        <ScreenContainer>
          <LinearGradient colors={["#3f51b5", "#B39DDB"]}>
            <ContentContainer>
              <DashedContainer>
                {cover != null && (
                  <Background>
                    <Image
                      style={{
                        flex: 1,
                        borderRadius: 3,
                        resizeMode
                      }}
                      source={{ uri: cover }}
                    />
                  </Background>
                )}
                <View style={{ padding: 30, alignItems: 'center' }}>
                  <Row
                    style={{ height: "auto", backgroundColor: "transparent" }}
                  >
                    <MaterialIcons
                      name="file-upload"
                      size={42}
                      color="#ffffff"
                    />
                  </Row>
                  <Row
                    style={{
                      height: "auto",
                      marginBottom: 15,
                      marginTop: 6,
                      backgroundColor: "transparent"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "400",
                        color: "#fff"
                      }}
                    >
                      Carregar imagem de fundo
                    </Text>
                  </Row>
                  <Row
                    style={{ height: "auto", backgroundColor: "transparent" }}
                  >
                    <Button
                      style={{ backgroundColor: "#3F51B5", borderRadius: 2 }}
                      onPress={this._pickImage}
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
                </View>
              </DashedContainer>
            </ContentContainer>
          </LinearGradient>
          <Container>
            {this.state.loading ? (
              <Loading dark />
            ) : (
              <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Form style={{ paddingBottom: 60 }}>
                  <Item style={{ marginLeft: 0 }} floatingLabel>
                    <Label style={{ color: "#757575" }}>Título</Label>
                    <Input
                      onChangeText={title => this.setState({ title })}
                      value={this.state.title}
                    />
                  </Item>
                  <Item style={{ marginLeft: 0 }} floatingLabel>
                    <Label style={{ color: "#757575" }}>Descrição</Label>
                    <Input
                      multiline={true}
                      numberOfLines={6}
                      value={this.state.description}
                      onChangeText={description =>
                        this.setState({ description })
                      }
                    />
                  </Item>
                  <StyledPickerView>
                    <Picker
                      style={{ color: "#6B6A6F" }}
                      mode="dropdown"
                      onValueChange={this.onPickerChange.bind(this)}
                      selectedValue={this.state.categoryId}
                    >
                      <Item
                        style={{ fontSize: 20, margin: 0 }}
                        label="Categoria"
                        value="0"
                      />
                      {this.props.Categories.allCategories.map(data => {
                        return (
                          <Item
                            style={{ fontSize: 20 }}
                            label={data.title}
                            value={data.id}
                            key={data.id}
                          />
                        );
                      })}
                    </Picker>
                  </StyledPickerView>
                </Form>
              </Content>
            )}
          </Container>
        </ScreenContainer>
      );
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ cover: result.uri });
    }
  };
}

const AddDiscussionWithData = compose(
  graphql(ALL_CATEGORIES_QUERY, {
    name: "Categories"
  }),
  graphql(CREATE_DISCUSSION_MUTATION, { name: "createDiscussion" })
)(AddDiscussion);

export default withApollo(AddDiscussionWithData);

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  margin: 30px;
`;

const DashedContainer = styled.View`
  padding: 0;
  border: 1px dashed #ffffff;
  align-items: center;
  border-radius: 6px;
`;
const StyledPickerView = styled.View`
  padding: 0;
  margin: 30px 0;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #dedde3;
`;

const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
