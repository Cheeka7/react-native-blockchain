import React, {Component} from 'react';
import { View, StyleSheet, AppRegistry } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import BitcoinComponent from "./src/components/BitcoinComponent";
import SearchComponent from "./src/components/SearchComponent";
import TransactionListComponent from "./src/components/TransactionListComponent";

export default class App extends React.Component {
  render() {
    return (
        <RootStack/>
    );
  }
}

export var GlobalStore = {
    user: null,
    token: ''
}

const RootStack = createStackNavigator(
  {
    Search: { screen: SearchComponent },
    Bitcoin: { screen: BitcoinComponent },
    TransactionList: { screen: TransactionListComponent}
  },
  {
    initialRouteName: 'Search',
  }
);

AppRegistry.registerComponent('App', () => App);
