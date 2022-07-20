
let WebIM = wx.WebIM = require("../utils/WebIM")["default"];


function formatLongTime(mss) {
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (mss % (1000 * 60)) / 1000;
  seconds = parseInt(seconds);
  if (minutes < 9) {
    minutes = "0" + minutes;
  }
  if (seconds < 9) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds + "";
}

/**
* 格式化时间 
* @param {String} date 原始时间格式
* 格式后的时间：yyyy/mm/dd hh:mm:ss
**/
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
* 格式化时间 
* @param {String} date 原始时间格式
* 格式后的时间：hh:mm
**/
const formatDateTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute, second].map(formatNumber).join(':')
}

/**
* 格式化时间 
* @param {String} date 原始时间格式
* 格式后的时间：yyyy-mm-dd
**/
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
* 获取指定日期前后N天的日期、前N个月日期、后N个月日期
* @param {String} sdate 当前日期
* @param {Number} interval 间隔天数
* @param {String} caret 间隔符号
* @example 获取当天日期 getNowFormatDate("",0,"-"); 结果为"2018-09-18";
           获取前一天日期  getNowFormatDate("2018-03-01",-1,"-"); 结果为"2018-02-18";
           获取后一天日期  getNowFormatDate("2018-02-28",1,"-"); 结果为"2018-03-01";
**/
function getNowFormatDate(sdate, interval, caret) {
  var patt1 = /^\d{4}-([0-1]?[0-9])-([0-3]?[0-9])$/;  //判断输入的日期是否符合格式正则表达式
  if (!(sdate && typeof (sdate) == "string" && patt1.test(sdate))) {
    sdate = new Date(); //不满足日期的则使用当前年月日
  }
  interval = isNaN(parseInt(interval)) ? 0 : parseInt(interval);//若没有输入间隔，则使用当前日
  caret = (caret && typeof (caret) == "string") ? caret : "";
  var gdate = new Date(sdate).getTime();//获取指定年月日
  gdate = gdate + 1000 * 60 * 60 * 24 * interval; //加减相差毫秒数
  var speDate = new Date(gdate);//获取指定好毫秒数时间
  var preYear = speDate.getFullYear();
  var preMonth = speDate.getMonth() + 1;
  var preDay = speDate.getDate();
  preMonth = (preMonth < 10) ? ("0" + preMonth) : preMonth;
  preDay = (preDay < 10) ? ("0" + preDay) : preDay;
  var preDate = preYear + caret + preMonth + caret + preDay;
  return preDate;
}

// 获取某年某月的有多少周
String.prototype.weekInMonthCount = function () {
  var date = new Date((new Date(this.replace(/-/g, "/"))) || (new Date()));
  var firstWeekDate = 1;// 默认第一周是本月1号  为了模拟本月1号是否为本月第1周的判断
  if (date.getDay() === 1) { // 判断1号是周一
    firstWeekDate = 1;
  } else if (date.getDay() === 0) { // 判断1号是周日
    firstWeekDate = 8 - 7 + 1;
  } else { // 判断1号是周二至周六之间
    firstWeekDate = 8 - date.getDay() + 1;
  }
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  var monthHasDays = date.getDate();// 本月天数
  monthHasDays = date.getDate() - firstWeekDate + 1;
  var hasWeek = Math.ceil(monthHasDays / 7); // 计算本月有几周
  return hasWeek;
};

// 获取今天是第几周 注：ios不支持2018-01-14 需转化为2018/01/14
String.prototype.weekIndexInMonth = function () {
  var date_trim = (this.trim() != "" ? this : new Date()).replace(/-/g, "/");
  var date = new Date(date_trim);
  var dateStart_trim = new Date((this.trim() != "" ? this : new Date()).replace(/-/g, "/")).setDate(1);
  var dateStart = new Date(dateStart_trim); // 本月初
  var firstWeek = 1;
  if (dateStart.getDay() === 1) {
    firstWeek = 1;
  } else if (dateStart.getDay() === 0) {
    firstWeek = 8 - 7 + 1;
  } else {
    firstWeek = 8 - dateStart.getDay() + 1;
  }
  var weekIndex = 1;
  var c = date.getDate();
  if (date.getDay() === 1 && date.getDate() < 7) {
    weekIndex = 1;
  } else if (c < firstWeek) {
    weekIndex = -1;
  } else {
    if (c < 7) {
      weekIndex = Math.ceil(c / 7);
    } else {
      c = c - firstWeek + 1;
      if (c % 7 === 0) {
        if (dateStart.getDay() !== 6) {
          weekIndex = c / 7;
        } else {
          weekIndex = c / 7 + 1;
        }
      } else {
        weekIndex = Math.ceil(c / 7);
      }
    }
  }
  return weekIndex;
};

