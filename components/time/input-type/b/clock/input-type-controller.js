export default function inputTypeController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'clock.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.time.types.clock');

  var questionData  = gameData.home.question,
    initialDegree = questionData.initialDegree,
    rotateBy = questionData.rotateBy,
    maxValue      = questionData.maxValue,
    minValue      = questionData.minValue,
    emptyString   = _.toString(null),
    value         = emptyString,
    inputIndex    = null,
    time;

  $scope.hintText     = questionData.hint.text;
  $scope.questionText = questionData.timeQuestion.text;
  $scope.header       = gameData.home.header;
  $scope.flag = true;

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.checkClass        = {tick: 'invisible', cross: 'invisible'};
  $scope.question          = questionData;
  $scope.clockImages       = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.inputs            = [];

  //For next/check button click
  $scope.next          = next;
  $scope.check         = check;
  $scope.inputClick    = inputClick;
  $scope.onNumberClick = onNumberClick;
  $scope.redo = redo;
  $scope.getScoreboard = getScoreboard;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  $timeout(function () {
    init();
    $scope.flag = -1;
    // Restricted white space and special character
    $('input').on('keypress', function (event) {
      var regex = new RegExp('^[]+$');
      var key   = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });
  });

  // Game initialization function
  function init() {
    inputIndex           = null;
    time                 = rotateNeedle();
    $scope.inputDisabled = false;
    $scope.inputs.length = 0;
    $scope.checkClass    = {tick: 'invisible', cross: 'invisible'};
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  // For rotate hour needle
  function rotateNeedle() {
    var degree = ($scope.generateRandomNumber(maxValue, minValue) * rotateBy) + initialDegree;
    angular.element('#hour-needle').css('transform', 'rotate(' + degree + 'deg)');
    return degree / rotateBy;
  }

  function isCorrect() {
    var falgState = [];
    _.forEach($scope.inputs, function (val) {
      if(!_.isEmpty(val)){
        falgState.push(val !== '' || _.isUndefined(val));
      }
    });
    return falgState[0] && falgState[1];
  }

  function redo($event) {
    $event.preventDefault();
    angular.element('input').val('');
    value = '';
    $scope.inputs.length = 0;
    $scope.inputDisabled = false;
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  // For check button click
  function check() {

    if (isCorrect()) {
      $scope.inputDisabled = true;
      if (parseInt($scope.inputs[0]) === time && parseInt($scope.inputs[1]) === time) {
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
        $scope.scoreboard.up();
      } else {
        $scope.flag = 0;
      }
    } else {
      $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    }
  }

  function inputClick(index) {
    $scope.inputDisabled=false;
    value      = emptyString;
    inputIndex = index;
  }

  function onNumberClick($event, num) {
    if (num === 'backspace') {
      value = value.substring(0, value.length - 1);
    } else if (value.length <= 1) {
      value = value + emptyString + num;
    }
    else {
      value = value;
    }
    angular.element('#input' + inputIndex).val(value);
    $scope.inputs[inputIndex] = value;
  }

}
