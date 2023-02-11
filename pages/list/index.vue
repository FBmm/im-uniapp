<template>
	<view class="content">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="list-wrap" @scrolltoupper="upper" @scrolltolower="lower"
			@scroll="scroll">
			<view class="list-item" @click="enterGroup('group-1')">
					<view class="list-item-left">
						<image style="width: 100%; height: 100%;border-radius: 10rpx;" mode="aspectFit"
							src="https://wuqianqian.cn/public/img/group.jpeg"></image>
					</view>
					<view class="list-item-right">
						<view class="msg-box">
							<view class="nickname">群聊</view>
							<view class="time"></view>
						</view>
						<view class="desc"></view>
					</view>
				</view>
			<template v-for="user in userList">
				<view class="list-item"  v-if="user.uId !== userStore.uId" @click="enterRoom(user)">
					<view class="list-item-left">
						<image style="width: 100%; height: 100%;border-radius: 10rpx;" mode="aspectFit"
							:src="user.info.userImg || 'https://wuqianqian.cn/public/img/man1.jpg'"></image>
					</view>
					<view class="list-item-right">
						<view class="msg-box">
							<view class="nickname">{{ user.info.usernick }}</view>
							<view class="time">下午 5:52</view>
						</view>
						<view class="desc">{{ user.uId }} - {{ userStore.uId }}</view>
					</view>
				</view>
			</template>
		</scroll-view>
	</view>
</template>

<script>
import { ref } from 'vue';
import { useSocket, createSocket } from '@/utils/ws';
import { useRoomStore } from '@/stores/room';
import { useUserStore } from '@/stores/user';
export default {
	data() {
		return {
			title: 'Hello'
		}
	},
	onLoad() {

	},
	setup() {
		const socket = useSocket()
		const roomStore = useRoomStore();
		const userStore = useUserStore();

		socket.emit("users");
		const userList = ref([])
		socket.on("user-list", (res) => {
			console.log('user-list', res)
			userList.value = res.users
		});

		const enterRoom = (user) => {
			const uId = userStore.uId;
			socket.emit("room", [uId, user.uId]);
			socket.on("room-ok", (res) => {
				console.log('room-ok', res)
				roomStore.roomId = res.id
				roomStore.messageList = res.data || []
				roomStore.roomTitle = user.info.usernick
				uni.navigateTo({
					url: '/pages/chat/index'
				});
			});
		}

		const enterGroup = (groupId) => {
			socket.emit("group", groupId);
			socket.on("room-ok", (res) => {
				console.log('room-ok', res)
				roomStore.roomId = res.id
				roomStore.messageList = res.data || []
				roomStore.roomTitle = '群聊'
				uni.navigateTo({
					url: '/pages/chat/index'
				});
			});
		}

		return {
			userStore,
			userList,
			enterRoom,
			enterGroup
		}
	},
}
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.list-wrap {
	.list-item {
		display: flex;

		.list-item-left {
			width: 120rpx;
			padding: 20rpx;
			box-sizing: border-box;
		}

		.list-item-right {
			flex: 1;
			border-bottom: 1px solid var(--main-bg);
			padding: 20rpx;
			padding-left: 0;
			height: 120rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			box-sizing: border-box;

			.msg-box {
				display: flex;
				justify-content: space-between;
				margin-bottom: 12rpx;
				.time {
					width: 200rpx;
					color: var(--text-regular);
					font-size: 28rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}

				.nickname {
					color: var(--text-primary);
					font-weight: 500;
					font-size: 36rpx;
				}

			}

			.desc {
				color: var(--text-regular);
				font-size: 28rpx;
			}
		}
	}
}
</style>
