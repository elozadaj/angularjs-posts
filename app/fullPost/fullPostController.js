/**
 * FullPostController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope object.
 */
var FullPostController = function($scope, UserService){
  /** @export */
  this.scope_ = $scope;
  /** @export */
  this.post_ = this.scope_.post;
  /** @export */
  this.currentUser_ = UserService.getCurrentUser();
};

/**
 * Close current view.
 */
FullPostController.prototype.closeFullPost = function(){
  this.scope_.$emit('fullPostClosed');
};