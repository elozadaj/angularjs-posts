/**
 * AddPostController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope object.
 * @param {!Function} userService Service which provides current user.
 * @param {!angular.mdDialog} $mdDialog Angular Material dialog component.
 */
var AddPostController = function($scope, userService, $mdDialog) {
  /** @private {angular.scope} */
  this.scope_ = $scope;
  /** @private {angular.mdDialog} */
  this.mdDialog_ = $mdDialog;
  /** @private {Object} */
  this.currentUser_ = userService.getCurrentUser();
  
  /** @export {String} */
  this.postTitle = null;
  /** @export {String} */
  this.postBody = null;
};

/**
 * Add new post.
 */
AddPostController.prototype.addPost = function() {
  var newPost = { };
  newPost.title = this.postTitle;
  newPost.body = this.postBody;
  newPost.userId = this.currentUser_.id;
  this.mdDialog_.hide(newPost);
};

/**
 * Close addPost view.
 */
AddPostController.prototype.closeAddPost = function() {
  this.mdDialog_.cancel();
};