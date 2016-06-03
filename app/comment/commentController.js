/**
 * CommentController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope object.
 * @param {!Function} UserService Service which provides current user.
 */
var CommentController = function($scope, UserService) {
  /** @private */
  this.scope_ = $scope;
  /** @export */
  this.comment_ = this.scope_.comment;
  /** @export */
  this.currentUser_ = UserService.getCurrentUser();
};