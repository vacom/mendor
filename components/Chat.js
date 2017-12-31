import React from "react";
import styled from "styled-components/native";
import { ScrollView, View, Text } from "react-native";

//Components
import Message from "./Message";

class Chat extends React.Component {
  componentDidMount() {
    if (this.props.messages.length > 0) {
      setTimeout(() => {
        this.refs.ScrollView.scrollToEnd({ animated: true });
      }, 50);
    }
  }
  render() {
    if (this.props.messages.length > 0) {
      return (
        <ScrollView ref="ScrollView">
          {this.props.messages.map((data, index) => {
            return (
              <Message
                key={data.id}
                userId={data.author.id}
                userIdLogged={this.props.userIdLogged}
                message={data.content}
                avatar={data.author.avatar}
              />
            );
          })}
        </ScrollView>
      );
    } else {
      return (
        <NoMessages ref="ScrollView">
          <Text>No messages...</Text>
        </NoMessages>
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
