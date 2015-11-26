import React from 'react-native';

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

import Square from './Square';
import BingoBoard from './BingoBoard';

import globalStyles from '../styles/global';

class SignIn extends React.Component {

  generateHandlePressUser(user) {
    return () => {
      this.props.navigator.push({
        component: BingoBoard,
        passProps: {
          user: user
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.screen}>

        <View style={styles.navigationBar}>
          <TouchableOpacity onPress={this.props.navigator.pop} style={styles.navigationBarItem}>
            <Text style={styles.navigationBarItemText}>&lt; Back to Intro Screen</Text>
          </TouchableOpacity>
          <Text style={styles.navigationBarHeading}>
            Tap on your photo to pull up your Bingo board
          </Text>
          <View style={styles.navigationBarItem}></View>
        </View>

        <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.grid}>
            {Object.keys(this.props.users).map((id) => {
              let user = this.props.users[id];
              let label = (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={styles.squareLabelText}>{user.name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.squareLabelText}>{this.props.boards[id].bingoCount}</Text>
                    <Image
                      source={{uri: 'https://i.imgur.com/Uhmvq52.png'}}
                      style={{
                        marginLeft: 5,
                        width: 24,
                        height: 22
                      }}
                    />
                  </View>
                </View>
              );
              return (
                <Square
                  key={id}
                  image={user.photo200}
                  label={label}
                  onPress={this.generateHandlePressUser(user)}
                  style={styles.gridSquare}
                />
              );
            })}
          </View>
        </ScrollView>

      </View>
    );
  }

}

let styles = StyleSheet.create({
  ...globalStyles,
  squareLabelText: {
    ...globalStyles.squareLabelText,
    textAlign: 'left'
  }
});

export default connect((state) => {
  return {
    users: state.users,
    boards: state.boardsByUser
  };
})(SignIn);
