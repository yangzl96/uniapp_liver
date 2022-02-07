<template>
	<view style="position: fixed;bottom: 120rpx;right: 0; left: 0;">
		<scroll-view :scroll-into-view="scrollIntoView" scroll-y="true" style="width: 520rpx;height: 300rpx;" scroll-with-animation="true">
			<view
				:id="'danmu' + item.id"
				v-for="(item, index) in list"
				:key="index"
				class="flex justify-start align-start rounded p-2 mb-2"
				style="background-color: rgba(255,255,255,0.125);"
			>
				<text class="font-md text-danger">{{ item.name }}:</text>
				<text class="font-md text-white">{{ item.content }}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollIntoView: '',
			list: []
		};
	},
	methods: {
		send(data) {
			this.list.push(data)
			this.toBottom();
		},
		toBottom() {
			setTimeout(() => {
				let len = this.list.length;
				if (len > 0 && this.list[len - 1]) {
					this.scrollIntoView = 'danmu' + this.list[len - 1].id;
				}
			}, 200);
		}
	}
};
</script>

<style></style>