/**
* 验证车牌号是否正确
* @param number carNumber
**/
function isLicensePlate(carNumber) {
  if (carNumber == '') {
    return false;
  }
  if (/^[A-Za-z]+$/.test(carNumber.slice(1))) { //全为字母
    return false;
  }
  return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(carNumber);
}

/**
 * 验证手机号
 */
function checkPhone(phone) {
  let that = this
  if (phone == '') {
    return false;
  }
  if (!(/^1[3456789]\d{9}$/.test(phone))) {
    return false;
  }
  return true;
}

/**
 * 隐藏字符串
 * @param string str 字符串
 * @param int frontLen 前面需要保留几位
 * @param int endLen 后面需要保留几位
 */
function hiddenString(str, frontLen, endLen) {
  var len = str.length - frontLen - endLen;
  var xing = '';
  for (var i = 0; i < len; i++) {
    xing += '*';
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

/**
* 从一个数组中随机取出若干个元素组成数组
* @param {Array} arr 原数组
* @param {Number} count 需要随机取得个数
**/
const getRandomArray = (arr, count) => {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

/**
* 从一个数组中随机取出一个元素
* @param {Array} arr 原数组
**/
const getRandomArrayElement = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
* 去除数组中重复的值
* @param {Array} arr 原数组
**/
const getUnique = array => {
  var n = {}, r = [], len = array.length, val, type;
  for (var i = 0; i < array.length; i++) {
    val = array[i];
    type = typeof val;
    if (!n[val]) {
      n[val] = [type];
      r.push(val);
    } else if (n[val].indexOf(type) < 0) {
      n[val].push(type);
      r.push(val);
    }
  }
  return r;
}

/**
* 读取xml字符串
* @param {String} xmlString 数据
**/
function loadXMLStr(xmlString) {
  var danmulist = [];
  if (xmlString.indexOf("<d p")) {
    var str = xmlString.substring(xmlString.indexOf("<d p"), xmlString.length);
    var reg = /<d p/g;
    var arr = str.match(reg);
    if (arr) {
      console.log(str);
      console.log(arr.length);
      for (var i = 0; i < arr.length; ++i) {
        var getstr = str.substring(0, str.indexOf("</d>") + "</d>".length);
        str = str.substring(str.indexOf("</d>") + "</d>".length, str.length);
        var danmu = {
          text: getstr.substring(getstr.indexOf(">") + ">".length, getstr.indexOf("</d>")),
          color: '#ff00ff',
          time: Math.floor(getstr.substring(getstr.indexOf("<d p=\"") + "<d p=\"".length, getstr.indexOf(",")))
        }
        danmulist.push(danmu);
      }
    }
  }
  return danmulist;
}

// 显示警告提示(7个汉字长度)
var showWarn = text => wx.showToast({
  title: text,
  image: 'https://qufang.oss-cn-beijing.aliyuncs.com/upload/icon/xcx/jjycrm/warn.png',
})

// 显示错误提示(7个汉字长度)
var showError = text => wx.showToast({
  title: text,
  image: 'https://qufang.oss-cn-beijing.aliyuncs.com/upload/icon/xcx/jjycrm/error.png',
})

// 显示繁忙提示(7个汉字长度)
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 1500
})

// 显示成功提示(7个汉字长度)
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示无图标提示(两行)
var showNone = text => wx.showToast({
  title: text,
  icon: 'none',
  duration: 1500
})

// 显示失败提示框
var showModel = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

//获取列表
function getList(url, userinfo, page, pageSize, callback) {
  // this.showBusy('加载中...');
  wx.request({
    url: url,
    data: {
      skey: userinfo.skey,
      tel: userinfo.userinfo.mobile_phone,
      page: page,
      pageSize: pageSize,
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (result) {
      if (result.data.code == '200') {
        wx.hideToast();
        var result = result.data;
        callback(result);
      }
    },
    fail(error) {
      this.showModel('请求失败', error); return false;
    }
  })
}

//请求数据
function getRequest(url, params, callback) {
  // this.showBusy('加载中...');
  var token = wx.getStorageSync('weapp_session_login_data');
  wx.request({
    url: url,
    data: params,
    method: 'POST',
    header: {
      'content-type': 'application/json',
      'token': token.token
    },
    success: function (result) {
      if (result.data.code == '10000') {
        wx.hideToast();
        var result = result.data;
        callback(result.data);
      } else {
        // wx.hideToast();
        wx.showModal({
          title: '提示',
          content: '加载失败，请重新刷新',
          showCancel: false
        });
        return false;
      }
    },
    fail(error) {
      wx.hideToast();
      wx.showModal({
        title: '提示',
        content: '网络异常，请重新刷新',
        showCancel: false
      });
      return false;
    }
  })
}

//请求数据(异步)
function getRequestPromise(url, params, isNone) {
  var isNone = isNone ? true : false;
  // if (!isNone) {
  //   this.showBusy('加载中...');
  // }
  var token = wx.getStorageSync('weapp_session_login_data');
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'token': token.token
      },
      success: function (result) {
        if (result.data.code == '10000') {
          // wx.hideToast();
          var results = result.data;
          // console.log(results);
          resolve(results.data);
          // 50001,"登录已过期，请重新登录！
          // 20006,"登陆过程出现异常请尝试重新操作！
          // 10003,"此操作需要登陆系统！
        } else if (result.data.code == '50001' || result.data.code == '10003' || result.data.code == '20006') {  //未登录
          // wx.hideToast();
          wx.showModal({
            title: '提示',
            content: result.data.message,
            showCancel: false,
            success(res) {
              if (res.confirm) {
                try {
                  wx.clearStorageSync();
                  wx.reLaunch({
                    url: '/pages/login/index', //绝对路径
                  });
                } catch (e) {
                  return false;
                }
              }
            }
          });
            // WebIM.conn.close();
          return false;
        } 
        else if (result.data.code == '60001') {  //已录入客户
          wx.hideToast();
          wx.showToast({
            title: '您已经录入了该客户！',
            icon: 'none',
            duration: 1500
          })
          return false;
        } else if (result.data.code == '20005') {  //已录入客户
          wx.hideToast();
          wx.showModal({
            title: '提示',
            content: '原始密码错误',
            showCancel: false
          });
          return false;
        } else {
          wx.hideToast();
          wx.showModal({
            title: '提示',
            content: result.data.message ? result.data.message : '请求数据失败，请重新尝试',
            showCancel: false
          });
          return false;
        }
      },
      fail(error) {
        wx.hideToast();
        wx.showModal({
          title: '提示',
          content: '网络异常，请重新尝试',
          showCancel: false
        });
        return false;
      }
    })
  })
}

