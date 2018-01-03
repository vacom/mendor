import React from "react";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

class InputMessageBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //ALTERAR
      avatar:
        "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/25498263_1521972947849794_5674696303839555748_n.jpg?oh=e027e305b330218e0780f28c2cdc1a31&oe=5ABE2638"
    };
    this._addMessage = this._addMessage.bind(this);
  }
  _addMessage() {
    if (this.state.text && this.state.text != "")
      this.props.addMessage(this.state.text);
    this.setState({
      text: ""
    });
  }
  render() {
    return (
      <Message>
        <ViewAvatar>
          <Avatar
            source={{
              uri: this.state.avatar
            }}
          />
        </ViewAvatar>
        <ViewInput>
          <InputMessage
            value={this.state.text}
            multiline={true}
            underlineColorAndroid="transparent"
            borderWidth="0"
            placeholder="Escrever uma mensagem..."
            onChangeText={text => {
              this.setState({ text }), console.log(text);
            }}
          />
        </ViewInput>
        <TouchableOpacity onPress={this._addMessage}>
          <Icon name="send" style={{ color: "#3F51B5", fontSize: 30 }} />
        </TouchableOpacity>
      </Message>
    );
  }
}

export default InputMessageBar;

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
