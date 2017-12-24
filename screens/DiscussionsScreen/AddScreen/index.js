import React from "react";
import { Image, View, Text } from "react-native";
import { ImagePicker } from "expo";
import styled from "styled-components/native";
import { Form, Item, Input, Label, Button } from "native-base";

class AddDiscussion extends React.Component {
  static navigationOptions = {
    title: "Adicionar discussão"
  };

  state = {
    image:
      "http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg"
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
        <View style={{ flex: 0.7 }}>
          <Form>
            <Item>
              <Input placeholder="Título" />
            </Item>
            <Item>
              <Input multiline={true} numberOfLines={8} placeholder="Título" />
            </Item>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
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
  font-weight: 600;
  margin-bottom: 10px;
`;
