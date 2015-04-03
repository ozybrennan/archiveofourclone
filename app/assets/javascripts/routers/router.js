ArchiveOfOurClone.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.userCollection = new ArchiveOfOurClone.Collections.Users();
    this.userCollection.fetch();
  },

  routes: {
    '': 'homePage',
    'search/:sortCriterion/:page(/*tags)': 'storySearch',
    'stories/new': 'storyForm',
    'stories/:id': 'storyShow',
    'stories/:id/edit': 'storyForm',
    'users': 'userIndex',
    'users/:id': 'userShow',
    'fandoms': 'categoryIndex',
    'fandoms/:name': 'categoryShow',
    ':page': 'baseStoryIndex',
  },

  homePage: function() {
    var model = new ArchiveOfOurClone.Models.Home();
    model.fetch();
    var view = new ArchiveOfOurClone.Views.homepage({model: model});
    this._swapViews(view);
  },

  baseStoryIndex: function(page) {
    var that = this;
    new ArchiveOfOurClone.Collections.Stories().fetch({
        data: { page: page },
        success: that._storyIndex.bind(that)
    });
  },

  storyShow: function(id) {
   var model = ArchiveOfOurClone.Collections.baseCollection.getOrFetch(id);
   var view = new ArchiveOfOurClone.Views.storyShow({model: model})
   this._swapViews(view);
  },

  storyForm: function (id) {
    if (id) {
      var model = ArchiveOfOurClone.Collections.baseCollection.getOrFetch(id);
    }
    var view = new ArchiveOfOurClone.Views.storyForm({model: model})
    this._swapViews(view);
  },

  storySearch: function(sortCriterion, page, tags) {
    var that = this;

    var criterionURL = "#search/" + sortCriterion;
    var tagURL = ""
    if (tags) {
      tagURL = "/" + tags
    }

    new ArchiveOfOurClone.Collections.Stories([],
      { criterionURL: criterionURL, tagURL: tagURL }).fetch({
        data: { page: page, tags: tags, sortCriterion: sortCriterion },
        success: that._storyIndex.bind(that),
      });
  },

  userIndex: function(){
    this.userCollection.fetch({
      success: function() {
        var view = new ArchiveOfOurClone.Views.userIndex({collection: this.userCollection})
        this._swapViews(view);
      }.bind(this),
    });
  },

  userShow: function(id) {
    new ArchiveOfOurClone.Models.User({id: id}).fetch({
      success: function(model) {
        var view = new ArchiveOfOurClone.Views.userShow({model: model})
        this._swapViews(view);
      }.bind(this),
    })
  },

  categoryIndex: function() {
    var collection = new ArchiveOfOurClone.Collections.Categories()
    collection.fetch({
      success: function () {
        var view = new ArchiveOfOurClone.Views.fandomIndex({collection: collection})
        this._swapViews(view);
      }.bind(this)
    });
  },

  categoryShow: function(name) {
    var collection = new ArchiveOfOurClone.Collections.Categories()
    collection.fetch({
      success: function () {
        var categories = collection.models[0].get("categories")
        _(categories).each(function(category){
          var categoryName = category.category_name
          if (name === categoryName) {
            shownCategory = category;
          }
        });
        var view = new ArchiveOfOurClone.Views.fandomShow({model: shownCategory})
        this._swapViews(view);
      }.bind(this)
    });
  },

  _swapViews: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el)
  },

  _storyIndex: function (collection) {
    var view = new ArchiveOfOurClone.Views.storyIndex({collection: collection})
    this._swapViews(view);
  }

})
