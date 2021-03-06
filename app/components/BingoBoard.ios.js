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
          <View>
            {this.props.user.taglines.map((tagline, i) => {
              return (
                <Text key={i} style={{fontSize: 14, color: '#626262'}}>{tagline}</Text>
              );
            })}
          </View>
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
      showWinner: false,
      showPrompt: false,
      promptSquare: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showWinner: this.props.board.bingoCount < nextProps.board.bingoCount
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

    let winningStatus;
    if (this.props.board.bingoCount > 0) {
      winningStatus = (
        <Text style={styles.text}>
          You've won{' '}
          {this.props.board.bingoCount}
          {' '}dessert coupon{this.props.board.bingoCount === 1 ? '' : 's'}!
        </Text>
      );
    } else {
      winningStatus = (
        <Text style={styles.text}>
          You haven't won any dessert coupons yet. Keep playing!
        </Text>
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
              <View style={[styles.modalContent, {
                padding: 20,
                backgroundColor: '#c09667',
                alignItems: 'center'
              }]}>
                <Image
                  source={{uri: 'https://i.imgur.com/6W1WnqP.png'}}
                  style={{
                    width: 949,
                    height: 590,
                    marginBottom: 40
                  }}
                />
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => this.setState({ showWinner: false })} style={styles.button}>
                    <Text style={styles.buttonText}>OK, back to my board to win more coupons!</Text>
                  </TouchableOpacity>
                </View>
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

          <View style={{flex: 1, flexDirection: 'row'}}>

            <View style={{flex: 0.3, backgroundColor: '#eaeaea', padding: 10, borderColor: '#c7c7c7', borderBottomWidth: 1}}>
              <View style={{marginBottom: 20}}>
                <Text style={styles.text}>When you tap on a photo you'll see a question.</Text>
                <Text style={styles.text}>Find the person in the photo and ask them the question.</Text>
                <Text style={styles.text}>Come back and check off the photo.</Text>
                <Text style={styles.text}>When you get 5 in a row, you get a coupon for dessert! Each time you complete a row, you get another dessert ticket. No tickets, no dessert!</Text>
              </View>
              <View>
                <Image
                  source={{uri: 'https://i.imgur.com/kdb9gF4.png'}}
                  style={{
                    alignSelf: 'center',
                    width: 200,
                    height: 125,
                    marginBottom: 20
                  }}
                />
                <Text style={styles.text}>{winningStatus}</Text>
              </View>
            </View>

            <View style={{flex: 0.7, paddingHorizontal: 20}}>
              <ScrollView style={{flex: 1}} contentContainerStyle={[styles.scrollViewContainer, {
                alignItems: 'center'
              }]}>
                <View style={{flex: 0, padding: 5}}>
                  {_.range(0, 5).map((i) => {
                    return (
                      <View key={i} style={styles.boardRow}>
                        {this.props.board.squares.slice(i * 5, (i + 1) * 5).map((square) => {
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
                          let label = (
                            <Text style={[styles.squareLabelText, {fontSize: 14}]}>
                              {user.name}
                            </Text>
                          );
                          return (
                            <Square
                              key={square.userId}
                              image={square.isMarked ? square.markedImage : user.photo120}
                              label={label}
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
            </View>

          </View>

        </View>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  ...globalStyles,
  text: {
    ...globalStyles.text,
    marginBottom: 10
  },
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
