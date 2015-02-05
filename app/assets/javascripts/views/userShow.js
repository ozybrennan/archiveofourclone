ArchiveOfOurClone.Views.userShow = Backbone.CompositeView.extend({

  template: JST['userShow'],

  initialize: function(){
    _(this.model.get("stories")).each(function(story){
      var model = new ArchiveOfOurClone.Models.Story(story);
      var indexItem = new ArchiveOfOurClone.Views.storyIndexItem({ model: model})
      this.addSubview(".works", indexItem);
    }.bind(this));
  },

  render: function(){
    var content = this.template({user: this.model})
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

})
