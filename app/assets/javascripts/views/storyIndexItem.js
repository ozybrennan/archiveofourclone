ArchiveOfOurClone.Views.storyIndexItem = Backbone.View.extend({

  template: JST['storyIndexItem'],

  className: "fact-box",

  events: {
    'click a.index-title' : 'showStory'
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var content = this.template({story: this.model})
    this.$el.html(content);
    return this;
  },

  showStory: function(event){
    var url = "#stories/" + $(event.currentTarget).data("id")
    Backbone.history.navigate(url, {trigger: true})
  },

})
