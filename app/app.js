// Main module.
var module = angular.module('mainModule', [ ]);

// Defining services.
module.service('postService', ['$http', PostService]);
module.service('userService', UserService);

// Defining main controller.
module.controller("mainController", ['$scope', '$http', '$filter', '$q', 'postService', 'userService', MainController]);

// Defining listOfPosts components.
module.controller("listOfPostsController", ['$scope', 'userService', ListOfPostsController]);
module.directive('epamListOfPosts', ListOfPostsDirective);

// Defining postPreview components.
module.controller("postPreviewController", ['$scope', 'userService', PostPreviewController]);
module.directive('epamPostPreview', PostPreviewDirective);

// Defining fullPost components.
module.controller("fullPostController", ['$scope', 'userService', FullPostController]);
module.directive('epamFullPost', FullPostDirective);

// Defining fullPost components.
module.controller("commentController", ['$scope', 'userService', CommentController]);
module.directive('epamComment', CommentDirective);

// Defining addPost components.
module.controller("addPostController", ['$scope', AddPostController]);
module.directive('epamAddPost', AddPostDirective);