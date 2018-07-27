import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, FlatList, KeyboardAvoidingView} from 'react-native';
import TransactionList from "./TransactionList"

export default class BitcoinComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          details: this.props.navigation.state.params.data
        }
    };

    render() {
      return (
        <KeyboardAvoidingView style={{
              flexDirection: "column",
              height: "100%",
              width: "100%",
          }}>
          <View style={{flex: 5}}>
                    {this.getSummary()}
          </View>
          <View style={{flex: 5}}>
                  {this.getTransactionDetails()}
          </View>
        </KeyboardAvoidingView>

      );
    }

    getSummary = () => {
      return (
        <View>
          <Text> Address: {this.state.details.address}</Text>
          <Text> No. of transactions: {this.state.details.n_tx}</Text>
          <Text> Final balance: {this.state.details.final_balance}</Text>
          <Text> Hash: {this.state.details.hash160}</Text>
        </View>
      )
    }

    getTransactionDetails = () => {
      return (
        <TransactionList data = {this.state.details}/>
      )
   }


}
