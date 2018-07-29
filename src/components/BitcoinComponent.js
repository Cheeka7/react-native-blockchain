import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, FlatList, KeyboardAvoidingView} from 'react-native';

export default class BitcoinComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          details: this.props.navigation.state.params.data,
          address: this.props.navigation.state.params.data.address,
          inputList: [],
          outputList: []
        }
        this.isIncomingTransaction = false;
    };


    render() {
      return (
        <KeyboardAvoidingView style={styles.viewContainer}>
          <Text style={styles.header}> Summary </Text>
          <View>
              {this.getSummary()}
          </View>
          <View style={styles.gap}/>
          <Text style={styles.header}> Transaction Hash </Text>
          <View>
              {this.getTransactionDetails()}
          </View>
        </KeyboardAvoidingView>

      );
    }

    getSummary = () => {
      return (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryAddressContainer}>
            <Text style={styles.summaryText}> Address: </Text>
            <Text style={styles.addressText}>{this.state.details.address}</Text>
          </View>
          <View style={styles.summaryRowContainer}>
            <Text style={styles.summaryText}> No. of transactions: </Text>
            <Text>{this.state.details.n_tx}</Text>
          </View>
          <View style={styles.summaryRowContainer}>
            <Text style={styles.summaryText}> Final balance: </Text>
            <Text> {this.state.details.final_balance}</Text>
          </View>
          <View style={styles.summaryAddressContainer}>
            <Text style={styles.summaryText}>Hash: </Text>
            <Text style={styles.addressText}> {this.state.details.hash160}</Text>
          </View>
        </View>
      )
    }

    getTransactionDetails = () => {
      return (
        <View style={styles.transactionContainer}>
          <FlatList data={this.state.details.txs} renderItem={({item}) => this.renderItem(item)}/>
        </View>
      )
   }

   renderItem = (item) => {
        return (
          <View style={styles.transactionRowContainer}>
            <View style= {styles.transactionItemContainer}>
              <TouchableOpacity onPress={() => this.getTransaction(item)}>
                <Text style={styles.hashText}> {item.hash} </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.moreContainer}>
              <Image style={styles.moreIcon} source={require('../assets/chevron-right.png')}/>
            </View>
          </View>
        )
    }

    getTransaction = (item) => {
      this.state.inputList = [];
      this.state.outputList = [];
      this.isIncomingTransaction = false;
      let inputList = this.state.inputList;
      let outputList = this.state.outputList;
      let input= item.inputs;
      let output = item.out;
      for(var i=0; i< input.length; i++) {
        if(input[i].prev_out.addr != this.state.address) {
          //add this address to the incoming transaction list
            inputList.push(input[i].prev_out.addr);
            this.setState({inputList: inputList});
            this.isIncomingTransaction = true;
        }
      }

      if(!this.isIncomingTransaction) {
        for(var i=0; i< output.length; i++) {
            //add this address to the outgoing transaction list
            outputList.push(output[i].addr);
            this.setState({outputList: outputList});
        }
      }
      this.props.navigation.push('TransactionList', {address: this.state.details.address, input: this.state.inputList, output: this.state.outputList})
    }
}

const styles = StyleSheet.create({
  viewContainer: {
    height: "100%", width: "100%", backgroundColor: "#fff"
  },
  header: {
    fontSize: 20, fontWeight: "bold", color: "#3a5aa3", marginTop: 10, marginLeft: 10,
  },
  summaryContainer: {
    borderWidth: 1, margin: 10, backgroundColor: "#fff", padding: 10, borderColor: "#3a5aa3"
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
   justifyContent: 'center', alignItems: 'center',
  },
  moreIcon: {
    color: "#3a5aa3", height: 25, width: 25
  },
  gap: {
      height: "5%"
  },
  summaryRowContainer: {
    flexDirection: "row", alignItems: "center", justifyContent: "center"
  },
  summaryAddressContainer: {
    padding: 10, alignItems: "center", justifyContent: "center"
  },
  summaryText: {
    fontSize: 20, color: "#3a5aa3", marginLeft: 3
  },
  addressText:{
    fontSize: 12, fontWeight: "bold"
  },
  hashText: {
    padding: 5, fontSize: 12
  }
})
