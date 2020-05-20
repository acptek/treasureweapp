const app = getApp()

// pages/home_parent/parent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parent: {
      name: "张三火",
      phone: "13888888888",
      info: "其他信息……"
    },
    modify: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let tmp = wx.getStorageSync('parent') || {}
    that.setData({
      parent: tmp
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

  changeModify: function () {
    let that = this
    that.setData({
      modify: true
    })
  },

  cancelModify: function () {
    let that = this
    that.setData({
      modify: false
    })
  },

  formSubmit: function (e) {
    let that = this
    let tmp = that.data.parent
    tmp.name = e.detail.value.name
    tmp.phone = e.detail.value.phone
    tmp.info = e.detail.value.info
    that.setData({
      modify: false,
      parent: tmp
    })
    wx.setStorageSync('parent', tmp)
    // app.postRequest();
  }
})