/**
 * ListOfPostsController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope.
 */
var ListOfPostsController = function($scope) {
  /** @private {angular.scope} */
  this.scope_ = $scope;

  /** @export {Object} */
  this.posts = this.scope_.posts;
}

/**
 * Loads information from an specific post.
 * @param {Object} selectedPost Post selected by the user.
 */
ListOfPostsController.prototype.selectPost = function(selectedPost) {
  this.scope_.$emit('postSelectedFromList', selectedPost);
};