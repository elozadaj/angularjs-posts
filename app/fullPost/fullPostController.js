/**
 * FullPostController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope object.
 */
var FullPostController = function($scope){
  /** @export */
  this.scope_ = $scope;
  /** @export */
  this.post_ = null;
  /** @export */
  this.currentUser_ = null;

  this.scope_.$watch('post',function(){
  	this.post_ = this.scope_.post;
  }.bind(this));

  this.scope_.$watch('currentUser',function(){
  	this.currentUser_ = this.scope_.currentUser;
  }.bind(this));

};

/**
 * Close current view.
 */
FullPostController.prototype.closeFullPost = function(){
  this.scope_.$emit('fullPostClosed');
};