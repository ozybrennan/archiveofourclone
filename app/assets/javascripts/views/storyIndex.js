ArchiveOfOurClone.Views.storyIndex = Backbone.CompositeView.extend({

  template: JST['storyIndex'],

  events: {
    'click button.next' : "nextPage",
    'click button.previous' : "previousPage"
  },

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
    this.$el.html(this.template({collection: this.collection}));
    this.attachSubviews();
    return this;
  },

  previousPage: function() {
    this.goToPage(-1);
  },

  nextPage: function () {
    this.goToPage(1);
  },

  goToPage: function(num) {
    if (_.isFunction(this.collection.comparator)) {
      sortCriterion = "kudos";
    } else {
      sortCriterion = this.collection.comparator;
    }
    var page = this.collection.page + num;
    var url = "#search/" + sortCriterion + "/" + page;
    Backbone.history.navigate(url, {trigger: true });
  },

});
