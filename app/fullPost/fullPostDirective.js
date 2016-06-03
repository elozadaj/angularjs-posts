/**
 * FullPostDirective constructor.
 * @constructor
 * @return {Object} New object of FullPostDirective.
 */
var FullPostDirective = function(){
  return {
    restrict: 'E',
    scope:{
      post:'=',
    },
    templateUrl: '/app/fullPost/epamFullPostView.html'
  };
};