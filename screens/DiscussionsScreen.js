import React from "react";
//Styles
import { Container, Icon, Fab } from "native-base";
import styled from "styled-components/native";
//Components
import CategoryGroup from "../components/CategoryGroup";

class DiscussionsScreen extends React.Component {
  static navigationOptions = {
    title: "Discussões"
  };

  render() {
    return (
      <Container>
        <ScrollView>
          <CategoryGroup idCategory="1" nameCategory="EMPREENDEDORISMO" />
          <CategoryGroup idCategory="1" nameCategory="EMPREENDEDORISMO" />

          <CategoryGroup idCategory="1" nameCategory="EMPREENDEDORISMO" />

          <CategoryGroup idCategory="1" nameCategory="EMPREENDEDORISMO" />

          <CategoryGroup idCategory="1" nameCategory="EMPREENDEDORISMO" />

          <CategoryGroup idCategory="1" nameCategory="EMPREENDEDORISMO" />

          <CategoryGroup idCategory="1" nameCategory="EMPREENDEDORISMO" />
        </ScrollView>
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#3F51B5" }}
          position="bottomRight"
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}

export default DiscussionsScreen;

const ScrollView = styled.ScrollView`
  flex: 1;
  padding-top: 25px;
  background-color: #ffffff;
`;
