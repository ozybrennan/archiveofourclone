ArchiveOfOurClone.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection = new ArchiveOfOurClone.Collections.Stories();
  },

  routes: {
    '': 'storyIndex',
    'search/:sortCriterion': 'storySearch',
    'stories/:id': 'storyShow',
  },

  storyIndex: function() {
    this.collection.fetch({
      success: function() {
        var view = new ArchiveOfOurClone.Views.storyIndex({collection: this.collection})
        this._swapViews(view);
      }.bind(this),
    });
  },

  storyShow: function(id) {
   var model = this.collection.getOrFetch(id);
   var view = new ArchiveOfOurClone.Views.storyShow({model: model})
   this._swapViews(view);
  },

  storySearch: function(sortCriterion) {
    var collection = new ArchiveOfOurClone.Collections.Stories({}, { comparator: sortCriterion });
    collection.fetch({
      success: function() {
        var view = new ArchiveOfOurClone.Views.storyIndex({collection: collection})
        this._swapViews(view);
      }.bind(this),
    });
  },

  _swapViews: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el)
  },

})
