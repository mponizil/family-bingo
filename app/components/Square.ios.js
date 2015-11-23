import React from 'react-native';

let {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} = React;

import globalStyles from '../styles/global';

class Square extends React.Component {

  render() {
    var mark;
    if (this.props.isMarked) {
      mark = (
        <View style={styles.squareMark}>
          <Image
            source={{uri: 'https://i.imgur.com/hwp3ALu.png'}}
            style={{width: 80, height: 80}}
          />
        </View>
      );
    }
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={this.props.style || styles.square}
      >
        <Image
          source={{uri: this.props.data.photo}}
          style={{
            width: this.props.width || 200,
            height: this.props.height || 200
          }}
        />
        <View style={[styles.squareLabel, {
          width: this.props.width || 200
        }]}>
          <Text
            style={[styles.squareLabelText, this.props.textStyle]}
          >{this.props.data.name}</Text>
        </View>
        {mark}
      </TouchableOpacity>
    );
  }

}

let styles = StyleSheet.create({
  ...globalStyles
});

export default Square;
