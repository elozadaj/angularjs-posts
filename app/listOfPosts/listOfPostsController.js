/**
 * ListOfPostsController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope.
 * @param {!Object} UserService Service that gets current user
 */
var ListOfPostsController = function($scope, UserService) {
  /** @export */
  this.scope_ = $scope;
  /** @export */
  this.posts_ = this.scope_.posts;
  /** @private */
  this.currentUser_ = UserService.getCurrentUser();
}

/**
 * Loads information from an specific post.
 * @param {Object} selectedPost Post selected by the user.
 */
ListOfPostsController.prototype.selectPost = function(selectedPost) {
  this.scope_.$emit('postSelectedFromList', selectedPost);
};