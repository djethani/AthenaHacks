import React, { Component } from 'react';  
import { StyleSheet, ImageBackground, Button, View, Text } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import MainNavigator from './MainComponent';

 class Welcome extends Component {  
  render() {
    return (
    	<ImageBackground
    		source={require('../images/background.jpg')}
    		style={styles.container}>

    		<View style={styles.overlayContainer}>
    			<View style={styles.menuContainer}>
                    <Button 
                        onPress={() => {
                            this.props.navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [
                                  NavigationActions.navigate({ routeName: 'Home' })
                                ],
                              }))    
                        }}
                        title="START"
                        color="#ffffff"
                    />
    			</View>
    		</View>

    	</ImageBackground>
    );
  }
}

const AppNavigator = createStackNavigator({
    Start: {
      screen: Welcome,
    },
    Home: {
      screen: MainNavigator,
    },
  }, {
    defaultNavigationOptions: {
       header: null }
 },{
      initialRouteName: 'Start',
  });
  
const AppContainer1 = createAppContainer(AppNavigator);

class Start extends Component {
    static defaultNavigationOptions = {
        title: 'Start'
    };

    render() {
        return(
             <AppContainer1 />
        );
    }
}

export default Start;

const styles = StyleSheet.create({  
	container: {
		width: '100%',
		height: '100%',
    justifyContent: 'center',
  },
  overlayContainer: {
  	backgroundColor: 'rgba(47,163,218, .3)'
  },
  top: {
  	height:'60%',
  	alignItems: 'center',
  	justifyContent: 'center',
  },
  header: {
  	color: '#fff',
  	fontSize: 30,
  	borderColor: '#fff',
  	borderWidth: 2,
  	padding: 20, 
  	paddingLeft: 40,
  	paddingRight: 40,
  	backgroundColor: 'rgba(255,255,255, .1)',
  },
  menuContainer: {
  	height: '40%',
  	flexDirection: 'row',
    flexWrap: 'wrap',
  	justifyContent: 'center'
  }
});