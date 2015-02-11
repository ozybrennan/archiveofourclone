ArchiveOfOurClone.Views.storyIndexItem = Backbone.View.extend({

  template: JST['storyIndexItem'],

  className: "fact-box",

  events: {
    'click a.index-title' : 'showStory',
    'click a.search-link' : 'showTag',
    'click a.index-author' : 'showUser',
    'click button.edit': "editStory",
    'click button.delete': "deleteStory",
  },

  initialize: function (options) {
    if (options.user) {
      this.user = options.user
    }
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var content = this.template({story: this.model, user: this.user})
    this.$el.html(content);
    return this;
  },

  showStory: function(event){
    event.preventDefault();
    var url = "#stories/" + $(event.currentTarget).data("id")
    Backbone.history.navigate(url, {trigger: true})
  },

  showTag: function(event){
    event.preventDefault();
    var $target = $(event.currentTarget)
    var searchClass = $target.attr("class").split(" ")[1];
    var url = "#search/created_at/1/" + searchClass + "/" + $target.text().trim();
    Backbone.history.navigate(url, {trigger: true});
  },

  showUser : function(event) {
    event.preventDefault();
    var url = "#users/" + $(event.currentTarget).data("id")
    Backbone.history.navigate(url, {trigger: true})
  },

  editStory : function(event) {
    event.preventDefault();
    var url = "#stories/" + this.model.id + "/edit"
    Backbone.history.navigate(url, {trigger: true})
  },

  deleteStory: function(event) {
    event.preventDefault();
    this.model.remove();
  },

})
