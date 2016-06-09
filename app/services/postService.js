/**
 * PostService constructor.
 * @param {!angular.http} $http Angular's http object.
 * @constructor
 */
var PostService = function($http) {
  /** @private {Object} */
  var this_ = this;
  /** @private {angular.http} */
  var http_ = $http;

  return {
    /**
     * Gets all posts from external server.
     * @return {Object} Returns the promise of the service.
     */
    getAllPosts: function() {
      return http_.get(this_.serverRoot+"/posts");
  	},
    /**
     * Gets all comments from external server.
     * @return {Object} Returns the promise of the service.
     */
    getAllComments: function() {
      return http_.get(this_.serverRoot+"/comments");
    },
    /**
     * Gets all users from external server.
     * @return {Object} Returns the promise of the service.
     */
    getAllUsers: function() {
      return http_.get(this_.serverRoot+"/users");
    },
    /**
     * Gets all the posts from external server.
     * @param {!Object} post Post which will be added.
     * @return {Object} Returns the promise of the service.
     */
    addPost: function(post) {
      return http_.post(this_.serverRoot+"/posts",post);
    },
    /**
     * Updates post.
     * @param {post} post Post which will be updated.
     * @return {Object} Returns the promise of the service.
     */
    editPost: function(post) {
      return http_.patch(this_.serverRoot+"/posts/"+post.id);
    },

    /**
     * Removes post.
     * @param {number} postId Id of the post which will be removed.
     * @return {Object} Returns the promise of the service.
     */
    removePost: function(postId) {
      return http_.delete(this_.serverRoot+"/posts/"+postId);
    },
    /**
     * Removes comments.
     * @param {number} commentId Id of the comment which will be removed.
     * @return {Object} Returns the promise of the service.
     */
    removeComment: function(commentId) {
      return http_.delete(this_.serverRoot+"/comments/"+commentId);
    },
  }
};

/** @private {String} */
PostService.prototype.serverRoot = 'http://jsonplaceholder.typicode.com';