/**
 * CommentController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope object.
 */
var CommentController = function($scope){
  /** @private */
  this.scope_ = $scope;
  /** @export */
  this.comment_ = null;
  /** @export */
  this.currentUser_ = null;

  this.scope_.$watch('comment',function(){
  	this.comment_ = this.scope_.comment;
  }.bind(this));

  this.scope_.$watch('currentUser',function(){
  	this.currentUser_ = this.scope_.currentUser;
  }.bind(this));

};