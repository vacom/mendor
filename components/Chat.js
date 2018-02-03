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
    if (Object.keys(this.props.messages).length > 0) {
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
    if (Object.keys(this.props.messages).length > 0) {
      if (nextProps.scrollBottom != false) {
        setTimeout(() => {
          this.refs.ScrollView.scrollToEnd({ animated: true });
        }, 50);
        this.props.stopScroll();
      }
    }
  }

  _addMessage(e) {
    this.props.addMessage(e);
  }

  _openShareCards() {
    this.props.openShareCards();
  }
  render() {
    if (Object.keys(this.state.messages).length > 0) {
      return (
        <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }}>
          <ScrollView ref="ScrollView">
            {this.state.messages.map((data, index) => {
              console.log(data);
              return (
                <Message
                  key={index}
                  userId={data.author.id}
                  userIdLogged={this.props.userIdLogged}
                  message={data.content}
                  createdAt={data.createdAt}
                  avatar={data.author.avatar}
                  type={data.type}
                  project={data.project}
                  goToProfile={this.props.goToProfile}
                />
              );
            })}
          </ScrollView>
          <InputMessageBar
            icon={this.props.icon}
            openShareCards={this._openShareCards}
            share_cards={this.props.share_cards}
            avatar={this.state.avatar}
            userIdLogged={this.state.userIdLogged}
            addMessage={this._addMessage}
            goToProfile={this.props.goToProfile}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <NoMessages ref="ScrollView" />
          <InputMessageBar
            icon={this.props.icon}
            openShareCards={this._openShareCards}
            share_cards={true}
            avatar={this.state.avatar}
            userIdLogged={this.state.userIdLogged}
            addMessage={this._addMessage}
            goToProfile={this.props.goToProfile}
          />
        </View>
      );
    }
  }
}

export default Chat;

const NoMessages = styled.View`
  flex: 1;
`;
