# jquery bootstrap modal steps 분석하기

[jquery bootstrap modal steps](https://github.com/orige/jquery-bootstrap-modal-steps)플러그인을 분석하며 jquery 플러그인 만드는 것까지 학습한다.

## jquery plugin 만들기
> 이미 instance화 되어진 object인 jQuery object를 확장하여 새로운 function을 만들어 사용할 수 있게 해준다.

- `$.fn`이라는 네임스페이스 밑에 확장해주면 jQuery object그대로 쓸 수 있다.
    + `jquery effin`이라 읽는다

### 1
```javascript
$.fn.GetInnerText = function () {
    this.each(function () { alert($(this).text()); });
}
$(document).ready(
    function () { 
        $(".title").GetInnerText();
    }
```

### 2
안에 좀 더 복잡한 형태(private function, private변수 등)가 들어가면, 이름 중복으로 발생할 문제 해결 위해 jQuery를 parameter로 하는 self-invacation함수를 사용해준다.
```javascript
(function ($) {
    $.fn.GetInnerText = function () {
        this.each(function () { alert($(this).text()); });
    }
})($) 
$(document).ready(
    function () { $(".title").GetInnerText(); }
    )
```

## 기억해둘것
- 파일명을 `jquery.[플러그인명].js` 로 짓도록 합니다. 
    - 예 : jquery.debug.js
- 모든 새로운 메소드는 `jQuery.fn` 개체에 종속되도록 하고, 모든 함수는 `jQuery` 개체에 종속되게 합니다.메소드 내에서 'this' 인스턴스는 현재 jQuery 개체를 가리킵니다.새로 덧붙인 모든 메소드와 함수는 반드시 세미콜론(;)으로 끝나야 합니다 
    - 그렇지 않으면 파일을 압축할 때 코드가 깨지기 때문입니다.메소드는 특별히 명시된 상황이 아닌 한 반드시 jQuery 개체를 반환해야 합니다. this.each 를 사용해서 현재 엘리먼트 셋에 접근해야 합니다 - 이렇게 하면 코드는 깔끔하고 호환성이 높아집니다.항상 메소드를 $ 대신에 jQuery 에 바로 추가하도록 합니다. 그래야 사용자는 noConflict() 를 통해 자신만의 이름을 사용할 수 있습니다. 사용자 별명 섹션 아래를 읽도록 합니다. 고상한 해결책은 $를 내부에서 사용하되, 메소드는 첫째 jQuery 개체에 추가하는 것입니다.

## jquery bootstrap modal steps
> 주석달기

```javascript
/*
https://github.com/orige/jquery-bootstrap-modal-steps 를 커스텀.
*/
(function($){
    'use strict';

    $.fn.modalSteps = function(options){
        var $modal = this; // $modal에 현재 클릭 객체 넣어두기. 모달 객체가 들어간다. 뒤에서 bootstrap이 data-target속성으로 연결해줌
        console.log($modal);

        var settings = $.extend({ //settings에 위에서 받은 options 객체를 합쳐서 넣어둔다.
            btnCancelHtml: '취소',
            btnPreviousHtml: '이전',
            btnNextHtml: '다음',
            btnLastStepHtml: '시작하기',
            disableNextButton: false,
            completeCallback: function(){},
            callbacks: {}
        }, options);

        // 콜백이 함수가 맞는지, 유효한지 validate
        var validCallbacks = function(){
            var everyStepCallback = settings.callbacks['*'];

            if (everyStepCallback !== undefined && typeof(everyStepCallback) !== 'function'){
                throw 'everyStepCallback is not a function! I need a function';
            }

            if (typeof(settings.completeCallback) !== 'function') {
                throw 'completeCallback is not a function! I need a function';
            }

            for(var step in settings.callbacks){
                if (settings.callbacks.hasOwnProperty(step)){
                    var callback = settings.callbacks[step];

                    if (step !== '*' && callback !== undefined && typeof(callback) !== 'function'){
                        throw 'Step ' + step + ' callback must be a function';
                    }
                }
            }
        };

        var executeCallback = function(callback){
            if (callback !== undefined && typeof(callback) === 'function'){
                callback();
                return true;
            }
            return false;
        };

        $modal
            // .modal이 show될때 이벤트. bs = bootstrap js가 달아줌.
            .on('show.bs.modal', function(){
                var $modalFooter = $modal.find('.modal-footer'),
                    $btnCancel = $modalFooter.find('.js-btn-step[data-orientation=cancel]'),
                    $btnPrevious = $modalFooter.find('.js-btn-step[data-orientation=previous]'),
                    $btnNext = $modalFooter.find('.js-btn-step[data-orientation=next]'),
                    everyStepCallback = settings.callbacks['*'],
                    stepCallback = settings.callbacks['1'],
                    actualStep,
                    $actualStep,
                    titleStep,
                    $titleStepSpan,
                    nextStep;

                if (settings.disableNextButton){
                    $btnNext.attr('disabled', 'disabled');
                }
                $btnPrevious.attr('disabled', 'disabled');

                validCallbacks();
                executeCallback(everyStepCallback);
                executeCallback(stepCallback);

                // Setting buttons
                $btnCancel.html(settings.btnCancelHtml);
                $btnPrevious.html(settings.btnPreviousHtml);
                $btnNext.html(settings.btnNextHtml);

                // $actualStep: 안보이는 input만들기. value는 첨엔 1. 여기엔 현재 step이 저장된다.
                $actualStep = $('<input>').attr({
                    'type': 'hidden',
                    'id': 'actual-step',
                    'value': '1',
                });

                $modal.find('#actual-step').remove();
                $modal.append($actualStep);

                // var actualStep에 1넣고 nextStep엔 ++ 넣기
                actualStep = 1;
                nextStep = actualStep + 1;

                $modal.find('[data-step=' + actualStep + ']').removeClass('hide');
                $btnNext.attr('data-step', nextStep);

                // 현재 스텝의 모달 div를 가져와서 title값을 담아 titleSpan에 현재 step을 보여준다.
                titleStep = $modal.find('[data-step=' + actualStep + ']').data('title');
                $titleStepSpan = $('<span>')
                                    .addClass('label label-success')
                                    .html(actualStep);

                $modal
                    .find('.js-title-step')
                    .append($titleStepSpan)
                    .append(' ' + titleStep);
            })
            // 모달이 hidden되었을 때
            .on('hidden.bs.modal', function(){
                var $actualStep = $modal.find('#actual-step'),
                    $btnNext = $modal.find('.js-btn-step[data-orientation=next]');

                $modal
                    .find('[data-step]')
                    .not($modal.find('.js-btn-step'))
                    .addClass('hide');

                $actualStep
                    .not($modal.find('.js-btn-step'))
                    .remove();

                $btnNext
                    .attr('data-step', 1)
                    .html(settings.btnNextHtml);

                $modal.find('.js-title-step').html('');
            });

        // cancel, next, previous 버튼 클릭
        $modal.find('.js-btn-step').on('click', function(){
            var $btn = $(this),
                $actualStep = $modal.find('#actual-step'),
                $btnPrevious = $modal.find('.js-btn-step[data-orientation=previous]'),
                $btnNext = $modal.find('.js-btn-step[data-orientation=next]'),
                $title = $modal.find('.js-title-step'),
                orientation = $btn.data('orientation'),
                actualStep = parseInt($actualStep.val()),
                everyStepCallback = settings.callbacks['*'],
                steps,
                nextStep,
                $nextStep,
                newTitle;

            steps = $modal.find('div[data-step]').length;

            // Callback on Complete. 모달 hide시킨다.
            if ($btn.attr('data-step') === 'complete'){
                settings.completeCallback();
                $modal.modal('hide');

                return;
            }

            // Check the orientation to make logical operations with actualStep/nextStep
            // next를 누르면 nextStep++ 하고,
            if (orientation === 'next'){
                nextStep = actualStep + 1;

                $btnPrevious.attr('data-step', actualStep);
                $actualStep.val(nextStep);

            } else if (orientation === 'previous'){
                nextStep = actualStep - 1;

                $btnNext.attr('data-step', actualStep);
                $btnPrevious.attr('data-step', nextStep - 1);

                $actualStep.val(actualStep - 1);

            } else {
                $modal.modal('hide');
                return;
            }

            if (parseInt($actualStep.val()) === steps){
                $btnNext
                    .attr('data-step', 'complete')
                    .html(settings.btnLastStepHtml);
            } else {
                $btnNext
                    .attr('data-step', nextStep)
                    .html(settings.btnNextHtml);
            }

            if (settings.disableNextButton){
                $btnNext.attr('disabled', 'disabled');
            }

            // Hide and Show steps
            $modal
                .find('[data-step=' + actualStep + ']')
                .not($modal.find('.js-btn-step'))
                .addClass('hide');

            $modal
                .find('[data-step=' + nextStep + ']')
                .not($modal.find('.js-btn-step'))
                .removeClass('hide');

            // Just a check for the class of previous button
            if (parseInt($btnPrevious.attr('data-step')) > 0 ){
                $btnPrevious.removeAttr('disabled');
            } else {
                $btnPrevious.attr('disabled', 'disabled');
            }

            if (orientation === 'previous'){
                $btnNext.removeAttr('disabled');
            }

            // Get the next step
            $nextStep = $modal.find('[data-step=' + nextStep + ']');

            // Verify if we need to unlock continue btn of the next step
            if ($nextStep.attr('data-unlock-continue')){
                $btnNext.removeAttr('disabled');
            }

            // Set the title of step
            newTitle = $nextStep.attr('data-title');
            var $titleStepSpan = $('<span>')
                                .addClass('label label-success')
                                .html(nextStep);

            $title
                .html($titleStepSpan)
                .append(' ' + newTitle);

            var stepCallback = settings.callbacks[$actualStep.val()];
            executeCallback(everyStepCallback);
            executeCallback(stepCallback);
        });

        return this;
    };
}(jQuery));
```

## Refer
[jquery plugin 작성 가이드](http://www.sqler.com/456517)
[jQuery - 플러그인 만들기](http://lazygyu.tistory.com/42)
[jquery bootstrap modal steps](https://github.com/orige/jquery-bootstrap-modal-steps)
[jquery on](http://noritersand.tistory.com/218)
