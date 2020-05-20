var app = getApp();

const host = 'https://localhost:8080/';

function postRequest(url, postdata, onSucc, onFail) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    data: postdata,
    method: 'POST',
    success: function (res) {
      onSucc(res.data);
    },
    fail: function () {
      onFail();
    }
  })
}

 function getRequest(url, onSucc, onFail) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"      
    },
    method: "GET",
    success: function (res) {
      onSucc(res.data);
    },
    fail: function() {
      onFail();
    }
  })
}

module.exports.postRequest = postRequest;
module.exports.getRequest = getRequest;