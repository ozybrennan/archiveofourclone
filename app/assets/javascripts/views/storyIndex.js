ArchiveOfOurClone.Views.storyIndex = Backbone.CompositeView.extend({

  template: JST['storyIndex'],

  initialize: function() {

   this.collection.filterCollection();

   this.collection.each(function(model){
      var indexItem = new ArchiveOfOurClone.Views.storyIndexItem({ model: model})
      this.addSubview(".story-index", indexItem);
    }.bind(this));
    this.render();

    var sidebar = new ArchiveOfOurClone.Views.searchSidebar({ collection: this.collection })
    this.addSubview(".search", sidebar)

  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

});
