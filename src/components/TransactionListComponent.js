import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, FlatList, KeyboardAvoidingView} from 'react-native';

export default class TransactionListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          input: this.props.navigation.state.params.transactionDetails.inputs,
          output: this.props.navigation.state.params.transactionDetails.out,
          address: this.props.navigation.state.params.address,
          inputList: [],
          outputList: []
        }
        this.navigation = this.props.navigation;
        this.isIncoming = false;
        // this.inputList = [];
        // this.outputList = [];
    };
    componentDidMount() {
      this.getTransactionDetails();
    }

    getTransactionDetails = () =>
    {
      let inputList=this.state.inputList;
      let outputList=this.state.outputList;
      for(var i=0; i< this.state.input.length; i++) {
        if(this.state.input[i].prev_out.addr != this.state.address) {
          //add this address to the incoming transaction list
            inputList.push(this.state.input[i].prev_out.addr);
            this.setState({inputList: inputList});
            this.isIncoming = true;
        }
      }

      if(!this.isIncoming) {
        for(var i=0; i< this.state.output.length; i++) {
            //add this address to the outgoing transaction list
            outputList.push(this.state.output[i].addr);
            this.setState({outputList: outputList});
            // this.setState({outputList.push(this.state.output[i].addr)});
        }
      }
    }

    render() {
      return (
        <KeyboardAvoidingView>
          <View>
            <TouchableOpacity onPress={() => {this.navigation.navigate("InputTransaction", {address: this.state.address, input: this.state.inputList})}}>
              <Text> Incoming </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {this.navigation.navigate("OutputTransaction", {address: this.state.address, output: this.state.outputList})}}>
              <Text> Outgoing</Text>
            </TouchableOpacity>
          </View>
       </KeyboardAvoidingView>
      )
    }



}
