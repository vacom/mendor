import React from "react";
import { StyleSheet, View, Text } from "react-native";

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Ecrã de perfil</Text>
      </View>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
