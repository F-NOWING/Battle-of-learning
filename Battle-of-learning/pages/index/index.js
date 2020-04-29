//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: '欢迎来到求学大作战',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    radio: '',
    isChoose: true,    //弹窗选择年级隐藏
    isLogin: true      //未选择年级按钮禁用
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    //用来缓存记录用户是否为新用户的状态
    //true-->新用户  false-->老用户
    wx.setStorageSync('newUser', '')
    //判断本地缓存中是否有该用户登录信息token
    let token = wx.getStorageSync('token')
    if (token) {
      wx.redirectTo({
        url: '../homePage/index',
      })
    }else {
      this.login();
      wx.showModal({
        title: '授权登录',
        content: '进入求学大作战，需要授权你的微信头像昵称',
        showCancel: false,
        // var that = this,
        success: (res) => {
          if (res.confirm) {
            // this.getUserInfo()
            
          }
        }
      })
      // this.isNewUser();
    }
    console.log(app.globalData);
    
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.isNewUser()
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  login: function() {
    wx.login({
      success: (res) => {
        if (res.code) {
          //发起网络请求,获取用户openid，sessionkey
          wx.request({
            url: 'http://f0t1.top/portal/auth/miniLogin',
            data: {
              code: res.code
            },
            success: (res) => {
              if (res.data.code == 0) {
                console.log(res)
                // console.log(res.data.data.openId)
                // console.log(res.data.data.openid)
                // console.log(res.data.data.session_key)
                // var open = res.data.data.openid
                wx.setStorageSync('openId', res.data.data.openid)
                wx.setStorageSync('token', res.data.data.session_key)
                // this.getUserInfo()
                //获取用户信息，判断是否为新用户
                
                // wx.redirectTo({
                //   url: '../homePage/index',
                // })
              }
              
            }
          })
        }else {
          wx.showToast({
            title: '登录失败，请稍后再试',
            mask: true,
            icon: 'none',
            duration: 2000
          })
          // console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  isNewUser: function() {
    let open=wx.getStorageSync('openId')
    wx.request({
      url: 'http://f0t1.top/portal/member',
      header: {
        'openId': open
      },
      success: (res) => {
        console.log(res);
        if (res.data.code == 0) {
          //如果是新用户，则需要弹窗选择年级
          if (!res.data.data.grade) {
            //新用户，做一个简单记录
            wx.setStorageSync('newUser', 'true')
            this.setData({
              isLogin: false
            })
          //老用户，直接跳转首页
          }
            wx.redirectTo({
              url: '../homePage/index',
            })
          
        }
      }
    })
  },
  //转化选取的年级
  translateType: function(val) {
    let grade = '';
    switch(val) {
      case 1:
        grade = '初一';
        break;
      case 2:
        grade = "初二";
        break;
      case 3:
        grade = '初三';
        break;
      case 4:
        grade = "高一";
        break;
      case 5:
        grade = '高二';
        break;
      case 6:
        grade = "高三";
        break;
    }
    return grade;
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
      isChoose: false
    });
    app.globalData.grade = this.translateType(event.detail)
  },
  toHomePage: function() {
    // this.login()
    wx.redirectTo({
      url: '../homePage/index',
    })
  }
})
