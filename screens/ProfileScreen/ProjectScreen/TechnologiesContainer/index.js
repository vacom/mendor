import React from "react";
//Components
import { Container } from "native-base";
import {
  Label as MendorLabel,
  LabelContainer,
  LabelsContainer
} from "../../../../components/Label";
import { Placeholder, Loading } from "../../../../components/index";
//GraphQL
import { graphql, compose } from "react-apollo";
import { ALL_TECHNOLOGIES_OF_USER } from "../../../../api/Queries/User";

class TechnologiesContainer extends React.Component {
  state = {
    active: false,
    tecnologies: []
  };
  _onSelectTechnology = id => () => {
    const tecnologies = this.state.tecnologies;
    //if already exists in the object just change the value
    if (id in tecnologies) {
      tecnologies[id] = !tecnologies[id];
      this.setState({ tecnologies });
    } else {
      //Add new value to the object
      const items = {
        ...tecnologies,
        [id]: true
      };
      this.setState({ tecnologies: items });
    }

    setTimeout(() => {
      this._onCleanTechnologies();
    }, 250);
  };
  _onCleanTechnologies = () => {
    this.props.tecnologies(this.state.tecnologies);
  };
  render() {
    if (this.props.technologiesQuery && this.props.technologiesQuery.loading) {
      return <Loading dark />;
    }
    if (this.props.technologiesQuery && this.props.technologiesQuery.error) {
      <Placeholder
        text="Erro! Ao carregar as suas tecnologias."
        IconName="error"
      />;
    }
    const { allTechnologies } = this.props.technologiesQuery;
    return (
      <Container>
        <LabelsContainer>
          {allTechnologies.map(data => {
            return (
              <LabelContainer key={data.id}>
                <MendorLabel
                  text={data.name}
                  onPress={this._onSelectTechnology(data.id)}
                  active={this.state.tecnologies[data.id]}
                />
              </LabelContainer>
            );
          })}
        </LabelsContainer>
      </Container>
    );
  }
}

export default compose(
  graphql(ALL_TECHNOLOGIES_OF_USER, {
    name: "technologiesQuery",
    options: props => ({
      variables: { userId: props.userId }
    })
  })
)(TechnologiesContainer);
