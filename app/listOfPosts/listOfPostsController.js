/**
 * ListOfPostsController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope.
 */
var ListOfPostsController = function($scope){
  /** @export */
  this.scope_ = $scope;
  /** @export */
  this.posts_ = null;
  /** @export */
  this.currentUser_ = null;

  this.scope_.$watch('posts',function(){
  	this.posts_ = this.scope_.posts;
  }.bind(this));

  this.scope_.$watch('currentUser',function(){
  	this.currentUser_ = this.scope_.currentUser;
  }.bind(this));
}

/**
 * Loads information from an specific post.
 * @param {Object} selectedPost Post selected by the user.
 */
ListOfPostsController.prototype.selectPost = function(selectedPost){
  this.scope_.$emit('postSelectedFromList',selectedPost);
};