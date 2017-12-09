import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

class DiscussionsScreen extends React.Component {
  static navigationOptions = {
    title: "Discussões"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Ecrã de Discussões</Text>
      </ScrollView>
    );
  }
}

export default DiscussionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
