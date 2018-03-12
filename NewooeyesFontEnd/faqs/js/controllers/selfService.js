/**
 * Created by leo.liu on 2016/4/8.
 */
app.controller("SelfServiceCtrl", ['$scope', function ($scope) {
  var ssc = this;

  ssc.showNext = function (question, target) {
    var index = ssc.questionShowList.indexOf(question);
    if (index >= 0 && ssc.questionMap[target]) {
      ssc.questionShowList.splice(index + 1, ssc.questionShowList.length - index - 1, ssc.questionMap[target]);
    }
  };

  ssc.questionMap =
  {
    init: {
      title: '您正在使用的产品类型?',
      answer: {
        content: '',
        type: 'radio',
        options: [
          {name: 'NewooEyes 智能门铃', target: 'doorbell'}
        ]
      }
    },
    'doorbell': {
      title: '您使用的情况和售后需求是?',
      answer: {
        content: '',
        type: 'radio',
        options: [
          {name: '无法录像', target: 'doorbellCannotRecord'},
          {name: '无法充电', target: 'doorbellCannotCharge'},
          {name: 'Wifi设置失败', target: 'doorbellWifiSetFailed'},
          {name: '其他', target: 'others'}
        ]
      }
    },
    'ov3d': {
      title: '您使用的情况和售后需求是?',
      answer: {
        content: '很抱歉，自助系统暂未能提供针对bong X/XX的服务，我们将尽快上线相关功能。',
        type: 'radio',
        options: [
          {name: '本智能小助手对您有帮助', target: 'helpfull'},
          {name: '本智能小助手对您没有帮助', target: 'helpless'}
        ]
      }
    },
    'doorbellCannotRecord': {
      title: '设备无法录像解决方法',
      answer: {
        content: '<p>- 请检查猫眼与门内面板是否连接正常</p>',
        type: 'radio',
        options: [
          {name: '还是无法录像', target: 'notResolve'},
          {name: '可以录像了', target: 'resolve'}
        ]
      }
    },
    'doorbellCannotCharge': {
      title: '设备无法充电解决方法',
      answer: {
        content: '<p>- 如果电池彻底没电了，插上充电器后需要充电一段时间才会显示充电，需要等待一会</p>' +
        '<p>- 尽量不要等到电池完全没电再充电，这样对电池寿命有影响，当电池只剩下一个时就应该充电了</p>',
        type: 'radio',
        options: [
          {name: '还是无法充电', target: 'notResolve'},
          {name: '可以充电了', target: 'resolve'}
        ]
      }
    },
    'doorbellWifiSetFailed': {
      title: '如何设置Wifi',
      answer: {
        content: '<p>- 确认家里Wifi名称不要包含中文、特殊字符（除“字母”和“数字”之外的都是特殊字符）</p>' +
        '<p>- 确认Wifi账号和密码输入正确，注意区分大小写</p>' +
        '<p>- 确认Wifi网络正常，门内主机与路由器的距离请尽量保持在10米范围内</p>' +
        '<p>- 手机与设备的距离最好保持在20厘米左右</p>' +
        '<p>- 设置Wifi时，周围环境尽量保持安静，不要有杂音</p>',
        type: 'radio',
        options: [
          {name: 'Wifi设置失败', target: 'notResolve'},
          {name: 'Wifi设置成功', target: 'resolve'}
        ]
      }
    },
    'others': {
      title: '关于 [其他]',
      answer: {
        content: '很抱歉，本自助服务未能提供您所遇到的问题的解决方案，您可以查阅FAQ或联系厂商协调解决。',
        type: 'radio',
        options: [
          {name: '本智能小助手对您有帮助', target: 'helpfull'},
          {name: '本智能小助手对您没有帮助', target: 'helpless'}
        ]
      }
    },
    'notResolve': {
      title: '很抱歉，本自助服务指南未能帮助到你',
      answer: {
        content: '您可以查阅FAQ或联系厂商协调解决。',
        type: 'radio',
        options: [
          {name: '本智能小助手对您有帮助', target: 'helpfull'},
          {name: '本智能小助手对您没有帮助', target: 'helpless'}
        ]
      }
    },
    'resolve': {
      title: '解决问题啦~~~请继续愉快的使用智能门铃吧！',
      answer: {
        content: '',
        type: 'radio',
        options: [
          {name: '本智能小助手对您有帮助', target: 'helpfull'},
          {name: '本智能小助手对您没有帮助', target: 'helpless'}
        ]
      }
    },
    'helpfull': {
      title: '谢谢您对本产品的支持！',
      answer: {type: 'null'}
    },
    'helpless': {
      title: 'Sorry, 没有能帮助到您，您还可以通过申请售后的方式来寻求帮助',
      answer: {
        content: '<br/>'+'<a style="text-decoration: none;" href="#/aftersale/list">点击此处跳转至售后申请</a> ',
        type: 'text'
      }
    }
  };

  ssc.questionShowList = [ssc.questionMap['init']];
}]);
