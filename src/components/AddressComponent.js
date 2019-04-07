import React, { Component } from 'react';
import axios from 'axios'
import { convertToURI } from '../helpers'
import { db } from '../config';

import {
	View,
	StyleSheet,
	Text,
	TextInput,
	Button,
	TouchableOpacity
} from 'react-native';

class Address extends Component {
	constructor(props) {
		super(props);
		state = {
		    errorMessage: "",
		    address: "",
		    city: "",
		    zip: "",
		    latitude:0,
		    longitude: 0,
  		}
	}

	fetchGoogleMapAPI = () => {
	    const GOOGLE_MAPS_API_KEY = 'AIzaSyAYX_Ik1ABcOeRh0oB29W0ys19KboFL95c'
	    console.log('current state', this.state);
	    const { zip } = this.state
	    const address = convertToURI(this.state.address + '')
	    const city = convertToURI(this.state.city)
	    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city},ca,${zip}&key=${GOOGLE_MAPS_API_KEY}`
	    console.log(url);
	    fetch(url)
	    	.then((data) => data.json())
	      	.then(res => {
	      		this.setState({latitude: res.results[0].geometry.location.lat, longitude: res.results[0].geometry.location.lng})
	        	console.log('LATITUDE', this.state.latitude);
	        	console.log('Longitude', this.state.longitude);
	        	const lat = this.state.latitude;
				const long = this.state.longitude;


	        	const troopName = this.state.troopName;
	        	const troopNumber = this.state.troopNumber;
	        	const supportedCharities = this.state.supportedCharities;

	        	const samoas = this.state.samoas;
	        	const thinMints = this.state.thinMints;
	        	const shortbreads = this.state.shortbreads;

				const address = this.state.address;
				const city = this.state.city;
				const zip = this.state.zip;
				const coords = [lat, long];
				const combined = `${address}` +', ' + `${city}`+ ', CA ' + `${zip}`;
		    	db.ref('/booths').push({
		    		[combined]: {lat: lat, long: long, troopName: troopName, troopNumber:troopNumber, supportedCharities:supportedCharities, samoas: samoas, thinMints: thinMints, shortbreads:shortbreads}
		  		});
	      	})
  	}

	handleSubmit = () => {
		this.fetchGoogleMapAPI()
	}

	render() {
		return (
			<View style={styles.thoughtsform}>
				<View style={{height:40}}>

			    </View>
			    <Text>Where's your booth located?</Text>
				<TextInput
			        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			        onChangeText={(text) => this.setState({address: text})}
			        placeholder="address"
			    />
			    <TextInput
			        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			        onChangeText={(text) => this.setState({city: text})}
			        placeholder="city"
			    />
			    <TextInput
			        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			        onChangeText={(text) => this.setState({zip: text})}
			        placeholder="zip"
			    />	
			    <View style={{height:40}}>

			    </View>
			    <Text>Tell us more about your Troop:</Text>
			    <TextInput
			        style={{height: 40, borderColor: 'green', borderWidth: 1}}
			        onChangeText={(text) => this.setState({troopName: text})}
			        placeholder="Troop Name"
			    />	
			    <TextInput
			        style={{height: 40, borderColor: 'green', borderWidth: 1}}
			        onChangeText={(text) => this.setState({troopNumber: text})}
			        placeholder="Troop Number"
			    />	
			    <TextInput
			        style={{height: 40, borderColor: 'green', borderWidth: 1}}
			        onChangeText={(text) => this.setState({supportedCharities: text})}
			        placeholder="Supported Charities"
			    />	
			    <View style={{height:40}}>

			    </View>
			    <Text>How many cookie boxes do you have left at your booth?</Text>
			    <TextInput
			        style={{height: 40, borderColor: 'purple', borderWidth: 1}}
			        onChangeText={(text) => this.setState({samoas: text})}
			        placeholder="Samoas?"
			    />	
			    <TextInput
			        style={{height: 40, borderColor: 'purple', borderWidth: 1}}
			        onChangeText={(text) => this.setState({thinMints: text})}
			        placeholder="Thin Mints?"
			    />	
			    <TextInput
			        style={{height: 40, borderColor: 'purple', borderWidth: 1}}
			        onChangeText={(text) => this.setState({shortbreads: text})}
			        placeholder="Shortbreads?"
			    />	
			    <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
		        	<Text style={styles.btntext}>Submit</Text>
		        </TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  thoughtsform: {
    alignSelf: 'center',
  },

  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom:30,
    borderBottomWidth: 1,
  },

  button: {
    alignSelf: 'stretch',
    alignItems:'center',
    padding:20,
    backgroundColor: '#59cbbd',
    marginTop:30,
  },

  btntext: {
    color:'#fff',
    fontWeight:'bold',
  },
});

export default Address;