/**
 * Created by leo.liu on 2016/4/8.
 */
angular.module("app").controller("AppCtrl", ["$scope", "$state", "$window", "User",
  function ($scope, $state, $window, User) {
    $scope.app = {};

    var urlIndexMap = {
      '/ques': 1,
      '/vide': 2,
      '/serv': 3,
      '/afte': 4,
      '/cons': 5
    };

    $scope.consultStatus = ['待解决', '已关闭'];
    $scope.accountType = ['支付宝', '微信'];
    $scope.goodsList = [{id: 1, name: '智能门铃'}];
    $scope.asApplyTypes = ['退货', '换货', '维修'];
    $scope.asApplyStatus = ['申请中', '受理中', '受理完成', '已关闭', '申请失败'];
    $scope.applyStatusColor = ['label-warning', 'label-info', 'label-success', 'label-default'];
    $scope.selectedAsApply = {};

    $scope.applyReasons = [
      {
        id: 1,
        name: '商品外观破损'
      },
      {
        id: 2,
        name: '商品无法安装'
      },
      {
        id: 3,
        name: '商品型号不符'
      },
      {
        id: 4,
        name: '商品功能缺陷'
      },
      {
        id: 5,
        name: '软件无法使用'
      },
      {
        id: 6,
        name: '七天无理由退货'
      },
      {
        id: 10,
        name: '其他'
      }
    ];

    $scope.selectPage = urlIndexMap[$window.location.hash.substr(1, 5)];
    if (!$scope.selectPage) {
      $scope.selectPage = 1;
    }

    if (document.cookie.indexOf('access_token') >= 0) {
      User.current().success(function (response) {
        $scope.app.user = response.data;
      });
    }

  }]);