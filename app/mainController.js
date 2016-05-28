/**
 * MainController constructor.
 * @param {!angular.scope} $scope Angular's scope object.
 * @param {!angular.http} $http Angular's http object.
 * @param {!angular.filter} $filter Angular's filter object.
 * @param {!angular.q} $q Angular's q object.
 * @param {!Function} PostService Service which contains post services.
 * @constructor
 */
var MainController = function($scope, $http, $filter, $q, PostService){
  /** @private References angular's scope object*/
  this.scope_ = $scope;
  /** @private References angular's http object*/
  this.http_ = $http;
  /** @private References angular's filter object*/
  this.filter_ = $filter;
  /** @private References angular's q object*/
  this.q_ = $q;
  /** @private References angular's filter object*/
  this.PostService_ = PostService;
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
  this.filterField = null;
  /** @export */
  this.originalPostList = null;

  /** @private */
  var jsonFilePath = '/data/db_truncated.json';

  /**
   * Listens to an specific event of childScopes and change view components.
   * @param {!Object} event Angular's event object.
   * @param {!Object} data Data sent from the event.
   * @private
   */
  this.scope_.$on('postSelectedFromList',function(event, data){
    this.selectedPost = data;
    this.showFullPost();
  }.bind(this));

  /**
   * Listens to an specific event of childScopes and change view components.
   * @param {!Object} event Angular's event object.
   * @param {?Object} data Data sent from the event.
   * @private
   */
  this.scope_.$on('fullPostClosed',function(event, data){
    this.showPostList();
  }.bind(this));

  /**
   * Listens to an specific event of childScopes and change view components.
   * @param {!Object} event Angular's event object.
   * @param {?Object} data Data sent from the event.
   * @private
   */
  this.scope_.$on('addPostClosed',function(event, data){
    this.showPostList();
  }.bind(this));

  /**
   * Removes an specific post from the list.
   * @param {!Object} event Angular's event object.
   * @param {!Object} post Post which will be removed.
   * @private
   */
  this.scope_.$on('removePost',function(event, post){
    this.removePost(post);
  }.bind(this));

  // Loads JSON data from external server
  this.loadInformationFromServer();
};

/**
 * Loads information from an external server.
 * @private
 */
MainController.prototype.loadInformationFromServer = function(){
  // loads posts.
  this.PostService_.getAllPosts()
  .then(function(response){
    this.originalPostList = this.posts = response.data;
    return this.PostService_.getAllComments()
  }.bind(this))
  // loads comments.
  .then(function(response){
    this.comments = response.data;
    return this.PostService_.getAllUsers()
  }.bind(this))
  // loads users.
  .then(function(response){
    this.users = response.data;
    this.loadAdditionalInformation();
  }.bind(this));
};

/**
 * Complement the information previously loaded
 * @private
 */
MainController.prototype.loadAdditionalInformation = function(){
  // complementing data.
  this.authorsNamesMap = this.getAuthorsNames(this.users);
  this.addAuthorOfPosts(this.posts, this.authorsNamesMap);
  this.addCommentsToPosts(this.posts, this.comments);
  // loading data to header.
  this.currentUser = this.getCurrentUser(this.users, "Bret");
  this.currentUser.numberOfPosts = this.loadNumberOfPosts(this.posts,this.currentUser.id);

  this.originalPostList = this.posts;
  this.showPostList();
};

/**
 * Shows the full post list view and hide the specific post view.
 */
MainController.prototype.showPostList = function(){
  this.postListIsVisible = true;
  this.fullPostIsVisible = false;
  this.addPostIsVisible = false;
};

/**
 * Shows the specific post view and hide the full post list view.
 */
MainController.prototype.showFullPost = function(){
  this.postListIsVisible = false;
  this.fullPostIsVisible = true;
  this.addPostIsVisible = false;
};

/**
 * Shows the specific post view and hide the full post list view.
 */
MainController.prototype.showAddPost = function(){
  this.postListIsVisible = false;
  this.fullPostIsVisible = false;
  this.addPostIsVisible = true;
};

/**
 * Retrieves information from an specific user.
 * @param {Array} usersArray Array of users.
 * @param {string} userName Name of the searched user.
 * @return {Object} result User whose username matches to userName.
 */
