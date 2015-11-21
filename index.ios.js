/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import _ from 'underscore';
import React from 'react-native';
import {
  Provider
} from 'react-redux/native';

import SignIn from './app/components/SignIn';

let {
  AppRegistry,
  Navigator,
} = React;

import configureStore from './app/configureStore';
let store = configureStore();

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
      <Provider store={store}>
        {() =>
          <Navigator
            sceneStyle={{flex: 1, backgroundColor: '#f5f5f5'}}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route) => route.transition || Navigator.SceneConfigs.FloatFromRight}
            initialRoute={{
              component: SignIn
            }}
          />
        }
      </Provider>
    );
  }

}

AppRegistry.registerComponent('FamilyBingo', () => FamilyBingo);
