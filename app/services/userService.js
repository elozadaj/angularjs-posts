/**
 * UserService constructor.
 * @constructor
 */
var UserService = function() {
  this.currentUser_ = null;
};

/** 
 * Gets current user.
 * @return {Object} Returns current user.
 * @private 
 */
UserService.prototype.getCurrentUser = function() {
  return this.currentUser_;
};

/** 
 * Sets current user.
 * @param {!Object} user User which will be set
 * @private 
 */
UserService.prototype.setCurrentUser = function(user) {
  this.currentUser_ = user;
};