MainController.prototype.getCurrentUser = function(usersArray, userName){
  return usersArray.find(function(user, index){
    return user.username == userName;
  });
};

/**
 * Returns a map containing the information of the users where
 * key = userId and value = userName.
 * @param {Array} usersArray Array of users.
 * @return {Object} result Map containing user's id and name.
 */
MainController.prototype.getAuthorsNames = function(usersArray){
  var result = {};
  angular.forEach(usersArray, function(user, index){
    result[user.id] = user.name;
  });
  return result;
};

/**
 * Adds the author's name to the post.
 * @param {Array} postsArray Array of all the posts.
 * @param {Object} namesMap Map containing user's id and name.
 */
MainController.prototype.addAuthorOfPosts = function(postsArray, namesMap){
  angular.forEach(postsArray, function(post, index){
    post.authorId = post.userId;
    post.authorName = namesMap[post.userId];
  });
};

/**
 * Adds all the comments related to a post.
 * @param {Array} postsArray Array of all the posts.
 * @param {Array} commentsArray Array of all the comments.
 */
MainController.prototype.addCommentsToPosts = function(postsArray, commentsArray){
  angular.forEach(postsArray, function(post, index){
    post.comments = this.filter_('filter')(commentsArray,{postId:post.id},true);
  }, this);
};

/**
 * Returns the number of posts the user has published.
 * @param {Array} commentsArray Array of comments.
 * @param {number} userId Id of the user.
 * @return {number} Number of posts the user has published.
 */
MainController.prototype.loadNumberOfPosts = function(postsArray,uId){
  return this.filter_('filter')(postsArray,{userId:uId},true).length;
};

/**
 * Populates post list with elements that contains searchString.
 * @param {string} searchString String written by the user in the filter field.
 */
MainController.prototype.filterPost = function(searchString){
  this.posts = [];
  angular.forEach(this.originalPostList, function(oPost, index){
    if(this.findInPost(oPost, searchString)){
      this.posts.push(oPost);
    }
  },this);
};

/**
 * Searchs through title's and author's posts for searchString
 * @param {Object} post Post which is evaluated.
 * @param {string} searchString String written in the filter field.
 * @return {boolean} Whether the post contains searchString or not.
 */
MainController.prototype.findInPost = function(post, searchString){
  var result = false;
  if(this.searchInPostTitle(post,searchString) || this.searchInPostAuthor(post, searchString)){
    result = true;
  }
  return result;
};

/**
 * Searchs through title's posts for searchString.
 * @param {Object} post Post which is evaluated.
 * @param {string} searchString String written in the filter field.
 * @return {boolean} Whether the title's post contains searchString or not.
 */
MainController.prototype.searchInPostTitle = function(post, searchString){
  return post.title.toUpperCase().indexOf(searchString.toUpperCase()) != -1;
};

/**
 * Searchs through author's posts for searchString.
 * @param {Object} post Post which is evaluated.
 * @param {string} searchString String written in the filter field.
 * @return {boolean} Whether the author's post contains searchString or not.
 */
MainController.prototype.searchInPostAuthor = function(post, searchString){
  return post.authorName.toUpperCase().indexOf(searchString.toUpperCase()) != -1;
};

/**
 * Remove an specific post from the list.
 * @param {Object} post Post which will be removed.
 */
MainController.prototype.removePost = function(post){
  // TODO implement $q correctly
  var deferred = this.q_.defer();
  var promise = deferred.promise;
  var prom = [];

  angular.forEach(post.comments,function(comment, index){
    console.log("Borraremos el comment con el id "+comment.id+" del post "+post.id);
    this.PostService_.removeComment(comment.id).then(function(response){
      console.log("Ya borramos el comment con id "+comment.id);
      prom.push(comment.id);
    });
  }.bind(this));
  
  this.q_.all(prom).then(function(){
    console.log("Borraremos el post con el id "+post.id);
    this.PostService_.removePost(post.id).then(function(response){
      console.log("Ya borramos el post con id "+post.id);
    });
  }.bind(this));

  deferred.resolve();
};