<template>
	<view class="content">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="list-wrap" @scrolltoupper="upper" @scrolltolower="lower"
			@scroll="scroll">
			<view class="list-item" @click="toChat">
				<view class="list-item-left">
					<image style="width: 100%; height: 100%;border-radius: 10rpx;" mode="aspectFit"
						src="https://picx.zhimg.com/80/v2-6c5ff4ef0bb78991ed03ab720f1b2447_1440w.webp?source=1940ef5c"></image>
				</view>
				<view class="list-item-right">
					<view class="msg-box">
						<view class="nickname">魔芋协会</view>
						<view class="time">下午 5:52</view>
					</view>
					<view class="desc">asdasdasdasdasdasdasd</view>
				</view>
			</view>
		</scroll-view>
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
		toChat() {
			uni.navigateTo({
				url: '/pages/chat/index'
			});
		}
	}
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
