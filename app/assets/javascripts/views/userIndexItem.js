ArchiveOfOurClone.Views.userIndexItem = Backbone.View.extend({

  template: JST['userIndexItem'],

  className: "user-index-box",

  events: {
    'click a.user' : 'showUser',
    'click a.story-link' : 'showUserStories'
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var content = this.template({user: this.model})
    this.$el.html(content);
    return this;
  },

  showUser: function(event){
    var url = "#users/" + this.model.id
    Backbone.history.navigate(url, {trigger: true})
  },

  showUserStories: function(event){
    var url = "#search/created_at/1/author_name/" + this.model.get("username")
    Backbone.history.navigate(url, {trigger: true})
  }

})
