/**
 * CommentDirective constructor.
 * @constructor
 * @return {Object} New object of CommentDirective.
 */
var CommentDirective = function(){
  return {
    restrict: 'E',
    scope:{
      comment:'=',
    },
    templateUrl: '/app/comment/epamCommentView.html'
  };
};