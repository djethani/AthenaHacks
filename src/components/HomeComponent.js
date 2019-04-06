import React, { Component } from 'react';
import { View, Text, StyleSheet, Card } from 'react-native';

class Home extends Component {
	render() {
        return(
        	<Text>Hello</Text>
        );
    }
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 120,
      flex:1,
      paddingTop: 30
    }
  });


export default Home;