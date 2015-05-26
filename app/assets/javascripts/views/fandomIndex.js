ArchiveOfOurClone.Views.fandomIndex = Backbone.CompositeView.extend({

  template: JST['fandomIndex'],

  initialize: function() {

    this.collection.each(function(model){
      var indexItem = new ArchiveOfOurClone.Views.fandomIndexItem({ model: model})
      this.addSubview(".fandom-index", indexItem);
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
