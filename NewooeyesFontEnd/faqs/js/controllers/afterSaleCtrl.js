/**
 * Created by leo.liu on 2016/4/8.
 */
app.controller("AfterSaleCtrl", ['$scope', '$state', 'AsApply', function ($scope, $state, AsApply) {
  AsApply.list().success(function (response) {
    $scope.asApplyList = response.data;
  });
  $scope.showApplyDetail = function (asApply) {
    $state.go('aftersale.detail', {data: JSON.stringify(asApply)}, {location: false});
  };

  $scope.showProcessModal = function (billId) {
    AsApply.processList(billId).success(function (response) {
      $scope.asActions = response.data;
      jQuery('#showProcess').modal();
    });
  }
}]);

app.controller("AsApplyCtrl", ['$scope', '$state', 'AsApply', function ($scope, $state, AsApply) {
  var placeholder = {regionId: 0, regionName: '请选择...'};
  $scope.applyInfo = {};
  $scope.selectGoods = $scope.goodsList[0];
  $scope.applyReason = $scope.applyReasons[0];

  $scope.provinces = [placeholder];
  $scope.cities = [placeholder];
  $scope.counties = [placeholder];

  AsApply.getRegion(1).success(function (response) {
    $scope.provinces = response.data;
    $scope.provinces.push(placeholder);
    $scope.province = placeholder;
  });

  $scope.getCities = function (parentId) {
    $scope.cities = [placeholder];
    AsApply.getRegion(parentId).success(function (response) {
      $scope.cities = response.data;
      $scope.cities.push(placeholder);
      $scope.city = placeholder;
    });
  };
  $scope.getCounties = function (parentId) {
    $scope.counties = [placeholder];
    AsApply.getRegion(parentId).success(function (response) {
      $scope.counties = response.data;
      $scope.counties.push(placeholder);
      $scope.county = placeholder;
    });
  };
  $scope.createAsApply = function (applyInfo) {
    if (applyInfo.applyType != '1') {
      applyInfo.refundWay = null;
      applyInfo.refundAccount = null;
      applyInfo.courier = null;
    }
    applyInfo.goodsId = $scope.selectGoods.id;
    applyInfo.applyReasonId = $scope.applyReason.id;
    applyInfo.provinceId = $scope.province.regionId;
    applyInfo.cityId = $scope.city.regionId;
    applyInfo.countyId = $scope.county.regionId;
    //applyInfo.expressCompanyName = $scope.expressCompanyName;
    AsApply.add(applyInfo).success(function () {
      $scope.applyInfo = {};
      $scope.selectGoods = $scope.goodsList[0];
      $state.go('aftersale.list');
    });
  };
  var flag = false;
  $scope.showErrors = function (errors) {
    for(var i=0;i<errors.required.length;i++){
      console.log(errors.required[i].$name);
      if(errors.required[i].$name != ""){
        break;
      }else{
        flag = true;
      }
    }
    if(flag==true){
      toast('error', '', '请输入邮寄地址');
    }
    $scope.errorInfo = "";
    angular.forEach(errors.pattern, function (error) {
      $scope.errorInfo += "<p>" + angular.element("label[for='"+error.$name+"']").text() + "格式非法: " + error.$viewValue + "</p>";
    });
  }
}]);

app.controller("AsApplyViewCtrl", ['$scope', '$state', '$stateParams', 'AsApply', function ($scope, $state, $stateParams, AsApply) {
  $scope.applyInfo = JSON.parse($stateParams.data);
  $scope.selectGoods = $scope.goodsList[0];
}]);
