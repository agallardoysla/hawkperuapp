import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import Home from './Home';
import Map from './screens/Map'
import Gestion from './screens/Gestion'
import TomarFoto from './screens/TomarFoto'
import Chat from './screens/Chat'

const Navegador = (props) => {
	const Stack = createStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName="Gestion"
			>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name='Map' component={Map}  />
				<Stack.Screen name='Gestion' component={Gestion} initialParams={{Direccion: null, photo: null}} />
				<Stack.Screen name='Camara' component={TomarFoto}  />
				<Stack.Screen name='Chat' component={Chat}  />
			</Stack.Navigator>
		</NavigationContainer>
	);
};
const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start',
		//backgroundColor: '#e1e8f4',
	},
});

const mapStateToProps = (state) => ({
	login: state.login,
});

export default connect(mapStateToProps)(Navegador);
