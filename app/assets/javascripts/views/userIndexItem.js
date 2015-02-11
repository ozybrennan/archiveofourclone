ArchiveOfOurClone.Views.userIndexItem = Backbone.View.extend({

  template: JST['userIndexItem'],

  className: "user-index-box",

  events: {
    'click a.user' : 'showUser'
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

})
