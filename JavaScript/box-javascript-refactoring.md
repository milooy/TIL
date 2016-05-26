# Box 시스템 자바스크립트 리팩토링하기
## 원래 함수
Get해오는 옵션이 다를때마다 새로운 함수를 만들어
춘추전국시대가 되었다. 이를 하나로 합치기로 한다.
```javascript
var apiCRUD = {
    getList: function($http, tab, rc, tableType, pagination, params) { // TODO: tab과 pagination 통합하기
        rc.loaded = false;
        var url = pagination || '/api/' + tab + '/';

        $http.get(url, { params: params }).then(function(res) {
            var colHeaders, columns;
            if(/^invoice\/\w+$/.test(tab)) { /*-- operation의 로그 목록 다루기 --*/
                tab = 'operation';
            }
            if(pagination) {
                var thisPage = /\?page=\d+/.exec(pagination);
                rc.pageNum = thisPage? thisPage[0].split('=')[1] : 1;
            }
            $('ul.pagination li.prev').data('page', res.data.previous);
            $('ul.pagination li.next').data('page', res.data.next);
            switch(tab) {
                case "stock":
                    colHeaders = ['ID', 'UID', '이름', '가용재고', '불용재고', '전체수량'];
                    columns = [
                        {data: "id", renderer: "html"},
                        {data: "uid"},
                        {data: "title"},
                        {data: "available_remains"},
                        {data: "disable_remains"},
                        {data: "all_remains"},
                    ];
                    break;
                case "invoice":
                    data = $.map(res.data.results, function (obj) {
                        obj.ordered_time = moment(obj.ordered_time).format('YYYY년 MMMM Do dddd a h:mm');
                        return obj;
                    });
                    colHeaders = ['ID', '상태', '종류', '시간', '물품', '개수'];
                    columns = [
                        {data: "id", renderer: "html"},
                        {data: "status_ko"},
                        {data: "kind_ko"},
                        {data: "ordered_time"},
                        {data: "stock.title"},
                        {data: "quantity"}
                    ];
                    break;
                case "operation":
                case "close":
                case "sell":
                    if(!pagination) {
                        rc.last_log_idx = rc.last_log_idx2;
                        rc.last_log_idx2 = res.data.results[0]? res.data.results[0].id : 999999;
                    }
                    rc.list = res.data.results;
                    break;
            }
            if(tableType === 'handson') {
                var data = $.map(res.data.results, function (obj) { // id를 누르면 디테일 페이지로 가도록
                    var url = '#'+tab+'/'+ obj.id + '/';
                    obj.id = "<a href='" + url + "'>" + obj.id + "</a>";
                    return obj;
                });

                var listTable = new Handsontable(document.getElementById('listTable'), {
                    data: data,
                    rowHeaders: true,
                    colHeaders: colHeaders,
                    columns: columns
                });
            }
            rc.loaded = true;

        }, function() {
            alert('리스트를 불러오지 못했어요. 새로고침을 해주시겠어요?');
            rc.loaded = true;
        });
    },
    // TODO: 심플리스트랑 그냥리스트랑 합치기
    getSimpleList: function($http, tab, rc, uid) {
        $http.get('/api/' + tab + '/', {
            params: {
                simple: true
            }
        }).then(function(res) {
            console.log("SIMPLE LIST", tab, res.data);

            $("#table_search").DataTable(); /*-- DataTable 활성화 --*/
            switch(tab) {
                case "retailer":
                    rc.retailerList = res.data;
                    break;
                case "stock":
                    if(uid) {
                        rc.stockList = res.data; // operation의 작은 리스트
                    } else {
                        rc.list = res.data; // 물품 검색의 리스트
                    }
                    break;
            }
            var data = $.map(res.data, function (obj) {
                obj.text = obj.text || uid? obj.title+' '+obj.uid : obj.title; /*-- uid가 true면 title이랑 uid랑 합쳐 보여주기 --*/
                return obj;
            });
            $("."+tab+"-select").select2({
                placeholder: '제품 선택',
                data: data
            });
        }, function() {
            alert('리스트를 불러오지 못했어요. 새로고침을 해주시겠어요?');
        });
    },
    getListByDate: function(begin, end, $http, tab, rc, tableType) {
        var params =  {
            begin: begin,
            end: end
        };
        if(tableType === 'handson') {
            $('#listTable .handsontable').remove(); // TODO: 기존 테이블 지우지 않고 데이터 갈아채기
            apiCRUD.getList($http, tab, rc, 'handson', false, params);
        } else {
            apiCRUD.getList($http, tab, rc, 'simple', false, params);
        }
    },
    getItem: function($http, tab, rc, stockId) { // TODO: 이것도 합치기
        $http.get('/api/' + tab + '/'+stockId + '/').then(function(res) {
            var remains = res.data.retailer_remains;
            if(remains && remains.length !== 0) {
                remains.sum = remains.reduce(function(p, c) { return p.remains + c.remains; });
            }
            console.log("DETAIL", res.data);
            rc.detail = res.data;

        }, function() {
            alert('정보를 불러오지 못했어요. 새로고침을 해주시겠어요?');
        });
    },
    deleteClose: function($http, rc, id) {
        if (confirm("마감 이력을 삭제하시겠습니까?") === true){    //확인
            $http.delete('/api/close/'+id+'/delete/').then(function(res) {
                apiCRUD.getList($http, 'close', rc); /*-- 리스트 가져오기 --*/
            }, function() {
                alert('마감이 삭제되지 않았습니다. 다시 시도해 보세요.');
            });
        }
    },
    deleteOperation: function($http, rc, tab, id) {
        console.log(tab);
        if (confirm("이력을 삭제하시겠습니까?") === true){    //확인
            $http.delete('/api/invoice/'+id+'/delete/').then(function(res) {
                alert('삭제되었습니다.')
                if(tab==='operation') {
                    apiCRUD.getList($http, 'invoice/'+ location.hash.split('/')[2], rc); /*-- 리스트 가져오기 --*/
                } else {
                    apiCRUD.getItem($http, tab, rc, rc.itemId); /*-- 상세 데이터 가져오기 --*/
                }
            }, function() {
                alert('이력이 삭제되지 않았습니다. 다시 시도해 보세요.');
            });
        }
    },
    /*-- 작업 POST 전송 함수 --*/
    postOperation: function($http, rc) {
        var data;
        var operationName = location.hash.substring(2).split('/')[1];
        var retailer = $('#retailer-select').val();
        var quantity = $('.number-select').val();
        var note = $('textarea.note').val();
        var client = $('input.client').val();

        switch(operationName) {
            case "promote":
                data = {
                    day: rc.endDate,
                    retailer: retailer,
                    quantity: quantity,
                    note: note,
                    client: client
                };
                break;
            case "afterservice":
                data = {
                    day: rc.endDate,
                    retailer: retailer,
                    quantity: quantity,
                    note: note
                };
                break;
            default:
                data = {
                    day: rc.endDate,
                    retailer: retailer,
                    quantity: quantity
                };
                break;
        }

        $http.post('/api/stock/'+$('.stock-select').val()+'/'+operationName+'/', $.param(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            rc.successMsg = res.data;
            apiCRUD.getList($http, 'invoice/'+ location.hash.split('/')[2], rc);
        }, function(res) {
            rc.errorMsg = res.data;
        });
    },
    /*-- 마감 POST 전송 함수 --*/
    postClose: function($http, rc) {
        var data = {
            end: rc.endDate
        };
        $http.post('/api/close/execute/', $.param(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            alert(res.data);
            apiCRUD.getList($http, 'close', rc);
        }, function(res) {
            alert(res.data);
        });
    },
    downloadExcel: function(rc, id) {
        var url = 'api/close/' + (id ? id+'/download/' : 'preview/?end='+rc.endDate);
        window.location.assign(url);
    }
};
```
노답 구조다...ㅎㅎㅎ;;

