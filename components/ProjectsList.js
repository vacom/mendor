import React from "react";
import { graphql, compose, withApollo } from "react-apollo";
import { ALL_PROJECTS_OF_USER } from "../api/Queries/User";
import { ScrollView } from "react-native";
import { Placeholder, Loading } from "./index";
import ProjectCard from "./ProjectCard";

class ProjectsList extends React.Component {
  constructor(props) {
    super(props);
    this._addProjectMessage = this._addProjectMessage.bind(this);
  }
  _addProjectMessage(e) {
    this.props.addProjectMessage(e);
  }
  render() {
    if (this.props.projects && this.props.projects.loading) {
      return <Loading />;
    }
    if (this.props.projects && this.props.projects.error) {
      return <Placeholder text="Erro! Tente novamente" IconName="error" />;
    }
    return (
      <ScrollView style={{ flex: 1, flexDirection: "row" }} horizontal>
        {this.props.projects.allProjects.map((data, key) => {
          if (this.props.projects.loading) return <Loading dark />;
          if (this.props.projects.error) return <Error dark />;
          return (
            <ProjectCard
              addProjectMessage={this._addProjectMessage}
              project={data}
              key={key}
              allowSend={true}
            />
          );
        })}
      </ScrollView>
    );
  }
}

export default compose(
  withApollo,
  graphql(ALL_PROJECTS_OF_USER, {
    options: props => ({
      variables: { id: props.userId }
    }),
    name: "projects"
  })
)(ProjectsList);
