import React from 'react';
import {View, Text, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, FlatList, KeyboardAvoidingView,  ActivityIndicator, Modal} from 'react-native';
import {BlockchainService} from "../services/BlockchainService";
import {StackActions, NavigationActions} from 'react-navigation';
import {EventSystem} from "../../App";

export default class TransactionItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.item = this.props.item;
        this.details = this.props.details,
        this.address = this.props.details.address,
        this.state = {
          details: null,
          modalVisible: false
        }
        this.blockchainService = new BlockchainService()
    };

    render() {
      return (
        <View style={styles.transactionContainer}>
          <FlatList data={this.item} renderItem={({item}) =>this.renderItem(item)}/>
          <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.loadingContainer}/>
                <ActivityIndicator size="large"/>
            </View>
           </Modal>
        </View>
      )
    }

    renderItem = (item) => {
      return (
        <View>
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
        </View>
      )
    }

    getBitcoin = (address) => {
      this.setState({
          modalVisible: true
      })
      this.blockchainService.listBitcoinDetails(address, this.listBitcoinDetailsCallback)
    }

    listBitcoinDetailsCallback = (response) => {
        this.setState({
            details: response,
            modalVisible: false
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
    borderWidth: 0.5, backgroundColor: "#fff", borderColor: "#3a5aa3",  flexDirection: 'row',
    justifyContent: 'flex-start', paddingBottom: 15, paddingTop: 5, paddingLeft: 5, paddingRight: 5
  },
  transactionItemContainer: {
    flexDirection: 'column', width: "90%", marginLeft: 5
  },
  moreContainer: {
   justifyContent: 'center', alignItems: 'center'
  },
  moreIcon: {
   height: 30, width: 25
  },
  gap: {
      height: "5%"
  },
  hashText: {
    padding: 5, fontSize: 13
  },
  modalContainer: {
    height: "100%", width: "100%", alignItems: "center", backgroundColor: 'rgba(0,0,0,0)'
  },
  loadingContainer: {
    height: 250
  }
})
