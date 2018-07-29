import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, FlatList, KeyboardAvoidingView} from 'react-native';
import {BlockchainService} from "../services/BlockchainService";
import { StackActions, NavigationActions } from 'react-navigation';
import {EventSystem} from "../../App";

export default class TransactionItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.item = this.props.item;
        this.address = this.props.address;
        this.state = {
          details: null
        }
        this.blockchainService = new BlockchainService()
    };

    render() {
      return (
        <View style={{
              height: "100%",
              width: "100%",
              flexDirection: "column",
          }}>
          <FlatList data={this.item}
                    renderItem={({item}) =>this.renderItem(item)}/>
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
        this.props.navigation.push('Bitcoin', {data: this.state.details})
    }



}
