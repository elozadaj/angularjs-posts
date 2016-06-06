/**
 * UserService constructor.
 * @constructor
 */
var UserService = function() {
  /** @private {Object} Current user in the application*/
  this.currentUser_ = null;
};

/** 
 * Gets current user.
 * @return {Object} Returns current user.
 * @export 
 */
UserService.prototype.getCurrentUser = function() {
  return this.currentUser_;
};

/** 
 * Sets current user.
 * @param {!Object} user User which will be set
 * @export 
 */
UserService.prototype.setCurrentUser = function(user) {
  this.currentUser_ = user;
};