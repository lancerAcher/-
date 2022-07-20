

# uniapp 方法集合

###　uni.getSetting（）获取用户的当前设置

```js
获取用户的当前设置，返回值包括用户的授权结果（authSetting）和用户订阅消息设置（subscriptionsSetting）
uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.userLocation']) {
							// 未授权
							uni.authorize({
								scope: 'scope.userLocation',
								success() { //1.1 允许授权
									that.getaddress()
								},
								fail() { //1.2 拒绝授权
									console.log("你拒绝了授权，无法获得周边信息")
									uni.showModal({
										title: '提示',
										content: '您关闭了定位授权，可通过右上角设置打开，为您展示默认地址',
										showCancel: false,
										success: function(res) {
											if (res.confirm) {
												console.log('用户点击确定');
												that.getLanmuList()
											}
										}
									});
								}
							})
						} else {
							// 已授权 ..(获取位置信息)
							that.getaddress()
						}
					}
				});
```

### [uni.authorize(OBJECT)](https://uniapp.dcloud.net.cn/api/other/authorize?id=authorize)

```
向用户发起授权请求，调用后会弹出弹框询问是否同意授权，如果之前以及同意授权，则不会出现弹窗，直接返回成功，如果之前拒绝了授权，则进入失败回调。
```

### [uni.openSetting(OBJECT)](https://uniapp.dcloud.net.cn/api/other/setting?id=opensetting)

~~~
调起客户端小程序设置界面，返回用户设置的操作结果。
~~~

### [uni.getLocation(OBJECT)](https://uniapp.dcloud.net.cn/api/location/location?id=getlocation)

````
获取当前的地理位置，速度。
````

# uniapp去除button默认样式（微信授权手机号）

```
<button hover-class="none" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权手机号</button>

button::after{
	border: none;
	background-color: none;
}
注意：button前面一定不要有（.），如下图：


//获取手机号
getPhoneNumber(e){
	if(e.detail.errMsg==='getPhoneNumber:ok'){
		uni.login({
			provider:'weixin',
			success:res=> {
				let url = 'vuser/updateMobile'
				let data = {}
				data.code = res.code
				data.encryptedData = e.detail.encryptedData
				data.iv = e.detail.iv
				let options = {}
				options.token = true
				this.$http.post(url,data,options).then(res1=>{
					if(res1.code===0){
						console.log(res1.data)
					}
				})
			}
		})
	}else{
		uni.showToast({title:"取消授权",icon:"none"})
	}
}

```

### 创建音视频播放

```js
uni.createInnerAudioContext()
创建并返回内部 audio 上下文 innerAudioContext 对象。

				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.src = this.recordPath;
				this.innerAudioContext.title = '音频';
				this.onPlay()
				this.onPause()
				this.onCanplay()
				this.onEnded()
				this.onSeeking()
				this.onSeeked()
				this.TimeUpdate()
```

### [getCurrentPages()](https://uniapp.dcloud.io/collocation/frame/window?id=getcurrentpages)

```js
getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。

注意： getCurrentPages()仅用于展示页面栈的情况，请勿修改页面栈，以免造成页面状态错误。

1、利用页面栈的长度
例如：进入小程序非默认首页时，需要提供返回首页的按钮或者执行其它事件
  onShow() {
    let pages = getCurrentPages(); //当前页面栈
    if (pages.length == 1) {
     //todo
    }
  },

2、跨页面赋值
 let pages = getCurrentPages();//当前页面栈
 let prevPage = pages[pages.length - 2];//上一页面
  prevPage.setData({
     //直接给上移页面赋值
  });

3、页面跳转后自动刷新
 //举例
    wx.switchTab({
     url: '../index/index',
     success: function (e) {
      var page = getCurrentPages().pop(); //当前页面
      if (page == undefined || page == null) return;
      page.onLoad(); //或者其它操作
     }
    })

4、获取当前页面相关信息
 let pages = getCurrentPages(); //当前页面栈
 //当前页面为页面栈的最后一个元素
 let prevPage = pages[pages.length - 1];//当前页面
 or
 // pop() 方法用于删除并返回数组的最后一个元素
 let prevPage = pages.pop();//当前页面
 
 console.log( prevPage.route) //举例：输出为‘pages/index/index’
```

### [uni.requestSubscribeMessage(Object object)](https://uniapp.dcloud.io/api/other/requestSubscribeMessage?id=requestsubscribemessage)订阅消息

```js
在到页面时先获取登陆信息
		onLoad(e) {
			// console.log(e)
			this.str=e.str
			this.customerId=e.customerId||''
			const that = this;
			let num=new Date().toLocaleDateString().split('/').join('-')+' '+new Date().getHours()+':'+ new Date().getMinutes()
			this.startdate=num
			console.log(num)
			uni.login({
				success(res) {
					if (res.code) {
						that.code=res.code
					} else {
						console.log('登录失败！' + res.errMsg);
					}
				}
			});
		}



授权
				const that = this; // 检测是否已经授权，有授权直接弹窗，没授权弹出授权
				
				uni.getSetting({
					withSubscriptions: true,
					success(res) {
						console.log(res);
						if (res && res.subscriptionsSetting && res.subscriptionsSetting.itemSettings && res
							.subscriptionsSetting
							.itemSettings['cBnJvhkMPHp0ReUiSdpM_Pd2usGeEEW6wx-5s6X4hEI'] == 'accept') {
								that.addFlag()
						} else {
							uni.requestSubscribeMessage({
								tmplIds: ['cBnJvhkMPHp0ReUiSdpM_Pd2usGeEEW6wx-5s6X4hEI'],
								success(res) {
									that.addFlag()
								},
								fail(res) {
									console.log(res);
									util.showNone("请授权");
								}
				
							});
						}
					},
				
					fail(res) {
						console.log(res);
					}
				
				});

	addFlag(){
				var that = this;
				var params = {
					customerId: that.customerId,
					orderRemindTime: that.date + ':00',
					code: that.code,
					remarks:this.value,
					OrderRemindDesc:this.value
				};
				this.$u.post("/customer/settingTime", params).then(data => {
					uni.showToast({
						title: '操作成功'
					});
					uni.navigateBack()
				
				});
			},
```

