
export default function capacityController($scope, $state, $stateParams) {
  'ngInject';

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'drag-type';

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.getImageContext = function () {
    return imageContext;
  };
  $scope.gamePageView = $scope.gameName + '.' + $scope.level;

  /* Game specific logic and common function for all sub types could be added here */
}
