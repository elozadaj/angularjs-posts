/**
 * MainController constructor.
 * @param {!angular.scope} $scope Angular's scope object.
 * @param {!angular.http} $http Angular's http object.
 * @param {!angular.filter} $filter Angular's filter object.
 * @param {!angular.q} $q Angular's q object.
 * @param {!Function} PostService Service which contains post services.
 * @constructor
 */
var MainController = function($scope, $http, $filter, $q, PostService, UserService) {
  /** @private References angular's scope object*/
  this.scope_ = $scope;
  /** @private References angular's http object*/
  this.http_ = $http;
  /** @private References angular's filter object*/
  this.filter_ = $filter;
  /** @private References angular's q object*/
  this.q_ = $q;
  /** @private References PostService object*/
  this.PostService_ = PostService;
  /** @private References UserService object*/
  this.UserService_ = UserService;
  /** @private Array of users (authors) of posts */
  this.users = null;
  /** @export Array of all the posts */
  this.posts = null;
  /** @private Array of all the comments of all the posts */
  this.comments = null;
  /** @private Array with key = authorId and value = authorName */
  this.authorsNamesMap = null;
  /** @export */
  this.postListIsVisible = false;
  /** @export */
  this.fullPostIsVisible = false;
  /** @export */
  this.addPostIsVisible = false;
  /** @export */
  this.selectedPost = null;
  /** @export */
  this.filterField = "";
  /** @export */
  this.originalPostList = null;
  /** @export */
  this.showWait = false;  

  /**
   * Listens to an specific event of childScopes and change view components.
   * @param {!Object} event Angular's event object.
   * @param {!Object} data Data sent from the event.
   * @private
   */
  this.scope_.$on('postSelectedFromList', function(event, data) {
    this.selectedPost = data;
    this.showFullPost();
  }.bind(this));

  /**
   * Listens to an specific event of childScopes and change view components.
   * @param {!Object} event Angular's event object.
   * @param {?Object} data Data sent from the event.
   * @private
   */
  this.scope_.$on('fullPostClosed', function(event, data) {
    this.showPostList();
  }.bind(this));

  /**
   * Listens to an specific event of childScopes and change view components.
   * @param {!Object} event Angular's event object.
   * @param {?Object} data Data sent from the event.
   * @private
   */
  this.scope_.$on('addPostClosed', function(event, data) {
    this.showPostList();
  }.bind(this));

  /**
   * Adds an specific post to the list.
   * @param {!Object} event Angular's event object.
   * @param {!Object} post Post which will be added.
   * @private
   */
  this.scope_.$on('addPost', function(event, post) {
    this.addPostToView(post);
  }.bind(this));

  /**
   * Removes an specific post from the list.
   * @param {!Object} event Angular's event object.
   * @param {!Object} post Post which will be removed.
   * @private
   */
  this.scope_.$on('removePost', function(event, post) {
    this.removePostFromView(post);
  }.bind(this));

  // Loads JSON data from external server
  this.loadInformationFromServer();
};

/**
 * Loads information from an external server.
 * @private
 */
MainController.prototype.loadInformationFromServer = function() {
  var promises = [ ];
  // loads posts.
  promises.push(this.PostService_.getAllPosts());
  // loads comments.
  promises.push(this.PostService_.getAllComments());
  // loads users.
  promises.push(this.PostService_.getAllUsers());

  this.q_.all(promises).then(function(responses) {
    this.originalPostList = this.posts = responses[0].data;
    this.comments = responses[1].data;
    this.users = responses[2].data;
    this.loadAdditionalInformation();
  }.bind(this));
};

/**
 * Complement the information previously loaded
 * @private
 */
MainController.prototype.loadAdditionalInformation = function() {
  this.originalPostList = this.posts;
  // complementing data.
  this.authorsNamesMap = this.getAuthorsNames(this.users);
  this.addAuthorOfPosts(this.originalPostList, this.authorsNamesMap);
  this.addCommentsToPosts(this.originalPostList, this.comments);
  // loading data to header.
  this.currentUser = this.getCurrentUser(this.users, "Bret");
  this.currentUser.numberOfPosts = this.loadNumberOfPosts(this.originalPostList, this.currentUser.id);
  this.UserService_.setCurrentUser(this.currentUser);
  this.showPostList();
};

