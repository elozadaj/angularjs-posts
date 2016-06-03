/**
 * PostService constructor.
 * @param {!angular.http} $http Angular's http object.
 * @constructor
 */
var PostService = function($http) {
  var this_ = this;
  var http_ = $http;

  return{
  	getAllPosts: function(){
      return http_.get(this_.serverRoot+"/posts");
  	},
    getAllComments: function(){
      return http_.get(this_.serverRoot+"/comments");
    },
    getAllUsers: function(){
      return http_.get(this_.serverRoot+"/users");
    },
    addPost: function(post){
      return http_.post(this_.serverRoot+"/posts",post);
    },
    removePost: function(postId){
      return http_.delete(this_.serverRoot+"/posts/"+postId);
    },
    removeComment: function(commentId){
      return http_.delete(this_.serverRoot+"/comments/"+commentId);
    },
  }
};

/** @private */
PostService.prototype.serverRoot = 'http://jsonplaceholder.typicode.com';