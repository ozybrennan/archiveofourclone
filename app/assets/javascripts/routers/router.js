ArchiveOfOurClone.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.userCollection = new ArchiveOfOurClone.Collections.Users();
  },

  routes: {
    '': 'baseStoryIndex',
    'search/:sortCriterion/*tags': 'storySearch',
    'stories/:id': 'storyShow',
    'users': 'userIndex',
    'users/:id': 'userShow',
    'fandoms': 'categoryIndex',
    'fandoms/:name': 'categoryShow',
  },

  baseStoryIndex: function() {
    ArchiveOfOurClone.Collections.baseCollection.fetch({
        success: this._storyIndex.bind(this),
      });
  },

  storyShow: function(id) {
   var model = ArchiveOfOurClone.Collections.baseCollection.getOrFetch(id);
   var view = new ArchiveOfOurClone.Views.storyShow({model: model})
   this._swapViews(view);
  },

  storySearch: function(sortCriterion, tags) {
    var models = ArchiveOfOurClone.Collections.baseCollection.models;
    var collection = new ArchiveOfOurClone.Collections.Stories(models,
      { comparator: sortCriterion, tags: tags })
      this._storyIndex(collection)
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
