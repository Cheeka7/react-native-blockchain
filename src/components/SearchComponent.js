import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, ActivityIndicator, Modal} from 'react-native';
import {validate} from "../utils/validation";
import {BlockchainService} from "../services/BlockchainService";

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.blockchainService = new BlockchainService()
        this.state = {
          address: null,
          addressErrorMessage: '',
          addressError: false,
          details: null,
          modalVisible: false
        }
    };

    render() {
        return (
          <View style={styles.container}>
              <View style={styles.center}>
                <Image style={styles.imageContainer}
                            resizeMode={Image.resizeMode.contain}
                            source={require('../assets/blockchain.png')}/>
              </View>
              <View style={styles.searchContainer}>
                <Text style={styles.labelText}> Please enter the bitcoin address </Text>
                <View style={styles.searchInputContainer}/>
                <TextInput
                    autoFocus={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.searchInput}
                    onChangeText={(address) => {
                          let v = validate('address', address);
                          this.setState({address: address, addressError: !v[0], addressErrorMessage: v[1]})
                      }}
                    placeholder="Your bitcoin address"
                    value={this.state.address}
                />
                <Text style={styles.errorText}>
                    {this.state.addressErrorMessage}
                </Text>
              </View>
              <View style={styles.searchButtonContainer}>
                <TouchableOpacity onPress={() => this.search()} style={styles.searchButton}>
                  <Text style={styles.searchText}>
                    Search
                  </Text>
                </TouchableOpacity>
              </View>
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
        );
    }

    //to check whether the bitcoin address is valid
    search = () => {
      let addressResponse = validate('address', this.state.address);
      if (addressResponse[0]) {
            this.getDetails(this.state.address);
        } else {
            this.setState({
                addressError: !addressResponse[0],
                addressErrorMessage: addressResponse[1],
            })
        }
    }

    getDetails = (address) => {
      this.setState({
          modalVisible: true
      })
      this.blockchainService.listBitcoinDetails(address, this.listBitcoinDetailsCallback)
    }

    listBitcoinDetailsCallback = (response) => {
      if(!response.error) {
        this.setState({
            details: response,
            modalVisible: false
        })
        this.props.navigation.navigate('Bitcoin', {data: this.state.details})
      } else {
        this.setState({
            modalVisible: false,
            addressError: true,
            addressErrorMessage: 'Empty bitcoin address',
        })
      }
    }

}

const styles = StyleSheet.create({
    container: {
      height: "100%", flex: 1, backgroundColor: '#fff',
    },
    center: {
      alignItems: 'center', justifyContent: 'center'
    },
    imageContainer: {
      width: 150, height: 150
    },
    searchContainer: {
      marginTop: 50
    },
    labelText: {
      textAlign: "center", height: 20, fontSize: 20, color: "#3a5aa3", fontWeight: "bold"
    },
    searchInputContainer : {
      height: "10%"
    },
    searchInput: {
        height: 30, borderColor: "#3a5aa3", borderBottomWidth: 1, left: "10%", width: 300
    },
    errorText: {
        height: 40, color: "#f00", left: "10%", width: "90%"
    },
    searchButtonContainer: {
      alignItems: 'center'
    },
    searchButton: {
        width: 170, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: "#fff",
        borderColor: "#3a5aa3", borderWidth: 2,
    },
    searchText: {
      fontWeight: 'bold', color: "#3a5aa3"
    },
    modalContainer: {
      height: "100%", width: "100%", alignItems: "center", backgroundColor: 'rgba(0,0,0,0)'
    },
    loadingContainer: {
      height: 250
    }
});
