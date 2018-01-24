import React from "react";
import styled from "styled-components/native";
import { ScrollView, View, Text } from "react-native";

//Components
import Message from "./Message";
import InputMessageBar from "./InputMessageBar";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this._addMessage = this._addMessage.bind(this);
    this._openShareCards = this._openShareCards.bind(this);
  }
  state = {
    messages: this.props.messages,
    avatar: this.props.avatar,
    userIdLogged: this.props.userIdLogged
  };
  componentDidMount() {
    if (this.props.messages.length > 0) {
      setTimeout(() => {
        this.refs.ScrollView.scrollToEnd({ animated: true });
      }, 50);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages !== this.state.messages) {
      this.setState({ messages: nextProps.messages });
      setTimeout(() => {
        this.refs.ScrollView.scrollToEnd({ animated: true });
      }, 50);
    }
  }

  _addMessage(e) {
    this.props.addMessage(e);
  }

  _openShareCards() {
    this.props.openShareCards();
  }
  render() {
    if (this.state.messages.length > 0) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView ref="ScrollView">
            {this.state.messages.map((data, index) => {
              return (
                <Message
                  key={data.id}
                  userId={data.author.id}
                  userIdLogged={this.props.userIdLogged}
                  message={data.content}
                  createdAt={data.createdAt}
                  avatar={data.author.avatar}
                  type={data.type}
                  project={data.project}
                />
              );
            })}
          </ScrollView>
          <InputMessageBar
            openShareCards={this._openShareCards}
            share_cards={true}
            avatar={this.state.avatar}
            userIdLogged={this.state.userIdLogged}
            addMessage={this._addMessage}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <NoMessages ref="ScrollView">
            <Text>No messages...</Text>
          </NoMessages>
          <InputMessageBar
            openShareCards={this._openShareCards}
            share_cards={true}
            avatar={this.state.avatar}
            userIdLogged={this.state.userIdLogged}
            addMessage={this._addMessage}
          />
        </View>
      );
    }
  }
}

export default Chat;

const NoMessages = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
