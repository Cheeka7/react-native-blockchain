import React, {Component} from 'react';
import { View, StyleSheet, AppRegistry } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import BitcoinComponent from "./src/components/BitcoinComponent";
import SearchComponent from "./src/components/SearchComponent";
import TransactionListComponent from "./src/components/TransactionListComponent";
import InputTransactionComponent from "./src/components/InputTransactionComponent";
import OutputTransactionComponent from "./src/components/OutputTransactionComponent";

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

const RootStack = createStackNavigator(
  {
    Search: { screen: SearchComponent },
    Bitcoin: { screen: BitcoinComponent },
    TransactionList: { screen: TransactionListComponent},
    InputTransaction: { screen: InputTransactionComponent},
    OutputTransaction: { screen: OutputTransactionComponent}
  },
  {
    initialRouteName: 'Search',
  }
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});

AppRegistry.registerComponent('App', () => App);
