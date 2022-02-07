import Vue from 'vue'
import Vuex from 'vuex'

import $H from '../common/request.js';
import $C from '../common/config.js';
import io from '../common/uni-socket.io.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		token: null,
		socket: null
	},
	actions: {
		// 连接socket
		connectSocket({
			state,
			dispatch
		}) {
			const S = io($C.socketUrl, {
				query: {},
				transports: ['websocket'],
				timeout: 5000
			})
			let onlineEvent = (e) => {
				uni.$emit('live', {
					type: 'online',
					data: e
				})
			}
			let onCommentEvent = (e) => {
				uni.$emit('live', {
					type: 'comment',
					data: e
				})
			}
			let onGiftEvent = (e) => {
				uni.$emit('live', {
					type: 'gift',
					data: e
				})
			}
			// 监听连接
			S.on('connect', () => {
				// S.emit('test', '123456')	
				// S.on(S.id, (e) => {
				// 	console.log(e)
				// })
				// 存入socket
				state.socket = S
				// socket 唯一id
				const {
					id
				} = S
				// 监听后端过来的提示数据
				S.on(id, e => {
					console.log(e)
					const d = e.data
					if (d.action === 'error') {
						const msg = d.payload
						if (e.meta.notoast) {
							return
						}
						uni.showToast({
							title: msg,
							icon: 'none'
						})
					}
				})
				// 监听在线用户的信息 有人加入或者有人离开的时候
				S.on('online', onlineEvent)
				// 监听弹幕
				S.on('comment', onCommentEvent)
				// 监听礼物
				S.on('gift', onGiftEvent)
			})
			// 移除监听事件
			const removeListener = () => {
				if (S) {
					S.removeListener('online', onlineEvent)
					S.removeListener('comment', onCommentEvent)
					S.removeListener('gift', onGiftEvent)
				}
			}
			// 监听失败
			S.on('error', () => {
				removeListener()
				state.socket = null
				console.log('socket Error')
			})
			// 监听断开
			S.on('disconnect', () => {
				removeListener()
				state.socket = null
				console.log('socket Disconnect')
			})
		},
		// 初始化用户登录状态
		initUser({
			state,
			dispatch
		}) {
			let u = uni.getStorageSync('user')
			let t = uni.getStorageSync('token')
			if (u) {
				state.user = JSON.parse(u)
				state.token = t
				// 连接socket
				// console.log('连接socket')
				// dispatch('connectSocket')
			}
		},
		// 登录信息
		login({
			state
		}, user) {
			state.user = user
			state.token = user.token
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		// 获取用户信息
		getUserInfo({
			state
		}) {
			$H.get('/user/info', {
				token: true,
				noJump: true,
				toast: false
			}).then(res => {
				state.user = res
				uni.setStorageSync('user', JSON.stringify(res))
			}).catch(err => {
				console.log(err)
			})
		},
		// 退出登录
		logout({
			state,
			dispatch
		}) {
			$H.post('/logout', {}, {
				token: true,
				toast: false
			})
			// console.log('断开socket')
			// dispatch('closeSocket')
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		},
		// 操作验证
		authMethod({
			state
		}, callback) {
			if (!state.token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return uni.navigateTo({
					url: '/pages/login/login'
				});
			}
			callback()
		}
	}
})
