ArchiveOfOurClone.Views.storyIndex = Backbone.CompositeView.extend({

  template: JST['storyIndex'],


  initialize: function() {

    var sidebar = new ArchiveOfOurClone.Views.searchSidebar({ collection: this.collection })
    this.addSubview(".search", sidebar)

    this.listenTo(this.collection, "sync", this.renderWithoutSidebar)

  },

  render: function() {
    this.$el.html(this.template({collection: this.collection}));
    this.attachSubviews();
    return this;
  },

  renderWithoutSidebar: function(){

    this.removeSelectorSubviews("header")
    this.removeSelectorSubviews(".story-index")

    var header = new ArchiveOfOurClone.Views.storyIndexHeader({ collection: this.collection })
    this.addSubview("header", header)

    this.collection.each(function(model){
      var indexItem = new ArchiveOfOurClone.Views.storyIndexItem({ model: model})
      this.addSubview(".story-index", indexItem);
    }.bind(this));

    this.attachSelectorSubviews("header")
    this.attachSelectorSubviews(".story-index")
  }

});
