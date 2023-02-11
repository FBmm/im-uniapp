<template>
	<view class="content">
		<view class="chat-wrapper">
			<view class="msg-box" v-for="item in messageList" :class="{'is-me': item.userInfo.uId === userStore.uId}">
				<image class="img" style="width: 80rpx; height: 80rpx;border-radius: 10rpx;" mode="aspectFit"
					:src="item.userInfo.info.userImg"></image>
				<view class="msg-box__right">
					<view class="msg-info">
						<view class="nickname">{{item.userInfo.info.usernick}}</view>
						<view>{{item.time}}</view>
					</view>
					<view class="msg">{{item.msg.content}}
					</view>
				</view>
			</view>
		</view>
		<view class="chat-footer">
			<input class="message-input" type="text" v-model="currentMsg">
			<button @click="onSend">发送</button>
		</view>
	</view>
</template>

<script>
import { ref, watch } from 'vue';
import { useSocket } from '@/utils/ws';
import { useUserStore } from '@/stores/user';
import { useRoomStore } from '@/stores/room';
export default {
	setup() {
		const socket = useSocket()
		const userStore = useUserStore();
		const roomStore = useRoomStore();
		const currentMsg = ref('')
		const messageList = ref(roomStore.messageList)
		
		socket.on("message-update", (list) => {
			console.log('message-update', list)
			messageList.value = list
		});
		uni.setNavigationBarTitle({
			title: roomStore.roomTitle
		});

		return {
			currentMsg,
			messageList,
			userStore,
			onSend() {
				if (!currentMsg.value) return
				socket.emit('send', roomStore.roomId, {
					msg: {
						type: 'text',
						content: currentMsg.value
					},
					userInfo: userStore.userInfo,
				})
				currentMsg.value = ''
			}
		}
	},
	onLoad() {

	},
	methods: {

	}
}
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.chat-wrapper {
		width: 100%;
		height: 100vh;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: var(--main-bg);
		overflow-y: auto;
		.msg-box {
			display: flex;
			min-height: 80rpx;
			margin-bottom: 40rpx;

			.msg-box__right {
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;

				.msg-info {
					display: flex;
					font-size: 28rpx;
					color: var(--text-regular);
					margin-bottom: 10rpx;
					.nickname {
						color: var(--text-primary);
						margin-right: 10rpx;
					}
				}
			}

			&.is-me {
				flex-direction: row-reverse;

				.msg-box__right {
					margin-right: 20rpx;
					.msg-info {
						flex-direction: row-reverse;
						.nickname {
							margin-left: 10rpx;
							margin-right: 0;
						}
					}
				}

				.msg {
					margin-left: 0;
					background-color: #95eb6c;
					align-self: flex-end;
				}
			}

			.img {
				flex-shrink: 0;
				}

			.msg {
				background-color: #fff;
				padding: 20rpx;
				border-radius: 10rpx;
				font-size: 36rpx;
				align-self: flex-start;
			}
		}
	}
	.chat-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80rpx;
		z-index: 10;
		background-color: #f7f7f7;
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		uni-button {
			width: 130rpx;
			height: 80rpx;
			background-color: #95eb6c;
			border-radius: 20rpx !important;
		}
		.message-input {
			flex: 1;
			background-color: #fff;
			border-radius: 20rpx;
			margin-right: 30rpx;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
		}
	}
}
</style>
