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

export var EventSystem = (function () {
    var self = this;
    self.queue = {};
    return {
        publish: function (event, data) {
            var queue = self.queue[event];
            if (typeof queue === 'undefined') {
                return false;
            }
            for(var i=0; i<queue.length; i++){
                queue[i](data)
            }
            return true;
        },

        subscribe: function (event, callback) {
            if (typeof self.queue[event] === 'undefined') {
                self.queue[event] = [];
            }

            self.queue[event].push(callback);
        },

        unsubscribe: function (event, callback) {
            self.queue[event].pop(callback);
        }
    };
}());

AppRegistry.registerComponent('App', () => App);
