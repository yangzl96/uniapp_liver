<template>
	<list style="520rpx;height: 500rpx;" :show-scrollbar="false" :bounce="false">
		<cell :ref="'item' + index" class="flex align-center px-3 pt-3" v-for="(item, index) in gifts" :key="index" insert-animation="default" delete-animation="default">
			<view class="flex rounded-circle align-center flex" style="width: 325rpx;background-image: linear-gradient(to right, #BCABB1, #65AAF0);">
				<view class="p"><image class="rounded-circle" :src="item.avatar || defaultAvatar" mode="" style="width: 70rpx; height: 70rpx;"></image></view>
				<view class="flex-1 flex flex-column justify-center">
					<text class="text-white font">{{ item.username }}</text>
					<text class="text-white font-sm">{{ item.gift_name }}</text>
				</view>
				<view class="p"><image class="rounded-circle" :src="item.gift_image" mode="" style="width: 70rpx; height: 70rpx;"></image></view>
			</view>
			<text class="text-warning font-lg ml-1">X {{ item.num }}</text>
		</cell>
	</list>
	<!-- <scroll-view scroll-y="true"><view></view></scroll-view> -->
</template>

<script>
const dom = weex.requireModule('dom');
import $C from '../../common/config.js'
export default {
	data() {
		return {
			defaultAvatar: '/static/tabbar/min.png',
			gifts: []
		};
	},
	methods: {
		send(gift) {
			gift.gift_image = $C.baseUrl + gift.gift_image
			console.log(gift)
			this.gifts.push(gift);
			this.toBottom();
			this.autoHide();
		},
		// 滚到底部
		toBottom() {
			this.$nextTick(() => {
				let index = this.gifts.length - 1;
				let ref = 'item' + index;
				if (this.$refs[ref]) {
					dom.scrollToElement(this.$refs[ref][0], {});
				}
			});
		},
		// 自动消失
		autoHide() {
			if (this.gifts.length) {
				let timer = setTimeout(() => {
					this.gifts.splice(0,1)
				}, 5000)
			}
		}
	}
};
</script>

<style></style>
