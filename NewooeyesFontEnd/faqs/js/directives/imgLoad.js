/**
 * Created by leo.liu on 2016/5/10.
 */
app.directive("imgLoad", ['$compile', function ($compile) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      var subScope = scope.$new(true);
      subScope.url = function () {
        return ngModel.$viewValue;
      };
      var img = $compile('<img src="{{url()}}"/>')(subScope);
      element.append(img);
    }
  }
}]);