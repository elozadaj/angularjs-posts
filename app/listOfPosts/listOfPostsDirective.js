/**
 * ListOfPostsDirective constructor.
 * @constructor
 * @return {Object} New object of ListOfPostsDirective.
 */
var ListOfPostsDirective = function() {
  return {
    restrict: 'E',
    scope: {
      posts: '=',
      selectedPost: '=',
    },
    templateUrl: '/app/listOfPosts/epamListOfPostsView.html',
  };
};