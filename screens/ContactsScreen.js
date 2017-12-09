import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: "Contatos"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Ecrã de contatos</Text>
      </ScrollView>
    );
  }
}

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
