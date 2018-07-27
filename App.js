import React, {Component} from 'react';
import { View, StyleSheet, AppRegistry } from 'react-native';
import {StackNavigator} from 'react-navigation';
import BitcoinComponent from "./src/components/BitcoinComponent";
import SearchComponent from "./src/components/SearchComponent";

export default class App extends React.Component {
  render() {
    return (
       <View style={styles.container}>
        <RootStack/>
      </View>
    );
  }
}

export var GlobalStore = {
    user: null,
    token: ''
}

const RootStack = StackNavigator(
  {
    Search: { screen: SearchComponent },
    Bitcoin: { screen: BitcoinComponent }
  },
  {
    initialRouteName: 'Search',
  }
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 0.5,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});

AppRegistry.registerComponent('App', () => App);
