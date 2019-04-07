import React, { Component } from 'react';  
import { StyleSheet, ImageBackground, Button, View, Text } from 'react-native';
// Import the screens
import Main from './Main';
import Chat from './Chat';
// Import React Navigation
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

class Welcome2 extends Component {  
  render() {
    return (
    	
    			<View >
                    <Button 
                        onPress={() => {
                            this.props.navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [
                                  NavigationActions.navigate({ routeName: 'Main' })
                                ],
                              }))    
                        }}
                        title="START"
                        color="green"
                    />
    			</View>

    );
  }
}

const AppNavigator = createStackNavigator({
	ChatBox: {screen: Welcome2},
    Main: { screen: Main },
  	Chat: { screen: Chat },
  }, {
    defaultNavigationOptions: {
       header: null }
 },{
      initialRouteName: 'ChatBox',
  });
  
const AppContainer1 = createAppContainer(AppNavigator);

class CommunityForum extends Component {
    static defaultNavigationOptions = {
        title: 'ChatBox'
    };

    render() {
        return(
             <AppContainer1 />
        );
    }
}
export default CommunityForum;