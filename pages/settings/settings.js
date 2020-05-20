// pages/settings/settings.js
var api = require('../../config/api.js')

const integer = []
const decimal = []
const integer_min = []
const decimal_min = []

for (let i = 0; i <=5; i++) {
  integer.push(i+37)
}

for (let i = 0; i <= 9; i++) {
  decimal.push(i)
}

for (let i = 0; i <=5; i++) {
  integer_min.push(i+31)
}

for (let i = 0; i <= 9; i++) {
  decimal_min.push(i)
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    curdevice: null,
    recordInterval: null,
    maxAlertTem: null,
    minAlertTem: null,

    ///

    integer,
    inte: parseInt(wx.getStorageSync('userinfo').userTempUp),
    decimal,
    deci: parseInt(wx.getStorageSync('userinfo').userTempUp*10)%10,
    value: [0, 0],
    show: false,

    integer_min,
    inte_min: parseInt(wx.getStorageSync('userinfo').userTempDown),
    decimal_min,
    deci_min: parseInt(wx.getStorageSync('userinfo').userTempDown*10)%10,
    show_min: false
  },

  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      inte: this.data.integer[val[0]],
      deci: this.data.decimal[val[1]]
    })
  },

  setMaxAlert: function() {
    this.setData({
      show: true
    })
  },

  cancelModify: function () {
    this.setData({
      show: false
    })
  },

  deterModify: function () {
    this.setData({
      show: false
    })
    let maxalert = parseFloat(this.data.inte)+parseFloat(this.data.deci*0.1)
    let info = wx.getStorageSync('userinfo')
    info.userTempUp = maxalert

    // postRequest
    wx.request({
      url: api.SetTemThres + info.userTempUp + '/' + info.userTempDown,
      method: 'PUT',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success: function(res){
        if(res.status == "200"){
          wx.setStorageSync('userinfo', info)
        }
      }
    })
    this.onLoad()
  },

  bindChange_min: function (e) {
    const val = e.detail.value
    this.setData({
      inte_min: this.data.integer_min[val[0]],
      deci_min: this.data.decimal_min[val[1]]
    })
  },

  setMinAlert: function() {
    this.setData({
      show_min: true
    })
  },

  cancelModify_min: function () {
    this.setData({
      show_min: false
    })
  },

  deterModify_min: function () {
    this.setData({
      show_min: false
    })
    let minalert = parseFloat(this.data.inte_min)+parseFloat(this.data.deci_min*0.1)
    let info = wx.getStorageSync('userinfo')
    info.userTempDown = minalert
    // postRequest

    wx.request({
      url: api.SetTemThres + info.userTempUp + '/' + info.userTempDown,
      method: 'PUT',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success: function(res){
        if(res.status == "200"){
          wx.setStorageSync('userinfo', info)
        }
      }
    })

    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tmpInterval = parseInt(wx.getStorageSync('interval'))
    let tmpMaxAlert = parseFloat(wx.getStorageSync('userinfo').userTempUp) || 37.5
    let tmpMinAlert = parseFloat(wx.getStorageSync('userinfo').userTempDown) || 36
    this.setData({
      recordInterval: tmpInterval,
      maxAlertTem: tmpMaxAlert,
      minAlertTem: tmpMinAlert
    })
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

  setInterval: function () {

  }
})