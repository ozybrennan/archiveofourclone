ArchiveOfOurClone.Views.storyIndexItem = Backbone.View.extend({

  template: JST['storyIndexItem'],

  className: "fact-box",

  events: {
    'click a.index-title' : 'showStory',
    'click a.search-link' : 'showTag',
    'click a.index-author' : 'showUser'
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

  showTag: function(event){
    debugger
    event.preventDefault();
    var $target = $(event.currentTarget)
    var searchClass = $target.attr("class").split(" ")[1].toLowerCase();
    var url = "#search/created_at/" + searchClass + "/" + $target.text().trim();
    Backbone.history.navigate(url, {trigger: true});
  },

})
