import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, FlatList, KeyboardAvoidingView} from 'react-native';
import {BlockchainService} from "../services/BlockchainService";
import { StackActions, NavigationActions } from 'react-navigation';
import {EventSystem} from "../../App";

export default class TransactionItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.item = this.props.item;
        this.details = this.props.details,
        this.address = this.props.details.address,
        this.state = {
          details: null
        }
        this.blockchainService = new BlockchainService()
    };

    render() {
      return (
        <View style={styles.transactionContainer}>
          <FlatList data={this.item} renderItem={({item}) =>this.renderItem(item)}/>
        </View>
      )
    }

    renderItem = (item) => {
      return (
        <TouchableOpacity onPress={() => this.getBitcoin(item)}>
          <View style={styles.transactionRowContainer}>
            <View style= {styles.transactionItemContainer}>
                <Text style={styles.hashText}>{item}</Text>
            </View>
            <View style={styles.moreContainer}>
              <Image style={styles.moreIcon} source={require('../assets/chevron-right.png')}/>
            </View>
          </View>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  viewContainer: {
    height: "100%", width: "100%", backgroundColor: "#fff"
  },
  header: {
    fontSize: 20, fontWeight: "bold", color: "#3a5aa3", marginTop: 10, marginLeft: 10
  },
  transactionContainer: {
     margin: 10, backgroundColor: "#fff"
  },
  transactionRowContainer: {
    borderWidth: 1, backgroundColor: "#fff", borderColor: "#3a5aa3",  flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  transactionItemContainer: {
    flexDirection: 'column', width: "90%", marginLeft: 5
  },
  moreContainer: {
   justifyContent: 'center', alignItems: 'center'
  },
  moreIcon: {
    color: "#3a5aa3", height: 25, width: 25
  },
  gap: {
      height: "5%"
  },
  hashText: {
    padding: 5, fontSize: 12
  }
})
