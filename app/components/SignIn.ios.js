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
      <View style={[styles.screen, {paddingTop: 20}]}>

        <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.grid}>
            {Object.keys(this.props.users).map((id) => {
              let user = this.props.users[id];
              return (
                <Square
                  key={id}
                  image={user.photo200}
                  label={user.name}
                  onPress={this.generateHandlePressUser(user)}
                  style={styles.gridSquare}
                />
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.instructions}>
          <Text style={styles.instructionsText}>
            Hello, welcome to Thanksgiving! This here is Family Bingo, the game where you have to have real conversations with your family members in order to win a ticket for dessert. Find and select your photo to get started!
          </Text>
        </View>

      </View>
    );
  }

}

let styles = StyleSheet.create({
  ...globalStyles
});

export default connect((state) => {
  return {
    users: state.users
  };
})(SignIn);
