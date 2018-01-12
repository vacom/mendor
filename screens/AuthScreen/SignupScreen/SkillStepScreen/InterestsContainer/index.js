import React from "react";
//Components
import { Container } from "native-base";
import {
  Label as MendorLabel,
  LabelContainer,
  LabelsContainer
} from "../../../../../components/Label";
import { Error, Loading } from "../../../../../components/index";
//GraphQL
import { graphql, compose } from "react-apollo";
import { ALL_INTERESTS_QUERY } from "../../../../../api/Queries/Competence";

class InterestsContainer extends React.Component {
  static navigationOptions = {
    title: ""
  };
  state = {
    active: false,
    interests: [],
  };
  _onSelectInterest = id => () => {
    const interests = this.state.interests;
    //if already exists in the object just change the value
    if (id in interests) {
      interests[id] = !interests[id];
      this.setState({ interests });
    } else {
      //Add new value to the object
      const items = {
        ...interests,
        [id]: true
      };
      this.setState({ interests: items });
    }

    setTimeout(() => {
      this._onCleanInterests();
    }, 250);
  };
  _onCleanInterests = () => {
    this.props.interests(this.state.interests);
  };
  render() {
    if (this.props.interestsQuery && this.props.interestsQuery.loading) {
      return <Loading dark/>;
    }
    if (this.props.interestsQuery && this.props.interestsQuery.error) {
      return <Error />;
    }
    const { allInterests } = this.props.interestsQuery;
    return (
      <Container>
        <LabelsContainer>
          {allInterests.map(data => {
            return (
              <LabelContainer key={data.id}>
                <MendorLabel
                  text={data.title}
                  onPress={this._onSelectInterest(data.id)}
                  active={this.state.interests[data.id]}
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
  graphql(ALL_INTERESTS_QUERY, {
    name: "interestsQuery",
    options: props => ({
      variables: { query: props.query }
    })
  })
)(InterestsContainer);
