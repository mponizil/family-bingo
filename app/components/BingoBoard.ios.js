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
  markSquare,
  unmarkSquare
} from '../actions';

import {
  PROMPTS
} from '../data';

import Square from './Square';

import globalStyles from '../styles/global';

class Prompt extends React.Component {

  render() {
    let index = _.random(0, PROMPTS.length - 1);
    let action;
    if (this.props.square.isMarked) {
      action = (
        <TouchableOpacity onPress={this.props.onUnmark}>
          <Text>Unmark</Text>
        </TouchableOpacity>
      );
    } else {
      action = (
        <TouchableOpacity onPress={this.props.onMarkDone}>
          <Text>Done!</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View>
        <Text>{this.props.user.name}</Text>
        <Text>{PROMPTS[index]}</Text>
        <TouchableOpacity onPress={this.props.onCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        {action}
      </View>
    );
  }

}

class BingoBoard extends React.Component {

  constructor() {
    super();
    this.state = {
      showPrompt: false,
      promptSquare: null
    };
  }

  generateHandlePressSquare(square) {
    return () => {
      this.setState({
        showPrompt: true,
        promptSquare: square
      });
    }
  }

  handleMarkSquare() {
    this.props.markSquare({
      user: this.props.user,
      square: this.state.promptSquare
    });
    this.setState({
      showPrompt: false
    });
  }

  handleUnmarkSquare() {
    this.props.unmarkSquare({
      user: this.props.user,
      square: this.state.promptSquare
    });
    this.setState({
      showPrompt: false
    });
  }

  render() {
    let prompt;
    if (this.state.showPrompt) {
      prompt = (
        <Prompt
          square={this.state.promptSquare}
          user={this.props.users[this.state.promptSquare.userId]}
          onCancel={() => this.setState({ showPrompt: false })}
          onUnmark={this.handleUnmarkSquare.bind(this)}
          onMarkDone={this.handleMarkSquare.bind(this)}
        />
      );
    }

    return (
      <View style={{flex: 1}}>

        <Overlay isVisible={this.state.showPrompt}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {prompt}
            </View>
          </View>
        </Overlay>

        <View style={styles.navigationBar}>
          <TouchableOpacity onPress={this.props.navigator.pop} style={styles.navigationBarItem}>
            <Text style={styles.navigationBarItemText}>&lt; Back</Text>
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
  markSquare,
  unmarkSquare
})(BingoBoard);
