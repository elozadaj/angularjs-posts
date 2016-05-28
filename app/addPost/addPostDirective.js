/**
 * CommentDirective constructor.
 * @constructor
 * @return {Object} New object of CommentDirective.
 */
var AddPostDirective = function(){
  return {
    restrict: 'E',
    scope:{
    	currentUser: "=",
    },
    templateUrl: '/app/addPost/epamAddPostView.html'
  };
};