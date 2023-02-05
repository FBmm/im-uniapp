<template>
	<view class="content">

		<view class="uni-form-item uni-column">
			<view class="title"><text class="uni-form-item__title">聊天昵称</text></view>
			<view class="u-input">
				<input v-model="formData.usernick" />
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text class="uni-form-item__title">Code</text></view>
			<view class="u-input">
				<input v-model="formData.code" />
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text class="uni-form-item__title">性别</text></view>
			<radio-group class="" @change="onChangeSex">
				<label class="radio">
					<radio value="1" :checked="formData.sex === '1'" />男
				</label>
				<label class="radio">
					<radio value="2" :checked="formData.sex === '2'" />女
				</label>
			</radio-group>
		</view>
		<!-- <view class="uni-form-item uni-column">
			<view class="title"><text class="uni-form-item__title">手机号</text></view>
			<view class="u-input">
				<input v-model="formData.mobile" />
			</view>
		</view> -->
		<view class="uni-form-item uni-column">
			<button type="primary" @click="startChat">开始聊天</button>
		</view>
	</view>
</template>

<script>
import { reactive } from 'vue';
import { useSocket } from '@/utils/ws';
import { useUserStore } from '@/stores/user';
export default {
	onLoad() {

	},
	setup() {
		const user = useUserStore();

		const formData = reactive({
			usernick: '111',
			sex: '1',
			code: ''
		})

		const socket = useSocket()

		const startChat = () => {
			socket.emit("start", formData);
		}

		socket.on("started", (userInfo) => {
			user.set_user_info(userInfo);
			uni.navigateTo({
				url: '/pages/list/index'
			});
		});

		
		return {
			formData,
			startChat,
			onChangeSex(data) {
				formData.sex = data.detail.value
				console.log(formData.sex)
			}
		}
	},
}
</script>

<style>
.content {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: var(--main-bg);
	padding: 0 40rpx;
}

button {
	margin-top: 40rpx;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
