const host = 'http://129.211.66.214:8085';

module.exports = {
  RegisterUrl: host + '/user/action-register',     // 注册
  LoginUrl: host + '/action-login',           // 登录
  GetTem: host + '/data',                         // 请求温度
  GetUserInfo: host + '/user',                     // 用户信息
  SetTemThres: host,                               // 设置温度告警阈值
  AddDevice: host + '/device', // 添加设备
  DelDevice: host , // 删除设备
  BindDevice: host + '/user/action-bindDevice', // 绑定设备
  UnbdDevice: host + '', // 解除绑定
}