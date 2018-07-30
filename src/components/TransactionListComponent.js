import React from 'react';
import {View, Text, ScrollView, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, FlatList, KeyboardAvoidingView} from 'react-native';
import TransactionItemComponent from "./TransactionItemComponent";

export default class TransactionListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          details: this.props.navigation.state.params.details,
          inputList: this.props.navigation.state.params.input,
          outputList: this.props.navigation.state.params.output,
          address: this.props.navigation.state.params.details.address
        }
        this.navigation = this.props.navigation;
    };

    render() {
      return (
        <KeyboardAvoidingView style={styles.viewContainer}>
          <ScrollView>
            <View>
                {this.backHome()}
            </View>
            <View>
              <Text style={styles.header}> Bitcoin Address: </Text>
              <Text style={styles.addressText}> {this.state.address}</Text>
            </View>
            <View>
                {this.getTransaction()}
            </View>
          </ScrollView>
       </KeyboardAvoidingView>
      )
    }

    backHome = () => {
      return (
        <View>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate("Search")}}>
            <View style={styles.homeContainer}>
              <Image style={styles.homeIcon} source={require('../assets/home.png')}/>
            </View>
          </TouchableOpacity>
        </View>
      )
    }

    getTransaction = () => {
      if (this.state.inputList.length)
        return (
          <View>
            <Text style={styles.header}> Incoming Transaction(s) </Text>
            <TransactionItemComponent navigation={this.navigation} details={this.state.details}
                                      item={this.state.inputList}
            />
          </View>
        )
      else
        return (
          <View>
          <Text style={styles.header}> Outgoing Transaction(s) </Text>
            <TransactionItemComponent navigation={this.navigation} details={this.state.details}
                                      item={this.state.outputList}/>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  viewContainer: {
    height: "100%", width: "100%", backgroundColor: "#fff"
  },
  header: {
    fontSize: 20, color: "#3a5aa3", marginTop: 10, marginLeft: 10,
  },
  homeContainer: {
   justifyContent: 'flex-end', alignItems: 'flex-end', margin: 10
  },
  homeIcon: {
    height: 30, width: 30
  },
  addressText:{
    fontSize: 14, fontWeight: "bold", marginLeft: 10, marginBottom: 20, marginTop: 3
  },
})
