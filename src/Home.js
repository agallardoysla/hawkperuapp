import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//importaciones necesarias para redux
import { connect } from 'react-redux';
import { actions } from './redux';
import { getAllUsers } from './apis/firebase';

function Home(props) {
	//alert('hola');
	//console.log('Primer redux', props.login);

	const probando = async () => {
		await getAllUsers((r) => {
			console.log('Homa', r);
		});
	};

	useEffect(() => {
		probando();
	}, []);

	return (
		<View style={styles.container}>
			<Text>Hola Mundo</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		flex: 1,
	},
});

const mapStateToProps = (state) => ({
	login: state.login.login,
});
export default connect(mapStateToProps)(Home);
