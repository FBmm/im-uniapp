<template>
	<view class="content">
			<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">手机号</text></view>
					<view class="u-input">
						<input />
					</view>
			</view>
			<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">聊天昵称</text></view>
					<view class="u-input">
						<input />
					</view>
			</view>
			<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">密码</text></view>
					<view class="u-input">
						<input />
					</view>
			</view>
			<view class="uni-form-item uni-column">
					<button type="primary" @click="startChat">开始聊天</button>
			</view>
		</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		}
	},
	onLoad() {

	},
	methods: {
		startChat() {
			uni.navigateTo({
				url: '/pages/list/index'
			});
		}
	}
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