### uniapp table 渲染

```js
			不可以滑动
			
			<view class="table" v-if="!guwenFlag">
				<view v-for="(item,index) in tableDate" :key="index">
					<view class="tr">
						<view v-for="(item1,index1) in item" :key="index" style="width: 100%;">
							<view v-if="index1<item.length-1||index==0" class="td"
								style="border-right:1px solid #E0E0E0;">{{item1}}</view>
							<view v-if="index>0 && index1==item.length-1" class="td"
								style="border-right:1px solid #E0E0E0;" :style="{color:item1*1>0?'red':'green'}">
								{{item1==0?'--':item1+'%'}}{{item1*1>0?'↑':item1*1<0?'↓':''}}</view>
						</view>
					</view>
				</view>
			</view>
			
			可以滑动
			<view class="table" v-if="guwenFlag" style="width: 100%;">
				<scroll-view  scroll-x="true" style="white-space: nowrap;">
					<view v-for="(item,index) in tableDate" :key="index" :style="{display:index==0?'inline-block':'block'}">
						<view class="tr" style="display: inline-block;">
							<view v-for="(item1,index1) in item" :key="index1" class="trd" style="display: inline-block;">
								<view v-if="index==1&&index1>0" class="td" :style="{color:item1*1>0?'red':'green'}"
									style="border-right:1px solid #E0E0E0;">{{item1==0?'--':item1+'%'}}{{item1*1>0?'↑':item1*1<0?'↓':''}}</view>
								<view v-else-if="index>1&&index1>0" class="td" style="border-right:1px solid #E0E0E0;">
									{{item1+'%'}}</view>
								<view v-else class="td" style="border-right:1px solid #E0E0E0;">{{item1}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
```

**css**

```css
	.table {
		border: 0px solid darkgray;

		.tr {
			display: flex;
			// width: 100%;
			justify-content: center;
			height: 64rpx;
			align-items: center;
			border-bottom: 1px solid #E0E0E0;
			flex-wrap: nowrap;
			
			.td {
				text-align: center;
				font-size: 24rpx;
				font-weight: 400;
				color: #333333;
				height: 64rpx;
				line-height: 64rpx;
				// flex-shrink: 0;
			}
			.trd{
				    flex-shrink: 0;
				    min-width: 300rpx;
				    // border-bottom: 1px solid #ccc;
			}
			.th {
				height: 64rpx;
				text-align: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
				line-height: 64rpx;
			}
		}
	}
```





### 微信小程序列表渲染

**html 可以滑动**

```js

<view class="table"  style="width: 100%;">
				<scroll-view  scroll-x="true" style="white-space: nowrap;">
					<view wx:for="{{tableDate}}" wx:key="index" wx:for-index="index" wx:for-item="item" :style="{display:index==0?'inline-block':'block'}">
						<view class="tr" style="display: inline-block;">
							<view wx:for="{{item}}" wx:for-index="index1" wx:for-item="item1" wx:key="index1" class="trd" style="display: inline-block;">
								<!-- <view wx-if="index==1&&index1>0" class="td" :style="{color:item1*1>0?'red':'green'}"
									style="border-right:1px solid #E0E0E0;">{{item1==0?'--':item1+'%'}}{{item1*1>0?'↑':item1*1<0?'↓':''}}</view>
								<view wx:elif="index>1&&index1>0" class="td" style="border-right:1px solid #E0E0E0;">
									{{item1+'%'}}</view>
								<view wx-else class="td" style="border-right:1px solid #E0E0E0;">{{item1}}</view> -->
                <view class="td">{{item1}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>


```

**css**

```css
.table {
  border: 0px solid darkgray;
}

.tr {
  display: flex;
  justify-content: center;
  height: 64rpx;
  align-items: center;
  border-bottom: 1px solid #E0E0E0;
  flex-wrap: nowrap;
}
  .td {
    text-align: center;
    font-size:24rpx;
    font-weight: 400;
    color: #333333;
    height: 64rpx;
    line-height: 64rpx;
  }

  .trd {
    flex-shrink: 0;
    min-width: 150rpx;
    /* // border-bottom: 1px solid #ccc; */
  }

  .th {
    height: 64rpx;
    text-align: center;
    font-size: 28rpx;
    font-weight: 400;
    color: #666666;
    line-height: 64rpx;
  }
```

**两者的数据格式**

```json
  tableDate:[
    ['排名','部门','客户数','已跟进','已报备'],
    ['总计','所有','100','100','100'],
    ['1','张三','50','20','60'],
    ['2','张三','50','20','60'],
    ['3','张三','50','20','60'],
  ]
```

