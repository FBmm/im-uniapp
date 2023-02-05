// stores/counter.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		return { userInfo: {} };
	},
	getters: {
		uId() {
			return this.userInfo.uId
		}
	},
	actions: {
		set_user_info(info) {
			this.userInfo = info;
			uni.setStorageSync('user', JSON.stringify(info))
		},
	},
});