/**
 * Shows the full post list view and hide the specific post view.
 */
MainController.prototype.showPostList = function() {
  this.postListIsVisible = true;
  this.fullPostIsVisible = false;
  this.addPostIsVisible = false;
};

/**
 * Shows the specific post view and hide the full post list view.
 */
MainController.prototype.showFullPost = function() {
  this.postListIsVisible = false;
  this.fullPostIsVisible = true;
  this.addPostIsVisible = false;
};

/**
 * Shows the specific post view and hide the full post list view.
 */
MainController.prototype.showAddPost = function() {
  this.postListIsVisible = false;
  this.fullPostIsVisible = false;
  this.addPostIsVisible = true;
};

/**
 * Hide all components from the view
 */
MainController.prototype.showNothing = function() {
  this.postListIsVisible = false;
  this.fullPostIsVisible = false;
  this.addPostIsVisible = false;
};

/**
 * Retrieves information from an specific user.
 * @param {Array} usersArray Array of users.
 * @param {!string} userName Name of the searched user.
 * @return {Object} result User whose username matches to userName.
 */
MainController.prototype.getCurrentUser = function(usersArray, userName) {
  return usersArray.find(function(user, index) {
    return user.username == userName;
  });
};

/**
 * Returns a map containing the information of the users where
 * key = userId and value = userName.
 * @param {Array} usersArray Array of users.
 * @return {Object} result Map containing user's id and name.
 */
MainController.prototype.getAuthorsNames = function(usersArray) {
  var result = { };
  angular.forEach(usersArray, function(user, index) {
    result[user.id] = user.name;
  });
  return result;
};

/**
 * Adds the author's name to the post.
 * @param {!Object} post Post which will be modified.
 * @param {Object} namesMap Map containing user's id and name.
 */
MainController.prototype.addAuthorOfPost = function(post, namesMap) {
    post.authorId = post.userId;
    post.authorName = namesMap[post.userId];
};

/**
 * Adds the author's name to the posts array.
 * @param {Array} postsArray Array of all the posts.
 * @param {Object} namesMap Map containing user's id and name.
 */
MainController.prototype.addAuthorOfPosts = function(postsArray, namesMap) {
  angular.forEach(postsArray, function(post, index) {
    this.addAuthorOfPost(post, namesMap);
  }.bind(this));
};

/**
 * Adds all the comments related to a post.
 * @param {Array} postsArray Array of all the posts.
 * @param {Array} commentsArray Array of all the comments.
 */
MainController.prototype.addCommentsToPosts = function(postsArray, commentsArray) {
  angular.forEach(postsArray, function(post, index) {
    post.comments = this.filter_('filter')(commentsArray,{postId:post.id},true);
  }, this);
};

/**
 * Returns the number of posts the user has published.
 * @param {Array} commentsArray Array of comments.
 * @param {number} userId Id of the user.
 * @return {number} Number of posts the user has published.
 */
MainController.prototype.loadNumberOfPosts = function(postsArray, uId) {
  return this.filter_('filter')(postsArray, {userId:uId}, true).length;
};

/**
 * Populates post list with elements that contains searchString.
 * @param {!string} searchString String written by the user in the filter field.
 */
MainController.prototype.filterPost = function(searchString, event) {
  this.showNothing();
  this.posts = [ ];
  angular.forEach(this.originalPostList, function(oPost, index) {
    this.showNothing();
    if(this.findInPost(oPost, searchString)) {
      this.posts.push(oPost);
    };
  }.bind(this));

  // this is horrible, I know
  // but I could not manage to update the view after the filterField value has changed
  setTimeout(function(){
    this.scope_.$apply(function(){
      this.showPostList();
    }.bind(this));
    document.getElementById("filterFieldInput").focus();
  }.bind(this),0);

};

/**
 * Searchs through title's and author's posts for searchString
 * @param {!Object} post Post which is evaluated.
 * @param {!string} searchString String written in the filter field.
 * @return {boolean} Whether the post contains searchString or not.
 */
