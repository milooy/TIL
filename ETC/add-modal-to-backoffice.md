# 백오피스 'CMS>에피소드'에 PPL 추가 모달 달기

## jira
만화의 에피소드에 PPL 추가하는 기능을 백오피스에 추가
이미지 업로드는 별도로 진행해야함.
POST http://{{cmsurl}}/_admin/episodes/{{episodeId}}/metadata
Body 내용
```javascript
{
    "ads": {
        "cut": [
            {
                "url": "{{이미지 URL}}",
                "href": "{{타겟 URL}}"
            }
        ]
    }
}
```

GET http://{{url}}/episodes/{{EpisodeId}}/metadata

## episode.tpl.html
src>app>cms>episode>episode.tpl.html
- 에피소드마다 있는 드롭다운메뉴에 `PPL추가` 버튼을 추가한다.
```html
<ul class="dropdown-menu" role="menu" style="top:initial;left:initial;">
                <li><a href="" ng-click="addDate('freeDate', e, $index)" lz-eat-click>Free Date +7</a></li>
                <li><a href="" ng-click="openSendPPLModal(e)" lz-eat-click>PPL 추가</a></li>
                <li role="presentation" class="divider"></li>
                <li><a href="" ng-click="removeSubmit(e)" lz-eat-click>삭제</a></li>
            </ul>
```
- `ng-click`에 클릭시 연결될 함수 `openSendPPLModal(e)`를 넘긴다. 

## episode.js
src>app>cms>episode>episode.js
```javascript
  $scope.openSendPPLModal = function(e) {
    var _options = {
      scope: $scope,
      template: '/app/cms/episode/formForSendPPL.tpl.html',
      show: false
    };

    var modal = $modal(_options);
    modal.$promise.then(function() {
      modal.show();
      $rootScope.$broadcast('openModal', {
        name: e.name,
        comicId: e.comicId
        // episodeID: e.comicId + '/' + e.name
      });
    });
  };
```
- 템플릿에는 나올 모달 템플릿을 연결해준다.
- 그리고 밑에 전달하고 싶은 것을 넘긴다(`e.name`, `e.comicId`)

## formForSendPPL.tpl.html
```html
<div class="modal" tabindex="-1" role="dialog" ng-controller="addPPLCtrl">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" ng-click="$hide()">&times;</button>
        <h4 class="modal-title">PPL 추가</h4>
      </div>
      <div class="modal-body">
        <form name="form" class="form-horizontal">
          <div class="form-group" ng-class="">
            <label for="" class="col-sm-3 control-label">Image URL</label>
            <div class="col-sm-9">
              <input type="text" name="imageURL" class="form-control" ng-model="data.imageURL" required>
            </div>
          </div>
          <div class="form-group" ng-class="">
            <label for="" class="col-sm-3 control-label">Target URL</label>
            <div class="col-sm-9">
              <input type="text" name="targetURL" class="form-control" ng-model="data.targetURL" required>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <a href="" class="btn btn-primary spinner" ng-click="delete()">
          <span>삭제</span>
          <span us-spinner="spinOptions" spinner-key="submit"></span>
        </a>
        <a href="" class="btn btn-primary spinner" ng-click="send()" ng-disabled="form.targetURL.$error.required && form.imageURL.$error.required">
          <span>저장</span>
          <span us-spinner="spinOptions" spinner-key="submit"></span>
        </a>
        <button type="button" class="btn btn-default" ng-click="$hide()">취소</button>
      </div>
    </div>
  </div>
</div>
```
- ng-controller는 `addPPLCtrl`라고 달아둔다.
- 그리고 버튼들마다 `ng-click="delete()"`와 같이 클릭함수를 단다.
- `ng-disabled`뒤에 들어가는 건 폼이 비었을 때 전송이 되지 않도록 한 것이다.

## service.remote.js
src>shared>services>service.remote.js
```javascript
ppl: function ppl(comicId, name) {
    var url = backApi + 'episodes/' + comicId + '/' + name + '/metadata';
    return $resource(url, {}, {
      save: {method: 'POST'},
      get: {method: 'GET'}
  });
}
```
- episode.js에서 episodeId를 만들려고 `comicId + '/' + name`하면 인코딩때문에 깨진다.
- 그래서 여기서 처리해줘야 한다.
- 사실 get은 별다른 처리가 필요 없다면 적지 않아도 쓸 수 있다.

## episode.js
```javascript
// PPL 모달 컨트롤러
var addPPLCtrl = function($scope, Remote, usSpinnerService, Util) {
  $scope.data = {};

  //모달이 켜지면 스코프에서 2way binding으로 코믹ID, name을 받아와 묶는다.
  $scope.$on('openModal', function(event, data) {
    $scope.data.comicId = data.comicId;
    $scope.data.name = data.name;
    requestMeta(); //이곳에 넣어야 비동기로 꼬이는거 방지
  });

  //get방식으로 서버에 episodeId의 url로 저장되어있는 정보들을 가져온다.
  function requestMeta() {
    Remote.backend.ppl($scope.data.comicId, $scope.data.name).get(function(response) {
      $scope.data.imageURL = response.ads.cut[0].url;
      $scope.data.targetURL = response.ads.cut[0].href;
    });
  }

  //빈 스트링을 POST함으로 삭제를 한다.
  $scope.delete = function() {
    Remote.backend.ppl($scope.data.comicId, $scope.data.name).save({}, {ads: {cut: [{url:'',href:''}]}}, function(response) {
      usSpinnerService.stop('submit');
      if (response.code === '200') {
        Util.notify({
          title: 'Success',
          content: 'PPL을 삭제하였습니다.',
          type: 'success',
          stack: (new Error('custorm stack').stack)
        });
        $scope.$hide();
      } else {
        Util.notify({
          title: 'Error:' + response.code,
          content: response.description,
          type: 'danger',
          stack: (new Error('custorm stack').stack)
        });
      }
    });
  };

  //전송 버튼
  $scope.send = function() {
    usSpinnerService.spin('submit');
    //지라에서 받은 구조를 넣어준다.
    var _data = {
      ads: {
        cut: [
          {
            url: $scope.data.imageURL,
            href: $scope.data.targetURL
          }
        ]
      }
    };

    //POST로 등록해준다.
    Remote.backend.ppl($scope.data.comicId, $scope.data.name).save({}, _data, function(response) {
      usSpinnerService.stop('submit');
      if (response.code === '200') {
        Util.notify({
          title: 'Success',
          content: 'PPL을 등록하였습니다.',
          type: 'success',
          stack: (new Error('custorm stack').stack)
        });

        $scope.$hide();
      } else {
        Util.notify({
          title: 'Error:' + response.code,
          content: response.description,
          type: 'danger',
          stack: (new Error('custorm stack').stack)
        });
      }
    });
  };
};
```

