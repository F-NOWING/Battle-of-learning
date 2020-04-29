// pages/homePage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasConfirm: true,
    isSigned: true,
    isSuccess: true,
    monthDaySize: [],
    nullDaySize: ''
  },
  //查看规则
  viewRule() {
    this.setData({
      hasConfirm: false
    })
  },
  //确定规则已知
  confirmRule() {
    this.setData({
      hasConfirm: true
    })
  },
  //打开签到弹窗
  toSign() {
    // console.log("1");
    
    this.setData({
      isSigned: false
    })
    // console.log("2");
  },
  //今日签到
  recordSignIn() {
    //发起签到请求
    this.setData({
      isSigned: true,
      isSuccess: false
    })
  },
  closeToast() {
    this.setData({
      isSuccess: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取当天所在的年，月， 日，星期几，
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1;
    var date = nowDate.getDate();
    // 得到该天为星期几
    var day = nowDate.getDay() + 1;
    // console.log(day)
    //获取当月第一天之前在日历上的空白天数
    var nbsp = 7 - ((date - day) % 7);
    // console.log("nbsp" + nbsp);
    var monthDaySize;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      monthDaySize = 31;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      monthDaySize = 30;
    } else if (month == 2) {
      // 计算是否是闰年,如果是二月份则是29天
      if ((year - 2000) % 4 == 0) {
        monthDaySize = 29;
      } else {
        monthDaySize = 28;
      }
    };
    //建立本月签到状态数组，数组项0-->未签到  -->已签到
    let arr=new Array(monthDaySize).fill('0')
    // arr[0] = '1';
    // 获取后台签到信息数据
    //通过获取到的签到记录数组的数据，修改建立的本月签到状态数组
    // console.log(arr);
    
    that.setData({
      // hasConfirm: false,
      monthDaySize: arr,
      nullDaySize: nbsp
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

  }
})