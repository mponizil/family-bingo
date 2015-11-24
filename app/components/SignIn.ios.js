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
            Select your photo to access your Bingo Board
          </Text>
          <View style={styles.navigationBarItem}></View>
        </View>

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
