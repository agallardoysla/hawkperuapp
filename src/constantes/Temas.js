import { Dimensions } from 'react-native';

export const colores = {
	fondo: '#e1e8f4',
	verde: '#00855a',
	rojo: '#c00525',
	cuidado: '#4DACC5',
	farmacia: '#C73634',
	mercado: '#A2C037',
	agregar: '#DA9A0F',
	modcantidad: '#A7AFC5',
	masmenos: '#71788D',
	verCanasta: '#273791',
	naranja: '#E1B100',
	dorado: '#E1B100',
	gratis: '#c00525',
};
export const opacidades = {
	bordesInputs: 'rgba(52,52,52,0.6)',
	vacio: 'rgba(52,52,52,0.4)',
	vacioGrave: 'rgba(52,52,52,0.9)',
	verCanasta: 'rgba(78,69,142,0.5)',
};
export const tamañoLetra = {
	terminos: 2.2,
	tituloContainer: 2.5,
	botones: 2.5,
};
export const pantalla = {
	screenHeight: Math.round(Dimensions.get('window').height),
	screenWidth: Math.round(Dimensions.get('window').screenWidth),
};
