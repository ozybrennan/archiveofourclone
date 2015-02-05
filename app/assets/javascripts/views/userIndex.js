ArchiveOfOurClone.Views.userIndex = Backbone.CompositeView.extend({

  template: JST['userIndex'],

  initialize: function(){
    this.collection.each(function(model){
      var userItem = new ArchiveOfOurClone.Views.userIndexItem({ model: model})
      this.addSubview(".users", userItem);
    }.bind(this));
  },

  render: function(){
    var content = this.template()
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

})