//请求数据自定义
function getRequestCustom(url, params, isShow) {
  if (isShow != 1) {
    // this.showBusy('加载中...');
  }
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (result) {
        if (result.data.data == undefined) {
          resolve(result.data);
        } else {
          if (result.data.success) {
            resolve(result.data.data);
          } else {
            wx.hideToast();
            wx.showModal({
              title: '提示',
              content: result.data.message ? result.data.message : '请求数据失败，请重新尝试',
              showCancel: false
            });
            return false;
          }
        }
      },
      fail(error) {
        wx.showModal({
          title: '提示',
          content: '网络异常，请重新尝试',
          showCancel: false
        });
        return false;
      }
    })
  })
}

//请求数据(异步)-自定义
function getRequestPromiseCustom(url, params) {
  // this.showBusy('请求中...');
  var token = wx.getStorageSync('weapp_session_login_data');
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'token': token.token
      },
      success: function (result) {
        wx.hideToast();
        var results = result.data;
        resolve(results);
      },
      fail(error) {
        wx.hideToast();
        wx.showModal({
          title: '提示',
          content: '网络异常，请重新尝试',
          showCancel: false
        });
        return false;
      }
    })
  })
}
//请求数据(异步)-自定义get方法
function getRequestPromiseGet(url, params) {
  // this.showBusy('请求中...');
  var token = wx.getStorageSync('weapp_session_login_data');
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token': token.token
      },
      success: function (result) {
        wx.hideToast();
        var results = result.data;
        resolve(results);
      },
      fail(error) {
        wx.hideToast();
        wx.showModal({
          title: '提示',
          content: '网络异常，请重新尝试',
          showCancel: false
        });
        return false;
      }
    })
  })
}
function getWhole(url, params) {
  // this.showBusy('请求中...');
  var token = wx.getStorageSync('weapp_session_login_data');
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'get',
      header: {
        'content-type': 'application/json',
        'token': token.token
      },
      success: function (result) {
        wx.hideToast();
        var results = result.data;
        resolve(results);
      },
      fail(error) {
        wx.hideToast();
        wx.showModal({
          title: '提示',
          content: '网络异常，请重新尝试',
          showCancel: false
        });
        return false;
      }
    })
  })
}

module.exports = {
  formatTime,
  formatDateTime,
  getRandomArray: getRandomArray,
  getRandomArrayElement: getRandomArrayElement,
  getWhole:getWhole,
  showWarn,
  showError,
  showBusy,
  showSuccess,
  showNone,
  showModel,
  getRequestPromiseGet,
  getList: getList,
  getRequest: getRequest,
  getRequestPromise: getRequestPromise,
  getRequestCustom: getRequestCustom,
  getRequestPromiseCustom: getRequestPromiseCustom,
  getNowFormatDate: getNowFormatDate,
  isLicensePlate: isLicensePlate,
  checkPhone: checkPhone,
  hiddenString: hiddenString,
  getUnique: getUnique,
  loadXMLStr: loadXMLStr,
  formatLongTime: formatLongTime
}
