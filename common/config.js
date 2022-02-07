
let pro = process.env.NODE_ENV === 'production' ? true : false
pro = true
// 公司
// http://192.168.31.63:7001
// 192.168.31.63:23481
// rtmp://192.168.31.63:23480
// 家
// 101.5

let reqPath = pro ? 'http://47.108.190.5:7001' : 'http://192.168.31.63:7001'
// 推流
let livePlayBaseUrl = pro ? '47.108.190.5:23480' : 'rtmp://192.168.31.63:23480'
// 拉流
let livePushBaseUrl = pro ? '47.108.190.5:23481' : '192.168.31.63:23481'

export default {
	/*
	 接口路径
	*/
	baseUrl: reqPath,
	socketUrl: reqPath,
	imageUrl: reqPath,

	// 拉流前缀
	livePlayBaseUrl,
	// 推流前缀
	livePushBaseUrl,
}
