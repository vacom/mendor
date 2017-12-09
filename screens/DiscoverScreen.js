import React from "react";
import { StyleSheet, View, Text } from "react-native";

class DiscoverScreen extends React.Component {
  static navigationOptions = {
    title: "Descobrir"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Ecrã de descobrir</Text>
      </View>
    );
  }
}

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
