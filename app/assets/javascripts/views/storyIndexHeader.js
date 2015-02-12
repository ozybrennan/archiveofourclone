ArchiveOfOurClone.Views.storyIndexHeader = Backbone.View.extend({

  template: JST['storyIndexHeader'],

  events: {
    'click button.next' : "nextPage",
    'click button.previous' : "previousPage",
    'click button.first' : "firstPage",
    'click button.last' : "lastPage"
  },

  render: function() {
    var content = this.template({collection: this.collection});
    this.$el.html(content);
    return this;
  },

  previousPage: function() {
    this.goToPage(this.collection.page - 1);
  },

  nextPage: function () {
    this.goToPage(this.collection.page + 1);
  }
  ,
  firstPage: function () {
    this.goToPage(1);
  },

  lastPage: function () {
    this.goToPage(this.collection.total_pages);
  },

  goToPage: function(page) {
    if (_.isFunction(this.collection.comparator)) {
      sortCriterion = "kudos";
    } else {
      sortCriterion = this.collection.comparator;
    }
    var url = this.collection.criterionURL + "/" + page + this.collection.tagURL;
    Backbone.history.navigate(url, {trigger: true });
  },

})
