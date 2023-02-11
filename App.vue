<script>
import { useUserStore } from '@/stores/user';
import { useSocket } from '@/utils/ws';
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		setup() {
			const userStore = useUserStore();
			const getUserInfo = () => {
				const user = uni.getStorageSync('user')
				if (user?.nickname && user?.code) {
					userStore.set_user_info(JSON.parse(user))
					const socket = useSocket()
					socket.emit("start", JSON.parse(user));
				}
			}
			getUserInfo()
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import "styles/index.scss";
	@import 'styles/uni.css';
</style>
