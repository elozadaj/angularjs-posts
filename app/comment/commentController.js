/**
 * CommentController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope object.
 * @param {!Function} UserService Service which provides current user.
 */
var CommentController = function($scope, UserService) {
  /** @private {angular.scope} */
  this.scope_ = $scope;
  
  /** @export {Object} */
  this.comment = this.scope_.comment;
  /** @export {Object} */
  this.currentUser = UserService.getCurrentUser();
};