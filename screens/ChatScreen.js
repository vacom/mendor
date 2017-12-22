import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";


class ChatScreen extends React.Component {
  static navigationOptions = {
    title: "Conversas"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Ecrã de Chat</Text>
      </ScrollView>
    );
  }
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});