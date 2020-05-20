// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: wx.getStorageSync('userinfo').userName, //from userInfo
    phone: "666666",
    email: "666666@ecnu.edu.cn",
    
    hidebindphone:true,
    phoneNum: wx.getStorageSync('phone'),
    cur_num: wx.getStorageSync('phone'),

    hidebindemail:true,
    emailAdd:wx.getStorageSync('email'),
    cur_add: wx.getStorageSync('email')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  bindtapPhone: function () {
    this.setData({
      hidebindphone: false
    })
  },

  cancelPhone:function(e){
    this.setData({
      hidebindphone: true,
    })
  },

  confirmPhone: function (e) {
    let that = this
    // postRequest
    wx.setStorageSync('phone', this.data.phoneNum)
    that.setData({
      hidebindphone: true,
      cur_num: that.data.phoneNum
    })
  },

  inputPhoneNum: function (e) {
    let that = this
    that.setData({
        phoneNum: e.detail.value || wx.getStorageSync('phone')
    })
  },

  bindtapEmail: function () {
    this.setData({
      hidebindemail: false
    })
  },

  cancelEmail:function(e){
    this.setData({
      hidebindemail: true,
    })
  },

  confirmEmail: function (e) {
    let that = this
    // postRequest
    wx.setStorageSync('email', this.data.emailAdd)
    that.setData({
      hidebindemail: true,
      cur_add: that.data.emailAdd
    })
  },

  inputEmailAdd: function (e) {
    this.setData({
        emailAdd: e.detail.value||wx.getStorageSync('email')
    })
  },

  loginout: function(){
    clearTimeout(app.globalData.timer);
  }

})