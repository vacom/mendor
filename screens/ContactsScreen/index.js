import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Thumbnail, Text, Container } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Tab, Tabs } from "native-base";
//Graphql
import { ALL_CONTACTS_QUERY, ALL_CONTACTS_ENTREPENEURS_QUERY, ALL_CONTACTS_MENTORS_QUERY } from "../../api/Queries/Contacts";
//Components
import GradientContainer from "../../components/GradientContainer";
import ContactList from "../../components/ContactList"
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

import { Error, Loading } from "../../components/index";

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

  componentDidMount() {
    this.props.navigation.setParams({
      goToSearch: this._goToSearch
    });
  }
  _goToSearch = () => {
    this.props.navigation.navigate("Search");
  };

  render() {
    if (
      this.props.allContactsEntrepeneurs &&
      this.props.allContactsMentors &&
      this.props.allContactsEntrepeneurs.loading &&
      this.props.allContactsMentors.loading
    ) {
      return <Loading />;
    } else if (
      this.props.allContactsEntrepeneurs &&
      this.props.allContactsEntrepeneurs &&
      this.props.allContactsEntrepeneurs.error &&
      this.props.allContactsMentors.error
    ) {
      return <Error />;
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
                    contacts={this.props.allContactsMentors.allContacts}
                  />
                  
                </ContainerTab>
              </Tab>
              <Tab
                heading="Empreendedores"
                style={{ backgroundColor: "transparent" }}
              >
                <ContainerTab>
                <ContactList
                contacts={this.props.allContactsEntrepeneurs.allContacts}
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
  graphql(ALL_CONTACTS_ENTREPENEURS_QUERY, {
    options: props => ({
      variables: { id: "cjbjhh0f9lbfz01142sd6tvuv" }
    }),
    name: "allContactsEntrepeneurs"
  }),

  graphql(ALL_CONTACTS_MENTORS_QUERY, {
    options: props => ({
      variables: { id: "cjbjhh0f9lbfz01142sd6tvuv" }
    }),
    name: "allContactsMentors"
  })
)(ContactsScreen);

export default withApollo(ContactsScreenWithData);