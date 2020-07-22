import { combineReducers } from 'redux';

import login, { actualizarLogin } from './login';

export default combineReducers({
	login,
});

export const actions = {
	actualizarLogin,
};
