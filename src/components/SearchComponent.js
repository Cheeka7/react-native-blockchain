import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {validate} from "../utils/validation";
// import {BlockchainService} from "../services/BlockchainService";

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        // this.blockchainService = new BlockchainService()
        this.state = {
          address: null,
          addressErrorMessage: '',
          addressError: false,
        }
    };

    render() {
        return (
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center', bottom: "40%"}}>
              <Image style={{
                              width: 150,
                              height: 150,

                          }}
                          resizeMode={Image.resizeMode.contain}
                          source={require('../assets/blockchain.png')}
              />
            </View>
            <Text style={{textAlign: "center", height: 20, fontSize: 20, color: "#3a5aa3", fontWeight: "bold"}}> Please enter the bitcoin address </Text>
              <View style={{height: "10%"}}/>
              <TextInput
                  autoFocus={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                      height: 30,
                      borderColor: "#3a5aa3",
                      borderBottomWidth: 1,
                      left: "3%",
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
                                        left: "20%"
              }}>
                <Text style={{fontWeight: 'bold', color: "#3a5aa3"}}>
                        Search
                </Text>
              </TouchableOpacity>

            </View>
        );
    }

    //first checks whether the bitcoin address is valid
    search = () => {
      let addressResponse = validate('address', this.state.address);
      if (addressResponse[0]) {
            return true;
        } else {
            this.setState({
                addressError: !addressResponse[0],
                addressErrorMessage: addressResponse[1],
            })
            return false;
        }
    }

}

const styles = StyleSheet.create({
    gap: {
        height: 10
    },
    errorText: {
        height: 40,
        color: "red",
        left: "5%",
        width: "90%"
    },
});
