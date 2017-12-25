import React from "react";
import { Image, View, Text } from "react-native";
import { ImagePicker } from "expo";
import styled from "styled-components/native";
import { Form, Item, Input, Label, Button, Picker } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../../components/HeaderRight";

class AddDiscussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected3: "key3",
      image:
        "http://4globetrotters.world/wp-content/uploads/2015/08/Light-Grey-Background.jpg"
    };
  }
  onValueChange3(value) {
    this.setState({
      selected3: value
    });
  }

  static navigationOptions = {
    title: "Adicionar discussão",
    headerRight: (
      <HeaderRightContainer>
        <HeaderRightElement>
          <MaterialIcons name="check" size={24} color="#ffffff" />
        </HeaderRightElement>
      </HeaderRightContainer>
    )
  };

  render() {
    let { image } = this.state;
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
              source={{ uri: this.state.image }}
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
              <Input placeholder="Título" />
            </Item>
            <Item>
              <Input
                multiline={true}
                numberOfLines={8}
                placeholder="Descrição"
              />
            </Item>
            <StyledPickerView>
              <Picker
                style={{ color: "#6B6A6F" }}
                mode="dropdown"
                onValueChange={this.onValueChange3.bind(this)}
              >
                <Item
                  style={{ fontSize: 20, backgroundColor: "red" }}
                  label="Categoria"
                  value="key0"
                />
                <Item style={{ fontSize: 20 }} label="Categoria" value="key1" />
                <Item style={{ fontSize: 20 }} label="Categoria" value="key2" />
                <Item style={{ fontSize: 20 }} label="Categoria" value="key3" />
                <Item style={{ fontSize: 20 }} label="Categoria" value="key4" />
              </Picker>
            </StyledPickerView>
          </Form>
        </View>
      </View>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

export default AddDiscussion;

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
