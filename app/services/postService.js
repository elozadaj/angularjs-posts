/**
 * PostService constructor.
 * @param {!angular.http} $http Angular's http object.
 * @constructor
 */
var PostService = function(http){
  var this_ = this;
  var http_ = http;

  return{
  	getAllPosts: function(){
      return http.get(this_.serverRoot+"/posts");
  	},
    getAllComments: function(){
      return http.get(this_.serverRoot+"/comments");
    },
    getAllUsers: function(){
      return http.get(this_.serverRoot+"/users");
    },
    removePost: function(postId){
      console.log(this_.serverRoot+"/posts/"+postId);
      return http.delete(this_.serverRoot+"/posts/"+postId);
    },
    removeComment: function(commentId){
      console.log(this_.serverRoot+"/comments/"+commentId);
      return http.delete(this_.serverRoot+"/comments/"+commentId);
    },
  }
};

/** @private */
PostService.prototype.serverRoot = 'http://jsonplaceholder.typicode.com';