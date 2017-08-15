
export default function circlesController($scope, $state, $stateParams, GameData, RequireImages,$timeout) {
  'ngInject';

  $scope.gamePageView = 'circles.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.subtraction.types.circles');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.questionSubminus = questionData.minus.text;
  $scope.questionSubequal = questionData.equal.text;
  $scope.header = gameData.home.header;
  $scope.flag = true;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);
  $scope.circleImages = RequireImages.get($scope.getImageContext(), questionData.circleImages);
  $scope.ranger = _.range(1, 11);


  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.getScoreboard = getScoreboard;
  $scope.onNumberClick = onNumberClick;
  $scope.inputClick    = inputClick;
  $scope.redo = redo;

  init();
  $scope.flag = -1;
  var checkIsEmpty = false,
  value = '';

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

//for diasable chars
  function disableCharacter() {
    $timeout(function () {
      $('input').on('keypress', function (event) {
        var regex = new RegExp('^[]+$');
        var key   = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
      });
    });
  }

  // Game initialization function
  function init(){
    $scope.Scorecount=0;
    $scope.rows    = _.range(0, 5);
    $scope.columns = _.range(1, 3);
    $scope.currentInput = 0;
    $scope.buttons = _.range(1, $scope.data.buttons + 1);

    $scope.firstNumber = $scope.generateRandomNumber(10,1);
    $scope.secondNumber = $scope.generateRandomNumber(10-$scope.firstNumber,1);

    while($scope.secondNumber>$scope.firstNumber){
      $scope.firstNumber = $scope.generateRandomNumber(10,1);
    }

    $scope.circlecount=[];
    $scope.circlecount=_.range(0,$scope.firstNumber);
    $scope.ans=($scope.firstNumber  -  $scope.secondNumber);
    $scope.answer = eval($scope.firstNumber  -  $scope.secondNumber);

    $('#input-value').val('');

    angular.element('.action-btn').css({'pointer-events': 'auto'});
    angular.element('.check-button').removeClass('move-disable').addClass('move-enable');
    disableCharacter();

    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');

  }

  //redo function
  function redo($event) {
    $event.preventDefault();
    angular.element('#input-value').val('');
    value = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  // For more button click
  function next($event) {
    $event.preventDefault();

    init();

    $('#input-value').val('');

    value = '';
    return false;
  }

  function check($event) {
    $event.preventDefault();
    checkIsEmpty = _.isEmpty(value);
    var result = parseInt($('#input-value').val());
    if (checkIsEmpty === false) {
      if (result === $scope.answer) {
        $scope.Scorecount++;
        $scope.flag = 1;
        if ($scope.Scorecount === 1) {
          $scope.scoreboard.up();
        }
      } else {
        $scope.flag = 0;
      }
    }
  }

  function onNumberClick  ($event, num) {
    if (value.length <= 1) {
      value = value + '' + num;
    }
    else {
      value = value;
    }
    angular.element('#input-value').val(value);
  }


  function inputClick(index) {
    $scope.currentInput = index;
  }

}
