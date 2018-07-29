import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, FlatList, KeyboardAvoidingView} from 'react-native';
import TransactionItemComponent from "./TransactionItemComponent";

export default class TransactionListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          address: this.props.navigation.state.params.address,
          inputList: this.props.navigation.state.params.input,
          outputList: this.props.navigation.state.params.output
        }
        this.navigation = this.props.navigation;
    };

    render() {
      return (
        <KeyboardAvoidingView style={{
              height: "100%",
              width: "100%",
              flexDirection: "column",
          }}>
          <View style={{flex: 3}}>
              {this.getInputTransaction()}
          </View>
          <View style={{flex: 3}}>
              {this.getOutputTransaction()}
          </View>
       </KeyboardAvoidingView>
      )
    }

    getInputTransaction = () => {
      return (
        <View>
          <Text> Incoming Transaction </Text>
          <TransactionItemComponent navigation={this.navigation} address={this.state.address} item={this.state.inputList}/>
        </View>
      )
    }

    getOutputTransaction = () => {
      return (
        <View>
        <Text> Outgoing Transaction </Text>
          <TransactionItemComponent navigation={this.navigation} address={this.state.address} item={this.state.outputList}/>
        </View>
      )
    }
}
