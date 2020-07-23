import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

export const firebaseConfig = {
	apiKey: 'AIzaSyAh8muXfWDQ7nIhewKZJNXrpn20qV83_K0',
	authDomain: 'camp-ebd9b.firebaseapp.com',
	databaseURL: 'https://camp-ebd9b.firebaseio.com',
	projectId: 'camp-ebd9b',
	storageBucket: 'camp-ebd9b.appspot.com',
	messagingSenderId: '820604354987',
	appId: '1:979738891294:android:4fb0a381432babeebc0a0f',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

import { decode, encode } from 'base-64';

if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}

const firestore = firebase.firestore(firebaseApp);

export const getAllUsers = async (funcion = () => {}) => {
	try {
		const Db = firestore.collection('gestion');

		Db.onSnapshot(
			{
				includeMetadataChanges: true,
			},
			function (docs) {
				var users = [];
				docs.forEach(function (doc) {
					users.push({
						...doc.data(),
						id: doc.id,
						//doc: doc
					});
				});
				//console.log('firestore', users);
				funcion(users);
			}
		);
	} catch (err) {
		console.log('error', err);
	}
};

export const saveUser = async (user = {}) => {
	try {
		let mydoc = firestore.collection('gestion').doc();
		mydoc.set({
			created_at: new Date().getTime(),
			...user,
		});
	} catch (err) {
		console.log('error', err);
	}
};

export const updateUser = async (user = {}, operacion = true) => {
	try {
		let mydoc = firestore.collection('gestion').doc(user.id);
		if (operacion) {
			mydoc.update({
				estado_empresas: 1,
			});
		} else {
			mydoc.update({
				estado_empresas: 2,
			});
		}
	} catch (err) {
		console.log('error', err);
	}
};
