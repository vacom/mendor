import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { compose, withApollo } from "react-apollo";
import { BASIC_USER_QUERY } from "../api/Queries/User";
import { GET_AVATAR_URL } from "../api/Functions/Upload";
import { IMAGE_PLACEHOLDER } from "../constants/Utils";

class InputMessageBar extends React.Component {
  constructor(props) {
    super(props);
    this._addMessage = this._addMessage.bind(this);
    this._openShareCards = this._openShareCards.bind(this);
    this.state = {
      avatar: IMAGE_PLACEHOLDER
    };
  }

  _addMessage() {
    if (this.state.text && this.state.text != "")
      this.props.addMessage(this.state.text);
    this.setState({
      text: ""
    });
  }

  _openShareCards() {
    this.props.openShareCards();
  }

  componentDidMount() {
    const userLoggedData = this.props.client.readQuery({
      query: BASIC_USER_QUERY
    });
    let avatarData = userLoggedData.user.avatar;
    let avatar =
      avatarData != null
        ? GET_AVATAR_URL(avatarData.secret, "250x250", avatarData.name)
        : IMAGE_PLACEHOLDER;
    this.setState({
      avatar: avatar
    });
  }
  render() {
    return (
      <Message>
        <ViewAvatar>
          <TouchableOpacity
            onPress={() => this.props.goToProfile(this.props.userIdLogged)}
          >
            <Avatar
              source={{
                uri: this.state.avatar
              }}
            />
          </TouchableOpacity>
        </ViewAvatar>
        <ViewInput>
          <InputMessage
            value={this.state.text}
            multiline={true}
            underlineColorAndroid="transparent"
            borderWidth="0"
            placeholder="Escrever uma mensagem..."
            onChangeText={text => {
              this.setState({ text });
            }}
            ref="input"
          />
        </ViewInput>
        {this.props.share_cards && (
          <TouchableOpacity onPress={this._openShareCards}>
            <MaterialIcons
              name={this.props.icon}
              size={23}
              color="#6A6A6A"
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={this._addMessage}>
          <Icon name="send" style={{ color: "#3F51B5", fontSize: 25 }} />
        </TouchableOpacity>
      </Message>
    );
  }
}

export default compose(withApollo)(InputMessageBar);

const Message = styled.View`
  background: #fff;
  width: 100%;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Avatar = styled.Image`
  border-radius: 50px;
  width: 45px;
  height: 45px;
`;

const ViewAvatar = styled.View`
  padding-right: 15px;
  justify-content: center;
`;
const ViewInput = styled.View`
  flex: 1;
  justify-content: center;
  padding-right: 15px;
`;

const InputMessage = styled.TextInput`
  width: 100%;
  font-size: 18px;
  border: 0 !important;
`;
