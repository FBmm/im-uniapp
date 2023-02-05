// stores/counter.js
import { defineStore } from 'pinia';

export const useRoomStore = defineStore('room', {
	state: () => {
		return { roomId: {}, messageList: [] };
	},
	actions: {
		set_user_info(info) {
			this.userInfo = info;
			localStorage.setItem('user', JSON.stringify(info))
		},
	},
});