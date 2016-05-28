/**
 * CommentController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope object.
 */
var AddPostController = function($scope, addPostService){
  /** @private */
  this.scope_ = $scope;
  /** @private */
  this.addPostService_ = addPostService;
  /** @export */
  this.postTitle = null;
  /** @export */
  this.postBody = null;
};

/**
 * Add new post
 */
AddPostController.prototype.addPost = function(){
  console.log("Agregando post de "+this.scope_.currentUser.name);
  console.log("Title: "+this.postTitle);
  console.log("Body: "+this.postBody);
  console.log("userId: "+this.scope_.currentUser.id);
  var newPost = [];
  newPost.title = this.postTitle;
  newPost.body = this.postBody;
  newPost.userId = this.scope_.currentUser.id;
  this.addPostService_(newPost);
};

/**
 * Close addPost view
 */
AddPostController.prototype.closeAddPost = function(){
  this.scope_.$emit('addPostClosed');
};