import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, FlatList, KeyboardAvoidingView} from 'react-native';


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
        <View style={{flex: 5}}>
          <FlatList data={this.state.details.txs} renderItem={({item}) => this.renderItem(item)}/>
        </View>
      )
   }

   renderItem = (item) => {
        return (
          <KeyboardAvoidingView>
            <View>
              <TouchableOpacity onPress={() => this.getTransaction(item)}>
                <Text> Hash: {item.hash} </Text>
              </TouchableOpacity>
            </View>
         </KeyboardAvoidingView>
        )
    }

    getTransaction = (item) => {
      this.props.navigation.navigate('TransactionList', {address: this.state.details.address, transactionDetails: item})

    }


}
