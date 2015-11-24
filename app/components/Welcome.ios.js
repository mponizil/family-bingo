import React from 'react-native';

let {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} = React;

import SignIn from './SignIn';

import globalStyles from '../styles/global';

class Welcome extends React.Component {

  handlePressStart() {
    this.props.navigator.push({
      component: SignIn
    });
  }

  render() {
    return (
      <View style={[styles.screen, {flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 60}]}>
        <Image
          source={{uri: 'https://i.imgur.com/MpBpC8V.png'}}
          style={{
            width: 949,
            height: 225
          }}
        />
        <View>
          <Text style={styles.heading}>Come enjoy this years Thanksgiving app (itizer). Play Family Bingo and win your tickets for dessert. Let’s get started!</Text>
          <Text style={styles.text}>Here's how to play:</Text>
          <Text style={styles.text}>1) Tap on your picture to sign in. You’ll get your own unique Bingo board, filled with family photos.</Text>
          <Text style={styles.text}>2) When you tap on a photo you'll see a question.</Text>
          <Text style={styles.text}>3) Find the person in the photo and ask them the question.</Text>
          <Text style={styles.text}>4) Come back and check off the photo.</Text>
          <Text style={styles.text}>5) When you get 5 in a row, you get a coupon for dessert! Each time you complete a row, you get another dessert ticket. No tickets, no dessert!</Text>
        </View>
        <TouchableOpacity onPress={this.handlePressStart.bind(this)} style={styles.button}>
          <Text style={[styles.buttonText, {
            fontSize: 24
          }]}>Let's Begin!</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  ...globalStyles,
  heading: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    color: '#ffffff'
  }
});

export default Welcome;
