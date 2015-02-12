ArchiveOfOurClone.Views.fandomIndex = Backbone.CompositeView.extend({

  template: JST['fandomIndex'],

  initialize: function() {
    this.categories = this.collection.models[0].get("categories")

    _(this.categories).each(function(category){
      var indexItem = new ArchiveOfOurClone.Views.fandomIndexItem({ model: category})
      this.addSubview("div.fandom-index", indexItem);
    }.bind(this));
    this.render();

  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  goToFandomsIndex: function(){
    Backbone.history.navigate("#fandoms", {trigger: true})
  },

});
