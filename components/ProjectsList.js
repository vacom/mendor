import React from "react";
import { graphql, compose, withApollo } from "react-apollo";
import { ALL_PROJECTS_OF_USER } from "../api/Queries/User";
import { View } from "react-native";
import { Placeholder, Loading } from "./index";
import { ProjectCard } from "./ProjectCard";

class ProjectsList extends React.Component {
  render() {
    if (this.props.projects && this.props.projects.loading) {
      return <Loading />;
    }
    if (this.props.projects && this.props.projects.error) {
      return <Placeholder text="Erro! Tente novamente" IconName="error" />;
    }
    return (
      <View style={{ flex: 1, padding: 5 }}>
        {this.props.projects.allProjects.map((data, key) => {
          return (
              <ProjectCard project={data} key={key}/>
          );
        })}
      </View>
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
