import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, FlatList, KeyboardAvoidingView} from 'react-native';
import {BlockchainService} from "../services/BlockchainService";

export default class OutputTransactionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.output = this.props.navigation.state.params.output;
        this.address = this.props.navigation.state.params.address;
        this.state = {
          details: null
        }
        this.blockchainService = new BlockchainService()

    };

    render() {
      return (
        <View style={{flex: 5}}>
          <FlatList data={this.output}
                    renderItem={({item}) => this.renderItem(item)}/>
        </View>
      )
    }

    renderItem = (item) => {
      return (
        <View>
          <TouchableOpacity onPress={() => this.getBitcoin(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        </View>
      )
    }

    getBitcoin = (address) => {
      this.blockchainService.listBitcoinDetails(address, this.listBitcoinDetailsCallback)
    }

    listBitcoinDetailsCallback = (response) => {
        this.setState({
            details: response
        })
        this.props.navigation.navigate('Bitcoin', {data: this.state.details})
    }


}
