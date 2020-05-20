// pages/register/register.js
var api = require('../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    confirmPassword: '',
    user_name: '',
    user_email: '',
    mobile: '',
    code: '',
  },

  isValidPhone: function(str) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
      return false;
    } else {
      return true;
    }
  },

  // 获取验证码
  sendCode: function() {
    let that = this;

    if (this.data.mobile.length == 0) {
      wx.showModal({
        title: '错误信息',
        content: '手机号不能为空',
        showCancel: false
      });
      return false;
    }

    if (!this.isValidPhone(this.data.mobile)) {
      wx.showModal({
        title: '错误信息',
        content: '手机号输入不正确',
        showCancel: false
      });
      return false;
    }

    console.log("验证码已发送")
    // // 请求获取验证码
    // wx.request({
    //   url: "",
    //   data: {
    //     mobile: that.data.mobile
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function(res) {
    //     if (res.data.errno == 0) {
    //       wx.showModal({
    //         title: '发送成功',
    //         content: '验证码已发送',
    //         showCancel: false
    //       });
    //     } else {
    //       wx.showModal({
    //         title: '错误信息',
    //         content: res.data.errmsg,
    //         showCancel: false
    //       });
    //     }
    //   }
    // });
  },

  requestRegister: function(wxCode) {
    let that = this;
    wx.request({
      url: "",
      data: {
        username: that.data.username,
        password: that.data.password,
        user_phone_number: that.data.mobile,
        code: that.data.code,
        wxCode: wxCode
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errno == 0) {
          app.globalData.hasLogin = true;
          wx.setStorageSync('userInfo', res.data.data.userInfo);
          wx.setStorage({
            key: "token",
            data: res.data.data.token,
            success: function() {
              wx.switchTab({
                url: '/pages/index/index'
              });
            }
          });
        } else {
          wx.showModal({
            title: '错误信息',
            content: res.data.data.Message,
            showCancel: false
          });
        }
      }
    });
  },

  requestRegisterWithoutCode: function() {
    console.log(this.data)
    let that = this;
    wx.request({
      url: api.RegisterUrl,
      data: {
        username: that.data.username,
        user_name: that.data.user_name==''?that.data.user_name:'default',
        password: that.data.password,
        user_phone_number: that.data.mobile,
        user_email: that.data.user_email,
        user_name: that.data.user_name,
        // code: that.data.code
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        if (res.data.status == "200") {
          wx.showModal({
            content: '注册成功',
            showCancel: false,
            success: function(){
              wx.redirectTo({
                url: '/pages/login/login'
              });
            }
          });
        } else {
          wx.showModal({
            title: '错误信息',
            content: res.data.msg || '未知错误',
            showCancel: false
          });
        }
      }
    });
  },

  // 注册
  startRegister: function() {
    var that = this;

    if (this.data.password.length < 6 || this.data.username.length < 6) {
      wx.showModal({
        title: '错误信息',
        content: '用户名和密码不得少于6位',
        showCancel: false
      });
      return false;
    }

    if (this.data.password != this.data.confirmPassword) {
      wx.showModal({
        title: '错误信息',
        content: '确认密码不一致',
        showCancel: false
      });
      return false;
    }

    if (this.data.mobile.length == 0 || this.data.code.length == 0) {
      wx.showModal({
        title: '错误信息',
        content: '手机号和验证码不能为空',
        showCancel: false
      });
      return false;
    }

    if (!this.isValidPhone(this.data.mobile)) {
      wx.showModal({
        title: '错误信息',
        content: '手机号输入不正确',
        showCancel: false
      });
      return false;
    }

    that.requestRegisterWithoutCode()

    // wx.login({
    //   success: function(res) {
    //     if (!res.code) {
    //       wx.showModal({
    //         title: '错误信息',
    //         content: '注册失败',
    //         showCancel: false
    //       });
    //     }

    //     that.requestRegister(res.code);
    //   }
    // });
  },

  // 用户名
  bindUsernameInput: function(e) {
    this.setData({
      username: e.detail.value
    });
  },

  // 昵称
  bindNicknameInput: function(e) {
    this.setData({
      user_name: e.detail.value
    });
  },

  // 密码
  bindPasswordInput: function(e) {

    this.setData({
      password: e.detail.value
    });
  },

  // 确认密码
  bindConfirmPasswordInput: function(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },

  // 手机号
  bindMobileInput: function(e) {
    this.setData({
      mobile: e.detail.value
    });
  },

  // 邮箱
  bindEmailInput: function(e) {
    this.setData({
      user_email: e.detail.value
    });
  },

  // 验证码
  bindCodeInput: function(e) {
    this.setData({
      code: e.detail.value
    });
  },

  clearInput: function(e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-user_name':
        this.setData({
          user_name: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-confirm-password':
        this.setData({
          confirmPassword: ''
        });
        break;
      case 'clear-mobile':
        this.setData({
          mobile: ''
        });
        break;
      case 'clear-email':
        this.setData({
          user_email: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
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

  }
})