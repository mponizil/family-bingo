import React from 'react-native';

let {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

import globalStyles from '../styles/global';

class Square extends React.Component {

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={this.props.style || styles.square}
      >
        <Image
          source={{uri: this.props.image}}
          style={{
            width: this.props.width || 200,
            height: this.props.height || 200
          }}
        />
        <View style={[styles.squareLabel, {
          width: this.props.width || 200
        }]}>
          {this.props.label}
        </View>
      </TouchableOpacity>
    );
  }

}

let styles = StyleSheet.create({
  ...globalStyles
});

export default Square;
