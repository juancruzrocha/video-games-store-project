import { Friend } from '../../types';
export interface FriendConfirmed {
	accept:string
	UserEmail:string
	FriendInListEmail:string
}
export interface friendsReducerState {
	newFriendRequest: Array<object>;
	responseRequest: string;
	friendsConfirmed: FriendConfirmed[];
	FriendsPending: FriendConfirmed[];
}
