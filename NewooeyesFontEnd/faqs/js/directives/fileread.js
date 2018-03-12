/**
 * Created by leo.liu on 2016/4/28.
 */
app.directive("fileread", [function () {
  return {
    scope: {
      fileread: '='
    },
    link: function (scope, ele, attrs) {
      ele.bind("change", function (changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            scope.fileread = loadEvent.target.result;
          });
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
      })
    }
  }
}]);