import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Animated, Keyboard, StyleSheet, Image, FlatList} from 'react-native';


export default class BitcoinComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          details: this.props.data
        }
    };

    render() {
        return (
          <View style={{flex: 5}}>
            <FlatList data={this.state.details.txs} renderItem={({item}) => this.renderItem(item)} extraData={this.state}/>
          </View>

        );
    }

    renderItem = (item) => {
         return (
           <View>
             <Text> Hash: {item.hash} </Text>
           </View>
         )
     }


}
