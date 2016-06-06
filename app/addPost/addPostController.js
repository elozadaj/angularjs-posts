/**
 * CommentController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope object.
 */
var AddPostController = function($scope) {
  /** @private {angular.scope} */
  this.scope_ = $scope;
  
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
  newPost.userId = this.scope_.currentUser.id;

  this.scope_.$emit("addPost", newPost);

  this.postTitle = null;
  this.postBody = null;
};

/**
 * Close addPost view.
 */
AddPostController.prototype.closeAddPost = function() {
  this.scope_.$emit('addPostClosed');
};