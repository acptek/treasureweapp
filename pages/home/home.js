var api = require('../../config/api.js')
const app = getApp()

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parent: "张三火",
    battery: "80%",
    cur_tem: 37.1,
    is_alert: false,
    
    maxHistoryMaxHistory: 800,
    initInterval: 5,
    // maxAlertTemperature: 37.5,
    // minAlertTemperature: 36.0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 定时器，暂时先设置 默认启动
  // 5分钟一次
  startTimer: function() {
    let interval = parseInt(wx.getStorageSync('interval'))
    let that = this
    app.globalData.timer = setInterval(()=>{
      let hasdevice = wx.getStorageSync('userinfo').userDevice
      if(!(hasdevice == null || hasdevice == "" || hasdevice == undefined)){
        app.queryTemperature(1)
        that.onShow()
      }
    }, 1000*60*interval)
  },

  stopTimer: function() {
    let that = this
    clearTimeout(app.globalData.timer);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // 初始请求用户信息
    wx.request({
      url: api.GetUserInfo,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success: function(res){
        console.log("userinfo", res.data.data)
        if(res.data.status == '200'){
          wx.setStorageSync('userinfo', res.data.data)
        } else { 
          console.log("GET user secc , res fail")
        }
      }
    })


    // 初始获取请求频率 min，存在本地缓存即可，默认值5min
    let interval = wx.getStorageSync('interval')
    if(interval == ""){
      wx.setStorageSync('interval', this.data.initInterval)
    }
    
    // 原来的温度门槛，设备：直接从userinfo中获得
    // let maxalert = wx.getStorageSync('maxalert')
    // if(maxalert == ""){
    //   wx.setStorageSync('maxalert', this.data.maxAlertTemperature)
    // }
    // let minalert = wx.getStorageSync('minalert')
    // if(minalert == ""){
    //   wx.setStorageSync('minalert', this.data.minAlertTemperature)
    // }
    // wx.setStorageSync('device', "")

    // 初始获取设备，并且更新 当前/初始温度
    let hasdevice = wx.getStorageSync('userinfo').userDevice
    console.log('init_deviceid', hasdevice)
    if(hasdevice == null || hasdevice == "" || hasdevice == undefined){
      this.setData({
        cur_tem: "NULL",
        is_alert: false,
        battery: "请先绑定设备"
      })
    } else {
      // 若当前有设备，那么先更新本地缓存
      app.queryTemperature(1) // 一开始先请求一条数据，发到history里

      let tmp = wx.getStorageSync('history')[0];
      if(tmp == null || tmp == undefined){
        tmp = [{
          temperature: "37",
          alertinfo: false,
          time: null
        }]
      }
      this.setData({
        cur_tem: tmp.temperature,
        is_alert: tmp.alertinfo
      })
    }

    // 从数据库获取监护人信息 存入缓存
    // wx.request({...})

    // 设备电池的初始电量
    // wx.request({...})

    // 定时器变量设置为全局
    this.stopTimer()
    this.startTimer()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    let cur_parent = wx.getStorageSync('parent').name
    if(cur_parent == "" || cur_parent == undefined){
      cur_parent = "待设置"
    }
    let that = this
    that.setData({
      parent: cur_parent,
      battery: wx.getStorageSync('battery') || "获取异常"
    })

    // 电池电量信息
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this
    let hasdevice = wx.getStorageSync('userinfo').userDevice
    if(!(hasdevice == null || hasdevice == "" || hasdevice == undefined)){
      app.queryTemperature(1)
    }
    wx.stopPullDownRefresh()
    that.onShow()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})