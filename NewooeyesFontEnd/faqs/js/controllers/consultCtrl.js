/**
 * Created by leo.liu on 2016/4/8.
 */
app.controller("ConsultCtrl", ['$scope', '$state', 'Consult', function ($scope, $state, Consult) {
  Consult.list().success(function (response) {
    $scope.consultList = response.data;
  });

  $scope.showConsultDetail = function (id) {
    $state.go('consult.view', {id: id});
  }
}]);

app.controller("ConsultCreateCtrl", ['$scope', '$state', 'FileUploader', 'Consult', function ($scope, $state, FileUploader, Consult) {
  $scope.consult = {title: "售后需求: "};
  $scope.attachs = [];
  $scope.createConsult = function (consult, attachs) {
    consult.attach1Url = attachs[0] ? attachs[0].url : null;
    consult.attach2Url = attachs[1] ? attachs[1].url : null;
    Consult.add(consult).success(function () {
      $state.go('consult.list');
    });
  };

  var uploader = $scope.uploader = new FileUploader({
    url: serverUrl + '/consult/upload'
  });
  uploader.onBeforeUploadItem = function () {
    if ($scope.attachs[0] && $scope.attachs[1]) {
      toast('error','','每次最多上传两张附件');
      uploader.cancelItem(fileItem);
    }
  };
  uploader.onAfterAddingFile = function (fileItem) {
    if(fileItem.file.type!='image/jpeg' && fileItem.file.type!='image/png' && fileItem.file.type!='image/gif'){
      alert('上传为非图片类型文件，请上传图片！');
    }else if (fileItem.file.size >= 2097152) {
      alert('只能上传2M以内的图片');
    }else {
      fileItem.upload();
    }
  };
  uploader.onSuccessItem = function (item, response) {
    if (!$scope.attachs[0]) {
      $scope.attachs[0] = response.data;
    } else if (!$scope.attachs[1]) {
      $scope.attachs[1] = response.data;
    }
  };
}]);

app.controller("ConsultDetailCtrl", ['$scope', '$stateParams', 'FileUploader', 'Consult', function ($scope, $stateParams, FileUploader, Consult) {
  var id = $stateParams['id'];
  var init = function () {
    $scope.attachs = [];
    $scope.consultReplies = [];
    if (id != undefined && id >= 0) {
      Consult.detail(id).success(function (response) {
        $scope.consult = response.data;
      });
      Consult.listReply(id).success(function (response) {
        $scope.consultReplies = response.data;
      });
    }
  };
  init();

  var uploader = $scope.uploader = new FileUploader({
    url: serverUrl + '/consult/upload'
  });
  uploader.onBeforeUploadItem = function (fileItem) {
    if ($scope.attachs[0] && $scope.attachs[1]) {
      toast('error','','每次最多上传两张附件');
      uploader.cancelItem(fileItem);
    }
  };
  uploader.onAfterAddingFile = function (fileItem) {
    if(fileItem.file.type!='image/jpeg' && fileItem.file.type!='image/png' && fileItem.file.type!='image/gif'){
      alert('上传为非图片类型文件，请上传图片！');
    }else if (fileItem.file.size >= 2097152) {
      alert('只能上传2M以内的图片');
    } else {
      fileItem.upload();
    }
  };
  uploader.onSuccessItem = function (item, response) {
    if (!$scope.attachs[0]) {
      $scope.attachs[0] = response.data;
    } else if (!$scope.attachs[1]) {
      $scope.attachs[1] = response.data;
    }
  };

  $scope.replyConsult = function (reply, attachs) {
    reply.consultId = id;
    reply.attach1Url = attachs[0] ? attachs[0].url : null;
    reply.attach2Url = attachs[1] ? attachs[1].url : null;
    Consult.reply(reply).success(init);
  };

  $scope.changeConsultStatus = function (status) {
    Consult.changeStatus(id, status).success(function () {
      $scope.consult.status = status;
    });
  };
}]);