import React, { Component } from 'react';
import Home from './HomeComponent';
import Address from './AddressComponent';
import CommunityForum from './CommunityForumComponent';
import { StyleSheet, ImageBackground, Button, View, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';


const HomeNavigator = createStackNavigator({
    Home: { screen: Home },
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#006400"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />     
    })
  });


const AddressNavigator = createStackNavigator({
    Address: { screen: Address }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#006400"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />  
    })
});

const CommunityForumNavigator = createStackNavigator({
    CommunityForum: { screen: CommunityForum },
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#006400"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />     
    })
  });

export default MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      }, 
    Address: { screen: AddressNavigator,
        navigationOptions: {
          title: 'Add New Booth',
          drawerLabel: 'Add',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='plus'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      },
    CommunityForum: { screen: CommunityForumNavigator,
      navigationOptions: {
        title: 'Community Forum',
        drawerLabel: 'Community Forum',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='address-card'
            type='font-awesome'            
            size={24}
            color={tintColor}
          />
        ),
      }
    },
},     
{
  drawerBackgroundColor: '#006400'
});