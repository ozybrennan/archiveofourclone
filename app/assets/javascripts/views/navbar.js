ArchiveOfOurClone.Views.navbar = Backbone.View.extend({

  template: JST['navbar'],

  events: {
    'click a.genres' : 'goToFandomIndex',
    'click a.genre' : 'goToFandomShow',
    'click a.users' : 'goToUsersIndex',
    'click a.works' : 'goToWorksIndex',
    'click a.create' : 'goToCreate'
  },

  initialize: function () {
    this.categories = this.collection.models[0]
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function(){
    var content = this.template({categories: this.categories.get("categories"), current_user: this.categories.get("current_user")});
    this.$el.html(content);
    return this;
  },

  goToFandomIndex: function(event){
    event.preventDefault();
    Backbone.history.navigate("#fandoms", {trigger: true});
  },

  goToFandomShow: function(event){
    event.preventDefault();
    var url = "#fandoms/" + $(event.currentTarget).text();
    Backbone.history.navigate(url, {trigger: true});
  },

  goToUsersIndex: function(event){
    event.preventDefault();
    Backbone.history.navigate("#users", {trigger: true});
  },

  goToWorksIndex: function(event){
    event.preventDefault();
    Backbone.history.navigate("#1", {trigger: true});
  },

  goToCreate: function(event){
    event.preventDefault();
    Backbone.history.navigate("#stories/new", {trigger: true});
  },

})
