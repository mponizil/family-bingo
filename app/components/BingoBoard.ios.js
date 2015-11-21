import _ from 'underscore';
import React from 'react-native';
import Overlay from 'react-native-overlay';

let {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} = React;

import {
  connect
} from 'react-redux/native';

import {
  markSquare
} from '../actions';

import {
  PROMPTS
} from '../data';

import Square from './Square';

import globalStyles from '../styles/global';

class Prompt extends React.Component {

  render() {
    var content;
    if (this.props.prompt) {
      let index = _.random(0, PROMPTS.length - 1);
      content = (
        <View>
          <Text>{this.props.user.name}</Text>
          <Text>{PROMPTS[index]}</Text>
          <TouchableOpacity onPress={this.props.onDone}>
            <Text>Done!</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Overlay isVisible={!!this.props.prompt}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {content}
          </View>
        </View>
      </Overlay>
    );
  }

}

class BingoBoard extends React.Component {

  constructor() {
    super();
    this.state = {
      prompt: false
    };
  }

  generateHandlePressSquare(square) {
    return () => {
      this.setState({
        prompt: square
      });
    }
  }

  handleMarkSquare() {
    this.props.markSquare({
      user: this.props.user,
      square: this.state.prompt
    });
    this.setState({
      prompt: false
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <Prompt
          prompt={this.state.prompt}
          user={this.props.users[this.state.prompt.userId]}
          onDone={this.handleMarkSquare.bind(this)}
        />

        <View style={styles.navigationBar}>
          <TouchableOpacity onPress={this.props.navigator.pop} style={styles.navigationBarItem}>
            <Text>&lt; Back</Text>
          </TouchableOpacity>
          <Text style={styles.navigationBarHeading}>
            {this.props.user.name}'s Board
          </Text>
          <View style={styles.navigationBarItem}></View>
        </View>

        <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollViewContainer}>
          {_.range(0, 5).map((i) => {
            return (
              <View key={i} style={styles.boardRow}>
                {this.props.board.slice(i * 5, (i + 1) * 5).map((square) => {
                  var data;
                  if (square.userId === -1) {
                    data = {
                      id: -1,
                      name: 'Cake',
                      photo: 'https://i.imgur.com/5KTpjld.png'
                    }
                  } else {
                    data = this.props.users[square.userId];
                  }
                  return (
                    <Square
                      key={square.userId}
                      data={data}
                      isMarked={square.isMarked}
                      onPress={this.generateHandlePressSquare(square)}
                      style={styles.boardSquare}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.instructions}>
          <Text style={styles.instructionsText}>Instructions</Text>
        </View>

      </View>
    );
  }

}

let styles = StyleSheet.create({
  ...globalStyles
});

export default connect((state, ownProps) => {
  return {
    users: state.users,
    board: state.boardsByUser[ownProps.user.id]
  };
}, {
  markSquare
})(BingoBoard);
