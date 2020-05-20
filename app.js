var Request = require("./utils/request")
var api = require('./config/api.js')

//app.js
App({
  
  queryTemperature: function(num) {
    let that = this
    // Request.getRequest();
    // let curinfo = {
    //   temperature: Math.floor((35 + Math.random()*5) * 100) / 100,
    //   time: (new Date()).toLocaleString(),
    //   alertinfo: true
    // }

    let curinfo = {
      temperature: "",
      time: "", //(new Date()).toLocaleString()
      alertinfo: false
    }

    console.log( api.GetTem+'/'+num)
    // 请求温度
    wx.request({
      url: api.GetTem+'/'+num,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success: function(res){
        console.log(res)
        if(res.data.status == "200"){
          // 一定会有数据
          let cur = res.data
          for(let i = 0; i < cur.data.length; ++i){

            curinfo.time = cur.data[i].dataTime
            curinfo.temperature = cur.data[i].dataTemp
            if(parseFloat(curinfo.temperature) > parseFloat(wx.getStorageSync('userinfo').userTempUp) || parseFloat(curinfo.temperature) < parseFloat(wx.getStorageSync('minalert').userTempDown)){
              curinfo.alertinfo = true
            }else{
              curinfo.alertinfo = false
            }
            let history = wx.getStorageSync('history') || []
            while(history.length >= that.globalData.maxHistory){
              history.pop();
            }

            history.unshift(curinfo)
            wx.setStorageSync('history', history)

          }

        } else {
          console.log('Get succ, temp status fail')
        }
      }
    })
  },

  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if(res){
    //       let userStorageInfo = wx.getStorageSync('userInfo')
    //       // Request.postRequest()
    //       wx.request({
    //         url: 'url',
    //       })
    //     } else {
    //       console.log("achieve code fail")
    //     }
    //   },
    //   fail: function(err) {
    //     console.log("login fail")
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    hasLogin: false,
    timer: 1
  }
})

/*
2 用户信息获取 （身份认证？
3 
*/