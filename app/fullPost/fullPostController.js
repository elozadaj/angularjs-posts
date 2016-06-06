/**
 * FullPostController constructor.
 * @constructor
 * @param {!angular.scope} $scope Angular's scope object.
 */
var FullPostController = function($scope) {
  /** @private {angular.scope} */
  this.scope_ = $scope;

  /** @export {Object} */
  this.post = this.scope_.post;
};

/**
 * Close current view.
 */
FullPostController.prototype.closeFullPost = function() {
  this.scope_.$emit('fullPostClosed');
};