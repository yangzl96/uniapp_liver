<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.$store.dispatch('connectSocket');
		const domModule = weex.requireModule('dom');
		domModule.addRule('fontFace', {
			fontFamily: 'iconfont',
			src: "url('http://at.alicdn.com/t/font_1859985_7mxozsfdvib.ttf')"
		});
		// 监听底部导航栏凸起 按钮
		uni.onTabBarMidButtonTap(e => {
			this.authJump({
				url: '/pages/create-live/create-live'
			});
		});
		this.$store.dispatch('initUser');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import url('/common/free.css');
@import url('/common/common.css');
/* #ifndef APP-PLUS-NVUE */
@import url('/common/icon.css');
/* #endif */
</style>
