/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';

import SignIn from './app/components/SignIn';

let {
  AppRegistry,
  StyleSheet,
  Navigator,
} = React;

class FamilyBingo extends React.Component {

  renderScene(route, navigator) {
    let Component = route.component;
    return (
      <Component
        navigator={navigator}
        route={route}
        {...route.passProps}
      />
    );
  }

  render() {
    return (
      <Navigator
        sceneStyle={{flex: 1, backgroundColor: '#ffffff'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => route.transition || Navigator.SceneConfigs.FloatFromRight}
        initialRoute={{
          component: SignIn
        }}
      />
    );
  }

}

let styles = StyleSheet.create({});

AppRegistry.registerComponent('FamilyBingo', () => FamilyBingo);
