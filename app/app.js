// Main module.
var module = angular.module('mainModule', [ ]);

// Defining services.
module.service('postService', ['$http', PostService]);

// Defining main controller.
module.controller("mainController", ['$scope', '$http', '$filter', '$q', 'postService', MainController]);

// Defining listOfPosts components.
module.controller("listOfPostsController", ['$scope', ListOfPostsController]);
module.directive('epamListOfPosts', ListOfPostsDirective);

// Defining postPreview components.
module.controller("postPreviewController", ['$scope', PostPreviewController]);
module.directive('epamPostPreview', PostPreviewDirective);

// Defining fullPost components.
module.controller("fullPostController", ['$scope', FullPostController]);
module.directive('epamFullPost', FullPostDirective);

// Defining fullPost components.
module.controller("commentController", ['$scope', CommentController]);
module.directive('epamComment', CommentDirective);

// Defining addPost components.
module.controller("addPostController", ['$scope', 'postService', AddPostController]);
module.directive('epamAddPost', AddPostDirective);