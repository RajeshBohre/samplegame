
export default function inputTypeController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'input-type.g';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.division.types.input-type');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;

  // Set image path
  // $scope.inputTypeImages = RequireImages.get($scope.getImageContext(), gameData.home.images);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);

  //For more/next button click
  $scope.next = next;

  init();

  // Game initialization function
  function init(){
  }

  // For more button click
  function next($event) {
    $event.preventDefault();

    init();

    return false;
  }

  /*
  // For more button click
  function reset($event) {
    $event.preventDefault();
    return false;
  }

  // For more button click
  function check($event) {
    $event.preventDefault();
    return false;
  }
  */

  /* Game specific logic and common function for all sub types could be added here */

}
