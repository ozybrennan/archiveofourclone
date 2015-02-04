ArchiveOfOurClone.Views.storyIndex = Backbone.CompositeView.extend({

  template: JST['storyIndex'],

  initialize: function() {
    this.collection.each(function(model){
      var indexItem = new ArchiveOfOurClone.Views.storyIndexItem({ model: model})
      this.addSubview(".story-index", indexItem);
    }.bind(this));

    var sidebar = new ArchiveOfOurClone.Views.searchSidebar()
    this.addSubview(".search", sidebar)
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

});