MainController.prototype.findInPost = function(post, searchString) {
  var result = false;
  if(this.searchInPostTitle(post, searchString) || this.searchInPostAuthor(post, searchString)) {
    result = true;
  };
  return result;
};

/**
 * Searchs through title's posts for searchString.
 * @param {!Object} post Post which is evaluated.
 * @param {!string} searchString String written in the filter field.
 * @return {boolean} Whether the title's post contains searchString or not.
 */
MainController.prototype.searchInPostTitle = function(post, searchString) {
  return post.title.toUpperCase().indexOf(searchString.toUpperCase()) != -1;
};

/**
 * Searchs through author's posts for searchString.
 * @param {!Object} post Post which is evaluated.
 * @param {!string} searchString String written in the filter field.
 * @return {boolean} Whether the author's post contains searchString or not.
 */
MainController.prototype.searchInPostAuthor = function(post, searchString) {
  return post.authorName.toUpperCase().indexOf(searchString.toUpperCase()) != -1;
};

/**
 * Refresh the information displayed in the view.
 */
MainController.prototype.refreshViewInfo = function() {
  this.currentUser.numberOfPosts = this.loadNumberOfPosts(this.originalPostList, this.currentUser.id);
  this.filterPost(this.filterField);
  this.showPostList();
};

/**
 * Adds a new post to the list.
 * @param {!Object} post Post which will be added.
 */
MainController.prototype.addPostToView = function(post) {
  this.showWait = true;
  // calling service to add the post
  this.addPost(post).then(function(response) {
    // adding info to the post added
    post.id = response.data.id;
    this.addAuthorOfPost(post, this.authorsNamesMap);
    // adding the post to the list
    this.addPostToList(post);
    // updating the info displayed in the view
    this.refreshViewInfo();
    this.showWait = false;
  }.bind(this));
};

/**
 * Removes an specific post from the list with all of its comments.
 * @param {!Object} post Post which will be removed.
 */
MainController.prototype.removePostFromView = function(post) {
  this.showWait = true;
  // deleting comments of the post
  var removeCommentsPromise = this.removeComments(post.comments);

  this.q_.all(removeCommentsPromise).then(function() {
    // deleting post after comments has been deleted
    this.removePost(post.id).then(function() {
      // deleting post from the view
      this.removePostFromList(post.id);
      // updating the info displayed in the view
      this.refreshViewInfo();      
      this.showWait = false;
    }.bind(this),function() {
      // an error ocurred while removing post
      alert("Error while removing post");
      this.showWait = false;
    }.bind(this));
  }.bind(this));

};

/**
 * Invokes a service to add a new post.
 * @param {!Object} post Post which will be added.
 * return {Object} Promise of the service.
 */
MainController.prototype.addPost = function(post) {
  return this.PostService_.addPost(post);
}

/**
 * Invokes a service to delete an specific post.
 * @param {!number} postId Id of the post which will be deleted.
 * @return {Object} Promise of the service.
 */
MainController.prototype.removePost = function(postId) {
  return this.PostService_.removePost(postId);
}

/**
 * Invokes a service to delete an specific comment.
 * @param {!number} commentId Id of the comment which will be deleted.
 * @return {Object} Promise of the service.
 */
MainController.prototype.removeComment = function(commentId) {
  return this.PostService_.removeComment(commentId);
};

/**
 * Invokes a service to delete an array of comments.
 * @param {!Array} comments Array of comments which will be deleted.
 * @return {Array} Array containing promises of the service.
 */
MainController.prototype.removeComments = function(comments) {
  var promise = [ ];
  angular.forEach(comments,function(comment, index) {
    promise.push(this.removeComment(comment.id));
  }.bind(this));
  return promise;
};

/**
 * Adds an specific post to the list showed in the view.
 * @param {!Object} post Post which will be added.
 */
MainController.prototype.addPostToList = function(post) {
  this.originalPostList.push(post);
};

/**
 * Removes an specific post from the list showed in the view.
 * @param {!number} postId Id of the post which will be deleted.
 */
MainController.prototype.removePostFromList = function(postId) {
  for(var i=0; i<this.originalPostList.length; i++) {
    if(this.originalPostList[i].id == postId) {
      this.originalPostList.splice(i, 1);
      break;
    };
  };
};