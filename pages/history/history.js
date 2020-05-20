const app = getApp()
var Request = require("../../utils/request")

// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_png: "/static/images/alert.png",
    alert_png: "/static/images/exclamation.png",
    
    // history: [                      // 历史数据：温度，时间   MAX：1440
    //   {
    //     temperature: 39,
    //     time: "2020年4月20日 17:07",
    //     alertinfo: true
    //   },
    //   {
    //     temperature: 37,
    //     time: "2020年4月19日 17:07",
    //     alertinfo: false
    //   }
    // ],
    history: wx.getStorageSync('history') || [],
    text: true,
    text_chart_color: ["#0af", "#fff"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // Request.getRequest('/v1/history', )
    // function onSucc(){

    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    let device_id = wx.getStorageSync('userinfo').userDevice.deviceId
    if(device_id == null || device_id == "" || device_id == undefined){
      that.setData({
        history: []
      })
    } else {
      that.setData({
        history: wx.getStorageSync('history') || []
      })
    }
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
  onPullDownRefresh: function() {
    let that = this
    let device_id = wx.getStorageSync('userinfo').userDevice.deviceId
    if(!(device_id == null || device_id == "" || device_id == undefined)){
      app.queryTemperature(device_id, 1)
      wx.stopPullDownRefresh()
      that.onShow()
    }
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

  converttotext: function() {
    this.setData({
      text: true
    })
    let that = this
    that.onLoad()
  },

  converttochart: function() {
    this.setData({
      text: false
    })
    let that = this
    that.onLoad()
  }
})
