// Main module.
var mainModule = angular.module('mainModule', ['ngMaterial']);

// Defining services.
mainModule.service('postService', ['$http', PostService]);
mainModule.service('userService', UserService);
mainModule.service('dialogService', ['$mdDialog', DialogService]);

// Defining main controller.
mainModule.controller("mainController", ['$scope', '$http', '$filter', '$q', 'postService', 'userService', 'dialogService', MainController]);

// Defining listOfPosts components.
mainModule.controller("listOfPostsController", ['$scope', ListOfPostsController]);
mainModule.directive('epamListOfPosts', ListOfPostsDirective);

// Defining postPreview components.
mainModule.controller("postPreviewController", ['$scope', 'userService', PostPreviewController]);
mainModule.directive('epamPostPreview', PostPreviewDirective);

// Defining fullPost components.
mainModule.controller("fullPostController", ['$scope', FullPostController]);
mainModule.directive('epamFullPost', FullPostDirective);

// Defining comment components.
mainModule.controller("commentController", ['$scope', 'userService', CommentController]);
mainModule.directive('epamComment', CommentDirective);

// Defining addPost components.
mainModule.controller("addPostController", ['$scope', 'userService', '$mdDialog', AddPostController]);