## apiCRUD에서 해야 하는 일 정리
먼저 거대한 apiCRUD 내부 함수들의 기능을 정리해본다.

- **getList**
    + 인자: 탭이름, 앵귤러컨트롤러, 보여주고 싶은 테이블 타입(handson, datatables), 페이지네이션 url, 파라미터
    + 로딩 애니메이션을 위해 아직 리스트 불리기 전임을 알려줌
    + url 생성(페이지네이션 있으면 그걸로 갈아치고, 없으면 `api/탭이름/`으로 한다 )
    + url, 파라미터를 넣어서 `ajax GET`한다.
        * tab이름이 invoice/어쩌구 면 tab이름을 operation으로 갈아친다
        * pagination이 있으면 그거 잘라다가 현재페이지(rc.pageNum)에 넣어준다.
        * 페이지네이션 앞 뒤 넣어준다
        * 탭별로 스위치
            - stock, invoice는 handsone 옵션들 넣어준다
            - operation, close, sell은 페이지네이션으로 호출한게 아닌경우엔 로그에 노란거 표시 위한 짓들을 해준다.
        * 핸슨테이블이라면
            - id를 누르면 디테일 페이지로 가도록 한다.
    + 다 불러지면 로딩 애니메이션 true로 바꾸기
- **getSimpleList**
    + 
