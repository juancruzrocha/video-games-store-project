import { addFriends, resRequest, confirmFriend, pendFriend } from '../reducer/friendReducer';
import { LIST_USERS as User } from '../../utils/constants';
import axios from 'axios';
import { FriendConfirmed } from "../interfaces/friendInterface";

//Agregar amigos
export const addFriend = (emailUser: string, emailFriend: string) => async (dispatch: any) => {
		try {
			//Aramis:Esto que no se entiende de Daniel es cuando se manda un solicitud de amistad a una persona
			let frReque: FriendConfirmed[] = (await axios.get(User + `newFriendRequest?emailUser=${emailUser}&emailFriend=${emailFriend}`)).data;
			dispatch(addFriends(frReque))
		} catch (error) {
			console.error('Esto ocurrio en el back ' + error);
		}

	};

//Respuesta a la solicitud y eliminar solicitud
export const resReque = (emailUser: string, emailFriend: string, res: string) => async (dispatch: any) => {
		try {
			let responseReque:string = (await axios.get(User + `responseRequestFriend?email=${emailUser}&emailFriend=${emailFriend}&response=${res}`)).data;
			dispatch(resRequest(responseReque));
		} catch (error) {
			console.error('Esto ocurrio en el back ' + error);
		};
	};

//Amigos confirmados
export const confFriend = (emailUser: string) => async (dispatch: any) => {
	try {
		let friendList: FriendConfirmed[] = (await axios.get(User + `friendsConfirmed?email=${emailUser}`)).data;
		if(typeof(friendList) === 'object') dispatch(confirmFriend(friendList));
		
	} catch (error) {
		console.error('Esto ocurrio en el back ' + error);
	};
};

//Solicitudes pendientes
export const pendingFriend = (emailUser: string) => async (dispatch: any) => {
	try {
		let pending:FriendConfirmed = (await axios.get(User + `friendsPending?email=${emailUser}`)).data;
		dispatch(pendFriend(pending));
	} catch (error) {
		console.error('Esto ocurrio en el back ' + error);
	};
};
