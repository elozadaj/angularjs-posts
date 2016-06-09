/**
 * EditPostController constructor.
 * @constructor
 * @param {!angular.mdDialog} $mdDialog Angular Material dialog component.
 * @param {Object} locals Variables which will be injected to the controller.
 */
var EditPostController = function($mdDialog, locals) {
  /** @private {angular.mdDialog} */
  this.mdDialog_ = $mdDialog;
  
  /** @export {String} */
  this.post = Object.assign({},locals.post);
};

/**
 * Submit changes of current post.
 */
EditPostController.prototype.submit = function() {
  this.mdDialog_.hide(this.post);
};

/**
 * Close dialog.
 */
EditPostController.prototype.cancel = function() {
  this.mdDialog_.cancel();
};