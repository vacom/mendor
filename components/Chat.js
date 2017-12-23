import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
//Components
import Message from "./Message";

class Chat extends React.Component {
  componentDidMount() {
    setTimeout(() => {
        this.refs.ScrollView.scrollToEnd({animated: true});
    }, 50);
    
  }
  render() {
    return (
      <ScrollView ref="ScrollView" >
        <Message
          id_user="1"
          message=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed dolor mauris. Integer at ornare justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras vel risus ac enim cursus porttitor. In hac habitasse platea dictumst. Quisque in consectetur ante. Donec imperdiet justo nec risus varius, ac porttitor mi pellentesque. Nulla tristique sagittis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula aliquam convallis. Vestibulum quis sapien eu sem scelerisque semper id nec mi. Integer sed quam ultrices, laoreet lectus ut, feugiat nisl. Quisque auctor augue eu purus finibus semper. Quisque a erat ante. Vivamus ut posuere eros.

Proin vel interdum lacus. Vivamus placerat efficitur erat, scelerisque finibus justo dapibus a. Donec et vehicula quam. Quisque tincidunt venenatis tellus, sit amet imperdiet leo ultrices tempor. Mauris quis eros lorem. Aenean consectetur efficitur neque, ut ornare mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec vitae tellus at lacus euismod sagittis in et dolor. Etiam mauris est, sagittis ut massa vitae, congue pretium quam.

Cras aliquet et justo at imperdiet. Morbi ultricies maximus porta. Praesent ac mauris dictum, viverra dui sit amet, blandit tellus. Pellentesque at convallis quam, vel malesuada libero. Suspendisse pellentesque felis dolor, dictum imperdiet dui posuere pulvinar. Etiam metus enim, efficitur at maximus sit amet, dapibus nec lorem. Vivamus vestibulum lorem lectus, id egestas libero ullamcorper eget. Phasellus nec dolor purus. Nunc scelerisque in arcu in sodales. Nulla dui lorem, mollis eu dui sed, dictum condimentum nibh. Aliquam risus risus, efficitur id neque ac, posuere mollis felis. Praesent et tortor eget eros tincidunt bibendum.

Quisque et libero dui. Vivamus pulvinar sem sollicitudin, finibus tortor ullamcorper, lacinia tortor. Cras sollicitudin ac turpis vitae elementum. Donec dui sem, sodales vehicula ligula id, aliquam dapibus sem. Praesent feugiat, nisl eu mattis tempus, est nunc porta tortor, commodo laoreet libero erat a nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque sed auctor massa, non lacinia purus. Pellentesque vel ligula scelerisque, venenatis felis vitae, maximus quam. Pellentesque scelerisque eleifend justo eget elementum. "
        />
        <Message
          id_user="2"
          message=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed dolor mauris. Integer at ornare justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras vel risus ac enim cursus porttitor. In hac habitasse platea dictumst. Quisque in consectetur ante. Donec imperdiet justo nec risus varius, ac porttitor mi pellentesque. Nulla tristique sagittis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula aliquam convallis. Vestibulum quis sapien eu sem scelerisque semper id nec mi. Integer sed quam ultrices, laoreet lectus ut, feugiat nisl. Quisque auctor augue eu purus finibus semper. Quisque a erat ante. Vivamus ut posuere eros.

Proin vel interdum lacus. Vivamus placerat efficitur erat, scelerisque finibus justo dapibus a. Donec et vehicula quam. Quisque tincidunt venenatis tellus, sit amet imperdiet leo ultrices tempor. Mauris quis eros lorem. Aenean consectetur efficitur neque, ut ornare mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec vitae tellus at lacus euismod sagittis in et dolor. Etiam mauris est, sagittis ut massa vitae, congue pretium quam.

Cras aliquet et justo at imperdiet. Morbi ultricies maximus porta. Praesent ac mauris dictum, viverra dui sit amet, blandit tellus. Pellentesque at convallis quam, vel malesuada libero. Suspendisse pellentesque felis dolor, dictum imperdiet dui posuere pulvinar. Etiam metus enim, efficitur at maximus sit amet, dapibus nec lorem. Vivamus vestibulum lorem lectus, id egestas libero ullamcorper eget. Phasellus nec dolor purus. Nunc scelerisque in arcu in sodales. Nulla dui lorem, mollis eu dui sed, dictum condimentum nibh. Aliquam risus risus, efficitur id neque ac, posuere mollis felis. Praesent et tortor eget eros tincidunt bibendum.

Quisque et libero dui. Vivamus pulvinar sem sollicitudin, finibus tortor ullamcorper, lacinia tortor. Cras sollicitudin ac turpis vitae elementum. Donec dui sem, sodales vehicula ligula id, aliquam dapibus sem. Praesent feugiat, nisl eu mattis tempus, est nunc porta tortor, commodo laoreet libero erat a nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque sed auctor massa, non lacinia purus. Pellentesque vel ligula scelerisque, venenatis felis vitae, maximus quam. Pellentesque scelerisque eleifend justo eget elementum. "
        />
        <Message id_user="2" message="Hey, eu discordo!!" />
      </ScrollView>
    );
  }
}

export default Chat;
