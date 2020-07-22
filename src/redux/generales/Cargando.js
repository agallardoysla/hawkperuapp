import React from 'react';
import { StyleSheet, View, Platform, ActivityIndicator, Alert, BackHandler, Text } from 'react-native';
import { colores } from '../../constantes/Temas';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Cargando = (props) => {
	return (
		<View style={[styles.container, props.style]}>
			<Text
				style={[
					{
						alignSelf: 'center',
						fontFamily: 'RobotoBold',
						fontSize: RFPercentage(3.5),
						color: colores.verCanasta,
					},
					props.tituloStyle,
				]}
			>
				{props.titulo !== undefined ? props.titulo : '¡Bienvenido!'}
			</Text>
			<ActivityIndicator size="large" color={colores.verCanasta} />
			{props.showError && (
				<Text
					style={[
						{
							alignSelf: 'center',
							fontFamily: 'RobotoBold',
							fontSize: RFPercentage(1.8),
							color: colores.verCanasta,
						},
						,
						props.errorStyle,
					]}
				>
					{props.error}
				</Text>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default Cargando;
