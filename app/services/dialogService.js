/**
 * DialogService constructor.
 * @constructor
 * @param {!angular.mdDialog} $mdDialog Angular material dialog component.
 */
var DialogService = function($mdDialog) {
  /** @private {angular.mdDialog} */
  this.mdDialog_ = $mdDialog;
};

/**
 * Creates a modal dialog for adding posts.
 */
DialogService.prototype.createAddDialog = function() {
  return this.mdDialog_.show( {
    clickOutsideToClose: true,
    controller: AddPostController,
    controllerAs: 'apCtrl',
    parent: document.body,
    templateUrl: '/app/addPost/epamAddPostView.html',
  });
};

/**
 * Creates a modal dialog for editing posts.
 */
DialogService.prototype.createEditDialog = function(post) {
  return this.mdDialog_.show( {
    clickOutsideToClose: true,
    controller: EditPostController,
    controllerAs: 'epCtrl',
    locals: {
      post: post
    },
    parent: document.body,
    templateUrl: '/app/editPost/epamEditPostView.html',
  });
};

/**
 * Creates a modal dialog for reporting generic errors.
 */
DialogService.prototype.createErrorDialog = function() {
  return this.mdDialog_.show(
    this.mdDialog_.alert()
	  .ariaLabel('Error message')
	  .clickOutsideToClose(true)
	  .ok('Accept')
	  .textContent('An error ocurred while performing current operation.')
	  .title('Error')
  );
};