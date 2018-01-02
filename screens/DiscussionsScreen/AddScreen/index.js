import React from "react";
import { Image, View, Text, TouchableOpacity, Alert } from "react-native";
import { ImagePicker } from "expo";
import styled from "styled-components/native";
import { Form, Item, Input, Label, Button, Picker } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { graphql, compose, withApollo } from "react-apollo";

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
      default_image:
        "http://4globetrotters.world/wp-content/uploads/2015/08/Light-Grey-Background.jpg",
      categoryId: "0",
      cover:
        "http://4globetrotters.world/wp-content/uploads/2015/08/Light-Grey-Background.jpg",
      description: "",
      title: "",
      authorId: "cjbjhh0f9lbfz01142sd6tvuv"
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
    const { title, description, categoryId, cover, default_image } = this.state;
    if (!title || !description || categoryId == 0) {
      Toast.show("Todos os campos são obrigatórios!");
      return;
    } else {
      if (cover == default_image) {
        Alert.alert(
          "Imagem de fundo não definida",
          "Tem a certeza que deseja criar uma nova discussão sem imagem de fundo definida?",
          [
            {
              text: "Cancelar",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Sim", onPress: () => this._submitMutation() }
          ],
          { cancelable: false }
        );
      }
    }
  };

  _submitMutation = async () => {
    const { title, description, categoryId, cover, authorId } = this.state;
    try {
      console.log(this.props.DiscussionsByCategories);
      await this.props.createDiscussion({
        variables: {
          title,
          description,
          categoryId,
          cover,
          authorId
        }
        /*update: (proxy, { data: { createDiscussion } }) => {
          const data = proxy.readQuery({
            query: DISCUSSIONS_BY_CATEGORIES_QUERY,
            variables: { id: null }
          });
          data.allCategories.push({
            id: categoryId,
            title: "troll",
            __typename: "Category",
            discussions: [createDiscussion]
          });
          console.log(data)
          proxy.writeQuery({ query: DISCUSSIONS_BY_CATEGORIES_QUERY, data });
        }*/
      });
      Toast.show("Discussão inserida com sucesso");
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
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.3 }}>
            <Background>
              <Image
                style={{
                  flex: 1,
                  resizeMode
                }}
                source={{ uri: this.state.cover }}
              />
            </Background>

            <Content>
              <StyledText>Carregar imagem de fundo</StyledText>
              <Button
                onPress={this._pickImage}
                style={{
                  backgroundColor: "#3F51B5",
                  borderRadius: 2,
                  alignSelf: "center",
                  padding: 15
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "600"
                  }}
                >
                  {"carregar".toUpperCase()}
                </Text>
              </Button>
            </Content>
          </View>
          <View style={{ flex: 0.7, marginTop: 10 }}>
            <Form>
              <Item>
                <Input
                  placeholder="Título"
                  onChangeText={title => this.setState({ title })}
                />
              </Item>
              <Item>
                <Input
                  multiline={true}
                  numberOfLines={8}
                  placeholder="Descrição"
                  onChangeText={description => this.setState({ description })}
                />
              </Item>
              <StyledPickerView>
                <Picker
                  style={{ color: "#6B6A6F" }}
                  mode="dropdown"
                  onValueChange={this.onPickerChange.bind(this)}
                  selectedValue={this.state.categoryId}
                >
                  <Item style={{ fontSize: 20 }} label="Categoria" value="0" />
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
          </View>
        </View>
      );
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ cover: result.uri });
    }
  };
}

const AddDiscussionWithData = compose(
  graphql(ALL_CATEGORIES_QUERY, {
    name: "Categories"
  }),
  graphql(
    CREATE_DISCUSSION_MUTATION,
    { name: "createDiscussion" },
    {
      options: state => {
        refetchQueries: [
          {
            query: DISCUSSIONS_BY_CATEGORIES_QUERY,
            variables: {id:state.categoryId}
          }
        ];
      }
    }
  )
)(AddDiscussion);

export default withApollo(AddDiscussionWithData);

const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

const StyledPickerView = styled.View`
  padding: 10px 5px 0px 0px;
  margin: 30px 0px 0px 15px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #dedde3;
`;
