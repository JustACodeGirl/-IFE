angular.module('app').factory('responseRejector', ['$q', '$rootScope', '$window', function ($q, $rootScope, $window) {
  return {
    'request': function (request) {
      if(request.method == 'GET' && request.headers.Accept.indexOf('application/json') >= 0){
        request.url += '?time='+ new Date().getTime();
      }
      return request;
    },

    'requestError': function (rejection) {
      return $q.reject(rejection);
    },

    'response': function (response) {
      if (response.data['stateCode'] == undefined) {
        return response;
      }
      switch (response.data['stateCode']) {
        case 'SUCCESS':
        case 'success':
        {
          break;
        }
        case 'NotLogin':
        {
          $window.location.href = "../../../login.html";
          return $q.reject(response);
        }
        default:
        {
          console.log(response.data['stateCode']);
          return $q.reject(response);
        }
      }
      return response;
    },

    'responseError': function (rejection) {
      return $q.reject(rejection);
    }
  };
}]);