// @flow
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
//Components
import GradientContainer from "../../components/GradientContainer";
import ContactList from "./ContactList/index";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";
import { ActionSheet, Container, Tab, Tabs } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Loading, Placeholder } from "../../components/index";
//HOCs
import withCurrentUser from "../../components/HOC/withCurrentUser";
//Graphql
import { graphql, compose } from "react-apollo";
import { ALL_CONTACTS_ENTREPENEURS_MENTORS_QUERY } from "../../api/Queries/Contacts";
import { DELETE_CONTACT_MUTATION } from "../../api/Mutations/Contacts";
import { DELETE_CONTACT_FUNC } from "../../api/Functions/User";
//Utils
import Toast from "react-native-root-toast";

class ContactsScreen extends React.PureComponent {
  props: {
    allContacts: any,
    navigation: any
  };
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
  _goToProfile(id) {
    this.props.navigation.navigate("Profile", { id: id });
  }
  _goToSearch = () => {
    this.props.navigation.navigate("SearchContacts");
  };

  _onOpenActions(id) {
    var BUTTONS = ["Eliminar Contato", "Cancelar"];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        title: "Ações"
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this._onDeleteContact(id);
            break;
        }
      }
    );
  }

  _onDeleteContact = async id => {
    const { deleteContact } = this.props;
    //deletes contact for the user
    const result = await DELETE_CONTACT_FUNC(id, deleteContact);
    //if success deletes a contact from the user
    if (result.status) {
      //deletes the contact
      this._onRefresh();
      Toast.show("Contato eliminado.");
    } else {
      Toast.show("Erro! Tente Novamente.");
    }
  };

  render() {
    if (this.props.allContacts && this.props.allContacts.loading) {
      return (
        <GradientContainer>
          <Loading dark />
        </GradientContainer>
      );
    }
    if (this.props.allContacts && this.props.allContacts.error) {
      return (
        <GradientContainer>
          <Placeholder text="Ocorreu um erro." IconName="error" />
        </GradientContainer>
      );
    }
    const { mentors, entrepeneurs } = this.props.allContacts;
    return (
      <Container>
        <GradientContainer>
          <Tabs
            initialPage={0}
            tabBarUnderlineStyle={{
              borderBottomWidth: 2,
              borderBottomColor: "#FFF",
              height: 2
            }}
          >
            <Tab
              heading="Empreendedores"
              style={{ backgroundColor: "transparent" }}
              tabStyle={{ backgroundColor: "#3F51B5" }}
              textStyle={{ color: "#FFF", fontWeight: "400" }}
              activeTabStyle={{ backgroundColor: "#3F51B5" }}
              activeTextStyle={{ color: "#FFF", fontWeight: "400" }}
            >
              <ScrollView>
                <ContactList
                  contacts={mentors}
                  openProfile={id => this._goToProfile(id)}
                  openAction={id => this._onOpenActions(id)}
                />
              </ScrollView>
            </Tab>
            <Tab
              heading="Mentores"
              style={{ backgroundColor: "transparent" }}
              tabStyle={{ backgroundColor: "#3F51B5" }}
              textStyle={{ color: "#FFF", fontWeight: "400" }}
              activeTabStyle={{ backgroundColor: "#3F51B5" }}
              activeTextStyle={{ color: "#FFF", fontWeight: "400" }}
            >
              <ScrollView>
                <ContactList
                  openProfile={id => this._goToProfile(id)}
                  openAction={id => this._onOpenActions(id)}
                  contacts={entrepeneurs}
                />
              </ScrollView>
            </Tab>
          </Tabs>
        </GradientContainer>
      </Container>
    );
  }
}

export default compose(
  withCurrentUser,
  graphql(ALL_CONTACTS_ENTREPENEURS_MENTORS_QUERY, {
    options: props => ({
      variables: { id: props.currentUserId }
    }),
    name: "allContacts"
  }),
  graphql(DELETE_CONTACT_MUTATION, { name: "deleteContact" })
)(ContactsScreen);
