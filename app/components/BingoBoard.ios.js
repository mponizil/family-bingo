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
  PROMPTS,
  DESSERT120
} from '../data';

import {
  checkHasBingo
} from '../utility';

import Square from './Square';

import globalStyles from '../styles/global';

class Prompt extends React.Component {

  render() {
    let index = _.random(0, PROMPTS.length - 1);
    let action;

    if (this.props.square.isMarked) {
      action = (
        <TouchableOpacity onPress={this.props.onUnmark} style={styles.button}>
          <Text style={styles.buttonText}>Unmark</Text>
        </TouchableOpacity>
      );
    } else {
      action = (
        <TouchableOpacity onPress={this.props.onMarkDone} style={styles.button}>
          <Text style={styles.buttonText}>Mark as done!</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{width: 400}}>

        <View style={styles.modalHeader}>
          <Text style={{fontSize: 24}}>{this.props.user.name}</Text>
        </View>

        <View style={styles.modalBody}>
          <Text style={{fontSize: 18}}>{PROMPTS[index]}</Text>
        </View>

        <View style={styles.modalFooter}>
          <TouchableOpacity onPress={this.props.onCancel} style={[styles.buttonAlternate, {
            marginRight: 10
          }]}>
            <Text style={styles.buttonAlternateText}>Cancel</Text>
          </TouchableOpacity>
          {action}
        </View>

      </View>
    );
  }

}

class BingoBoard extends React.Component {

  constructor() {
    super();
    this.state = {
      hasBingo: false,
      showWinner: false,
      showPrompt: false,
      promptSquare: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    let hasBingo = checkHasBingo(nextProps.board);
    this.setState({
      hasBingo: hasBingo,
      showWinner: (this.state.hasBingo !== hasBingo) ? hasBingo : false
    });
  }

  generateHandlePressSquare(square) {
    return () => {
      // Nothing happens when you press the free square
      if (square.userId === -1) {
        return;
      }
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

        <View style={styles.modal}>
          <Overlay isVisible={this.state.showPrompt && !this.state.showWinner}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                {prompt}
              </View>
            </View>
          </Overlay>
          <Overlay isVisible={this.state.showWinner}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text>WINNER WINNER WINNER!!</Text>
                <TouchableOpacity onPress={() => this.setState({ showWinner: false })} style={styles.button}>
                  <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        </View>

        <View style={styles.screen}>

          <View style={styles.navigationBar}>
            <TouchableOpacity onPress={this.props.navigator.pop} style={styles.navigationBarItem}>
              <Text style={styles.navigationBarItemText}>&lt; Back</Text>
            </TouchableOpacity>
            <Text style={styles.navigationBarHeading}>
              {this.props.user.name}'s Board
            </Text>
            <View style={styles.navigationBarItem}></View>
          </View>

          <ScrollView style={{flex: 1}} contentContainerStyle={[styles.scrollViewContainer, {
            alignItems: 'center'
          }]}>
            <View style={{flex: 0, backgroundColor: '#e2e2e2', padding: 5}}>
              {_.range(0, 5).map((i) => {
                return (
                  <View key={i} style={styles.boardRow}>
                    {this.props.board.slice(i * 5, (i + 1) * 5).map((square) => {
                      var user;
                      if (square.userId === -1) {
                        user = {
                          id: -1,
                          name: 'Free Square',
                          photo120: _.sample(DESSERT120)
                        }
                      } else {
                        user = this.props.users[square.userId];
                      }
                      return (
                        <Square
                          key={square.userId}
                          image={square.isMarked ? square.markedImage : user.photo120}
                          label={user.name}
                          width={120}
                          height={120}
                          onPress={this.generateHandlePressSquare(square)}
                          textStyle={{fontSize: 14}}
                        />
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </ScrollView>

          <View style={styles.instructions}>
            <Text style={styles.instructionsText}>Instructions</Text>
          </View>

        </View>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  ...globalStyles,
  modalHeader: {
    backgroundColor: '#eaeaea',
    padding: 10,
    marginBottom: 10,
    borderColor: '#c7c7c7',
    borderBottomWidth: 1
  },
  modalBody: {
    padding: 10,
    marginBottom: 20
  },
  modalFooter: {
    backgroundColor: '#eaeaea',
    padding: 10,
    borderColor: '#c7c7c7',
    borderTopWidth: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
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
