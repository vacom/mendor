import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Thumbnail, Text, Container } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Tab, Tabs } from "native-base";
//Graphql
import { ALL_CONTACTS_ENTREPENEURS_MENTORS_QUERY } from "../../api/Queries/Contacts";
//Components
import GradientContainer from "../../components/GradientContainer";
import ContactList from "../../components/ContactList";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";
import {
  Card,
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../components/Card";
import { graphql, compose, withApollo } from "react-apollo";

import { Error, Loading, Placeholder } from "../../components/index";

class ContactsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Contactos",
      style: {
        backgroundColor: "deepskyblue",
        borderWidth: 1,
        borderBottomColor: "white"
      },
      headerRight: (
        <HeaderRightContainer>
          <HeaderRightElement>
            <TouchableOpacity onPress={params.goToSearch}>
              <MaterialIcons name="search" size={24} color="#ffffff" />
            </TouchableOpacity>
          </HeaderRightElement>
        </HeaderRightContainer>
      )
    };
  };
  _goToProfile = id => () => {
    this.props.navigation.navigate("Profile", { id: id });
  };
  componentDidMount() {
    this.props.navigation.setParams({
      goToSearch: this._goToSearch
    });
  }
  _goToSearch = () => {
    this.props.navigation.navigate("Search");
  };

  render() {
    if (this.props.allContacts && this.props.allContacts.loading) {
      return <Loading />;
    } else if (this.props.allContacts && this.props.allContacts.error) {
      return <Placeholder text="Ocorreu um erro." IconName="error" />;
    } else {
      return (
        <Container>
          <GradientContainer>
            <Tabs initialPage={0}>
              <Tab
                heading="Mentores"
                style={{ backgroundColor: "transparent" }}
              >
                <ContainerTab>
                  <ContactList
                    goToProfile={this._goToProfile}
                    contacts={this.props.allContacts.allContactsMentors}
                  />
                </ContainerTab>
              </Tab>
              <Tab
                heading="Empreendedores"
                style={{ backgroundColor: "transparent" }}
              >
                <ContainerTab>
                  <ContactList
                    goToProfile={this._goToProfile}
                    contacts={this.props.allContacts.allContactsEntrepeneurs}
                  />
                </ContainerTab>
              </Tab>
            </Tabs>
          </GradientContainer>
        </Container>
      );
    }
  }
}

const ContainerTab = styled.ScrollView``;

const ContactsScreenWithData = compose(
  graphql(ALL_CONTACTS_ENTREPENEURS_MENTORS_QUERY, {
    options: props => ({
      variables: { id: "cjbjhh0f9lbfz01142sd6tvuv" }
    }),
    name: "allContacts"
  })
)(ContactsScreen);

export default withApollo(ContactsScreenWithData);
