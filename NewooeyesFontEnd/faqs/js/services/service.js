/**
 * Created by leo.liu on 2016/4/8.
 */
var serverUrl = "/ovaftersaleend";
app.factory('User', ['$http', function ($http) {
  return {
    login: function (params) {
      return $http({
        method: 'POST',
        url: serverUrl + "/user/login",
        params: params
      });
    },
    current: function () {
      return $http({
        method: 'GET',
        url: serverUrl + "/user/current"
      });
    },
    logout: function () {
      return $http({
        method: 'POST',
        url: serverUrl + "/user/logout"
      });
    }
  };
}]);

app.factory('Faq', ['$http', function ($http) {
  return {
    list: function () {
      return $http({
        method: 'GET',
        url: serverUrl + "/faq/list"
      });
    },
    detail: function (id) {
      return $http({
        method: 'GET',
        url: serverUrl + "/faq/"+id
      });
    }
  };
}]);

app.factory('Consult', ['$http', function ($http) {
  return {
    add: function (consult) {
      return $http({
        method: 'POST',
        url: serverUrl + "/consult/add",
        data: consult
      });
    },
    detail: function (id) {
      return $http({
        method: 'GET',
        url: serverUrl + "/consult/" + id
      });
    },
    list: function () {
      return $http({
        method: 'GET',
        url: serverUrl + "/consult/list"
      });
    },
    changeStatus: function (consultId, status) {
      return $http({
        method: 'POST',
        url: serverUrl + "/consult/changestatus",
        params: {
          consultId: consultId,
          status: status
        }
      });
    },
    reply: function (consultReply) {
      return $http({
        method: 'POST',
        url: serverUrl + "/consult/reply",
        data: consultReply
      });
    },
    listReply: function (consultId) {
      return $http({
        method: 'GET',
        url: serverUrl + "/consult/listreply",
        params: {consultId: consultId}
      });
    }
  };
}]);

app.factory('AsApply', ['$http', function ($http) {
  return {
    add: function (asApply) {
      return $http({
        method: 'POST',
        url: serverUrl + "/asapply/add",
        data: asApply
      });
    },
    list: function () {
      return $http({
        method: 'GET',
        url: serverUrl + "/asapply/list"
      });
    },
    processList: function (billId) {
      return $http({
        method: 'GET',
        url: serverUrl + "/asaction/list",
        params: {billId: billId}
      });
    },
    getRegion: function (parentId) {
      return $http({
        method: 'GET',
        url: serverUrl + "/asapply/region",
        params: {parentId: parentId}
      });
    }
  };
}]);

app.filter('to_trusted', ['$sce', function ($sce) {
  return function (text) {
    return $sce.trustAsHtml(text);
  }
}]);
