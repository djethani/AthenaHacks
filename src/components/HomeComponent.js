import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Button,
	TouchableOpacity,
	Modal
} from 'react-native';

import qs from 'qs';
import {MapView} from 'expo';
import { db } from '../config';

const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0975;
const LONGITUDE_DELTA = 0.0450;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			region: {
				latitude: LATITUDE,
				longitude: LONGITUDE,
		        latitudeDelta: LATITUDE_DELTA,
		        longitudeDelta: LONGITUDE_DELTA,
			},
			rideInfo: {
				cost:0,
				distance:0,
				time:0,
			},
			selectedBooth: {
				troopName: '',
				troopNumber: 0,
				samoas: 0,
				thinMints:0,
				shortbreads:0,
				supportedCharities: '',
			},
			isLoading:true,
			error: null,
			url: null,
			modalVisible: false,
			modalVisible2: false,
			booths: []
		};
		this.handleCalloutPress = this.handleCalloutPress.bind(this);
		this.forceUpdate()
		//this.fetchLyftMapAPI = this.fetchLyftMapAPI.bind(this);
	}

	fetchLyftMapAPI(){
		fetch('https://api.lyft.com/oauth/token', { 
		   method: 'POST', 
		   headers: new Headers({
		     'Authorization': 'CuCMZn3tOA8l:WQk1bryzOAC_81JmdxYhD26a18cGnW6w', 
		     'Content-Type': 'application/json',
		   }), 
		   body: qs.stringify({
		   		"grant_type": "client_credentials", 
		     	"scope": "public"
		   })
		 });

		const lat = this.state.region.latitude;
		const long = this.state.region.longitude;
		const url = `https://api.lyft.com/v1/cost?start_lat=37.7763&start_lng=-122.3918&end_lat=37.7972&end_lng=-122.4533`;
		fetch(url, {
			method: 'GET',
			headers: new Headers({
				"Authorization": 'Bearer /GY8xoMk9xtJvndmt08K3z9wBcAvgigdEg33Cnh8yyHKYLNdCwpkfOYQvYP+W6EPthLMdqvF89f3dFoKHaDMjU7gzOHxtihSmbfdlmissvQd7qaHBJ4zfFc=',
				'Content-Type': 'application/json'
			}),
		})
	    	.then((data) => data.json())
	      	.then(res => {
	        	console.log(res);
	        	this.setState({rideInfo: {
	        		cost: Math.floor(res.cost_estimates[0].estimated_cost_cents_max/100),
	        		distance: res.cost_estimates[0].estimated_distance_miles,
	        		time:Math.floor(res.cost_estimates[0].estimated_duration_seconds/60),
	        	}})
	      	})
	}

    componentDidMount() {
	    navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({region:{
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
								}, isLoading:false});
			},
			error => {
				this.setState({
					error: 'Error getting position'
				});				
			}
	    );

	    var recentPostsRef = db.ref('/booths');
		recentPostsRef.once('value').then(snapshot => {
		  	const boothCoords = [];
		  	let data = snapshot.val();
		    let keys = Object.keys(data);
		    console.log('KEYS', keys);
		    keys.forEach((key) => {	
		    	let addressCoords = Object.keys(data[key]);
		    	addressCoords.forEach((key2) => {	
		    		console.log(key2);
		    		let val = data[key][key2];
		    		boothCoords.push({coordinate: {latitude: val['lat'], longitude: val['long']}, 
		    							troopNumber: val['troopNumber'], troopName: val['troopName'], supportedCharities: val['supportedCharities'],
		    							samoas: val['samoas'], thinMints: val['thinMints'], shortbreads: val['shortbreads']});
		    	});
		    });

		  	this.setState({ booths: boothCoords });
		  	console.log(this.state.booths);
		});
  	}

  	componentWillUnmount() {
    	navigator.geolocation.clearWatch(this.watchID);
  	}

  	handleCalloutPress(booth){
  		this.setState({modalVisible: true, selectedBooth: {troopNumber: booth.troopNumber, supportedCharities: booth.supportedCharities, troopName: booth.troopName, samoas: booth.samoas, thinMints:booth.thinMints, shortbreads: booth.shortbreads}});
  		this.fetchLyftMapAPI(booth);
  	}

  	onPress = () => {
  		this.setState({modalVisible: false, modalVisible2: true});
  	}
  	render() {
  		const { isLoading } = this.state;
		return (
			<View style={styles.container}>
        		{isLoading ? (
          			<View style={styles.loadingContainer}>
            			<Text style={styles.loadingText}>Fetching Nearby Girl Scout Booths</Text>
          			</View>
        		) :
        			(<View style={styles.container}>
				    	<MapView
					        style={{ flex: 1 }}
					        initialRegion={{
					          latitude: this.state.region.latitude,
					          longitude: this.state.region.longitude,
					          latitudeDelta: LATITUDE_DELTA,
					          longitudeDelta: LONGITUDE_DELTA,
					        }}>
					        <MapView.Marker pinColor={'blue'} coordinate={{latitude:this.state.region.latitude,
	        																	longitude:this.state.region.longitude}} />
	        				{this.state.booths.map((booth, index) => {
	        					console.log('PLACE NAMES', this.state.booths);
	        					return (
	        						<MapView.Marker key={index} title={booth.troopName} onCalloutPress={() => this.handleCalloutPress(booth)}  pinColor={'green'} coordinate={{latitude:booth.coordinate.latitude,
	        																	longitude:booth.coordinate.longitude}} />
	        					);
	        				})}													
				      	</MapView>
				      	<Modal
				      		style={[styles.modal, styles.modal4]}
                			position={"bottom"}
							animationType="slide"
							ref={"modal4"}
							visible={this.state.modalVisible}
							onRequestClose={() => {
							Alert.alert('Modal has been closed.');
				        }} >
				        	<View style={{height: 100}}>
				        	</View>
				        	<View style={styles.lyftHeader}>
				        		<Text>Troop Name: {this.state.selectedBooth.troopName}</Text>
				        		<Text>Troop Number: {this.state.selectedBooth.troopNumber}</Text>
				        		<Text>Supported Charities: {this.state.selectedBooth.supportedCharities}</Text>
				        		<Text>Cookies Left: </Text>
				        		<Text>Samoas: {this.state.selectedBooth.samoas}</Text>
				        		<Text>Thin Mints: {this.state.selectedBooth.thinMints}</Text>
				        		<Text>Shortbreads: {this.state.selectedBooth.shortbreads}</Text>
				        	</View>
				        	<Button onPress={this.onPress}
								  title="Checkout"
								  color="#841584" />
				        </Modal>

				      	<Modal
				      		style={[styles.modal, styles.modal4]}
                			position={"bottom"}
							animationType="slide"
							ref={"modal4"}
							visible={this.state.modalVisible2}
							onRequestClose={() => {
							Alert.alert('Modal has been closed.');
				        }} >
				        	<View style={{height: 100}}>
				        	</View>
				        	<Text>Support the Girl Scouts by using promo code 76YWX8 </Text>
				        	<View style={styles.lyftHeader}>
				        		<Text>Let's find the nearest Lyft!</Text>
				        		<Text>Cost: ${this.state.rideInfo.cost}</Text>
				        		<Text>Distance: {this.state.rideInfo.distance} miles</Text>
				        		<Text>Time: {this.state.rideInfo.time} minutes</Text>
				        		<TouchableOpacity style={styles.lyftButton}>
				        			<Text>Request Lyft</Text>
				        		</TouchableOpacity>

				        	</View>
				        </Modal>


				     </View>
				    )}
			</View>
    	);
    }

}

const styles = StyleSheet.create({
	lyftHeader: {
    	alignSelf: 'center'
  	},

  	lyftButton: {
	  	paddingRight:100,
	    paddingLeft:100,
	   	paddingTop:10,
	    paddingBottom:10,
	    backgroundColor:'#ff1493',
	    borderWidth: 1,
	    color: 'white'
  	},

	container: {
    	height: '100%',
    	width: '100%',
	},
	loadingContainer: {
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: '#FFFDE4'
  	},
  	loadingText: {
    	fontSize: 30
  	},
	map: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute'
	},
	loadingContainer: {
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: '#FFFDE4'
  	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	button: {
		alignItems:'center',
		padding:20,
		backgroundColor: '#59cbbd',
		marginTop:30,
  	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	}
});


export default Home;