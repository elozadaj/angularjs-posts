/**
 * PostPreviewDirective constructor.
 * @constructor
 * @return {Object} New object of PostPreviewDirective.
 */
var PostPreviewDirective = function(){
  return {
    restrict: 'E',
    scope:{
      post:'=',
    },
    templateUrl: '/app/postPreview/epamPostPreviewView.html'
  };
};