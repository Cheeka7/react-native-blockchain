import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image} from 'react-native';
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
          details: null
        }
    };

    render() {
        return (
          <View style={{backgroundColor: "#fff"}}>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <Image style={{
                              width: 150,
                              height: 150,
                              top: 30

                          }}
                          resizeMode={Image.resizeMode.contain}
                          source={require('../assets/blockchain.png')}
              />
            </View>
            <View style={{marginTop: 100}}>
              <Text style={{textAlign: "center", height: 20, fontSize: 20, color: "#3a5aa3", fontWeight: "bold"}}> Please enter the bitcoin address </Text>
              <View style={{height: "20%"}}/>
              <TextInput
                  autoFocus={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                      height: 30,
                      borderColor: "#3a5aa3",
                      borderBottomWidth: 1,
                      left: "10%",
                      width: 300
                  }}
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
            <View style={{alignItems: 'center', backgroundColor: "#fff"}} >
              <TouchableOpacity onPress={() => this.search()}
                                    style={{
                                        width: 170,
                                        height: 35,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        backgroundColor: "#fff",
                                        borderColor: "#3a5aa3",
                                        borderWidth: 2,
              }}>
                <Text style={{fontWeight: 'bold', color: "#3a5aa3"}}>
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }

    //first checks whether the bitcoin address is valid
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
      this.blockchainService.listBitcoinDetails(address, this.listBitcoinDetailsCallback)
    }

    listBitcoinDetailsCallback = (response) => {
        this.setState({
            details: response
        })
        this.props.navigation.navigate('Bitcoin', {data: this.state.details})
    }

}

const styles = StyleSheet.create({
    gap: {
        height: 10
    },
    errorText: {
        height: 40,
        color: "red",
        left: "10%",
        width: "90%"
    },
});
