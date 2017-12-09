import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

class NotificationsScreen extends React.Component {
  static navigationOptions = {
    title: "Notificações"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Ecrã de Notificações</Text>
      </ScrollView>
    );
  }
}

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
